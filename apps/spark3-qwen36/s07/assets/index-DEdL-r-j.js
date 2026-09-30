(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{prompt:``,candidates:[{token:`The`,logit:5.2},{token:`A`,logit:3.1},{token:`I`,logit:1.8},{token:`She`,logit:1.2},{token:`The dog`,logit:.5}],chosen:0,caption:`The model looks at the empty text and considers what word to write first. <strong>The</strong> has the highest score by far.`},{prompt:`The`,candidates:[{token:`cat`,logit:4.8},{token:`dog`,logit:3},{token:`quick`,logit:1.5},{token:`little`,logit:1},{token:`big`,logit:.8}],chosen:0,caption:`Given "The", the model picks the next word. <strong>cat</strong> is the clear favorite — it fits the context perfectly.`},{prompt:`The cat`,candidates:[{token:`sat`,logit:4.5},{token:`ran`,logit:2.8},{token:`is`,logit:2},{token:`jumped`,logit:1.3},{token:`meowed`,logit:1.1}],chosen:0,caption:`"The cat sat" — the verb <strong>sat</strong> wins. Cats are known for sitting, so it gets the highest logit.`},{prompt:`The cat sat`,candidates:[{token:`on`,logit:5},{token:`down`,logit:2.5},{token:`quietly`,logit:1.8},{token:`next`,logit:1},{token:`there`,logit:.7}],chosen:0,caption:`After the verb, we need a preposition. <strong>on</strong> scores highest — it sets up where the cat is sitting.`},{prompt:`The cat sat on`,candidates:[{token:`the`,logit:4.6},{token:`a`,logit:2.2},{token:`his`,logit:1.5},{token:`that`,logit:1},{token:`the soft`,logit:.6}],chosen:0,caption:`Another definite article. <strong>the</strong> wins — the model expects a specific noun to follow.`},{prompt:`The cat sat on the`,candidates:[{token:`mat`,logit:5.5},{token:`floor`,logit:2},{token:`chair`,logit:1.6},{token:`ground`,logit:1},{token:`bed`,logit:.7}],chosen:0,caption:`The final word! <strong>mat</strong> scores very high — completing the familiar sentence "The cat sat on the mat."`}],t=1;function n(e,t){let n=e.map(e=>e/t),r=Math.max(...n),i=n.map(e=>Math.exp(e-r)),a=i.reduce((e,t)=>e+t,0);return i.map(e=>e/a)}var r=(e,t=document)=>t.querySelector(e),i=(e,t={},...n)=>{let r=document.createElement(e);for(let[e,n]of Object.entries(t))e===`className`?r.className=n:e===`textContent`?r.textContent=n:e===`innerHTML`?r.innerHTML=n:e.startsWith(`on`)?r.addEventListener(e.slice(2).toLowerCase(),n):r.setAttribute(e,n);for(let e of n)typeof e==`string`?r.appendChild(document.createTextNode(e)):e instanceof Node&&r.appendChild(e);return r},a={step:0,temperature:t};function o(){let t=r(`#app`);t.innerHTML=``;let s=a.step>=e.length,d=s?null:e[a.step];if(!t.querySelector(`style`)){let e=document.createElement(`style`);e.textContent=`
      html, body { overflow-x: hidden; margin: 0; padding: 0; }
      @keyframes wordFly {
        0% { transform: scale(1.5) translateY(-10px); opacity: 0; color: #ff6b9d; }
        60% { transform: scale(1.1) translateY(2px); opacity: 1; }
        100% { transform: scale(1) translateY(0); opacity: 1; color: #ffd700; }
      }
      @keyframes cursorBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes pageEnter {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .page-enter {
        animation: pageEnter 0.6s ease-out;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6c63ff, #a78bfa);
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(108,99,255,0.4);
        transition: transform 0.15s ease;
      }
      input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.2);
      }
      input[type="range"]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6c63ff, #a78bfa);
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 8px rgba(108,99,255,0.4);
      }
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(20px, 20px); }
      }
      .bg-grid {
        background-image: 
          radial-gradient(circle at 1px 1px, rgba(108,99,255,0.08) 1px, transparent 0);
        background-size: 24px 24px;
        animation: gridMove 8s linear infinite;
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.6;
      }
      .btn-hover { transition: all 0.2s ease !important; }
      .btn-hover:hover { transform: translateY(-1px); filter: brightness(1.1); }
      .btn-hover:active { transform: translateY(0); filter: brightness(0.95); }
      .word-new {
        animation: wordFly 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        color: #ffd700;
        display: inline-block;
      }
      .word-existing {
        display: inline-block;
        color: #c8c8d8;
      }
      .caption-enter {
        animation: fadeInUp 0.4s ease-out;
      }
      .step-badge {
        animation: pulse 2s ease-in-out infinite;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .bar-item {
        animation: fadeInUp 0.3s ease-out backwards;
      }
      .bar-item:nth-child(1) { animation-delay: 0.05s; }
      .bar-item:nth-child(2) { animation-delay: 0.1s; }
      .bar-item:nth-child(3) { animation-delay: 0.15s; }
      .bar-item:nth-child(4) { animation-delay: 0.2s; }
      .bar-item:nth-child(5) { animation-delay: 0.25s; }
      .hero-glow {
        background: radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.15) 0%, transparent 60%);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        pointer-events: none;
      }
      .dot-glow {
        box-shadow: 0 0 12px rgba(108,99,255,0.6), 0 0 24px rgba(108,99,255,0.3);
      }
    `,document.head.appendChild(e)}t.style.cssText=`
    max-width: 720px;
    margin: 0 auto;
    padding: 0 16px 48px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    color: #e8e8f0;
    min-height: 100vh;
    position: relative;
    background: linear-gradient(180deg, #0a0a14 0%, #0f0f20 30%, #121228 60%, #0a0a14 100%);
    overflow-x: hidden;
  `,t.appendChild(i(`div`,{className:`hero-glow`})),t.appendChild(i(`div`,{className:`bg-grid`}));let f=i(`div`,{style:`text-align:center;padding:48px 0 32px;position:relative;`});f.appendChild(i(`h1`,{style:`font-size:clamp(1.5rem,5vw,2.1rem);font-weight:800;
      background:linear-gradient(135deg,#6c63ff 0%,#a78bfa 40%,#ff6b9d 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;margin-bottom:12px;letter-spacing:-0.03em;
      background-size:200% 100%;animation:shimmer 4s ease-in-out infinite;`},`How a Language Model Writes`)),f.appendChild(i(`p`,{style:`color:#8888a0;font-size:clamp(0.9rem,2.8vw,1.05rem);max-width:500px;margin:0 auto;line-height:1.55;animation:fadeInUp 0.8s ease-out 0.2s both;`,className:`subtitle-enter`},`Watch an AI build a sentence one word at a time — and see exactly how it chooses each word.`)),t.appendChild(f);let h=i(`div`,{style:`display:flex;justify-content:center;gap:8px;margin:24px 0 28px;`});for(let t=0;t<e.length;t++){let e=i(`div`,{style:`
        width:10px;height:10px;border-radius:50%;
        background:${t===a.step?`#6c63ff`:t<a.step?`linear-gradient(135deg,#00d4aa,#00b894)`:`#2a2a3e`};
        transition:all 0.3s;
        transform:${t===a.step?`scale(1.3)`:`scale(1)`};
        ${t===a.step?`box-shadow:0 0 8px rgba(108,99,255,0.5);`:``}
        ${t===a.step?`animation:float 2s ease-in-out infinite;`:``}
      `,className:t===a.step?`dot-glow`:``});h.appendChild(e)}t.appendChild(h);let g=i(`div`,{style:`height:3px;background:#1a1a28;border-radius:2px;margin:0 0 20px;overflow:hidden;`}),_=i(`div`,{style:`height:100%;background:linear-gradient(90deg,#6c63ff,#a78bfa,#ff6b9d);border-radius:2px;transition:width 0.5s cubic-bezier(0.25,1,0.5,1);width:${a.step/e.length*100}%%`});g.appendChild(_),t.appendChild(g);let v=i(`div`,{style:`background:linear-gradient(135deg,rgba(20,20,40,0.9),rgba(26,26,48,0.9));border:1px solid rgba(42,42,64,0.6);border-radius:20px;padding:32px 28px;margin:0 0 24px;min-height:100px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06),0 0 60px rgba(108,99,255,0.05);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);`}),y=i(`div`,{style:`font-size:clamp(1.4rem,4vw,1.8rem);font-weight:600;letter-spacing:-0.01em;text-align:center;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;line-height:1.45;`});if(s){let t=e.map(e=>e.candidates[e.chosen].token).join(` `).split(` `);t.forEach((e,n)=>{y.appendChild(i(`span`,{className:`word-new`,style:`animation-delay:${n*.1}s`},e)),n<t.length-1&&y.appendChild(document.createTextNode(` `))})}else{for(let t=0;t<e.length;t++){let n=e[t],r=n.candidates[n.chosen].token.split(` `);r.forEach((e,n)=>{let o=t===a.step&&n===0;y.appendChild(i(`span`,{className:o?`word-new`:`word-existing`},e)),n<r.length-1&&y.appendChild(document.createTextNode(` `))}),t<e.length-1&&y.appendChild(document.createTextNode(` `))}y.appendChild(i(`span`,{style:`display:inline-block;width:2px;height:1.2em;background:#6c63ff;margin-left:3px;animation:cursorBlink 1s ease-in-out infinite;vertical-align:middle;`}))}if(v.appendChild(y),t.appendChild(v),s){let e=i(`div`,{style:`text-align:center;padding:28px;margin:0 0 20px;background:linear-gradient(135deg,rgba(0,212,170,0.08),rgba(108,99,255,0.08));border:1px solid rgba(0,212,170,0.2);border-radius:16px;box-shadow:0 4px 20px rgba(0,212,170,0.1);animation:fadeInUp 0.6s ease-out;`,className:`caption-enter`},[i(`div`,{style:`font-size:1.3rem;font-weight:700;color:#00d4aa;margin-bottom:4px;`},`✨ Sentence complete!`),i(`p`,{style:`color:#8888a0;font-size:0.9rem;`},`The model wrote: "The cat sat on the mat."`)]);t.appendChild(e);let n=i(`div`,{style:`display:flex;gap:12px;margin:0 auto;justify-content:center;flex-wrap:wrap;max-width:300px;`}),r=i(`button`,{style:`padding:12px 28px;border:none;border-radius:10px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;background:rgba(255,255,255,0.06);color:#b0b0c8;border:1px solid #2a2a40;transition:all 0.2s;`,className:`btn-hover`,textContent:`↺ Start Over`,onClick:()=>{a.step=0,o()}});n.appendChild(r),t.appendChild(n)}else{let r=i(`div`,{style:`display:flex;align-items:center;justify-content:space-between;margin:0 0 16px;flex-wrap:wrap;gap:10px;`}),o=i(`span`,{style:`font-size:0.82rem;color:#6c63ff;font-weight:700;background:rgba(108,99,255,0.12);padding:5px 14px;border-radius:20px;border:1px solid rgba(108,99,255,0.25);`,className:`step-badge`},`Step ${a.step+1} / ${e.length}`);r.appendChild(o);let s=e[a.step].candidates[e[a.step].chosen].token;r.appendChild(i(`span`,{style:`font-size:0.82rem;color:#8888a0;`},`Picking: <strong style="color:#ffd700;font-size:0.85rem;">"${s}"</strong>`)),t.appendChild(r);let f=i(`div`,{style:`background:linear-gradient(135deg,rgba(108,99,255,0.06),rgba(167,139,250,0.04));border-left:3px solid #6c63ff;border-radius:0 14px 14px 0;padding:16px 20px;margin:0 0 20px;font-size:0.95rem;color:#b0b0c8;line-height:1.65;box-shadow:0 2px 12px rgba(108,99,255,0.08);`,className:`caption-enter`});f.innerHTML=d.caption,t.appendChild(f);let h=i(`div`,{style:`background:linear-gradient(135deg,rgba(20,20,40,0.95),rgba(22,22,48,0.95));border:1px solid rgba(42,42,64,0.5);border-radius:20px;padding:24px;margin:0 0 20px;box-shadow:0 4px 20px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.03);`});h.appendChild(i(`div`,{style:`font-size:0.78rem;text-transform:uppercase;letter-spacing:0.14em;color:#6c63ff;margin-bottom:18px;font-weight:700;display:flex;align-items:center;gap:8px;`},`<svg width="16" height="16" viewBox="0 0 14 14" fill="none"><rect x="1" y="7" width="3" height="6" rx="1" fill="#6c63ff"/><rect x="5.5" y="4" width="3" height="9" rx="1" fill="#a78bfa"/><rect x="10" y="1" width="3" height="12" rx="1" fill="#ff6b9d"/></svg> Candidate words & probabilities`));let g=n(d.candidates.map(e=>e.logit),a.temperature).map((e,t)=>({idx:t,prob:e}));g.sort((e,t)=>t.prob-e.prob);for(let e=0;e<g.length;e++){let{idx:t,prob:n}=g[e],r=i(`div`,{style:`display:flex;align-items:center;margin-bottom:10px;gap:12px;`,className:`bar-item`}),a=t===d.chosen;r.appendChild(i(`span`,{style:`font-size:0.68rem;color:#555568;font-weight:600;width:18px;text-align:center;flex-shrink:0;`},`#${e+1}`));let o=i(`span`,{style:`min-width:60px;font-family:'SF Mono','Fira Code','Consolas',monospace;font-size:0.88rem;font-weight:600;color:${a?`#ffd700`:`#d0d0e0`};text-align:right;padding-right:6px;flex-shrink:0;${a?`text-shadow:0 0 8px rgba(255,215,0,0.3);`:``}`},d.candidates[t].token);r.appendChild(o);let s=i(`div`,{style:`flex:1;height:26px;background:rgba(255,255,255,0.03);border-radius:6px;overflow:hidden;position:relative;`}),c=i(`div`,{style:`height:100%;border-radius:6px;width:${n*100}%;transition:width 0.6s cubic-bezier(0.25,1,0.5,1);min-width:3px;
          background:${a?`linear-gradient(90deg,#ffd700,#ffaa00)`:`linear-gradient(90deg,
                hsl(${245+e*15}, 70%, 65%),
                hsl(${245+e*15+20}, 60%, 75%))`};
          ${a?`box-shadow:0 0 12px rgba(255,215,0,0.4),inset 0 1px 0 rgba(255,255,255,0.3);`:`box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);`};`,"data-test":`bar`});s.appendChild(c),r.appendChild(s);let l=i(`span`,{style:`min-width:46px;font-family:'SF Mono','Fira Code','Consolas',monospace;font-size:0.78rem;color:${a?`#ffd700`:`#7878a0`};text-align:left;flex-shrink:0;${a?`font-weight:700;`:``}`},`${(n*100).toFixed(1)}%`);r.appendChild(l),h.appendChild(r)}t.appendChild(h);let _=i(`div`,{style:`background:linear-gradient(135deg,rgba(20,20,40,0.95),rgba(22,22,48,0.95));border:1px solid rgba(42,42,64,0.5);border-radius:20px;padding:18px 22px;margin:0 0 20px;box-shadow:0 4px 20px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.03);`});_.appendChild(i(`div`,{style:`font-size:0.78rem;text-transform:uppercase;letter-spacing:0.14em;color:#00d4aa;margin-bottom:16px;font-weight:700;display:flex;align-items:center;gap:8px;`},`<svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#00d4aa" stroke-width="1.5"/><path d="M7 3v4l3 2" stroke="#00d4aa" stroke-width="1.5" stroke-linecap="round"/></svg> How softmax works`));let v=d.candidates.map(e=>e.logit),y=n(v,a.temperature),b=i(`div`,{style:`display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;`}),x=i(`div`,{style:`text-align:center;`});x.appendChild(i(`div`,{style:`font-size:0.7rem;color:#6868a0;margin-bottom:8px;font-weight:600;`},`Logits (raw scores)`));let S=i(`div`,{style:`display:flex;gap:4px;align-items:flex-end;height:60px;`}),C=Math.max(...v.map(Math.abs));v.forEach((e,t)=>{let n=i(`div`,{style:`width:28px;height:${Math.max(4,Math.abs(e)/C*55)}px;background:${t===d.chosen?`#ffd700`:`#4a4a6a`};border-radius:3px 3px 0 0;transition:height 0.4s;`});S.appendChild(n)}),x.appendChild(S),b.appendChild(x),b.appendChild(i(`div`,{style:`font-size:1.2rem;color:#6c63ff;font-weight:700;`},`→ softmax →`));let w=i(`div`,{style:`text-align:center;`});w.appendChild(i(`div`,{style:`font-size:0.7rem;color:#6868a0;margin-bottom:8px;font-weight:600;`},`Probabilities`));let T=i(`div`,{style:`display:flex;gap:4px;align-items:flex-end;height:60px;`});y.forEach((e,t)=>{let n=i(`div`,{style:`width:28px;height:${Math.max(4,e*55)}px;background:${t===d.chosen?`#ffd700`:`#4a4a6a`};border-radius:3px 3px 0 0;transition:height 0.4s;`});T.appendChild(n)}),w.appendChild(T),b.appendChild(w),_.appendChild(b),t.appendChild(_);let E=i(`div`,{style:`background:linear-gradient(135deg,#141428,#161630);border:1px solid #2a2a40;border-radius:16px;padding:18px 20px;margin:0 0 16px;box-shadow:0 4px 20px rgba(0,0,0,0.2);`}),D=i(`div`,{style:`display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;`});D.appendChild(i(`span`,{style:`font-size:0.85rem;color:#b0b0c8;font-weight:600;`},`🌡️ Temperature`)),D.appendChild(i(`span`,{style:`font-family:'SF Mono','Fira Code','Consolas',monospace;font-size:0.95rem;color:#6c63ff;font-weight:800;background:rgba(108,99,255,0.15);padding:3px 12px;border-radius:8px;border:1px solid rgba(108,99,255,0.2);`},a.temperature.toFixed(2))),E.appendChild(D);let O=i(`input`,{type:`range`,min:`0.1`,max:`3.0`,step:`0.05`,value:a.temperature,style:`-webkit-appearance:none;appearance:none;width:100%;height:6px;background:linear-gradient(90deg,#6c63ff 0%,#a78bfa 50%,#ff6b9d 100%);border-radius:3px;outline:none;cursor:pointer;`,onInput:e=>{p(parseFloat(e.target.value))},ref:e=>{e&&(e.value=a.temperature)}});E.appendChild(O),E.appendChild(i(`div`,{style:`display:flex;justify-content:space-between;margin-top:6px;`},[i(`span`,{style:`font-size:0.65rem;color:#555568;`},`Strict`),i(`span`,{style:`font-size:0.65rem;color:#555568;`},`Creative`)])),E.appendChild(i(`div`,{style:`font-size:0.78rem;color:#7878a0;margin-top:12px;line-height:1.55;`},`Lower temperature → more confident choices. Higher → more random. Current: ${a.temperature.toFixed(2)}`)),t.appendChild(E);let k=i(`div`,{style:`text-align:center;margin:0 0 12px;`}),A=i(`button`,{style:`background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.2);color:#6c63ff;padding:7px 20px;border-radius:20px;font-size:0.78rem;cursor:pointer;font-family:inherit;font-weight:600;transition:all 0.25s ease;`,className:`btn-hover`,textContent:`🔬 For experts`,onClick:()=>{j.classList.toggle(`visible`),j.classList.contains(`visible`)?A.style.cssText=`background:#6c63ff;color:white;border-color:#6c63ff;`:A.style.cssText=`background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.2);color:#6c63ff;`}});k.appendChild(A),t.appendChild(k);let j=i(`div`,{style:`display:none;background:linear-gradient(135deg,rgba(20,20,40,0.95),rgba(22,22,48,0.95));border:1px solid rgba(42,42,64,0.5);border-radius:20px;padding:20px 22px;margin:0 0 20px;box-shadow:0 4px 24px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.03);`,className:`expert-layer`});j.innerHTML=`
      <strong style="color:#e8e8f0;font-size:0.92rem;">How it works:</strong><br><br>
      Each candidate has a <code style="font-family:'SF Mono','Fira Code','Consolas',monospace;background:#2a2a40;padding:2px 8px;border-radius:4px;color:#00d4aa;font-size:0.82rem;">logit</code> (raw score). We apply <code style="font-family:'SF Mono','Fira Code','Consolas',monospace;background:#2a2a40;padding:2px 8px;border-radius:4px;color:#00d4aa;font-size:0.82rem;">softmax(logits ÷ temperature)</code> to get probabilities.<br><br>
      <div style="background:#0a0a14;border-radius:10px;padding:14px;margin:8px 0;font-size:0.8rem;color:#8888a0;line-height:1.6;">
        <div style="color:#6c63ff;font-weight:600;margin-bottom:8px;">Softmax formula:</div>
        <div style="text-align:center;font-size:1.05rem;margin:10px 0;color:#e8e8f0;">
          P(word) = e<sup>(logit / T)</sup> / Σ e<sup>(logit / T)</sup>
        </div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid #1a1a28;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span>Temperature: <strong style="color:#ffd700;">${a.temperature.toFixed(2)}</strong></span>
            <span>Top word: <strong style="color:#00d4aa;">${a.temperature<1?`confident`:`uncertain`}</strong></span>
          </div>
        </div>
      </div>
      Try changing the slider — you'll see the probabilities shift in real time.<br>
      Low temperature (near 0) → the top word dominates. High temperature → all words become equally likely.
    `,j.style.display=`block`,t.appendChild(j);let M=i(`div`,{style:`display:flex;gap:12px;margin:0 auto;justify-content:center;flex-wrap:wrap;max-width:400px;`}),N=i(`button`,{style:`padding:12px 24px;border:none;border-radius:10px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;background:rgba(255,255,255,0.06);color:#b0b0c8;border:1px solid #2a2a40;transition:all 0.2s;min-width:90px;`,className:`btn-hover`,disabled:a.step===0?``:null,textContent:`← Back`,onClick:()=>{m.back()}});M.appendChild(N);let P=i(`button`,{style:`padding:12px 28px;border:none;border-radius:10px;font-size:0.9rem;font-weight:700;cursor:pointer;font-family:inherit;background:linear-gradient(135deg,#6c63ff,#a78bfa);color:white;box-shadow:0 4px 16px rgba(108,99,255,0.4);transition:all 0.2s;min-width:100px;`,className:`btn-hover`,textContent:`Next →`,onClick:()=>{m.next()}});M.appendChild(P);let F=i(`button`,{style:`padding:12px 24px;border:none;border-radius:10px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;background:rgba(0,212,170,0.1);color:#00d4aa;border:1px solid rgba(0,212,170,0.3);transition:all 0.2s;min-width:90px;`,className:`btn-hover`,textContent:`▶ Auto`,onClick:()=>{c?u():l()}});M.appendChild(F),t.appendChild(M),t.appendChild(i(`p`,{style:`text-align:center;font-size:0.7rem;color:#555568;margin:8px 0 0;`},`Use ← → arrow keys or spacebar to navigate`))}}var s=null,c=!1;function l(){c=!0;let t=r(`.btn-autoplay`);t&&(t.style.cssText=`padding:12px 24px;border:none;border-radius:10px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;background:#00d4aa;color:#0a0a14;transition:all 0.2s;min-width:90px;`,t.textContent=`⏸ Pause`),s=setInterval(()=>{if(a.step>=e.length-1){u();return}m.next()},1500)}function u(){c=!1,clearInterval(s),s=null;let e=r(`.btn-autoplay`);e&&(e.style.cssText=`padding:12px 24px;border:none;border-radius:10px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;background:rgba(0,212,170,0.1);color:#00d4aa;border:1px solid rgba(0,212,170,0.3);transition:all 0.2s;min-width:90px;`,e.textContent=`▶ Auto`)}var d=null;function f(){d&&clearTimeout(d),app.classList.remove(`page-enter`),app.offsetWidth,app.classList.add(`page-enter`),d=setTimeout(()=>{app.classList.remove(`page-enter`)},600)}function p(e){a.temperature=Math.max(.1,Math.min(3,e)),o()}var m={state(){let t=e[a.step];if(!t)return{step:a.step,text:e.map(e=>e.candidates[e.chosen].token).join(` `),candidates:[],temperature:a.temperature};let r=n(t.candidates.map(e=>e.logit),a.temperature).map((e,n)=>({token:t.candidates[n].token,p:e}));r.sort((e,t)=>t.p-e.p);let i=e.slice(0,a.step).map(e=>e.candidates[e.chosen].token).join(` `);return{step:a.step,text:i,candidates:r.map(e=>({token:e.token,p:e.p})),temperature:a.temperature}},next(){a.step<e.length&&(a.step++,f(),o())},back(){a.step>0&&(a.step--,f(),o())},setTemperature(e){a.temperature=Math.max(.1,Math.min(3,e)),o()}};window.APP=m,document.addEventListener(`keydown`,e=>{e.key===`ArrowRight`||e.key===` `?(e.preventDefault(),m.next()):e.key===`ArrowLeft`&&(e.preventDefault(),m.back())});var h=document.createElement(`style`);h.textContent=`
  @media (max-width: 480px) {
    #app { padding: 0 10px 32px !important; }
    #app > div:first-child { height: 120px !important; }
    .sentence-box { padding: 18px 14px !important; min-height: 60px !important; }
    .candidates-panel, .temp-control, .expert-layer, .bar-item { padding: 14px !important; }
    .bar-item { margin-bottom: 6px !important; }
    .bar-item > span:first-child { min-width: 36px !important; font-size: 0.7rem !important; }
    .bar-item > span:last-child { min-width: 36px !important; font-size: 0.72rem !important; }
    .step-badge { font-size: 0.7rem !important; padding: 3px 8px !important; }
    .caption-enter { font-size: 0.82rem !important; padding: 10px 12px !important; }
    .controls { gap: 8px !important; }
    .controls > button { padding: 10px 16px !important; font-size: 0.82rem !important; min-width: 70px !important; }
  }
`,document.head.appendChild(h),o();