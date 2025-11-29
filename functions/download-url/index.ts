import { serve } from 'std/server'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Edge function to return a signed URL for a material file_path
serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const material_id = body?.material_id || null;
    if (!material_id) return new Response(JSON.stringify({ error: 'material_id required' }), { status: 400, headers: { 'content-type': 'application/json' } });

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) return new Response(JSON.stringify({ error: 'server misconfigured' }), { status: 500, headers: { 'content-type': 'application/json' } });

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { global: { headers: { 'x-edge-runtime': '1' } } });

    // 1) fetch material record
    const { data: material, error: findErr } = await supabaseAdmin.from('materials').select('file_path').eq('id', material_id).single();
    if (findErr || !material) return new Response(JSON.stringify({ error: 'material not found' }), { status: 404, headers: { 'content-type': 'application/json' } });

    const filePath = material.file_path;
    // 2) create signed URL (valid for 5 minutes)
    const expiresIn = 300; // seconds
    const { data: signed, error: signErr } = await supabaseAdmin.storage.from('lms-materials').createSignedUrl(filePath, expiresIn);
    if (signErr || !signed) return new Response(JSON.stringify({ error: 'could not create signed url', details: signErr }), { status: 500, headers: { 'content-type': 'application/json' } });

    return new Response(JSON.stringify({ url: signed.signedUrl || signed.signed_url || signed.signedURL }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
})
