-- Supabase LMS schema and policies
-- Run this in Supabase SQL editor or via supabase CLI (psql)

-- 1) Extensions (if available)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) Roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

-- Insert default roles
INSERT INTO roles (name) VALUES ('admin') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('teacher') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('student') ON CONFLICT DO NOTHING;

-- 3) Mapping table user_roles
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  UNIQUE (user_id, role_id)
);

-- 4) Subjects (courses)
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON subjects;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON subjects
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- 5) Materials (files uploaded to storage)
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_path text NOT NULL,
  mime_type text,
  size_bytes integer,
  uploaded_by uuid REFERENCES auth.users(id),
  uploaded_at timestamptz DEFAULT now()
);

-- 6) Enrolments
CREATE TABLE IF NOT EXISTS enrolments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  UNIQUE (user_id, subject_id)
);

-- 7) Progress (student completed materials)
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  material_id uuid REFERENCES materials(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  UNIQUE (user_id, material_id)
);

-- 8) Enable Row Level Security (RLS) and create policies
-- Subjects: allow SELECT if user is creator, enrolled, or has teacher/admin role
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subjects_select_enrolled_or_teacher" ON subjects
  FOR SELECT USING (
    auth.role() = 'authenticated' AND (
      created_by = auth.uid()
      OR EXISTS (SELECT 1 FROM enrolments e WHERE e.subject_id = subjects.id AND e.user_id = auth.uid())
      OR EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = auth.uid() AND r.name IN ('teacher','admin')
      )
    )
  );

-- Allow teachers/admins to INSERT subjects
CREATE POLICY "subjects_insert_teacher_admin" ON subjects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND (
      EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = auth.uid() AND r.name IN ('teacher','admin')
      )
    )
  );

-- Materials: enable RLS and policies
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- SELECT materials for users who are enrolled in parent subject or are teacher/admin or uploader
CREATE POLICY "materials_select_enrolled_or_teacher" ON materials
  FOR SELECT USING (
    auth.role() = 'authenticated' AND (
      uploaded_by = auth.uid()
      OR EXISTS (
        SELECT 1 FROM subjects s JOIN enrolments e ON s.id = e.subject_id
        WHERE s.id = materials.subject_id AND e.user_id = auth.uid()
      )
      OR EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = auth.uid() AND r.name IN ('teacher','admin')
      )
    )
  );

-- Allow teachers/admins or uploader to INSERT materials
CREATE POLICY "materials_insert_teacher_or_uploader" ON materials
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND (
      uploaded_by = auth.uid()
      OR EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = auth.uid() AND r.name IN ('teacher','admin')
      )
    )
  );

-- Enrolments: students can INSERT themself via server/admin UI (we'll allow teacher/admin to manage)
ALTER TABLE enrolments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrolments_manage_by_teacher_admin" ON enrolments
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = auth.uid() AND r.name IN ('teacher','admin')
      )
      OR user_id = auth.uid()
    )
  );

-- Progress: students can upsert their progress
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progress_manage_by_owner" ON progress
  FOR ALL USING (
    auth.role() = 'authenticated' AND user_id = auth.uid()
  );

-- NOTES:
-- 1) Run these statements in Supabase SQL Editor (or via supabase CLI: `supabase db remote commit` / `psql`).
-- 2) Create a storage bucket named `lms-materials` in Supabase Storage (private recommended).
-- 3) If you create a private bucket, deploy the 'download-url' Edge Function (see functions/download-url/index.ts)
--    which will use the SERVICE_ROLE key to create signed URLs.
-- 4) After running SQL, create any initial admin users and insert rows into user_roles to grant teacher/admin privileges.

-- Example: Grant an existing auth.user the teacher role (replace <user-uuid> and fetch role id):
-- INSERT INTO user_roles (user_id, role_id) VALUES ('<user-uuid>', (SELECT id FROM roles WHERE name = 'teacher'));

```