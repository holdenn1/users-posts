(()=>{"use strict";var t,e={549:()=>{const t=document.querySelector(".comments-header"),e=document.querySelector(".comments-main"),n=document.getElementsByClassName("comment"),o=(document.querySelector("#load-comments"),document.querySelector(".lds-default")),r=document.querySelector(".load-contant"),s=document.querySelector(".error");let c,a;async function l(t){try{const n=4,o=await fetch(`http://localhost:3000/comments?postId=${c}&_start=${t}&_limit=${n}`),r=await o.json();return r.forEach((t=>{const{email:n,body:o}=t;e.insertAdjacentHTML("beforeend",`<div class="comment">\n\t\t\t\t\t\t<h3 class="user-email">${n}</h3>\n\t\t\t\t\t\t<p class="comment-text">${o}</p>\n\t\t\t\t\t\t\n\t\t\t\t\t</div>`)})),{hasMore:r.length===n}}catch(t){console.error(t)}}async function i(){try{r.style.height="auto";const{hasMore:t}=await l(n.length);!t&&a&&a.disconnect()}catch(t){console.error(t)}finally{r.style.height="0"}}window.addEventListener("load",(()=>{const e=document.location.search,n=new URLSearchParams(e);c=parseInt(n.get("postId")),async function(){try{const e=await fetch(`http://localhost:3000/posts?id=${c}`);(await e.json()).forEach((e=>{const{photo:n,title:o,body:r}=e;t.insertAdjacentHTML("beforeend",`<div class="post">\n\t\t\t\t<div class="post__item">\n\t\t\t\t\t<img\n\t\t\t\t\t\tclass="post__photo"\n\t\t\t\t\t\tsrc="${n}"\n\t\t\t\t\t\talt=""/>\n\t\t\t\t\t<div class="post__text-content">\n\t\t\t\t\t<h3 class="post__title">${o}</h3>\n\t\t\t\t\t<p class="post__description">${r}</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>`)}))}catch(t){console.error(t),s.style.display="flex",s.insertAdjacentHTML("afterbegin",'<h4 class="error-text">Error: User not found</h4>')}}(),async function(){try{o.style.display="flex";const{hasMore:t}=await l(0);t&&(a=function(){const t=new IntersectionObserver((([{isIntersecting:t}])=>{t&&i()}));return t.observe(r),t}())}catch(t){console.error(t),s.style.display="flex",s.insertAdjacentHTML("afterbegin",'<h4 class="error-text">Error: Posts not found</h4>')}finally{o.style.display="none"}}()}))}},n={};function o(t){var r=n[t];if(void 0!==r)return r.exports;var s=n[t]={exports:{}};return e[t](s,s.exports,o),s.exports}o.m=e,t=[],o.O=(e,n,r,s)=>{if(!n){var c=1/0;for(d=0;d<t.length;d++){for(var[n,r,s]=t[d],a=!0,l=0;l<n.length;l++)(!1&s||c>=s)&&Object.keys(o.O).every((t=>o.O[t](n[l])))?n.splice(l--,1):(a=!1,s<c&&(c=s));if(a){t.splice(d--,1);var i=r();void 0!==i&&(e=i)}}return e}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[n,r,s]},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={324:0,325:0};o.O.j=e=>0===t[e];var e=(e,n)=>{var r,s,[c,a,l]=n,i=0;if(c.some((e=>0!==t[e]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(l)var d=l(o)}for(e&&e(n);i<c.length;i++)s=c[i],o.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return o.O(d)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var r=o.O(void 0,[325],(()=>o(549)));r=o.O(r)})();