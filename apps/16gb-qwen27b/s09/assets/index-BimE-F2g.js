(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>Math.round(e*100+1e-9)/100,n=e=>{let t=Number(e);return Number.isFinite(t)?t:0},r=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),i=e=>t(e).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),a=e=>String(Number.isInteger(e)?e:t(e)),o=e=>{if(!e)return`—`;let t=new Date(e+`T00:00:00`);return isNaN(t)?`—`:t.toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`})},s={sender:{name:`Klarwerk Studio GmbH`,street:`Torstraße 140`,city:`10119 Berlin`,contact:`hello@klarwerk.studio · +49 30 555 018 20`,vat:`DE 214 583 906`,bank:`Commerzbank`,iban:`DE89 3704 0044 0532 0130 00`,bic:`COBADEFFXXX`},customer:{name:`Meyer & Söhne Bau GmbH`,street:`Am Hafen 22`,city:`20457 Hamburg`},meta:{number:`INV-2026-041`,date:`2026-09-12`,due:`2026-09-26`,project:`Website relaunch — concept, build & launch`,terms:`Payment due within 14 days by bank transfer, without deduction. Please quote the invoice number as reference.`},items:[{desc:`Concept, art direction & design (flat rate)`,qty:1,price:2400,vat:19},{desc:`Development (hourly rate)`,qty:36,price:95,vat:19},{desc:`Photo retouching (per image)`,qty:12,price:18,vat:19},{desc:`Workshop day — catering & materials`,qty:1,price:380,vat:7}],discount_pct:0};function c(){let e=JSON.parse(JSON.stringify(s));try{let t=localStorage.getItem(`invoice.sender-template`);t&&Object.assign(e.sender,JSON.parse(t));let r=localStorage.getItem(`invoice.state`);if(r){let t=JSON.parse(r);t&&Array.isArray(t.items)&&t.sender&&t.customer&&t.meta&&(e.sender=Object.assign(e.sender,t.sender),e.customer=Object.assign(e.customer,t.customer),e.meta=Object.assign(e.meta,t.meta),e.items=t.items,e.discount_pct=n(t.discount_pct))}}catch{}return e}var l=c();function u(){let e={};for(let t of l.items){let r=n(t.qty)*n(t.price)*(1-n(l.discount_pct)/100);e[t.vat]=(e[t.vat]||0)+r}let r={},i=0,a=0;for(let n of Object.keys(e)){let o=t(e[n]),s=t(o*Number(n)/100);r[String(n)]=s,i+=o,a+=s}return i=t(i),a=t(a),{net:i,vat:a,gross:t(i+a),vat_by_rate:r}}function d(){let s=u(),c=l.sender,d=l.customer,p=l.meta,m=n(l.discount_pct),h=t(l.items.reduce((e,t)=>e+n(t.qty)*n(t.price),0)),g=t(h-s.net),_=Object.keys(s.vat_by_rate).sort((e,t)=>Number(t)-Number(e)),v=l.items.map((e,o)=>{let s=t(n(e.qty)*n(e.price)*(1-m/100));return`<tr>
      <td class="d">${r(e.desc)||`<span class="mut">Untitled line</span>`}</td>
      <td class="n">${a(n(e.qty))}</td>
      <td class="n">${i(n(e.price))}</td>
      <td class="n">${r(e.vat)} %</td>
      <td class="n">${i(s)}</td>
    </tr>`}).join(``),y=``;m>0&&(y+=`<div class="trow"><span>Subtotal</span><span>${i(h)} €</span></div>`,y+=`<div class="trow"><span>Discount (${r(m)} %)</span><span>−${i(g)} €</span></div>`),y+=`<div class="trow net"><span>Net total</span><span>${i(s.net)} €</span></div>`;for(let e of _)y+=`<div class="trow"><span>VAT ${r(e)} %</span><span>${i(s.vat_by_rate[e])} €</span></div>`;y+=`<div class="trow gross"><span>Gross total</span><span>${i(s.gross)} €</span></div>`,e(`#sheet`).innerHTML=`
    <div class="inv-head">
      <div class="co">
        <svg class="co-mark" viewBox="0 0 44 44" aria-hidden="true">
          <rect width="44" height="44" rx="9" fill="#17456e"/>
          <path d="M15 12v20" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>
          <path d="M27 12 L16.5 22.5 M17.5 23.5 L28 32" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>
        </svg>
        <div class="co-txt">
          <div class="co-name">${r(c.name)}</div>
          <div class="co-addr">${r(c.street)}<br>${r(c.city)}<br>${r(c.contact)}</div>
        </div>
      </div>
      <div class="inv-meta">
        <div class="inv-title">INVOICE</div>
        <div class="inv-meta-rows">
          <div><span>No.</span><b>${r(p.number)}</b></div>
          <div><span>Date</span><b>${o(p.date)}</b></div>
          <div class="due"><span>Due</span><b>${o(p.due)}</b></div>
        </div>
      </div>
    </div>
    <div class="inv-rule"></div>
    <div class="inv-cols">
      <div class="inv-block">
        <h4>Billed to</h4>
        <div class="who">${r(d.name)}<br>${r(d.street)}<br>${r(d.city)}</div>
      </div>
      <div class="inv-block right">
        <h4>Project</h4>
        <div class="who plain">${r(p.project)}</div>
      </div>
    </div>
    <table class="inv-table">
      <thead>
        <tr><th class="d">Description</th><th>Qty</th><th>Unit price</th><th>VAT</th><th>Amount</th></tr>
      </thead>
      <tbody>${v||`<tr><td colspan="5" class="mut">No lines yet</td></tr>`}</tbody>
    </table>
    <div class="inv-totals">
      <div class="tot-rows">${y}</div>
    </div>
    <div class="inv-pay">
      <div class="pay-col">
        <h4>Payment</h4>
        <p>${r(c.bank)}<br>IBAN <b class="mono">${r(c.iban)}</b><br>BIC <b class="mono">${r(c.bic)}</b><br>Reference <b class="mono">${r(p.number)}</b></p>
      </div>
      <div class="pay-col">
        <h4>Terms</h4>
        <p>${r(p.terms)}</p>
      </div>
    </div>
    <div class="inv-foot">
      <span>${r(c.name)} · HRB 187 432 B · Amtsgericht Charlottenburg</span>
      <span>VAT ID ${r(c.vat)}</span>
    </div>
    <div class="inv-thanks">Thank you for your business.</div>`,f();let b=e(`#pv-gross`);b&&(b.textContent=`€ `+i(s.gross))}function f(){let t=e(`#sheet`);if(t.style.fontSize=`13px`,!(t.scrollHeight<=1123))for(let e=12.5;e>=8&&(t.style.fontSize=e+`px`,!(t.scrollHeight<=1123));e-=.25);}function p(){let t=e(`#items`);t.innerHTML=``;let i=new Set([0,7,19]);l.items.forEach(e=>i.add(Number(e.vat))),l.items.forEach((e,a)=>{let o=document.createElement(`div`);o.className=`item-row`,o.innerHTML=`
      <input class="in-desc" type="text" placeholder="Description" aria-label="Description" value="${r(e.desc)}">
      <input class="in-qty" type="number" step="any" min="0" aria-label="Quantity" value="${e.qty}">
      <input class="in-price" type="number" step="any" min="0" aria-label="Unit price" value="${e.price}">
      <select class="in-vat">${[...i].sort((e,t)=>e-t).map(t=>`<option value="${t}" ${String(t)===String(e.vat)?`selected`:``}>${t} %</option>`).join(``)}</select>
      <button class="in-del" type="button" title="Remove line">×</button>`;let[s,c,u,d,f]=[o.querySelector(`.in-desc`),o.querySelector(`.in-qty`),o.querySelector(`.in-price`),o.querySelector(`.in-vat`),o.querySelector(`.in-del`)];s.addEventListener(`input`,()=>{l.items[a].desc=s.value,g()}),c.addEventListener(`input`,()=>{l.items[a].qty=n(c.value),g()}),u.addEventListener(`input`,()=>{l.items[a].price=n(u.value),g()}),d.addEventListener(`change`,()=>{l.items[a].vat=n(d.value),g()}),f.addEventListener(`click`,()=>{l.items.splice(a,1),p(),g()}),t.appendChild(o)})}var m=0;function h(){clearTimeout(m),m=setTimeout(()=>{try{localStorage.setItem(`invoice.state`,JSON.stringify(l))}catch{}},400)}function g(){d(),h()}function _(){for(let[e,[t,n]]of Object.entries({"f-sname":[`sender`,`name`],"f-sstreet":[`sender`,`street`],"f-scity":[`sender`,`city`],"f-scontact":[`sender`,`contact`],"f-svat":[`sender`,`vat`],"f-sbank":[`sender`,`bank`],"f-siban":[`sender`,`iban`],"f-sbic":[`sender`,`bic`],"f-cname":[`customer`,`name`],"f-cstreet":[`customer`,`street`],"f-ccity":[`customer`,`city`],"f-number":[`meta`,`number`],"f-date":[`meta`,`date`],"f-due":[`meta`,`due`],"f-project":[`meta`,`project`],"f-terms":[`meta`,`terms`]})){let r=document.getElementById(e);r.value=l[t][n],r.addEventListener(`input`,()=>{l[t][n]=r.value,g()})}let t=e(`#f-disc`);t.value=l.discount_pct,t.addEventListener(`input`,()=>{l.discount_pct=Math.min(100,Math.max(0,n(t.value))),g()})}var v=1;function y(){let t=e(`#pv`),n=Math.min((t.clientWidth-48)/794,(t.clientHeight-32)/1123),r=Math.max(.2,Math.min(1.5,n*v)),i=e(`#sheet`);i.style.transform=`scale(${r})`;let a=e(`#frame`);a.style.width=794*r+`px`,a.style.height=1123*r+`px`;let o=e(`#zoom-label`);o&&(o.textContent=Math.round(v*100)+`%`)}e(`#zoom-in`).addEventListener(`click`,()=>{v=Math.min(1.5,Math.round((v+.1)*10)/10),y()}),e(`#zoom-out`).addEventListener(`click`,()=>{v=Math.max(.3,Math.round((v-.1)*10)/10),y()});var b=0;function x(t){let n=e(`#toast`);n.textContent=t,n.classList.add(`show`),clearTimeout(b),b=setTimeout(()=>n.classList.remove(`show`),2200)}e(`#btn-add`).addEventListener(`click`,()=>{l.items.push({desc:``,qty:1,price:0,vat:19}),p(),g();let t=e(`#items .item-row:last-child .in-desc`);t&&t.focus()}),e(`#btn-print`).addEventListener(`click`,()=>window.print()),e(`#btn-template`).addEventListener(`click`,()=>{try{localStorage.setItem(`invoice.sender-template`,JSON.stringify(l.sender)),x(`Sender saved as template`)}catch{x(`Could not save template`)}}),e(`#btn-reset`).addEventListener(`click`,()=>{try{localStorage.removeItem(`invoice.state`),localStorage.removeItem(`invoice.sender-template`)}catch{}location.reload()}),window.APP={setInvoice(e){e||={},l.items=(Array.isArray(e.items)?e.items:[]).map(e=>({desc:String(e.desc??``),qty:n(e.qty),price:n(e.price),vat:n(e.vat)})),l.discount_pct=n(e.discount_pct),p(),d()},totals(){return u()}},_(),p(),d(),y(),window.addEventListener(`resize`,y),requestAnimationFrame(y);