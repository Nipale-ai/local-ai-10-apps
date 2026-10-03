(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{text:``,word:`The`,caption:`The model starts with a blank page. It looks at the empty text and guesses what the very first word could be.`,candidates:[{token:`The`,score:3},{token:`A`,score:2.4},{token:`It`,score:2},{token:`We`,score:1.4},{token:`One`,score:.8}]},{text:`The`,word:`cat`,caption:`Now it has written "The". It reads that word and guesses what should come next.`,candidates:[{token:`cat`,score:2.8},{token:`dog`,score:2.5},{token:`rain`,score:2.1},{token:`sun`,score:1.9},{token:`wind`,score:1.2}]},{text:`The cat`,word:`sat`,caption:`With "The cat" written, the choices narrow. The model now picks a verb that fits the scene.`,candidates:[{token:`sat`,score:2.9},{token:`looked`,score:2.4},{token:`walked`,score:2},{token:`jumped`,score:1.7},{token:`slept`,score:1.3}]},{text:`The cat sat`,word:`on`,caption:`After "sat", the model expects a place. It picks a small word that tells where.`,candidates:[{token:`on`,score:3},{token:`by`,score:2.2},{token:`near`,score:1.9},{token:`in`,score:1.5},{token:`under`,score:1.1}]},{text:`The cat sat on`,word:`the`,caption:`The model now expects a thing. It picks the little word "the" to introduce it.`,candidates:[{token:`the`,score:3.1},{token:`a`,score:2.3},{token:`my`,score:1.8},{token:`your`,score:1.4},{token:`its`,score:1}]},{text:`The cat sat on the`,word:`mat`,caption:`It picks a noun that fits the scene. "Mat" is a good choice.`,candidates:[{token:`mat`,score:2.9},{token:`sofa`,score:2.4},{token:`floor`,score:2.1},{token:`bench`,score:1.7},{token:`rug`,score:1.3}]},{text:`The cat sat on the mat`,word:`.`,caption:`The sentence is complete. The model adds a period to finish.`,candidates:[{token:`.`,score:3.2},{token:`today`,score:1.8},{token:`again`,score:1.5},{token:`quietly`,score:1.2},{token:`softly`,score:.9}]}],t=0,n=1;function r(t,n){let r=e[t].candidates,i=r.map(e=>e.score),a=Math.max(...i.map(e=>e/n)),o=i.map(e=>Math.exp(e/n-a)),s=o.reduce((e,t)=>e+t,0);return r.map((e,t)=>({token:e.token,score:e.score,p:o[t]/s}))}var i=document.getElementById(`app`);i.innerHTML=`
  <header>
    <h1>How a language model writes, one word at a time</h1>
    <p class="subtitle">Step through a sentence and see how the model picks each word.</p>
  </header>
  <main>
    <div class="progress">
      <span class="progress-label" id="progress-label">Step 1 of 7</span>
      <div class="progress-dots" id="progress-dots"></div>
    </div>
    <section class="card sentence">
      <div class="sentence-label">The sentence so far</div>
      <div class="sentence-text" id="sentence"></div>
    </section>
    <section class="card candidates">
      <h2>Next word candidates</h2>
      <div id="bars"></div>
    </section>
    <section class="card temperature">
      <label for="temp">Temperature: <span id="temp-value">1.0</span></label>
      <input type="range" id="temp" min="0.1" max="2" step="0.1" value="1">
      <div class="temp-desc" id="temp-desc"></div>
    </section>
    <section class="card controls">
      <button id="back">Back</button>
      <button id="next">Next</button>
      <button id="autoplay">&#9654; Autoplay</button>
    </section>
    <section class="card caption">
      <p id="caption"></p>
    </section>
    <section class="expert">
      <button id="expert-toggle">For experts</button>
      <div id="expert" class="hidden">
        <p><strong>Logits:</strong> raw scores before softmax. The model gives each candidate a score.</p>
        <p><strong>Softmax:</strong> turns scores into probabilities: <span class="formula">p = exp(s / T) &divide; &sum; exp(s / T)</span>. Temperature T controls how spread out the probabilities are.</p>
      </div>
    </section>
  </main>
`;var a=[],o=-1;function s(){let n=document.getElementById(`bars`);n.innerHTML=``,a=[],e[t].candidates.forEach(e=>{let t=document.createElement(`div`);t.className=`bar-row`,t.innerHTML=`
      <span class="bar-token">${e.token}</span>
      <div class="bar-track">
        <div class="bar" data-test="bar" style="width: 0%"></div>
      </div>
      <span class="bar-pct"></span>
    `,n.appendChild(t),a.push({bar:t.querySelector(`.bar`),pct:t.querySelector(`.bar-pct`)})}),requestAnimationFrame(()=>c())}function c(){let e=r(t,n),i=0;e.forEach((t,n)=>{t.p>e[i].p&&(i=n)}),e.forEach((e,t)=>{a[t].bar.style.width=e.p*100+`%`,a[t].pct.textContent=(e.p*100).toFixed(1)+`%`,a[t].bar.classList.toggle(`top`,t===i)})}function l(){let n=document.getElementById(`progress-dots`);n.innerHTML=``;for(let r=0;r<e.length;r++){let e=document.createElement(`span`);e.className=`progress-dot`+(r<t?` done`:r===t?` current`:``),n.appendChild(e)}document.getElementById(`progress-label`).textContent=`Step `+(t+1)+` of `+e.length}function u(){l();let r=document.getElementById(`sentence`),i=e[t].text,a=i?i.split(` `):[];r.innerHTML=a.map((e,t)=>`<span class="${t===a.length-1?`word chosen`:`word`}">${e}</span>`).join(` `),i||(r.innerHTML=`<span class="word empty">&hellip;</span>`),document.getElementById(`caption`).textContent=e[t].caption,document.getElementById(`temp-value`).textContent=n.toFixed(1),document.getElementById(`temp`).value=n,document.getElementById(`temp-desc`).textContent=d(n),document.getElementById(`back`).disabled=t===0,document.getElementById(`next`).disabled=t===e.length-1,t===o?c():(s(),o=t)}function d(e){return e<.5?`Very focused. The model almost always picks the top choice.`:e<1?`Focused. The top choice is likely, but others can win.`:e<1.5?`Balanced. All choices have a fair chance.`:`Creative. Less likely words have a real chance.`}document.getElementById(`back`).addEventListener(`click`,()=>window.APP.back()),document.getElementById(`next`).addEventListener(`click`,()=>window.APP.next()),document.getElementById(`temp`).addEventListener(`input`,e=>window.APP.setTemperature(parseFloat(e.target.value)));var f=null;document.getElementById(`autoplay`).addEventListener(`click`,()=>{f?(clearInterval(f),f=null,document.getElementById(`autoplay`).innerHTML=`&#9654; Autoplay`):(document.getElementById(`autoplay`).innerHTML=`&#9632; Stop`,f=setInterval(()=>{t<e.length-1?window.APP.next():(clearInterval(f),f=null,document.getElementById(`autoplay`).innerHTML=`&#9654; Autoplay`)},1500))}),document.getElementById(`expert-toggle`).addEventListener(`click`,()=>{document.getElementById(`expert`).classList.toggle(`hidden`)}),window.APP={state(){return{step:t,text:e[t].text,candidates:r(t,n),temperature:n}},next(){t<e.length-1&&t++,u()},back(){t>0&&t--,u()},setTemperature(e){n=e,u()}},u();