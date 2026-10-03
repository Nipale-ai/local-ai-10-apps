(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`The`,`cat`,`sat`,`on`,`the`],t=[{caption:`The model has read the sentence so far. For every word it knows, it computes a score — a logit — for how well it would fit next.`,cands:[{t:`mat`,s:3},{t:`floor`,s:2.4},{t:`windowsill`,s:1.6},{t:`keyboard`,s:.9},{t:`moon`,s:-.7}]},{caption:`“Mat” won. Now the model starts over: it reads the longer sentence and scores the next word again. A period is a word too.`,cands:[{t:`.`,s:2.6},{t:`and`,s:2.2},{t:`because`,s:1.1},{t:`while`,s:.8}]},{caption:`The period was picked. A new sentence begins — the model now expects a word that can start one, like “It” or “Then”.`,cands:[{t:`It`,s:2.4},{t:`She`,s:1.9},{t:`Then`,s:1.5},{t:`Suddenly`,s:.6}]},{caption:`“It” is in. The model knows a verb must follow, so verbs like “purred” and “slept” score high, nouns score low.`,cands:[{t:`purred`,s:2.8},{t:`slept`,s:2.1},{t:`jumped`,s:1.4},{t:`sneezed`,s:.5}]},{caption:`“Purred” fit best. Next the model weighs how the action happened — an adverb like “softly” leads the pack.`,cands:[{t:`softly`,s:2.5},{t:`.`,s:2},{t:`again`,s:1.2},{t:`loudly`,s:.7}]},{caption:`“Softly” is chosen. One last score, one last pick — and the sentence is complete. That is the whole trick, repeated billions of times.`,cands:[{t:`.`,s:3.1},{t:`all`,s:1},{t:`tonight`,s:.8},{t:`forever`,s:.4}]}],n=t.length,r=t.map(e=>e.cands.reduce((e,t)=>t.s>e.s?t:e));function i(e,t){let n=Math.max(...e.map(e=>e/t)),r=e.map(e=>Math.exp(e/t-n)),i=r.reduce((e,t)=>e+t,0);return r.map(e=>e/i)}var a=0,o=1;function s(){return[...e,...r.slice(0,a).map(e=>e.t)].join(` `)}function c(){return i(t[a].cands.map(e=>e.s),o)}window.APP={state(){if(a>=n)return{step:a,text:s(),candidates:[],temperature:o};let e=c();return{step:a,text:s(),candidates:t[a].cands.map((t,n)=>({token:t.t,score:t.s,p:e[n]})),temperature:o}},next(){a<n&&(a++,A(!0))},back(){a>0&&(a--,A(!1))},setTemperature(e){let t=Number(e);Number.isFinite(t)&&(o=Math.min(3,Math.max(.05,t)),D(!0),O())}};var l=document.getElementById(`app`);l.innerHTML=`
<main class="wrap">
  <header class="head">
    <p class="kicker">Interactive explainer</p>
    <h1>How a language model writes, <em>one word at a time</em></h1>
    <p class="sub">No magic, just maths: read the text, score every possible next word, turn scores into chances, pick one — repeat.</p>
  </header>

  <section class="card sentence-card" aria-label="The sentence so far">
    <p class="label">The model writes</p>
    <p class="sentence" id="sentence"></p>
  </section>

  <section class="card caption-card" aria-label="What is happening">
    <p class="label">What is happening</p>
    <p class="caption" id="caption" aria-live="polite"></p>
  </section>

  <section class="card bars-card" aria-label="Candidate next words">
    <div class="bars-head">
      <p class="label">Possible next words</p>
      <button id="expertBtn" class="chip" aria-pressed="false" title="Show logits and the softmax formula">Expert view</button>
    </div>
    <div id="bars" class="bars"></div>
    <div id="expertPanel" class="expert" hidden>
      <p>Each bar shows a <strong>softmax</strong> over the raw scores. A candidate&rsquo;s raw score is called a <strong>logit</strong>. The temperature <em>T</em> divides each logit before the softmax:</p>
      <p class="formula">p<sub>i</sub> = e<sup>logit<sub>i</sub> / T</sup> / &Sigma;<sub>j</sub> e<sup>logit<sub>j</sub> / T</sup></p>
      <p>Small <em>T</em>: differences explode, the favourite wins. Large <em>T</em>: differences shrink, everything is nearly equally likely.</p>
      <p>Real models also choose <em>how</em> to pick: <strong>greedy</strong> decoding always takes the top bar; <strong>sampling</strong> rolls a weighted die, so even a 5&nbsp;% word sometimes wins — that is where temperature shapes the personality of the text.</p>
    </div>
  </section>

  <section class="card controls" aria-label="Controls">
    <div class="temp-row">
      <label for="temp">Temperature <span class="tval" id="tval">1.0</span></label>
      <input id="temp" type="range" min="0.2" max="2" step="0.05" value="1" aria-label="Temperature">
      <div class="presets" role="group" aria-label="Temperature presets">
        <button class="chip preset" data-t="0.3">Cold</button>
        <button class="chip preset" data-t="0.7">Focused</button>
        <button class="chip preset" data-t="1">Balanced</button>
        <button class="chip preset" data-t="1.5">Creative</button>
        <button class="chip preset" data-t="2">Hot</button>
      </div>
      <p class="temp-note" id="tempNote"></p>
    </div>
    <div class="btn-row">
      <button id="backBtn" class="btn ghost" title="Go one step back">&larr; Back</button>
      <button id="playBtn" class="btn ghost" aria-label="Autoplay" title="Play the whole sentence automatically">&#9654; Play</button>
      <button id="nextBtn" class="btn primary" title="Pick the next word">Next word &rarr;</button>
    </div>
    <p class="steps" id="stepInfo"></p>
  </section>

  <footer class="foot">
    <p>A hand-made demo: the scores are invented, the maths is real. No language model was harmed — none runs here.</p>
  </footer>
</main>`;var u=e=>document.getElementById(e),d=u(`sentence`),f=u(`caption`),p=u(`bars`),m=u(`expertBtn`),h=u(`expertPanel`),g=u(`temp`),_=u(`tval`),v=u(`tempNote`),y=u(`backBtn`),b=u(`nextBtn`),x=u(`playBtn`),S=u(`stepInfo`),C=null;function w(){return o<.5?`Cold: the model is near-certain, it almost always picks its favourite.`:o<.9?`Focused: strong favourites, rare words stay rare.`:o<1.3?`Balanced: the scores speak, but surprises happen.`:o<1.7?`Creative: chances flatten, odd words get real odds.`:`Hot: nearly a uniform lottery — fluent chaos.`}function T(e){d.textContent=``;let t=s().split(` `);if(t.forEach((n,r)=>{let i=document.createElement(`span`);i.className=`tok`+(r===t.length-1&&e?` pop`:``),i.textContent=n,d.appendChild(i),d.appendChild(document.createTextNode(` `))}),a>=n){let e=document.createElement(`span`);e.className=`cursor`,e.textContent=`■`,d.appendChild(e)}else{let e=document.createElement(`span`);e.className=`cursor blink`,e.textContent=`▍`,d.appendChild(e)}}function E(e){let t=window.APP.state();p.textContent=``,t.candidates.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`row`;let r=document.createElement(`span`);r.className=`tokname`,r.textContent=e.token;let i=document.createElement(`div`);i.className=`track`,i.setAttribute(`data-test`,`bar`);let a=document.createElement(`div`);a.className=`fill`+(t===0?` top`:``),i.appendChild(a);let o=document.createElement(`span`);o.className=`pct`,n.append(r,i,o),p.appendChild(n)}),D(e)}function D(e){let t=window.APP.state(),n=[...p.children];t.candidates.forEach((t,r)=>{let i=n[r];if(!i)return;let a=i.querySelector(`.fill`),o=i.querySelector(`.pct`),s=(t.p*100).toFixed(1)+`%`;e||(a.style.transition=`none`),a.style.width=s,e||(a.offsetWidth,a.style.transition=``),o.textContent=(t.p*100).toFixed(1)+`%`;let c=i.querySelector(`.score`);k&&Number.isFinite(t.score)?(c||(c=document.createElement(`span`),c.className=`score`,i.appendChild(c)),c.textContent=`logit `+t.score.toFixed(1)):c&&c.remove()})}function O(){window.APP.state(),f.textContent=a>=n?`The sentence is complete. Every word was a separate lottery — press Back to replay any pick, or drag the temperature to see how the odds would shift.`:t[a].caption,_.textContent=o.toFixed(2).replace(/0$/,``),g.setAttribute(`aria-valuetext`,`${o.toFixed(1)} — ${w()}`),v.textContent=w(),S.textContent=`Step ${a} of ${n}`,b.disabled=a>=n,y.disabled=a<=0,b.textContent=a>=n?`The end`:`Next word →`,document.title=`Step ${a}/${n} \u00B7 One word at a time`,document.querySelectorAll(`.preset`).forEach(e=>{let t=Math.abs(parseFloat(e.dataset.t)-o)<.026;e.classList.toggle(`on`,t),e.setAttribute(`aria-pressed`,String(t))})}var k=!1;function A(e){T(e),E(!0),O()}var j=!1;function M(e){let t=[...p.children],n=t.findIndex(e=>e.querySelector(`.tokname`).textContent===r[a].t);if(n<0){e();return}j=!0,t[n].classList.add(`win`),setTimeout(()=>{t[n].classList.remove(`win`),j=!1,e()},320)}b.addEventListener(`click`,()=>{N(),!(j||b.disabled)&&M(()=>window.APP.next())}),y.addEventListener(`click`,()=>{N(),window.APP.back()}),g.addEventListener(`input`,()=>window.APP.setTemperature(parseFloat(g.value))),m.addEventListener(`click`,()=>{k=!k,m.setAttribute(`aria-pressed`,String(k)),m.classList.toggle(`on`,k),h.hidden=!k,document.body.classList.toggle(`expert-on`,k),D(!1)});function N(){C&&(clearInterval(C),C=null,x.innerHTML=`&#9654; Play`,x.setAttribute(`aria-label`,`Autoplay`))}x.addEventListener(`click`,()=>{if(C){N();return}a>=n&&(a=0,A(!0)),x.innerHTML=`&#10073;&#10073; Pause`,x.setAttribute(`aria-label`,`Pause autoplay`),C=setInterval(()=>{if(a>=n){N();return}window.APP.next()},1400)}),document.querySelectorAll(`.preset`).forEach(e=>e.addEventListener(`click`,()=>{N();let t=parseFloat(e.dataset.t);g.value=String(t),window.APP.setTemperature(t)})),document.addEventListener(`keydown`,e=>{e.target!==g&&(e.key===`ArrowRight`||e.key===` `?(e.preventDefault(),N(),window.APP.next()):e.key===`ArrowLeft`&&(e.preventDefault(),N(),window.APP.back()))}),A(!1);