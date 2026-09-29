(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`16gb`,`32gb`,`128gb`,`256gb`],t={"16gb":`16 GB`,"32gb":`32 GB`,"128gb":`128 GB`,"256gb":`256 GB`},n={"16gb":`#f5a524`,"32gb":`#4f8cff`,"128gb":`#a78bfa`,"256gb":`#f472b6`},r={filter:`all`,theme:(typeof localStorage<`u`&&localStorage.getItem(`bench-theme`))===`light`?`light`:`dark`,sortKey:`prose_tps`,sortDir:-1},i=[],a=``,o=e=>document.querySelector(e);function s(){return r.filter===`all`?i:i.filter(e=>e.class===r.filter)}function c(){let e=s();return e.length?{runs:e.length,models:new Set(e.map(e=>e.model)).size,best_prose_tps:Math.max(...e.map(e=>e.prose_tps)),best_code_tps:Math.max(...e.map(e=>e.code_tps))}:{runs:0,models:0,best_prose_tps:0,best_code_tps:0}}window.APP={setFilter(t){[`all`,...e].includes(t)&&(r.filter=t,V())},kpis(){return c()}};var l=`http://www.w3.org/2000/svg`;function u(e,t,n){let r=document.createElementNS(l,e);for(let e in t)r.setAttribute(e,t[e]);return n&&n.appendChild(r),r}function d(e,t,n,r,i){let a=u(`text`,Object.assign({x:t,y:n,"font-size":11},i||{}),e);return a.textContent=r,a}function f(){let e=r.theme===`dark`;return{dark:e,text:e?`#e8ebf2`:`#171c26`,muted:e?`#97a1b7`:`#5b6474`,grid:e?`#1c2330`:`#e5e8ee`,prose:e?`#5b9dff`:`#2f6fe4`,code:e?`#34d3a6`:`#0fa87f`,pointStroke:e?`#0a0d13`:`#ffffff`}}function p(e,t=5){if(e<=0)return[0];let n=[];for(let t=10**Math.floor(Math.log10(e));t>=1;t/=10)for(let e of[1,2,2.5,5])n.push(e*t);n.sort((e,t)=>e-t);let r=n[n.length-1];for(let i of n)if(e/i<=t){r=i;break}let i=[];for(let t=0;t<=e+1e-9;t+=r)i.push(Math.round(t*100)/100);return i}var m=e=>e.toFixed(1),h={dark:{"16gb":`#f5a524`,"32gb":`#5b9dff`,"128gb":`#a78bfa`,"256gb":`#f472b6`},light:{"16gb":`#a36a05`,"32gb":`#2559c4`,"128gb":`#6d4fd0`,"256gb":`#c22575`}};function g(e,t,n=0){e.style.transform=t,e.style.transitionDelay=n+`ms`,requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.transform=`none`}))}function _(e,t=0){e.style.opacity=`0`,e.style.transitionDelay=t+`ms`,requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.opacity=`1`}))}function v(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,r=parseInt(e.slice(5,7),16)/255;return .2126*t+.7152*n+.0722*r>.6?`#101418`:`#ffffff`}var y=document.createElement(`div`);y.className=`tooltip`;function b(e,t){y.innerHTML=e,y.style.opacity=`1`;let n=t.clientX+14,r=t.clientY+14,i=y.getBoundingClientRect();n+i.width>innerWidth-8&&(n=t.clientX-i.width-14),r+i.height>innerHeight-8&&(r=t.clientY-i.height-14),y.style.left=Math.min(Math.max(4,n),innerWidth-i.width-4)+`px`,y.style.top=Math.min(Math.max(4,r),innerHeight-i.height-4)+`px`}function x(){y.style.opacity=`0`}function S(e,t){e.addEventListener(`mousemove`,e=>b(t(),e)),e.addEventListener(`mouseleave`,x)}function C(e,n){return`<div class="tip-title">${e.model}</div>
    <div class="tip-sub">${e.machine} · ${t[e.class]}</div>
    <div class="tip-row"><span class="dot" style="background:${n.prose}"></span>prose ${m(e.prose_tps)} tok/s</div>
    <div class="tip-row"><span class="dot" style="background:${n.code}"></span>code ${m(e.code_tps)} tok/s</div>
    <div class="tip-sub">${e.recipe}</div>`}function w(e,t,n,r,i,a,o,s){let c=u(`rect`,Object.assign({x:t,y:n,width:Math.max(0,r),height:i,rx:3,fill:a},s?{class:s}:{}),e);return c.style.cursor=`pointer`,o&&S(c,o),c}function T(){let e=o(`#chart-machines`);e.innerHTML=``;let t=f(),n={};for(let e of s()){let t=n[e.machine]||(n[e.machine]={machine:e.machine,prose:0,code:0,runs:0,models:new Set,cls:e.class});t.prose=Math.max(t.prose,e.prose_tps),t.code=Math.max(t.code,e.code_tps),t.runs++,t.models.add(e.model)}let r=Object.values(n).sort((e,t)=>t.prose-e.prose),i=Math.max(e.clientWidth,320),a=6+Math.max(r.length,1)*40+24,c=Math.max(1,...r.map(e=>Math.max(e.prose,e.code)))*1.15,l=e=>158+(i-158-54)*(e/c),h=u(`svg`,{width:i,height:a,viewBox:`0 0 ${i} ${a}`},e);for(let e of p(c,5)){let n=l(e);u(`line`,{x1:n,y1:6,x2:n,y2:a-24,stroke:t.grid,"stroke-width":1},h),d(h,n,a-8,m(e),{"text-anchor":`middle`,fill:t.muted})}d(h,i-4,a-8,`tok/s`,{"text-anchor":`end`,fill:t.muted,"font-size":10}),r.forEach((e,n)=>{let i=6+n*40,a=n===0&&r.length>1;d(h,148,i+17,e.machine,{"text-anchor":`end`,fill:a?t.prose:t.text,"font-size":12,"font-weight":600});let o=parseInt(e.cls,10),s=(e.code/o).toFixed(1);d(h,148,i+31,`${e.runs} run${e.runs>1?`s`:``} · ${s} tok/s per GB`,{"text-anchor":`end`,fill:t.muted,"font-size":10});let c=w(h,158,i+6,l(e.prose)-158,13,t.prose,()=>E(e,t),`bar-h`),u=w(h,158,i+23,l(e.code)-158,13,t.code,()=>E(e,t),`bar-h`);a&&(c.setAttribute(`stroke`,t.pointStroke),c.setAttribute(`stroke-width`,`1.5`),u.setAttribute(`stroke`,t.pointStroke),u.setAttribute(`stroke-width`,`1.5`)),g(c,`scaleX(0)`,n*25),g(u,`scaleX(0)`,n*25+40),d(h,l(e.prose)+6,i+17,m(e.prose),{fill:t.text,"font-size":11}),d(h,l(e.code)+6,i+37,m(e.code),{fill:t.text,"font-size":11})})}function E(e,t){return`<div class="tip-title">${e.machine}</div>
    <div class="tip-row"><span class="dot" style="background:${t.prose}"></span>best prose ${m(e.prose)} tok/s</div>
    <div class="tip-row"><span class="dot" style="background:${t.code}"></span>best code ${m(e.code)} tok/s</div>
    <div class="tip-sub">${e.runs} run${e.runs>1?`s`:``} · ${[...e.models].join(`, `)}</div>`}function D(){let e=o(`#chart-scatter`);e.innerHTML=``;let t=f(),r=s(),i=Math.max(e.clientWidth,320),a=Math.max(1,...r.map(e=>e.prose_tps))*1.08,c=Math.max(1,...r.map(e=>e.code_tps))*1.08,l=e=>46+(i-46-14)*(e/a),h=e=>16+168*(1-e/c),g=u(`svg`,{width:i,height:220,viewBox:`0 0 ${i} 220`},e);for(let e of p(a,5))u(`line`,{x1:l(e),y1:16,x2:l(e),y2:184,stroke:t.grid},g),d(g,l(e),198,m(e),{"text-anchor":`middle`,fill:t.muted});for(let e of p(c,4))u(`line`,{x1:46,y1:h(e),x2:i-14,y2:h(e),stroke:t.grid},g),d(g,39,h(e)+4,m(e),{"text-anchor":`end`,fill:t.muted});let v=Math.min(a,c);u(`line`,{x1:l(0),y1:h(0),x2:l(v),y2:h(v),stroke:t.muted,"stroke-dasharray":`4 4`,opacity:.55},g),d(g,l(v)-4,h(v)-7,`code = prose`,{"text-anchor":`end`,fill:t.muted,"font-size":10}),d(g,i-14,214,`prose tok/s`,{"text-anchor":`end`,fill:t.muted,"font-size":10.5}),d(g,10,12,`code tok/s`,{fill:t.muted,"font-size":10.5}),r.forEach((e,r)=>{let i=u(`circle`,{cx:l(e.prose_tps),cy:h(e.code_tps),r:7,fill:n[e.class],stroke:t.pointStroke,"stroke-width":1.5,class:`pt`},g);i.style.cursor=`pointer`,S(i,()=>C(e,t)),_(i,r*25)})}function O(){let e=o(`#chart-recipes`);e.innerHTML=``;let t=f(),r=[...s()].sort((e,t)=>t.prose_tps-e.prose_tps),i=r.slice(0,8),a=o(`#desc-recipes`);a&&(a.textContent=r.length>8?`Prose bar, code tick — top 8 of ${r.length} recipes, full list in the table.`:`Prose bar, code tick — all ${r.length} recipe${r.length===1?``:`s`}.`);let c=Math.max(e.clientWidth,320),l=6+Math.max(i.length,1)*24+24,h=Math.max(1,...i.map(e=>e.code_tps))*1.12,_=e=>216+(c-216-66)*(e/h),y=u(`svg`,{width:c,height:l,viewBox:`0 0 ${c} ${l}`},e);for(let e of p(h,5)){let n=_(e);u(`line`,{x1:n,y1:6,x2:n,y2:l-24,stroke:t.grid},y),d(y,n,l-8,m(e),{"text-anchor":`middle`,fill:t.muted})}d(y,c-4,l-8,`tok/s`,{"text-anchor":`end`,fill:t.muted,"font-size":10}),i.forEach((e,r)=>{let i=6+r*24,a=e.recipe,o=d(y,206,i+15,a,{"text-anchor":`end`,fill:t.text,"font-size":11});for(;o.getComputedTextLength()>198&&a.length>8;)a=a.slice(0,-1),o.textContent=a+`…`;let s=_(e.prose_tps)-216;g(w(y,216,i+5,s,13,n[e.class],()=>C(e,t),`bar-h`),`scaleX(0)`,r*25),s>44&&d(y,_(e.prose_tps)-6,i+16,m(e.prose_tps),{"text-anchor":`end`,fill:v(n[e.class]),"font-size":10.5,"font-weight":600});let c=_(e.code_tps);u(`line`,{x1:c,y1:i+2,x2:c,y2:i+22,stroke:t.text,"stroke-width":2,opacity:.85},y),d(y,c+6,i+16,m(e.code_tps),{fill:t.muted,"font-size":10.5})})}function k(){let a=o(`#chart-classes`);a.innerHTML=``;let s=f(),c=Math.max(a.clientWidth,320),l={};for(let t of e)l[t]={prose:0,code:0,runs:0};for(let e of i){let t=l[e.class];t.prose=Math.max(t.prose,e.prose_tps),t.code=Math.max(t.code,e.code_tps),t.runs++}let h=Math.max(1,...e.map(e=>l[e].code))*1.12,_=e=>16+164*(1-e/h),v=(c-46-14)/e.length,y=Math.min(64,v*.5),b=u(`svg`,{width:c,height:220,viewBox:`0 0 ${c} 220`},a);for(let e of p(h,4))u(`line`,{x1:46,y1:_(e),x2:c-14,y2:_(e),stroke:s.grid},b),d(b,39,_(e)+4,m(e),{"text-anchor":`end`,fill:s.muted});d(b,10,10,`tok/s`,{fill:s.muted,"font-size":10.5}),e.forEach((e,i)=>{let a=46+v*i+v/2,o=u(`g`,{opacity:r.filter!==`all`&&r.filter!==e?.28:1},b),c=l[e],f=u(`rect`,{x:a-y/2,y:_(c.prose),width:y,height:Math.max(0,180-_(c.prose)),rx:4,fill:n[e],class:`bar-v`},o);g(f,`scaleY(0)`,i*40),f.style.cursor=`pointer`,S(f,()=>`<div class="tip-title">${t[e]} class</div>
      <div class="tip-row"><span class="dot" style="background:${n[e]}"></span>best prose ${m(c.prose)} tok/s</div>
      <div class="tip-row"><span class="dot" style="background:${s.code}"></span>best code ${m(c.code)} tok/s</div>
      <div class="tip-sub">${c.runs} run${c.runs>1?`s`:``} measured</div>`),u(`line`,{x1:a-y/2-5,y1:_(c.code),x2:a+y/2+5,y2:_(c.code),stroke:s.text,"stroke-width":2.5},o),d(o,a,_(c.code)-6,m(c.code),{"text-anchor":`middle`,fill:s.text,"font-size":10.5,"font-weight":600}),d(o,a,198,t[e],{"text-anchor":`middle`,fill:s.text,"font-size":12,"font-weight":600}),d(o,a,212,`${c.runs} run${c.runs>1?`s`:``}`,{"text-anchor":`middle`,fill:s.muted,"font-size":10})})}var A=[];function j(e){let t=String(e);return/[",\n]/.test(t)?`"`+t.replace(/"/g,`""`)+`"`:t}function M(){let e=A.map(e=>[e.class,e.machine,e.model,e.recipe,e.prose_tps,e.code_tps].map(j).join(`,`)),t=new Blob([`class,machine,model,recipe,prose_tps,code_tps
`+e.join(`
`)+`
`],{type:`text/csv`}),n=URL.createObjectURL(t),i=document.createElement(`a`);i.href=n,i.download=`benchmarks-${r.filter}.csv`,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function N(){let i=o(`#table`),a=[...s()];A=a,o(`#table-title`).textContent=r.filter===`all`?`All runs (${a.length})`:`${t[r.filter]} runs (${a.length})`;let c=r.sortKey,l=r.sortDir;a.sort((t,n)=>{if(c===`class`)return(e.indexOf(t.class)-e.indexOf(n.class))*l;let r=t[c],i=n[c];return typeof r==`string`?r.localeCompare(i)*l:(r-i)*l});let u=[[`class`,`Class`,!1],[`machine`,`Machine`,!1],[`model`,`Model`,!1],[`recipe`,`Recipe`,!1],[`prose_tps`,`Prose tok/s`,!0],[`code_tps`,`Code tok/s`,!0]],d=`<table><thead><tr>`;for(let[e,t,n]of u){let i=r.sortKey===e?l===1?` ↑`:` ↓`:``;d+=`<th class="sortable ${n?`num`:``}" data-k="${e}">${t}${i}</th>`}d+=`</tr></thead><tbody>`;for(let e of a)d+=`<tr>
      <td><span class="badge" style="background:${n[e.class]}26;color:${h[r.theme][e.class]}">${t[e.class]}</span></td>
      <td>${e.machine}</td>
      <td>${e.model}</td>
      <td class="recipe">${e.recipe}</td>
      <td class="num">${m(e.prose_tps)}</td>
      <td class="num">${m(e.code_tps)}</td>
    </tr>`;d+=`</tbody></table>`,i.innerHTML=d,i.querySelectorAll(`th.sortable`).forEach(e=>e.addEventListener(`click`,()=>{let t=e.dataset.k;r.sortKey===t?r.sortDir*=-1:(r.sortKey=t,r.sortDir=t===`prose_tps`||t===`code_tps`?-1:1),N()}))}function P(){let e=c(),t=s(),n=t.length?t.reduce((e,t)=>t.prose_tps>e.prose_tps?t:e):null,r=t.length?t.reduce((e,t)=>t.code_tps>e.code_tps?t:e):null,i=f(),a=new Set(t.map(e=>e.machine)).size;o(`#kpis`).innerHTML=`
    <div class="kpi"><div class="label">Runs</div><div class="value">${e.runs}</div><div class="note">on ${a} machine${a===1?``:`s`}</div></div>
    <div class="kpi"><div class="label">Models</div><div class="value">${e.models}</div><div class="note">distinct models</div></div>
    <div class="kpi"><div class="label"><span class="kdot" style="background:${i.prose}"></span>Best prose</div><div class="value">${e.best_prose_tps?m(e.best_prose_tps):`—`}<span class="unit"> tok/s</span></div><div class="note">${n?n.machine:``}</div></div>
    <div class="kpi"><div class="label"><span class="kdot" style="background:${i.code}"></span>Best code</div><div class="value">${e.best_code_tps?m(e.best_code_tps):`—`}<span class="unit"> tok/s</span></div><div class="note">${r?r.machine:``}</div></div>`}function F(){let e=s();if(!e.length){o(`#summary`).textContent=`No runs in this class.`;return}let n=e.reduce((e,t)=>t.code_tps>e.code_tps?t:e),i=r.filter===`all`?`across all machines`:`on ${t[r.filter]} machines`;o(`#summary`).innerHTML=`Fastest ${i}: <b>${n.machine}</b> — <b>${m(n.code_tps)} tok/s</b> on code with ${n.model} (${n.recipe}).`}function I(){let n=o(`#filter-seg`);n.innerHTML=``;let i=[[`all`,`All`],...e.map(e=>[e,t[e]])];for(let[e,t]of i){let i=document.createElement(`button`);i.type=`button`,i.textContent=t,i.className=`seg-btn`+(r.filter===e?` active`:``),i.addEventListener(`click`,()=>window.APP.setFilter(e)),n.appendChild(i)}}var L=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8"/></svg>`,R=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>`;function z(){let r=f(),i=e.map(e=>`<span class="li"><span class="sw" style="background:${n[e]}"></span>${t[e]}</span>`).join(``);o(`#legend-machines`).innerHTML=`<span class="li"><span class="sw" style="background:${r.prose}"></span>prose</span><span class="li"><span class="sw" style="background:${r.code}"></span>code</span>`,o(`#legend-scatter`).innerHTML=i,o(`#legend-recipes`).innerHTML=i}function B(){o(`#theme-btn`).innerHTML=r.theme===`dark`?L:R,o(`#theme-btn`).title=r.theme===`dark`?`Switch to light mode`:`Switch to dark mode`}function V(){document.documentElement.dataset.theme=r.theme,I(),B(),z(),F(),P(),T(),D(),O(),k(),N()}function H(){o(`#app`).innerHTML=`
  <div class="wrap">
    <header>
      <div class="head-left">
        <h1>Local AI Benchmark</h1>
        <div class="sub" id="source"></div>
      </div>
      <div class="controls">
        <div class="seg" id="filter-seg"></div>
        <button class="icon-btn" id="theme-btn" type="button"></button>
      </div>
    </header>
    <div class="summary" id="summary"></div>
    <div class="kpis" id="kpis"></div>
    <div class="grid">
      <section class="card" data-test="chart">
        <div class="card-head">
          <div>
            <h2>Speed per machine</h2>
            <p class="desc">Best decode speed per machine (tok/s).</p>
          </div>
          <div class="legend" id="legend-machines"></div>
        </div>
        <div class="chart-body" id="chart-machines"></div>
      </section>
      <section class="card" data-test="chart">
        <div class="card-head">
          <div>
            <h2>Prose vs. code</h2>
            <p class="desc">Each run as a point — above the dashed line, code decodes faster.</p>
          </div>
          <div class="legend" id="legend-scatter"></div>
        </div>
        <div class="chart-body" id="chart-scatter"></div>
      </section>
      <section class="card" data-test="chart">
        <div class="card-head">
          <div>
            <h2>Recipe ranking</h2>
            <p class="desc" id="desc-recipes">Prose bar, code tick — top 8 of 12 recipes, full list in the table.</p>
          </div>
          <div class="legend" id="legend-recipes"></div>
        </div>
        <div class="chart-body" id="chart-recipes"></div>
      </section>
      <section class="card" data-test="chart">
        <div class="card-head">
          <div>
            <h2>Best speed per memory class</h2>
            <p class="desc">Fastest run in each class — prose as a bar, code as a tick.</p>
          </div>
        </div>
        <div class="chart-body" id="chart-classes"></div>
      </section>
    </div>
    <section class="card table-card">
      <div class="table-head">
        <div>
          <h2 id="table-title">All runs</h2>
          <p class="desc">Click a column header to sort.</p>
        </div>
        <button class="ghost-btn" id="csv-btn" type="button">Export CSV</button>
      </div>
      <div class="table-wrap" id="table"></div>
    </section>
    <footer id="footer"></footer>
  </div>`,document.body.appendChild(y),o(`#csv-btn`).addEventListener(`click`,M),o(`#theme-btn`).addEventListener(`click`,()=>{r.theme=r.theme===`dark`?`light`:`dark`;try{localStorage.setItem(`bench-theme`,r.theme)}catch{}V()})}var U;window.addEventListener(`resize`,()=>{clearTimeout(U),U=setTimeout(()=>{T(),D(),O(),k()},150)});async function W(){H();let e=await(await fetch(`./data/benchmarks.json`)).json();i=e.runs,a=e.source||``,o(`#source`).textContent=a,o(`#footer`).textContent=`${a} · tok/s = median decode tokens per second`,V()}W();