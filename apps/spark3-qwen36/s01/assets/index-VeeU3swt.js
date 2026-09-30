(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{label:`Q3_K_M`,bpw:3.91},{label:`Q4_K_M`,bpw:4.85},{label:`Q5_K_M`,bpw:5.69},{label:`Q6_K`,bpw:6.56},{label:`Q8_0`,bpw:8.5},{label:`FP16`,bpw:16},{label:`NVFP4`,bpw:4.5}],t=[{name:`16 GB`,gb:16},{name:`32 GB`,gb:32},{name:`128 GB`,gb:128}],n=[{name:`Llama 3.1 8B`,params_b:8,quant:`Q4_K_M`,context:128e3,kv_gb_per_1k:.06},{name:`Llama 3.1 70B`,params_b:70,quant:`Q4_K_M`,context:128e3,kv_gb_per_1k:.06},{name:`Llama 3.1 405B`,params_b:405,quant:`Q4_K_M`,context:128e3,kv_gb_per_1k:.06},{name:`Mistral Large`,params_b:123,quant:`Q4_K_M`,context:32e3,kv_gb_per_1k:.06},{name:`Mixtral 8x7B`,params_b:47,quant:`Q4_K_M`,context:32e3,kv_gb_per_1k:.06},{name:`Gemma 2 27B`,params_b:27,quant:`Q4_K_M`,context:8e3,kv_gb_per_1k:.06},{name:`Phi-3 Mini`,params_b:14,quant:`Q4_K_M`,context:4e3,kv_gb_per_1k:.06},{name:`Command R+`,params_b:104,quant:`Q4_K_M`,context:128e3,kv_gb_per_1k:.06}],r=1.5;function i({params_b:n,quant:i,context:a,kv_gb_per_1k:o}){let s=e.find(e=>e.label===i);if(!s)throw Error(`Unknown quant: `+i);let c=n*s.bpw/8,l=a/1e3*o,u=r,d=c+l+u,f={};for(let e of t)f[e.gb]=d<=.9*e.gb;return{weights_gb:c,kv_gb:l,overhead_gb:u,total_gb:d,fits:f}}function a(e){return`#`+[e.params_b,e.quant,e.context,e.kv_gb_per_1k].join(`,`)}function o(e){if(!e||e.length<2)return null;let t=e.slice(1).split(`,`).map(Number);return t.length!==4||t.some(isNaN)?null:{params_b:t[0],quant:t[1],context:t[2],kv_gb_per_1k:t[3]}}var s={params_b:8,quant:`Q4_K_M`,context:128e3,kv_gb_per_1k:.06};function c(){let e=o(location.hash);e&&Object.assign(s,e)}function l(){location.hash=a(s)}function u({params_b:e,quant:t,context:n,kv_gb_per_1k:r}){s.params_b=e,s.quant=t,s.context=n,s.kv_gb_per_1k=r,l(),h(),v()}function d(e){return e.toFixed(1)}function f(e){return e>=1e3?(e/1e3).toFixed(0)+`K`:String(Math.round(e))}function p(){let t=document.getElementById(`app`),n=document.createElement(`style`);n.textContent=`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0e14;
      --surface: #131920;
      --surface2: #1a2230;
      --border: #253040;
      --border-light: #334055;
      --text: #e8edf4;
      --text2: #7a8a9e;
      --text3: #4a5568;
      --accent: #3b82f6;
      --accent-glow: rgba(59, 130, 246, 0.15);
      --green: #22c55e;
      --green-bg: rgba(34, 197, 94, 0.1);
      --green-border: rgba(34, 197, 94, 0.25);
      --red: #ef4444;
      --red-bg: rgba(239, 68, 68, 0.1);
      --red-border: rgba(239, 68, 68, 0.25);
      --orange: #f59e0b;
      --orange-bg: rgba(245, 158, 11, 0.1);
      --orange-border: rgba(245, 158, 11, 0.25);
      --weights: #3b82f6;
      --kv: #22c55e;
      --overhead: #f59e0b;
      --free: #1e293b;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
      background-size: 24px 24px;
      background-position: center top;
    }

    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 0 16px 48px;
    }

    header {
      text-align: center;
      padding: 36px 0 28px;
      position: relative;
    }

    header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
    }

    header h1 {
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 6px;
      background: linear-gradient(135deg, #e8edf4, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    header p {
      color: var(--text2);
      font-size: 0.92rem;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 14px;
      transition: border-color 0.2s;
    }

    .card:hover {
      border-color: var(--border-light);
    }

    .card-title {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text3);
      margin-bottom: 12px;
    }

    .input-group {
      margin-bottom: 14px;
    }

    .input-group:last-child {
      margin-bottom: 0;
    }

    .input-group label {
      display: block;
      font-size: 0.82rem;
      font-weight: 500;
      margin-bottom: 5px;
      color: var(--text2);
    }

    .input-group input,
    .input-group select {
      width: 100%;
      padding: 10px 14px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text);
      font-size: 0.95rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .input-group input:focus,
    .input-group select:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .input-group select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237a8a9e' d='M6 8.5L1.5 4l.7-.7L6 7.1l3.8-3.8.7.7z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 32px;
      cursor: pointer;
    }

    .presets {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .preset-btn {
      padding: 6px 14px;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 20px;
      color: var(--text2);
      font-size: 0.78rem;
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .preset-btn:hover {
      border-color: var(--accent);
      color: var(--text);
      background: var(--accent-glow);
    }

    .preset-btn.active {
      border-color: var(--accent);
      background: var(--accent-glow);
      color: var(--accent);
      font-weight: 600;
    }

    /* Results */
    .total-display {
      text-align: center;
      padding: 20px 0 16px;
    }

    .total-number {
      font-size: 3.5rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1;
      margin-bottom: 4px;
      font-variant-numeric: tabular-nums;
      transition: color 0.3s, text-shadow 0.3s;
    }

    .total-number.fit {
      color: var(--green);
      text-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
    }
    .total-number.partial {
      color: var(--orange);
      text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
    }
    .total-number.no-fit {
      color: var(--red);
      text-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
    }

    .total-label {
      font-size: 0.85rem;
      color: var(--text2);
    }

    .verdict {
      text-align: center;
      padding: 12px 20px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.92rem;
      margin-bottom: 12px;
      transition: all 0.3s;
    }

    .verdict.fit {
      background: var(--green-bg);
      color: var(--green);
      border: 1px solid var(--green-border);
    }

    .verdict.partial {
      background: var(--orange-bg);
      color: var(--orange);
      border: 1px solid var(--orange-border);
    }

    .verdict.no-fit {
      background: var(--red-bg);
      color: var(--red);
      border: 1px solid var(--red-border);
    }

    .verdict-plain {
      text-align: center;
      font-size: 0.85rem;
      color: var(--text2);
      margin-bottom: 16px;
      line-height: 1.6;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Bar chart */
    .bar-chart {
      margin-bottom: 18px;
    }

    .bar-device {
      margin-bottom: 18px;
    }

    .bar-device:last-child {
      margin-bottom: 0;
    }

    .bar-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }

    .bar-device-name {
      font-size: 0.88rem;
      font-weight: 600;
    }

    .bar-device-status {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 6px;
    }

    .bar-device-status.yes {
      color: var(--green);
      background: var(--green-bg);
    }

    .bar-device-status.no {
      color: var(--red);
      background: var(--red-bg);
    }

    .bar-track {
      height: 32px;
      background: var(--bg);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      position: relative;
      border: 1px solid var(--border);
    }

    .bar-segment {
      height: 100%;
      transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bar-segment.weights { background: var(--weights); }
    .bar-segment.kv { background: var(--kv); }
    .bar-segment.overhead { background: var(--overhead); }
    .bar-segment.free { background: var(--free); }

    .bar-segment:not(.free) {
      opacity: 0.92;
    }

    .bar-segment:not(.free):hover {
      opacity: 1;
    }

    .bar-segment-label {
      font-size: 0.68rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    .bar-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      font-size: 0.72rem;
      color: var(--text3);
      font-variant-numeric: tabular-nums;
    }

    /* Legend */
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      margin-bottom: 18px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      color: var(--text2);
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
    }

    .legend-dot.weights { background: var(--weights); }
    .legend-dot.kv { background: var(--kv); }
    .legend-dot.overhead { background: var(--overhead); }

    /* Details */
    .details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--bg);
      border-radius: 8px;
      font-size: 0.8rem;
    }

    .detail-label {
      color: var(--text2);
    }

    .detail-value {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    /* Share */
    .share-section {
      margin-top: 18px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    .share-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .share-input {
      flex: 1;
      padding: 8px 12px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text2);
      font-size: 0.78rem;
      font-family: "SF Mono", "Fira Code", monospace;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .share-btn {
      padding: 8px 18px;
      background: var(--accent);
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 0.82rem;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      white-space: nowrap;
      transition: opacity 0.15s, transform 0.15s;
    }

    .share-btn:hover {
      opacity: 0.85;
      transform: translateY(-1px);
    }

    .share-btn:active {
      transform: translateY(0);
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card {
      animation: fadeIn 0.4s ease both;
    }

    .card:nth-child(2) { animation-delay: 0.05s; }
    .card:nth-child(3) { animation-delay: 0.1s; }

    /* Responsive */
    @media (max-width: 480px) {
      .container { padding: 8px 12px 36px; }
      header { padding: 24px 0 20px; }
      header h1 { font-size: 1.4rem; }
      .card { padding: 16px; }
      .total-number { font-size: 2.8rem; }
      .details-grid { grid-template-columns: 1fr 1fr; }
      .share-row { flex-direction: column; }
      .share-btn { width: 100%; text-align: center; }
      .presets { gap: 4px; }
      .preset-btn { padding: 5px 10px; font-size: 0.72rem; }
    }

    @media (min-width: 481px) and (max-width: 768px) {
      .container { padding: 0 20px 48px; }
    }
  `,document.head.appendChild(n);let r=document.createElement(`header`);r.innerHTML=`
    <h1>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:8px;opacity:0.7">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"/>
        <rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" opacity="0.3"/>
        <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="16" y1="1" x2="16" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="8" y1="21" x2="8" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="16" y1="21" x2="16" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="1" y1="16" x2="3" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="21" y1="8" x2="23" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="21" y1="16" x2="23" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      GPU Memory Calculator
    </h1>
    <p>Will this AI model fit on my graphics card?</p>
  `,t.appendChild(r);let i=document.createElement(`div`);i.className=`container`;let a=document.createElement(`div`);a.className=`card`,a.innerHTML=`<div class="card-title">Quick presets</div>`;let o=document.createElement(`div`);o.className=`presets`,o.id=`presets`,a.appendChild(o),i.appendChild(a);let s=document.createElement(`div`);s.className=`card`,s.innerHTML=`<div class="card-title">Model settings</div>`;let l=document.createElement(`div`);l.className=`input-group`,l.innerHTML=`
    <label for="params">Parameters (billions)</label>
    <input type="number" id="params" min="0.1" step="0.1" value="8">
  `,s.appendChild(l);let u=document.createElement(`div`);u.className=`input-group`,u.innerHTML=`
    <label for="quant">Quantization</label>
    <select id="quant"></select>
  `,s.appendChild(u);let d=document.createElement(`div`);d.className=`input-group`,d.innerHTML=`
    <label for="context">Context length (tokens)</label>
    <input type="number" id="context" min="1" step="1000" value="128000">
  `,s.appendChild(d);let f=document.createElement(`div`);f.className=`input-group`,f.innerHTML=`
    <label for="kv">KV cache per 1 000 tokens (GB)</label>
    <input type="number" id="kv" min="0" step="0.01" value="0.06">
  `,s.appendChild(f),i.appendChild(s);let p=document.createElement(`div`);p.className=`card`,p.id=`results`,p.innerHTML=`
    <div class="total-display">
      <div class="total-number" id="total">—</div>
      <div class="total-label">Total memory required</div>
    </div>
    <div id="verdict" class="verdict hidden"></div>
    <div id="verdict-plain" class="verdict-plain hidden"></div>
    <div class="legend">
      <div class="legend-item"><span class="legend-dot weights"></span>Model weights</div>
      <div class="legend-item"><span class="legend-dot kv"></span>KV cache</div>
      <div class="legend-item"><span class="legend-dot overhead"></span>Overhead</div>
    </div>
    <div class="bar-chart" id="bars"></div>
    <div class="details-grid" id="details"></div>
    <div class="share-section">
      <div class="card-title">Share this calculation</div>
      <div class="share-row">
        <input class="share-input" id="share-url" readonly>
        <button class="share-btn" id="copy-btn">Copy link</button>
      </div>
    </div>
  `,i.appendChild(p),t.appendChild(i);let y=document.createElement(`div`);y.className=`card`,y.id=`how-card`,y.innerHTML=`
    <div class="card-title">How it works</div>
    <div style="font-size:0.82rem;color:var(--text2);line-height:1.7">
      <p style="margin-bottom:10px">The total GPU memory is the sum of three parts:</p>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:8px;height:8px;border-radius:2px;background:var(--weights);flex-shrink:0"></span>
          <span><strong>Model weights</strong> — <span id="how-params">—</span> parameters × quantization bits</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:8px;height:8px;border-radius:2px;background:var(--kv);flex-shrink:0"></span>
          <span><strong>KV cache</strong> — stores attention states for the context window</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:8px;height:8px;border-radius:2px;background:var(--overhead);flex-shrink:0"></span>
          <span><strong>Overhead</strong> — ~1.5 GB for the runtime and buffers</span>
        </div>
      </div>
      <p>A model <strong style="color:var(--green)">fits</strong> when total memory is ≤ 90% of your GPU's memory, leaving 10% headroom for smooth operation.</p>
    </div>
  `,i.appendChild(y);let b=document.getElementById(`quant`);for(let t of e){let e=document.createElement(`option`);e.value=t.label,e.textContent=t.label+` (`+t.bpw+` bpw)`,b.appendChild(e)}m(),document.getElementById(`params`).addEventListener(`input`,g),document.getElementById(`quant`).addEventListener(`change`,g),document.getElementById(`context`).addEventListener(`input`,g),document.getElementById(`kv`).addEventListener(`input`,g),document.getElementById(`copy-btn`).addEventListener(`click`,_),c(),h(),v()}function m(){let e=document.getElementById(`presets`);e.innerHTML=``;for(let t of n){let n=document.createElement(`button`);n.className=`preset-btn`;let r=t.context>=1e3?t.context/1e3+`K`:t.context;n.textContent=t.name+` · `+t.params_b+`B · `+r,n.addEventListener(`click`,()=>{s.params_b=t.params_b,s.quant=t.quant,s.context=t.context,s.kv_gb_per_1k=t.kv_gb_per_1k,l(),h(),v()}),e.appendChild(n)}}function h(){document.getElementById(`params`).value=s.params_b,document.getElementById(`quant`).value=s.quant,document.getElementById(`context`).value=s.context,document.getElementById(`kv`).value=s.kv_gb_per_1k}function g(){s.params_b=parseFloat(document.getElementById(`params`).value)||0,s.quant=document.getElementById(`quant`).value,s.context=parseInt(document.getElementById(`context`).value)||0,s.kv_gb_per_1k=parseFloat(document.getElementById(`kv`).value)||0,l(),v()}function _(){let e=document.getElementById(`share-url`);e.select(),navigator.clipboard.writeText(e.value).catch(()=>{});let t=document.getElementById(`copy-btn`);t.textContent=`Copied!`,setTimeout(()=>{t.textContent=`Copy link`},1500)}function v(){let{weights_gb:n,kv_gb:r,overhead_gb:a,total_gb:o,fits:c}=i(s),l=document.getElementById(`total`);l.textContent=d(o)+` GB`;let u=Object.values(c).filter(Boolean).length,p=`no-fit`;u===3?p=`fit`:u>0&&(p=`partial`),l.className=`total-number `+p;let m=document.getElementById(`verdict`),h=document.getElementById(`verdict-plain`);if(u===3)m.className=`verdict fit`,m.textContent=`✓ Fits on all tested machines`,h.className=`verdict-plain`,h.textContent=`This model will run comfortably on a 16 GB, 32 GB, or 128 GB GPU. You have plenty of headroom for smooth inference.`,h.classList.remove(`hidden`);else if(u>0){let e=t.filter(e=>c[e.gb]).map(e=>e.name);m.className=`verdict partial`,m.textContent=`⚠ Fits on `+e.join(`, `),h.className=`verdict-plain`;let n=t.filter(e=>!c[e.gb]).map(e=>e.name);h.textContent=`This model requires `+d(o)+` GB. It fits on `+e.join(`, `)+`, but even a `+n[n.length-1]+` GPU would not be enough.`,h.classList.remove(`hidden`)}else m.className=`verdict no-fit`,m.textContent=`✗ Does not fit on any tested machine`,h.className=`verdict-plain`,h.textContent=`This model requires `+d(o)+` GB of GPU memory. Even a 128 GB GPU is not enough — you'd need a multi-GPU setup or a larger machine.`,h.classList.remove(`hidden`);m.classList.remove(`hidden`);let g=document.getElementById(`bars`);g.innerHTML=``;for(let e of t){let t=e.gb,i=Math.min(n/t*100,100),s=Math.min(r/t*100,Math.max(0,100-i)),l=Math.min(a/t*100,Math.max(0,100-i-s)),u=Math.max(100-i-s-l,0),f=c[e.gb]?`yes`:`no`,p=c[e.gb]?`Fits`:`Too large`,m=document.createElement(`div`);m.className=`bar-device`;let h=``;h+=i>15?`<div class="bar-segment weights" style="width:${i}%"><span class="bar-segment-label">${d(n)}</span></div>`:`<div class="bar-segment weights" style="width:${i}%"></div>`,h+=s>15?`<div class="bar-segment kv" style="width:${s}%"><span class="bar-segment-label">${d(r)}</span></div>`:`<div class="bar-segment kv" style="width:${s}%"></div>`,h+=l>12?`<div class="bar-segment overhead" style="width:${l}%"><span class="bar-segment-label">${d(a)}</span></div>`:`<div class="bar-segment overhead" style="width:${l}%"></div>`,h+=`<div class="bar-segment free" style="width:${u}%"></div>`,m.innerHTML=`
      <div class="bar-header">
        <span class="bar-device-name">${e.name}</span>
        <span class="bar-device-status ${f}">${p}</span>
      </div>
      <div class="bar-track">${h}</div>
      <div class="bar-labels">
        <span>${d(o)} GB used</span>
        <span>${e.gb} GB</span>
      </div>
    `,g.appendChild(m)}let _=e.find(e=>e.label===s.quant),v=document.getElementById(`details`);v.innerHTML=`
    <div class="detail-item"><span class="detail-label">Weights</span><span class="detail-value">${d(n)} GB</span></div>
    <div class="detail-item"><span class="detail-label">KV cache</span><span class="detail-value">${d(r)} GB</span></div>
    <div class="detail-item"><span class="detail-label">Overhead</span><span class="detail-value">${d(a)} GB</span></div>
    <div class="detail-item"><span class="detail-label">Quant</span><span class="detail-value">${s.quant} (${_?_.bpw:`—`} bpw)</span></div>
    <div class="detail-item"><span class="detail-label">Params</span><span class="detail-value">${s.params_b}B</span></div>
    <div class="detail-item"><span class="detail-label">Context</span><span class="detail-value">${f(s.context)} tokens</span></div>
  `;let y=location.origin+location.pathname+location.hash;document.getElementById(`share-url`).value=y;let b=document.getElementById(`how-params`);b&&(b.textContent=s.params_b+`B`)}window.APP={calc:i,setInputs:u},p();