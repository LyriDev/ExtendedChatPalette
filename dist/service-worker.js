if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,o)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let t={};const n=e=>r(e,f),d={module:{uri:f},exports:t,require:n};s[f]=Promise.all(i.map((e=>d[e]||n(e)))).then((e=>(o(...e),t)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.css",revision:"7814df9def3034325fd1c825da59d27e"},{url:"app.js",revision:"025ae40ed1b48f07a2f5f383a97de3a5"},{url:"app.js.LICENSE.txt",revision:"56229fae8d8bb51f2b348f3dd49e6af3"},{url:"popup.css",revision:"c376e1b8b655eae174771fc06568eb7d"},{url:"popup.html",revision:"ea4f8ebdb4f3e8725235873524e4424a"},{url:"popup.js",revision:"ccd7195c51dc7f79ea45bf7bd766af67"},{url:"popup.js.LICENSE.txt",revision:"60f6bf9e100e456690e9ab6c9a37bfc2"}],{})}));
