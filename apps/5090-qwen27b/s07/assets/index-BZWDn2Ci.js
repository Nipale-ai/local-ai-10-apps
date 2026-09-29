(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{word:`The`,caption:`Before the first word, the model scores every word that could start the sentence — the taller the bar, the more likely the word.`,candidates:[{token:`The`,s:3.8},{token:`A`,s:2.9},{token:`One`,s:1.6},{token:`In`,s:1.2},{token:`When`,s:.8}]},{word:`cat`,caption:`“The” is written. Now the model scores the words that usually follow it — and “cat” wins.`,candidates:[{token:`cat`,s:3.4},{token:`dog`,s:2.5},{token:`sun`,s:1.9},{token:`bird`,s:1.3},{token:`robot`,s:.6}]},{word:`sat`,caption:`“The cat” is a strong start. The model scores what the cat might do next.`,candidates:[{token:`sat`,s:3.5},{token:`slept`,s:2.6},{token:`ran`,s:2.1},{token:`purred`,s:1.7},{token:`jumped`,s:1.4}]},{word:`on`,caption:`After “sat”, the model scores the small words that say where the cat is.`,candidates:[{token:`on`,s:3.4},{token:`down`,s:2.8},{token:`quietly`,s:2.2},{token:`still`,s:1.9},{token:`here`,s:1.2}]},{word:`the`,caption:`“sat on” needs a place. The little word “the” is the most likely next step.`,candidates:[{token:`the`,s:3.6},{token:`a`,s:2.9},{token:`my`,s:2},{token:`its`,s:1.3},{token:`your`,s:1.1}]},{word:`mat`,caption:`A place, at last. The model scores the things a cat might sit on.`,candidates:[{token:`mat`,s:3.3},{token:`rug`,s:2.7},{token:`floor`,s:2.3},{token:`table`,s:1.4},{token:`fence`,s:1.2}]},{word:`and`,caption:`The scene is set. The model scores the connectors that promise more is coming.`,candidates:[{token:`and`,s:3.1},{token:`while`,s:2.5},{token:`then`,s:1.8},{token:`as`,s:1.7},{token:`but`,s:1.5}]},{word:`watched`,caption:`“and” promises more. The model scores what the cat does next.`,candidates:[{token:`watched`,s:3.4},{token:`listened`,s:2.6},{token:`waited`,s:2.3},{token:`stared`,s:1.9},{token:`looked`,s:1.7}]},{word:`the`,caption:`Watched what? The model reaches for the word that introduces the object.`,candidates:[{token:`the`,s:3.5},{token:`how`,s:2.4},{token:`as`,s:2},{token:`with`,s:1.6},{token:`at`,s:1.4}]},{word:`rain`,caption:`“watched the” — and now the star of the scene. This time, rain beats the moon.`,candidates:[{token:`rain`,s:3.4},{token:`storm`,s:2.6},{token:`moon`,s:2.2},{token:`sea`,s:1.8},{token:`night`,s:1.5}]},{word:`fall`,caption:`One last word. The model gives the rain its verb — and the sentence is complete.`,candidates:[{token:`fall`,s:3.2},{token:`tap`,s:2.7},{token:`drum`,s:2.1},{token:`pour`,s:1.8},{token:`whisper`,s:1.6}]}],t=`Done! One word at a time, the model wrote the whole sentence — and it could have written a different one. That is the point.`,n=`Eleven picks, one at a time. Score, pick, repeat — that is the whole trick.`,r={step:0,temperature:1,autoplay:!1,expert:!1},i=null,a=[],o=(e,t=document)=>t.querySelector(e);function s(t){return t<e.length?e[t].candidates:[]}function c(t){return e.slice(0,t).map(e=>e.word).join(` `)}function l(){let e=s(r.step);if(!e.length)return[];let t=r.temperature,n=Math.max(...e.map(e=>e.s)),i=e.map(e=>Math.exp((e.s-n)/t)),a=i.reduce((e,t)=>e+t,0);return i.map(e=>e/a)}function u(e){return e<.5?`very focused`:e<.9?`focused`:e<1.3?`balanced`:e<1.7?`loose`:`very creative`}function d(e){let t=e.toFixed(2);return t.endsWith(`0`)?t.slice(0,-1):t}var f=document.getElementById(`app`);f.innerHTML=`
  <div class="wrap">
    <header class="hero">
      <div class="kicker">An interactive explainer</div>
      <h1>How a language model writes, <span class="accent">one word at a time</span></h1>
      <p class="sub">A model never plans the whole sentence. It looks at the words so far, gives every possible next word a chance, picks one — and repeats. Step through a real example below.</p>
      <button class="share" id="shareBtn" type="button">Copy link to share</button>
    </header>

    <section class="card">
      <div class="stage-head">
        <span class="stage-label">The sentence so far</span>
        <span class="progress" id="progress"></span>
      </div>
      <div class="steptrack"><div class="stepfill" id="stepfill"></div></div>
      <div class="sentence" id="sentence" aria-live="polite"></div>
      <p class="caption" id="caption"></p>
    </section>

    <section class="card">
      <div class="stage-head">
        <span class="stage-label" id="nextLabel">What comes next?</span>
        <button class="expert-btn" id="expertBtn" type="button">For experts ▾</button>
      </div>
      <div class="bars" id="bars"></div>
      <div class="done" id="done" hidden>
        <p>${t}</p>
        <button class="btn" id="restartBtn" type="button">Start over</button>
      </div>
      <div class="temp" id="tempSection">
        <div class="temp-head">
          <label for="tempSlider">Temperature</label>
          <span class="temp-value" id="tempValue"></span>
        </div>
        <input type="range" id="tempSlider" min="0.1" max="2" step="0.05" value="1" aria-label="Temperature">
        <div class="temp-scale">
          <span>focused</span>
          <span class="mid" id="tempDesc"></span>
          <span>creative</span>
        </div>
      </div>
      <div class="expert" id="expert" hidden></div>
    </section>

    <div class="controls">
      <button class="btn" id="backBtn" type="button">‹ Back</button>
      <button class="btn" id="playBtn" type="button">Autoplay</button>
      <button class="btn primary" id="nextBtn" type="button">Next ›</button>
    </div>

    <footer>
      <p class="kbd-hint">Tip: the ← and → arrow keys step through the sentence.</p>
      <div class="how">
        <div class="how-step"><b>1</b>Look at the text so far</div>
        <div class="how-step"><b>2</b>Score every next word</div>
        <div class="how-step"><b>3</b>Pick one</div>
        <div class="how-step"><b>4</b>Repeat</div>
      </div>
      <p class="fineprint">Hand-crafted example — no real model runs on this page. The scores are invented, but the math is the real thing.</p>
    </footer>
  </div>
`;var p=o(`#progress`),m=o(`#nextLabel`),h=o(`#stepfill`),g=o(`#tempSection`),_=o(`#sentence`),v=o(`#caption`),y=o(`#bars`),b=o(`#done`),x=o(`#expert`),S=o(`#expertBtn`),C=o(`#tempSlider`),w=o(`#tempValue`),T=o(`#tempDesc`),E=o(`#backBtn`),D=o(`#nextBtn`),O=o(`#playBtn`),k=o(`#restartBtn`);function A(){_.innerHTML=``,e.forEach((t,n)=>{let i=n<r.step,a=document.createElement(`span`);if(a.className=`w`+(i?``:` ghost`)+(n===r.step-1?` new`:``),a.textContent=t.word,_.appendChild(a),n===r.step-1&&r.step<e.length){let e=document.createElement(`span`);e.className=`cursor`,_.appendChild(e)}n<e.length-1&&_.appendChild(document.createTextNode(` `))})}function j(e){let t=s(r.step),n=l();if(y.innerHTML=``,a=[],b.hidden=t.length>0,!t.length){y.style.display=`none`;return}y.style.display=``;let i=Math.max(...n);t.forEach((e,t)=>{let r=document.createElement(`div`);r.className=`bar-row`+(t===0?` top`:``),r.style.animationDelay=t*45+`ms`,r.setAttribute(`role`,`img`),r.setAttribute(`aria-label`,`${e.token}: ${(n[t]*100).toFixed(1)}%`);let i=document.createElement(`span`);i.className=`bar-token`,i.textContent=e.token;let o=document.createElement(`div`);o.className=`bar-track`;let s=document.createElement(`div`);s.className=`bar`,s.setAttribute(`data-test`,`bar`),o.appendChild(s);let c=document.createElement(`span`);c.className=`bar-pct`,r.appendChild(i),r.appendChild(o),r.appendChild(c),y.appendChild(r),a.push({row:r,fill:s,pct:c,token:e.token,p:n[t]})});let o=()=>{a.forEach(e=>{e.fill.style.width=e.p/i*100+`%`,e.pct.textContent=(e.p*100).toFixed(1)+`%`})};e?requestAnimationFrame(()=>requestAnimationFrame(o)):o()}function M(e,t){if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){e.textContent=t.toFixed(1)+`%`;return}e._raf&&cancelAnimationFrame(e._raf);let n=parseFloat(e.textContent)||0,r=performance.now();function i(a){let o=Math.min(1,(a-r)/500),s=1-(1-o)**3;e.textContent=(n+(t-n)*s).toFixed(1)+`%`,e._raf=o<1?requestAnimationFrame(i):null}e._raf=requestAnimationFrame(i)}function N(){let e=l();if(!e.length)return;let t=Math.max(...e);a.forEach((n,r)=>{n.fill.style.width=e[r]/t*100+`%`,M(n.pct,e[r]*100),n.row.setAttribute(`aria-label`,`${n.token}: ${(e[r]*100).toFixed(1)}%`)})}function P(){if(!r.expert){x.hidden=!0,x.innerHTML=``;return}x.hidden=!1;let e=s(r.step),t=l();if(!e.length){x.innerHTML=`<p class="expert-note">No candidates left — the sentence is complete.</p>`;return}x.innerHTML=`
    <div class="formula">p(w) = e^(s(w)/T) / &Sigma; e^(s(w')/T)</div>
    <table>
      <thead><tr><th>token</th><th>score s (logit)</th><th>p at T = ${d(r.temperature)}</th></tr></thead>
      <tbody>${e.map((e,n)=>`<tr class="${n===0?`top-row`:``}"><td>${e.token}</td><td>${e.s.toFixed(1)}</td><td>${(t[n]*100).toFixed(1)}%</td></tr>`).join(``)}</tbody>
    </table>
    <p class="expert-note">Top 3 words cover ${(t.slice(0,3).reduce((e,t)=>e+t,0)*100).toFixed(0)}% of the probability. As T → 0 the model always picks its favorite; as T → ∞ every word becomes equally likely.</p>
  `}function F(){C.value=String(r.temperature),w.textContent=d(r.temperature),T.textContent=u(r.temperature)}function I(t){p.textContent=`Step ${r.step} / ${e.length}`,h.style.width=r.step/e.length*100+`%`,A(),v.textContent=r.step<e.length?e[r.step].caption:n;let i=s(r.step).length>0;m.textContent=i?`What comes next?`:`The sentence is complete`,g.hidden=!i,S.hidden=!i,j(t),i?P():(x.hidden=!0,x.innerHTML=``),E.disabled=r.step===0,D.disabled=r.step>=e.length}function L(e){let t=_.querySelector(`.w.new`);if(!t||!e||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let n=t.getBoundingClientRect();if(n.width===0)return;let r=document.createElement(`div`);r.className=`fly`,r.textContent=t.textContent,r.style.fontSize=`22px`,r.style.left=e.left+`px`,r.style.top=e.top+`px`,document.body.appendChild(r),t.classList.add(`hidden-fly`);let i=n.left-e.left,a=n.top-e.top,o=n.height/27.5,s=r.animate([{transform:`translate(0, 0) scale(1)`,opacity:1},{transform:`translate(${i}px, ${a}px) scale(${o})`,opacity:1}],{duration:520,easing:`cubic-bezier(0.3, 0.7, 0.3, 1)`});s.onfinish=()=>{r.remove(),t.classList.remove(`hidden-fly`)}}function R(){if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let e=document.createElement(`canvas`),t=Math.min(window.devicePixelRatio||1,2);e.width=innerWidth*t,e.height=innerHeight*t,e.style.cssText=`position:fixed;inset:0;z-index:60;pointer-events:none;`,document.body.appendChild(e);let n=e.getContext(`2d`);n.scale(t,t);let r=[`#ffb454`,`#ff8e54`,`#6d8dff`,`#9a6bff`,`#ff7ab8`,`#ffd166`,`#7ce7c4`],i=_.getBoundingClientRect(),a=i.left+i.width/2,o=i.top+i.height/2,s=Array.from({length:110},()=>{let e=Math.random()*Math.PI*2,t=3+Math.random()*7.5;return{x:a,y:o,vx:Math.cos(e)*t,vy:Math.sin(e)*t-4.5,w:4+Math.random()*5,h:2.5+Math.random()*3,rot:Math.random()*Math.PI,vr:(Math.random()-.5)*.3,c:r[Math.random()*r.length|0],life:1}}),c=performance.now();function l(t){let r=(t-c)/1e3;n.clearRect(0,0,innerWidth,innerHeight);let i=!1;for(let e of s)e.vy+=.22,e.x+=e.vx,e.y+=e.vy,e.rot+=e.vr,e.life-=.011,e.life>0&&e.y<innerHeight+30&&(i=!0,n.save(),n.globalAlpha=Math.max(0,Math.min(1,e.life*1.4)),n.translate(e.x,e.y),n.rotate(e.rot),n.fillStyle=e.c,n.fillRect(-e.w/2,-e.h/2,e.w,e.h),n.restore());i&&r<3.2?requestAnimationFrame(l):e.remove()}requestAnimationFrame(l)}function z(){if(r.step>=e.length)return;let t=y.querySelector(`.bar-row.top`),n=t?t.getBoundingClientRect():null;r.step+=1,I(!0),L(n),r.step===e.length&&R()}function B(){r.step<=0||(--r.step,I(!0))}function V(t){r.autoplay=t,i&&=(clearInterval(i),null),t&&(r.step>=e.length&&(r.step=0,I(!0)),i=setInterval(()=>{if(r.step>=e.length){V(!1);return}z()},1900)),O.textContent=t?`Pause`:`Autoplay`,O.classList.toggle(`playing`,t)}function H(e){r.temperature=Math.min(2,Math.max(.1,Number(e)||.1)),F(),N(),P()}D.addEventListener(`click`,()=>{V(!1),z()}),E.addEventListener(`click`,()=>{V(!1),B()}),O.addEventListener(`click`,()=>V(!r.autoplay)),k.addEventListener(`click`,()=>{V(!1),r.step=0,I(!0)}),C.addEventListener(`input`,()=>H(parseFloat(C.value)));var U=o(`#shareBtn`);U.addEventListener(`click`,async()=>{let e=U.dataset.done===`1`;try{await navigator.clipboard.writeText(location.href),U.textContent=`Link copied — share it!`,U.dataset.done=`1`}catch{U.textContent=`Copy this page address to share it`}e||setTimeout(()=>{U.textContent=`Copy link to share`,delete U.dataset.done},2200)}),S.addEventListener(`click`,()=>{r.expert=!r.expert,S.classList.toggle(`open`,r.expert),S.textContent=r.expert?`For experts ▴`:`For experts ▾`,P()}),window.addEventListener(`keydown`,e=>{e.target!==C&&(e.key===`ArrowRight`?z():e.key===`ArrowLeft`&&B())}),window.APP={state(){let e=l();return{step:r.step,text:c(r.step),candidates:s(r.step).map((t,n)=>({token:t.token,p:e[n]})),temperature:r.temperature}},next(){z()},back(){B()},setTemperature(e){H(e)}},F(),I(!0);