if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,o)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let t={};const n=e=>r(e,f),c={module:{uri:f},exports:t,require:n};s[f]=Promise.all(i.map((e=>c[e]||n(e)))).then((e=>(o(...e),t)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.css",revision:"57f76d11a613cc72dccc63cb1b1e1abe"},{url:"app.js",revision:"0310fc576106541863e37a1ffd30fa47"},{url:"app.js.LICENSE.txt",revision:"56229fae8d8bb51f2b348f3dd49e6af3"},{url:"popup.css",revision:"05f1e943805d37d32e5f41010faf7609"},{url:"popup.html",revision:"ea4f8ebdb4f3e8725235873524e4424a"},{url:"popup.js",revision:"7dd22e8b862db6a17534dffa9e3b1442"},{url:"popup.js.LICENSE.txt",revision:"60f6bf9e100e456690e9ab6c9a37bfc2"}],{})}));
