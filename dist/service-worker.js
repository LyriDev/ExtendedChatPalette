if(!self.define){let e,s={};const o=(o,r)=>(o=new URL(o+".js",r).href,s[o]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=s,document.head.appendChild(e)}else e=o,importScripts(o),s()})).then((()=>{let e=s[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(r,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let t={};const n=e=>o(e,d),c={module:{uri:d},exports:t,require:n};s[d]=Promise.all(r.map((e=>c[e]||n(e)))).then((e=>(i(...e),t)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.css",revision:"68b329da9893e34099c7d8ad5cb9c940"},{url:"app.js",revision:"13cedd5d96bd570bc6663cf820b7817d"},{url:"popup.css",revision:"72aa90da153c7e5931138d9e6b6bb9bf"},{url:"popup.html",revision:"ea4f8ebdb4f3e8725235873524e4424a"},{url:"popup.js",revision:"7da699a357dd5198e75ad9ae6d7d1b64"},{url:"popup.js.LICENSE.txt",revision:"60f6bf9e100e456690e9ab6c9a37bfc2"}],{})}));
