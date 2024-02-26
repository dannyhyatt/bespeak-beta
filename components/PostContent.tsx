'use client'

import { useEffect, useRef } from "react"
import { PostContentCSS } from "./CSSConsts"
import { rgbaToDataURL, thumbHashToApproximateAspectRatio, thumbHashToDataURL, thumbHashToRGBA } from "thumbhash"

export default function PostContent({ innerHTML }: { innerHTML: string }) {

  console.log('thumbHashToDataURL', thumbHashToDataURL.toString())

  const script = `
  <script>
  ${thumbHashToDataURL.toString()}
  ${thumbHashToRGBA.toString()}
  ${rgbaToDataURL.toString()}
  ${thumbHashToApproximateAspectRatio.toString()}
  const imgs = document.getElementById('post-content').getElementsByTagName('img')
  console.log('imgs', imgs)
  for(let i = 0; i < imgs.length; i++) {
    addThumbhashToImg(imgs[i]);
  }

  function addThumbhashToImg(img) {
    const originalWidth = img.getAttribute("data-original-width");
    const originalHeight = img.getAttribute("data-original-height");
    const b64 = img.getAttribute("data-thumbhash");
    if (originalWidth && originalHeight && b64) {
      console.log('all there');
      const hash = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const dataUrl = thumbHashToDataURL(hash);

      // resize the image

      var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

      // set its dimension to target size
      canvas.width = parseInt(originalWidth);
      canvas.height = parseInt(originalHeight);

      var dataUrlImg = new Image;

      dataUrlImg.onload = function() {
        ctx.drawImage(dataUrlImg, 0, 0, parseInt(originalWidth), parseInt(originalHeight));
        img.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
      };

      dataUrlImg.src = dataUrl;

    } else {
      console.log('not all there');
    }
  }
  </script>
  `

  console.log('wtf')

  const divRef = useRef<HTMLDivElement>(null)

  const handleLoad = () => {
    if(divRef.current === null) return
  }

  useEffect(() => {
    (window as any).thumbHashToDataURL = thumbHashToDataURL
    handleLoad()
  }, [])

  return (
    <div 
      className={`${PostContentCSS}`}
      id="post-content"
      dangerouslySetInnerHTML={{ __html: innerHTML + script }}
      ref={divRef}
    />
  )
}