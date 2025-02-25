// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import sanitizeHtml from "https://esm.sh/sanitize-html@2.11.0";
import { convert } from "https://esm.sh/html-to-text@9.0.5";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2"
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12"
import * as thumbhash from "https://esm.sh/thumbhash@0.1.1"
// import sharp from "https://esm.sh/sharp@0.33.2"
import {Image, decode} from "https://deno.land/x/imagescript@1.2.17/mod.ts"
import axios from "https://esm.sh/axios@1.6.7"
import * as Base64 from 'https://deno.land/std@0.76.0/encoding/base64.ts';
import { resize } from "https://deno.land/x/imagescript@1.2.17/v2/ops/index.mjs";
import { Buffer } from "https://deno.land/x/imagescript@1.2.17/utils/buffer.js";

console.log("Hello from Functions!")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sanitizeConfig = {
  allowedTags: ['b', 'i', 'em', 'strong', 's', 'a', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'span', 'hr', 'img', 'figure', 'figcaption'],
  allowedClasses: {
    '*' : [],
    'span' : ['hljs-*'],
    'code' : ['language-*']
  },
  allowedAttributes: {
    '*': ['style'],
    'a' : ['href', 'target', 'rel'],
    'pre' : ['spellcheck', 'data-highlight-language'],
    'code' : ['as'],
    'img' : ['src', 'alt', 'title'],
  },
  allowedStyles: {
    '*': {
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
    },
    'div': {
      'white-space': [/^pre$/, /^pre-wrap$/, /^pre-line$/, /^inherit$/],
    }
  }
};

Deno.serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

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

    const $ = cheerio.load(content)

    const imgs = $('img')

    for(let i = 0; i < imgs.length; i++) {
      if(imgs[i].attribs.src) {
        const src = imgs[i].attribs.src
        console.log('src: ', src)
        const res = await axios({ url: src, responseType: "arraybuffer" })
        console.log(JSON.stringify(res.data))
        const input = res.data as Buffer
        console.log('input: ', input)
        const image = await decode(input)
        const originalHeight = image.height
        const originalWidth = image.width
        console.log('image: ', image.width)
        console.log('image: ', image.height)

        const resizedImage = image.resize(100, 100)
        
        if(!resizedImage) { 
          console.log('no resized image')
          continue
         }
  
        console.log('resizedImage: ', resizedImage.width, 'x', resizedImage.height)
        const binaryThumbHash = thumbhash.rgbaToThumbHash(resizedImage.height, resizedImage.width, resizedImage.bitmap)
        console.log('123')
        const binaryThumbHashString = btoa(String.fromCharCode(...binaryThumbHash));
        console.log('binaryThumbHash:', binaryThumbHashString)
        console.log('456')

        imgs[i].attribs['data-thumbhash'] = binaryThumbHashString
        imgs[i].attribs['data-original-width'] = originalWidth + ""
        imgs[i].attribs['data-original-height'] = originalHeight + ""
        imgs[i].attribs.loading = 'lazy'
        imgs[i].attribs.style = `aspect-ratio: ${originalWidth} / ${originalHeight};`

        console.log(imgs[i])
        
        console.log('done 2')

      }
    }

    const safeContent2 = $.html()
    console.log('safeContent2: ', safeContent2)

    const textContent = convert(content, {selectors: [ { selector: 'a', options: { ignoreHref: true } }, { selector: 'img', format: 'skip' } ]})
    
    // todo add db constraint that the user must be the author of the post
    const { data, error } = await adminSupabase.from('post_revisions').insert(
      { title, content: safeContent2, text_only_content: textContent, post_id: postId },
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
