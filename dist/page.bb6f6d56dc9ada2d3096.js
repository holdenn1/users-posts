(()=>{"use strict";var t,e={806:()=>{const t=document.querySelector(".peage__header"),e=(document.querySelector("#load-posts"),document.getElementsByClassName("posts__link")),s=document.querySelector(".posts"),r=document.querySelector(".lds-default"),n=document.querySelector(".load-contant"),o=document.querySelector(".error");let a,c;async function i(t){try{const e=4,r=await fetch(`http://localhost:3000/posts?userId=${c}&_start=${t}&_limit=${e}`),n=await r.json();return n.forEach((t=>{const{id:e,photo:r,title:n,body:o}=t;s.insertAdjacentHTML("beforeend",`<a class="posts__link"\n\t\t\t\t\ttarget="_blank"\n\t\t\t\t\thref="./comments.html?postId=${e}">\n\t\t\t\t\t\t<div class="posts__item">\n\t\t\t\t\t\t\t<img id='${e}' class="posts__photo" src="${r}" alt="">\n\t\t\t\t\t\t\t<h3 class="posts__title">${n}</h3>\n\t\t\t\t\t\t\t<p class="posts__description">${o}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>`)})),{hasMore:n.length===e}}catch(t){console.error(t)}}async function l(){try{n.style.height="auto";const{hasMore:t}=await i(e.length);!t&&a&&a.disconnect()}catch(t){console.error(t)}finally{n.style.height="0"}}window.addEventListener("load",(()=>{const e=document.location.search,s=new URLSearchParams(e);c=parseInt(s.get("id")),async function(){try{const e=await fetch(`http://localhost:3000/users/${c}`),s=await e.json(),{id:r,name:n,photo:o,address:{city:a},website:i}=s;t.insertAdjacentHTML("beforeend",`<div id=${r} class="user">\n\t\t\t\t\t\t\t\t<img src="${o}" alt="" class="avatar">\n\t\t\t\t\t\t\t\t<div class="user__description">\n\t\t\t\t\t\t\t\t\t<h4 class="user__name">${n}</h4>\n\t\t\t\t\t\t\t\t\t<p class="user__city">City: ${a}</p>\n\t\t\t\t\t\t\t\t\t<a class="user__website" href="#">${i}</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="pege__main">`)}catch(t){console.error(t),o.style.display="flex",o.insertAdjacentHTML("afterbegin",'<h4 class="error-text">Error: User not found</h4>')}}(),async function(){try{r.style.display="flex";const{hasMore:t}=await i(0);t&&(a=function(){const t=new IntersectionObserver((([{isIntersecting:t}])=>{t&&l()}));return t.observe(n),t}())}catch(t){console.error(t),o.style.display="flex",o.insertAdjacentHTML("afterbegin",'<h4 class="error-text">Error: Posts not found</h4>')}finally{r.style.display="none"}}()}))}},s={};function r(t){var n=s[t];if(void 0!==n)return n.exports;var o=s[t]={exports:{}};return e[t](o,o.exports,r),o.exports}r.m=e,t=[],r.O=(e,s,n,o)=>{if(!s){var a=1/0;for(d=0;d<t.length;d++){for(var[s,n,o]=t[d],c=!0,i=0;i<s.length;i++)(!1&o||a>=o)&&Object.keys(r.O).every((t=>r.O[t](s[i])))?s.splice(i--,1):(c=!1,o<a&&(a=o));if(c){t.splice(d--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[s,n,o]},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={768:0,325:0};r.O.j=e=>0===t[e];var e=(e,s)=>{var n,o,[a,c,i]=s,l=0;if(a.some((e=>0!==t[e]))){for(n in c)r.o(c,n)&&(r.m[n]=c[n]);if(i)var d=i(r)}for(e&&e(s);l<a.length;l++)o=a[l],r.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return r.O(d)},s=self.webpackChunk=self.webpackChunk||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var n=r.O(void 0,[325],(()=>r(806)));n=r.O(n)})();