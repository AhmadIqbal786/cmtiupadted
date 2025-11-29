# Supabase Setup for CMTI LMS

This document explains how to provision a Supabase project, create the database schema, storage bucket, and deploy the Edge Function used by the LMS.

Prerequisites
- A Supabase account: https://supabase.com/
- Supabase CLI (optional but recommended): https://supabase.com/docs/guides/cli
- Node 18+/Deno for Edge function testing (optional)

1) Create Supabase Project
- Go to Supabase dashboard > New Project
- Note the `API URL` (SUPABASE_URL) and the `anon` public key and `service_role` key (keep service_role secret)

2) Run SQL Schema
- Open the SQL Editor in Supabase and paste the contents of `supabase_setup.sql` from this repo.
- Execute the SQL. This will create tables and policies.

3) Create Storage Bucket
- In Supabase UI > Storage > Create bucket
- Bucket name: `lms-materials`
- Privacy: Private (recommended). If private, the `download-url` function will generate signed URLs.

4) Deploy Edge Function (Download URL)
- In the Supabase dashboard, go to Functions > New Function (Edge)
- Create function named `download-url` and copy the contents of `functions/download-url/index.ts`
- Add environment variables to the function:
  - `SUPABASE_URL` = your project URL
  - `SUPABASE_SERVICE_ROLE` = service_role key (VERY SENSITIVE)
- Deploy the function. Note its public endpoint.

5) Configure `lms.html`
- In `lms.html` (in the repository), replace the SUPABASE_URL and SUPABASE_ANON_KEY constants with your project's values.
- The frontend will call the Edge function `download-url` via `supabase.functions.invoke('download-url', { body: { material_id } })`.
- If you put the function under a different name or path, update the invocation accordingly.

6) Create Admin / Teacher Users
- From Supabase Auth > Users, create users or invite.
- Assign roles by inserting into `user_roles` table using SQL editor.
  Example:
  ```sql
  INSERT INTO user_roles (user_id, role_id)
  VALUES ('<USER_UUID>', (SELECT id FROM roles WHERE name = 'teacher'));
  ```

7) Test End-to-End
- Upload a sample file via the LMS (teacher account), verify it appears in `materials` table, and click download (should generate a signed URL and open file).

Security Notes
- Never expose the `service_role` key in client-side code. It must be used only in server-side functions (Edge functions) or server code.
- Review RLS policies for tighter security depending on your needs.

If you'd like, I can:
- Deploy these steps for you if you provide Supabase project credentials (service_role) securely.
- Or I can guide you step-by-step while you run each step.

