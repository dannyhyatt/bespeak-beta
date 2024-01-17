// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import sanitizeHtml from "https://esm.sh/sanitize-html@2.11.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2"

console.log("Hello from Functions!")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sanitizeConfig = {
  allowedTags: ['b', 'i', 'em', 'strong', 's', 'a', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'span'],
  allowedClasses: {
    '*' : [],
  },
  allowedAttributes: {
    '*': ['style'],
    'a' : ['href', 'target', 'rel'],
    'pre' : ['spellcheck', 'data-highlight-language']
  },
  allowedStyles: {
    '*': {
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
    }
  }
};

Deno.serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('url? ', Deno.env.get('SUPABASE_URL'))
  console.log('key? ', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.substring(0, 5))

  const adminSupabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const clientSupabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  // try {
    const reqData = await req.json()
    console.log('starting...', reqData)


    const { title, content, postId } = reqData

    console.log('unsanitized content: ', content)

    const safeContent = sanitizeHtml(content, sanitizeConfig)

    console.log('sanitized content: ', safeContent)
    
    // todo add db constraint that the user must be the author of the post
    const { data, error } = await adminSupabase.from('post_revisions').insert(
      { title, content: safeContent, post_id: postId },
    ).select('*')

    if(error) {
      console.log('error: ', error)
      // throw error
    }

    console.log('data: ', data)

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // Be sure to add CORS headers here too
      status: 200,
    })
  // } catch (error) {
  //   return new Response(JSON.stringify({ error: error.message }), {
  //     headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // and here
  //     status: 400,
  //   })
  // }

})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/upload_revision' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
