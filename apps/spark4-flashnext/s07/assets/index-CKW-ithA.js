(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{caption:`The model has written "The". Now it asks: what word comes next?`,chosen:`cat`,candidates:[{token:`cat`,score:2.4},{token:`dog`,score:1.1},{token:`bird`,score:.2},{token:`window`,score:-.6},{token:`cloud`,score:-1.4}]},{caption:`It chose "cat". Given "The cat", what is the most likely next word?`,chosen:`sat`,candidates:[{token:`sat`,score:2.1},{token:`slept`,score:1.3},{token:`chased`,score:.5},{token:`meowed`,score:-.2},{token:`flew`,score:-1.2}]},{caption:`Now "The cat sat" — where did the cat sit?`,chosen:`on`,candidates:[{token:`on`,score:2},{token:`by`,score:.9},{token:`near`,score:.3},{token:`under`,score:-.5},{token:`behind`,score:-1.3}]},{caption:`"The cat sat on" — a small word, but many could fit here.`,chosen:`the`,candidates:[{token:`the`,score:2.3},{token:`a`,score:1.4},{token:`his`,score:.1},{token:`one`,score:-.7},{token:`two`,score:-1.5}]},{caption:`"The cat sat on the" — now it needs a thing to sit on.`,chosen:`mat`,candidates:[{token:`mat`,score:1.8},{token:`couch`,score:1.2},{token:`windowsill`,score:.6},{token:`table`,score:-.1},{token:`moon`,score:-1.6}]},{caption:`"The cat sat on the mat" — the sentence feels finished, so a full stop is likely.`,chosen:`.`,candidates:[{token:`.`,score:2.6},{token:`,`,score:.7},{token:`and`,score:.2},{token:`purring`,score:-.4},{token:`outside`,score:-1.1}]}];function t(e,t){let n=Math.max(.05,Number(t)||1),r=Math.max(...e),i=e.map(e=>Math.exp((e-r)/n)),a=i.reduce((e,t)=>e+t,0)||1;return i.map(e=>e/a)}var n=document.getElementById(`app`),r={step:0,temperature:1,autoplay:!1,expert:!1},i=e.length-1;function a(t){let n=[];for(let r=0;r<t;r++)n.push(e[r].chosen);return n.join(` `)}function o(n,r){let i=e[n].candidates;return t(i.map(e=>e.score),r)}n.innerHTML=`
<div class="wrap">
  <header class="head">
    <div class="eyebrow">Interactive explainer</div>
    <h1>How a language model writes, <span class="grad">one word at a time</span></h1>
    <p class="sub">A model never writes a whole sentence at once. It looks at the text so far, gives <em>every</em> possible next word a probability, picks one, and repeats. Step through a real example below.</p>
    <div class="loop">
      <div class="loop-step"><span class="loop-n">1</span><span class="loop-t">Read the text so far</span></div>
      <span class="loop-arrow">→</span>
      <div class="loop-step"><span class="loop-n">2</span><span class="loop-t">Score every possible next word</span></div>
      <span class="loop-arrow">→</span>
      <div class="loop-step"><span class="loop-n">3</span><span class="loop-t">Turn scores into probabilities</span></div>
      <span class="loop-arrow">→</span>
      <div class="loop-step"><span class="loop-n">4</span><span class="loop-t">Pick one &amp; repeat</span></div>
    </div>
  </header>

  <section class="card">
    <div class="stepbar">
      <span class="stepchip" id="stepChip">Step 1 / 6</span>
      <span class="steplabel">Candidate next words · probabilities add up to 100%</span>
    </div>
    <div class="sentence" id="sentence"></div>
    <div class="caption" id="caption"></div>

    <div class="bars" id="bars"></div>

    <div class="expert" id="expert"></div>

    <div class="controls">
      <button class="btn ghost" id="back">← Back</button>
      <button class="btn primary" id="next">Next word →</button>
      <button class="btn ghost" id="play">▶ Autoplay</button>
    </div>

    <div class="temp">
      <div class="temp-top">
        <span class="temp-label">Temperature</span>
        <span class="temp-val" id="tempVal">1.00</span>
      </div>
      <input type="range" id="temp" min="0.1" max="2" step="0.05" value="1">
      <div class="temp-scale"><span>focused</span><span>balanced</span><span>creative</span></div>
      <p class="temp-hint" id="tempHint"></p>
    </div>

    <div class="foot">
      <div class="dots" id="dots"></div>
      <button class="linkbtn" id="expertToggle">For experts ▾</button>
    </div>
  </section>

  <footer class="credit">No real model runs in this page — the example is hand-made to teach the idea.</footer>
</div>
`;var s=e=>document.getElementById(e),c=s(`sentence`),l=s(`caption`),u=s(`bars`),d=s(`expert`),f=s(`dots`),p=s(`temp`),m=s(`tempVal`),h=s(`tempHint`);for(let e=0;e<=i;e++){let e=document.createElement(`span`);e.className=`dot`,f.appendChild(e)}var g=-1;function _(t,n){c.innerHTML=``;let r=document.createElement(`span`);r.className=`prompt`,r.textContent=`The`,c.appendChild(r);let i=[];for(let n=0;n<t;n++)i.push(e[n].chosen);i.forEach((e,t)=>{let r=document.createElement(`span`);r.className=`gen`+(n&&t===i.length-1?` fly`:``),r.textContent=` `+e,c.appendChild(r)});let a=document.createElement(`span`);a.className=`caret`,a.textContent=`▍`,c.appendChild(a)}function v(t){u.innerHTML=``,e[t].candidates.forEach(()=>{let e=document.createElement(`div`);e.className=`bar-row`,e.innerHTML=`
      <div class="tok"><span class="tok-name"></span><span class="pick">picked</span></div>
      <div class="track"><div class="fill" data-test="bar" style="width:0%"></div></div>
      <div class="pct">0.0%</div>
    `,u.appendChild(e)}),[...u.children].forEach((n,r)=>{n.querySelector(`.tok-name`).textContent=e[t].candidates[r].token})}function y(t,n,i){let a=e[r.step].candidates;[...u.children].forEach((e,r)=>{let o=t[r]*100,s=e.querySelector(`.fill`),c=a[r].token===n;e.classList.toggle(`chosen`,c),e.querySelector(`.pct`).textContent=o.toFixed(1)+`%`,i?(s.style.width=`0%`,setTimeout(()=>{s.style.width=Math.max(1.5,o)+`%`},40+r*55)):s.style.width=Math.max(1.5,o)+`%`})}function b(t=!1){let n=r.step,a=o(n,r.temperature),c=e[n].chosen,u=n!==g;if(u&&(_(n,t),v(n),g=n),l.textContent=e[n].caption,y(a,c,u),r.expert){let t=[...e[n].candidates].map((e,t)=>({...e,p:a[t]})).sort((e,t)=>t.score-e.score).slice(0,3).map(e=>e.token).join(`, `),i=e[n].candidates.map((e,t)=>`<tr><td>${e.token}</td><td>${e.score.toFixed(2)}</td><td>${(a[t]*100).toFixed(1)}%</td></tr>`).join(``);d.innerHTML=`
      <div class="expert-inner">
        <div class="formula">p(word) = softmax(score ÷ temperature) &nbsp;=&nbsp; e<sup>score÷T</sup> ÷ Σ e<sup>scoreᵢ÷T</sup></div>
        <table class="logit-table"><thead><tr><th>token</th><th>logit</th><th>p @ T=${r.temperature.toFixed(2)}</th></tr></thead><tbody>${i}</tbody></table>
        <div class="topk">top-k (k=3) keeps only the most likely: <b>${t}</b>. Sampling then picks among these.</div>
      </div>`}else d.innerHTML=``;[...f.children].forEach((e,t)=>{e.classList.toggle(`on`,t<=n),e.classList.toggle(`cur`,t===n)}),s(`stepChip`).textContent=`Step ${n+1} / ${i+1}`,m.textContent=r.temperature.toFixed(2);let p=r.temperature;h.textContent=p<.5?`Low temperature: the model almost always picks the single most likely word. Predictable, safe.`:p>1.4?`High temperature: the bars flatten, so unlikely words get a real chance. Surprising, sometimes silly.`:`Balanced temperature: the most likely word usually wins, but alternatives stay possible.`,s(`back`).disabled=n===0,s(`next`).disabled=n===i,s(`next`).textContent=n===i?`Done ✓`:`Next word →`}function x(){r.step<i&&(r.step++,b(!0))}function S(){r.step>0&&(r.step--,b(!1))}function C(e){r.temperature=Math.max(.05,Math.min(2,Number(e)||1)),p.value=r.temperature,b(!1)}s(`next`).addEventListener(`click`,x),s(`back`).addEventListener(`click`,S),p.addEventListener(`input`,e=>C(e.target.value)),s(`expertToggle`).addEventListener(`click`,()=>{r.expert=!r.expert,s(`expertToggle`).textContent=r.expert?`For experts ▴`:`For experts ▾`,b(!1)});var w=null;function T(){w&&=(clearInterval(w),null),r.autoplay=!1,s(`play`).textContent=`▶ Autoplay`,s(`play`).classList.remove(`active`)}s(`play`).addEventListener(`click`,()=>{if(w){T();return}r.autoplay=!0,s(`play`).textContent=`⏸ Pause`,s(`play`).classList.add(`active`),r.step===i&&(r.step=0,b(!1)),w=setInterval(()=>{if(r.step>=i){T();return}x()},1600)}),document.addEventListener(`keydown`,e=>{e.key===`ArrowRight`?x():e.key===`ArrowLeft`&&S()}),window.APP={state(){let t=o(r.step,r.temperature);return{step:r.step,text:a(r.step),candidates:e[r.step].candidates.map((e,n)=>({token:e.token,p:t[n]})),temperature:r.temperature}},next(){x()},back(){S()},setTemperature(e){C(e)}},b(!1);