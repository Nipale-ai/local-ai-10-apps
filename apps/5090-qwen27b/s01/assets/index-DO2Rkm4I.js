(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={Q3_K_M:3.91,Q4_K_M:4.85,Q5_K_M:5.69,Q6_K:6.56,Q8_0:8.5,FP16:16,NVFP4:4.5},t=[16,32,128],n=1.5,r=[{name:`Llama 3.1 8B`,params_b:8,quant:`Q4_K_M`,context:8192,kv_gb_per_1k:1.25},{name:`Llama 3.1 70B`,params_b:70.6,quant:`Q4_K_M`,context:8192,kv_gb_per_1k:3.13},{name:`Mistral 7B`,params_b:7.2,quant:`Q4_K_M`,context:8192,kv_gb_per_1k:1.25},{name:`Gemma 3 27B`,params_b:27,quant:`Q4_K_M`,context:8192,kv_gb_per_1k:.23},{name:`Qwen2.5 72B`,params_b:72.7,quant:`Q4_K_M`,context:8192,kv_gb_per_1k:3.13},{name:`Phi-4 14B`,params_b:14,quant:`Q4_K_M`,context:8192,kv_gb_per_1k:.2},{name:`Llama 3.2 3B`,params_b:3.2,quant:`Q8_0`,context:8192,kv_gb_per_1k:.16},{name:`DeepSeek-V3`,params_b:671,quant:`NVFP4`,context:32768,kv_gb_per_1k:.07}];function i({params_b:r,quant:i,context:a,kv_gb_per_1k:o}){let s=r*(e[i]??0)/8,c=a/1e3*o,l=n,u=s+c+l,d={};for(let e of t)d[e]=u<=.9*e;return{weights_gb:s,kv_gb:c,overhead_gb:l,total_gb:u,fits:d}}function a(e){let t=parseFloat(e.value);return Number.isFinite(t)?Math.max(0,t):0}function o(e,t){let n=t.fits[e],r=t.total_gb/e,i=Math.round(r*100),a=Math.max(0,t.total_gb-e),o=Math.max(0,e-t.total_gb),s;if(r<=1)s=[[`sw-w`,t.weights_gb/e*100],[`sw-k`,t.kv_gb/e*100],[`sw-o`,t.overhead_gb/e*100],[`sw-f`,o/e*100]];else{let e=100/(r*100);s=[[`sw-w`,t.weights_gb*e],[`sw-k`,t.kv_gb*e],[`sw-o`,t.overhead_gb*e]]}let c=s.map(([e,t])=>`<i class="${e}" style="width:${t.toFixed(2)}%"></i>`).join(``);return`<div class="device ${n?`ok`:`bad`}">
    <div class="d-top">
      <span class="d-name">${e} GB</span>
      <span class="d-state">${n?`✓ Fits`:`✕ Does not fit`}</span>
    </div>
    <div class="bar">
      ${c}
      <i class="budget-line" style="left:90%"></i>
    </div>
    <div class="d-detail">
      ${t.total_gb.toFixed(1)} GB needed · ${i}% of card
      ${n?` · ${o.toFixed(1)} GB free`:` · ${a.toFixed(1)} GB over`}
    </div>
  </div>`}var s=document.getElementById(`app`);s.innerHTML=`
  <main class="wrap">
    <header class="head">
      <div class="head-top">
        <div class="logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="6" y="6" width="12" height="12" rx="2"></rect>
            <rect x="9.5" y="9.5" width="5" height="5" rx="1"></rect>
            <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"></path>
          </svg>
        </div>
        <div>
          <h1>GPU Fit</h1>
          <p class="sub">Will this model run on your machine? Enter the model details and see the answer in seconds.</p>
        </div>
      </div>
    </header>

    <section class="card presets-card">
      <div class="label card-label">Start from a known model</div>
      <div class="presets" id="presets"></div>
    </section>

    <section class="card inputs">
      <div class="label card-label">Model details</div>
      <div class="grid">
        <label class="field">
          <span class="label">Model size (billions of parameters)</span>
          <input id="params_b" type="number" min="0" step="0.1" value="8">
        </label>
        <label class="field">
          <span class="label">Quantization</span>
          <select id="quant">
            <option>Q3_K_M</option>
            <option selected>Q4_K_M</option>
            <option>Q5_K_M</option>
            <option>Q6_K</option>
            <option>Q8_0</option>
            <option>FP16</option>
            <option>NVFP4</option>
          </select>
        </label>
        <label class="field">
          <span class="label">Context length (tokens)</span>
          <input id="context" type="number" min="0" step="256" value="8192">
        </label>
        <label class="field">
          <span class="label">KV cache (GB per 1k tokens)</span>
          <input id="kv_gb_per_1k" type="number" min="0" step="0.05" value="0.5">
          <span class="hint">Typical: 0.1–0.5 for small models, up to ~3 for 70B-class</span>
        </label>
      </div>
    </section>

    <section class="card result">
      <div class="total-row">
        <div>
          <div class="label">Total memory needed</div>
          <div class="total"><span id="total">0.0</span> <span class="unit">GB</span></div>
        </div>
        <div class="verdict" id="verdict" role="status" aria-live="polite"></div>
      </div>
      <div class="share-row">
        <span class="label">Share</span>
        <button id="copyLink" class="btn" type="button">Copy link</button>
        <span id="copyMsg" class="copy-msg"></span>
      </div>
      <div class="explain" id="explain" aria-live="polite"></div>
      <div class="legend">
        <span class="lg"><i class="sw sw-w"></i>Weights</span>
        <span class="lg"><i class="sw sw-k"></i>Context (KV)</span>
        <span class="lg"><i class="sw sw-o"></i>Overhead</span>
        <span class="lg"><i class="sw sw-f"></i>Free</span>
      </div>
      <div class="devices" id="devices"></div>
      <div class="breakdown" id="breakdown"></div>
      <div class="expert" id="expert"></div>
    </section>

    <section class="card how">
      <div class="how-title">How to read this</div>
      <p class="how-text">
        The memory has three parts: the <b class="dot-w">model weights</b> (the model itself — set by its size and quantization),
        the <b class="dot-k">context memory</b> (what the model keeps in mind while working — it grows with the context length),
        and a fixed <b class="dot-o">1.5 GB overhead</b> for the runtime. A model <b>fits</b> when its total stays below 90% of
        the card's memory, because 10% is kept free for the system.
      </p>
    </section>

    <footer class="foot">
      Estimates use typical values; real usage varies slightly with the runtime and your settings.
    </footer>
  </main>
`;var c={params:document.getElementById(`params_b`),quant:document.getElementById(`quant`),context:document.getElementById(`context`),kv:document.getElementById(`kv_gb_per_1k`),total:document.getElementById(`total`),verdict:document.getElementById(`verdict`),explain:document.getElementById(`explain`),devices:document.getElementById(`devices`),breakdown:document.getElementById(`breakdown`),expert:document.getElementById(`expert`),presets:document.getElementById(`presets`),copyLink:document.getElementById(`copyLink`),copyMsg:document.getElementById(`copyMsg`)};c.presets.innerHTML=r.map((e,t)=>`<button class="preset" type="button" data-i="${t}">${e.name}</button>`).join(``),c.presets.addEventListener(`click`,e=>{let t=e.target.closest(`.preset`);if(!t)return;let n=r[+t.dataset.i];l(n)});function l({params_b:e,quant:t,context:n,kv_gb_per_1k:r}){e!==void 0&&(c.params.value=e),t!==void 0&&(c.quant.value=t),n!==void 0&&(c.context.value=n),r!==void 0&&(c.kv.value=r),g()}function u(){return{params_b:a(c.params),quant:c.quant.value,context:a(c.context),kv_gb_per_1k:a(c.kv)}}function d(){let e=u();return r.findIndex(t=>t.params_b===e.params_b&&t.quant===e.quant&&t.context===e.context&&t.kv_gb_per_1k===e.kv_gb_per_1k)}function f(){let e=u();return`${location.origin}${location.pathname}#p=${e.params_b}&q=${encodeURIComponent(e.quant)}&c=${e.context}&kv=${e.kv_gb_per_1k}`}function p(){let t=new URLSearchParams(location.hash.slice(1)),n=parseFloat(t.get(`p`)),r=parseFloat(t.get(`c`)),i=parseFloat(t.get(`kv`)),a=t.get(`q`);Number.isFinite(n)&&(c.params.value=n),a&&e[a]!==void 0&&(c.quant.value=a),Number.isFinite(r)&&(c.context.value=r),Number.isFinite(i)&&(c.kv.value=i)}var m=null;function h(){clearTimeout(m),m=setTimeout(()=>{let e=f();history.replaceState(null,``,e.slice(location.origin.length))},250)}c.copyLink.addEventListener(`click`,async()=>{let e=f();try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement(`textarea`);t.value=e,document.body.appendChild(t),t.select(),document.execCommand(`copy`),t.remove()}c.copyMsg.textContent=`Link copied`,setTimeout(()=>c.copyMsg.textContent=``,1800)});function g(){let n=i(u());c.total.textContent=n.total_gb.toFixed(1);let r=t.filter(e=>n.fits[e]),a;a=r.length===3?`✓ Fits on all three`:r.length===0?`✕ Does not fit anywhere`:`✓ Fits on ${r.join(` and `)} GB`,c.verdict.textContent=a,c.verdict.className=`verdict `+(r.length?`ok`:`bad`);let s=n.total_gb.toFixed(1),l;if(r.length===3)l=`Good news: this fits on every card we compare. Even the 16 GB card would still have about ${(16-n.total_gb).toFixed(1)} GB free.`;else if(r.length===2){let e=r[0];l=`This needs about ${s} GB of memory. A ${e} GB card is a comfortable fit, with roughly ${(.9*e-n.total_gb).toFixed(1)} GB of headroom — a 16 GB card is too small.`}else l=r.length===1?`This is a large model: it needs about ${s} GB, so only the ${r[0]} GB machine can run it. Smaller cards would run out of memory.`:`This needs about ${s} GB of memory — more than any of the three cards. You would need a machine with more than 128 GB, or a smaller model / shorter context.`;c.explain.textContent=l,c.devices.innerHTML=t.map(e=>o(e,n)).join(``),c.breakdown.innerHTML=`
    <span>Weights <b>${n.weights_gb.toFixed(1)} GB</b></span>
    <span>Context memory <b>${n.kv_gb.toFixed(1)} GB</b></span>
    <span>Overhead <b>${n.overhead_gb.toFixed(1)} GB</b></span>`;let f=e[c.quant.value]??0;c.expert.innerHTML=`
    <div class="expert-title">Details</div>
    <div class="expert-grid">
      <span>Bits per weight</span><b>${f.toFixed(2)}</b>
      <span>Weights</span><b>${n.weights_gb.toFixed(2)} GB</b>
      <span>Context memory</span><b>${n.kv_gb.toFixed(2)} GB</b>
      <span>Overhead</span><b>${n.overhead_gb.toFixed(2)} GB</b>
      <span>Total</span><b>${n.total_gb.toFixed(2)} GB</b>
      <span>90% budget (16 / 32 / 128)</span><b>14.4 / 28.8 / 115.2 GB</b>
    </div>`;let p=d();[...c.presets.children].forEach((e,t)=>e.classList.toggle(`active`,t===p)),h()}[c.params,c.context,c.kv].forEach(e=>e.addEventListener(`input`,g)),c.quant.addEventListener(`change`,g),window.APP={calc:i,setInputs:l},p(),g();