(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),n=e=>e.toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),r=e=>`€ `+n(e),i=e=>e.toISOString().slice(0,10),a=(e,t)=>new Date(e.getTime()+t*864e5),o=e=>{if(!e)return`—`;let n=new Date(e+`T00:00:00`);return isNaN(n)?t(e):n.toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`})},s={bank:`ING-DiBa`,iban:`DE44 5001 0517 5407 3249 31`,bic:`INGDDEFFXXX`},c=()=>({sender:{name:`Atelier Nord GmbH`,tagline:`Digital Product Studio`,address:`Torstraße 140
10119 Berlin
Germany`,vatId:`DE 812 345 678`,email:`billing@ateliernord.de`,phone:`+49 30 123 456 70`},customer:{name:`Meyer & Cie KG`,address:`Hafenstraße 8
20359 Hamburg
Germany`},meta:{number:`INV-2026-0042`,date:i(new Date),due:i(a(new Date,14)),terms:`14`},items:[{desc:`Brand identity workshop`,qty:1,price:890,vat:19},{desc:`Frontend development (hours)`,qty:12.5,price:95,vat:19},{desc:`Printed user handbook`,qty:2,price:24.9,vat:7}],discount_pct:0}),l=c(),u=!1;try{let e=JSON.parse(localStorage.getItem(`invoice-studio-v1`)||`null`);e&&typeof e==`object`&&(l={...c(),...e,sender:{...c().sender,...e.sender||{}},customer:{...c().customer,...e.customer||{}},meta:{...c().meta,...e.meta||{}}},u=!0)}catch{}if(!u)try{let e=JSON.parse(localStorage.getItem(`invoice-studio-sender-template`)||`null`);e&&typeof e==`object`&&(l.sender={...l.sender,...e})}catch{}var d=()=>{try{localStorage.setItem(`invoice-studio-v1`,JSON.stringify(l))}catch{}};function f(e,t){let n=Math.max(0,Math.min(1e3,Math.round((Number(t)||0)*10))),r=new Map;for(let t of e){let e=Math.round((Number(t.qty)||0)*100)*Math.round((Number(t.price)||0)*100)*(1e3-n);r.set(Number(t.vat)||0,(r.get(Number(t.vat)||0)||0)+e)}let i={},a={},o=0,s=0;for(let e of[...r.keys()].sort((e,t)=>t-e)){let t=r.get(e),n=Math.floor((t+5e4)/1e5),c=Math.floor((n*e+50)/100);i[String(e)]=c/100,a[String(e)]=n/100,o+=n,s+=c}return{net:o/100,vat:s/100,gross:(o+s)/100,vat_by_rate:i,net_by_rate:a}}var p=(e,t)=>Math.round((Number(e.qty)||0)*100)*Math.round((Number(e.price)||0)*100)*(1e3-Math.max(0,Math.min(1e3,t))),m=e=>Math.floor((e+5e4)/1e5)/100;window.APP={setInvoice(e){let t=Array.isArray(e&&e.items)?e.items:[];return l.items=t.map(e=>({desc:String(e.desc??``),qty:Number(e.qty)||0,price:Number(e.price)||0,vat:Number(e.vat)||0})),l.discount_pct=Number(e&&e.discount_pct)||0,_(),v(),b(),window.APP.totals()},totals(){let{net_by_rate:e,...t}=f(l.items,l.discount_pct);return t}};function h(e,t){return t.split(`.`).reduce((e,t)=>e==null?e:e[t],e)}function g(e,t,n){let r=t.split(`.`),i=r.pop();r.reduce((e,t)=>e[t],e)[i]=n}function _(){let n=e(`#items`);n.innerHTML=l.items.map((e,n)=>`
    <div class="item-row" data-idx="${n}">
      <div class="field it-desc"><label for="it-desc-${n}">Description</label><input id="it-desc-${n}" class="it-desc" data-idx="${n}" type="text" placeholder="Service or product" value="${t(e.desc)}"></div>
      <div class="ir-row2">
        <div class="field it-qty"><label for="it-qty-${n}">Qty</label><input id="it-qty-${n}" class="it-qty" data-idx="${n}" type="number" min="0" step="any" placeholder="1" value="${e.qty}"></div>
        <div class="field it-price"><label for="it-price-${n}">Unit price €</label><input id="it-price-${n}" class="it-price" data-idx="${n}" type="number" min="0" step="any" placeholder="0.00" value="${e.price}"></div>
        <div class="field it-vat"><label for="it-vat-${n}">VAT %</label><select id="it-vat-${n}" class="it-vat" data-idx="${n}">${[19,7,0].map(t=>`<option value="${t}" ${Number(e.vat)===t?`selected`:``}>${t} %</option>`).join(``)}</select></div>
        <button class="btn-del" data-del="${n}" aria-label="Remove line ${n+1}" title="Remove line ${n+1}">×</button>
      </div>
      <div class="line-amt" data-amt="${n}"></div>
    </div>`).join(``)}function v(){document.querySelectorAll(`[data-path]`).forEach(e=>{e.value=h(l,e.dataset.path)??``});let t=e(`#terms`);t&&(t.value=l.meta.terms||`14`)}function y(){let e=l.meta.date?new Date(l.meta.date+`T00:00:00`):new Date;return i(a(isNaN(e)?new Date:e,Number(l.meta.terms)||0))}function b(){x();let t=window.APP.totals();e(`#sum-net`).textContent=r(t.net),e(`#sum-vat`).textContent=r(t.vat),e(`#sum-rates`).innerHTML=Object.entries(t.vat_by_rate).sort((e,t)=>Number(t[0])-Number(e[0])).map(([e,t])=>`<div class="sum-row sum-rate"><span>VAT ${e} %</span><b>${r(t)}</b></div>`).join(``),e(`#sum-gross`).textContent=r(t.gross);let n=Math.max(0,Math.min(1e3,Math.round((Number(l.discount_pct)||0)*10)));document.querySelectorAll(`.line-amt`).forEach(e=>{let t=l.items[Number(e.dataset.amt)];t&&(e.textContent=`= `+r(m(p(t,n))))}),d()}function x(){let n=l,i=Math.max(0,Math.min(1e3,Math.round((Number(n.discount_pct)||0)*10))),a=f(n.items,n.discount_pct),c=(n.sender.name||``).split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0].toUpperCase()).join(``)||`AN`,u=n.items.reduce((e,t)=>e+(Number(t.qty)||0)*(Number(t.price)||0),0),d=u-a.net,h=n.items.length?n.items.map((e,n)=>{let a=m(p(e,i));return`<tr>
      <td class="c-num">${n+1}</td>
      <td class="c-desc">${t(e.desc)||`<span class="dim">—</span>`}</td>
      <td class="c-qty">${(Number(e.qty)||0).toLocaleString(`en-US`,{maximumFractionDigits:2})}</td>
      <td class="c-price">${r(Number(e.price)||0)}</td>
      <td class="c-vat">${Number(e.vat)||0} %</td>
      <td class="c-amt">${r(a)}</td>
    </tr>`}).join(``):`<tr><td class="c-desc dim" style="padding:14px 2px">No line items yet.</td></tr>`,g=Object.keys(a.vat_by_rate).sort((e,t)=>Number(t)-Number(e)).map(e=>`<div class="tot-row"><span>Net at ${e} %</span><b>${r(a.net_by_rate[e])}</b></div><div class="tot-row"><span>VAT ${e} %</span><b>${r(a.vat_by_rate[e])}</b></div>`).join(``),_=n.meta.terms===`0`?`Payable immediately upon receipt`:n.meta.terms===`custom`?`Due by ${o(n.meta.due)}`:`Payable within ${Number(n.meta.terms)||14} days, due by ${o(n.meta.due)}`;e(`#invoice`).innerHTML=`
  <div class="sheet-inner">
    <header class="lh">
      <div class="lh-brand">
        <div class="logo">${t(c)}</div>
        <div>
          <div class="lh-name">${t(n.sender.name)}</div>
          <div class="lh-tag">${t(n.sender.tagline)}</div>
        </div>
      </div>
      <div class="lh-doc">
        <div class="lh-title">Invoice</div>
        <div class="meta-rows">
          <div><span>Invoice no.</span><b>${t(n.meta.number)||`—`}</b></div>
          <div><span>Date</span><b>${o(n.meta.date)}</b></div>
          <div><span>Due date</span><b>${o(n.meta.due)}</b></div>
        </div>
      </div>
    </header>
    <div class="rule"></div>
    <section class="parties">
      <div class="addr-window">
        <div class="aw-label">Bill to</div>
        <div class="aw-name">${t(n.customer.name)}</div>
        <div class="aw-addr">${t(n.customer.address).replace(/\n/g,`<br>`)}</div>
      </div>
      <div class="sender-box">
        <div class="aw-label">From</div>
        <div class="aw-name">${t(n.sender.name)}</div>
        <div class="aw-addr">${t(n.sender.address).replace(/\n/g,`<br>`)}${n.sender.vatId?`<br>VAT ID: `+t(n.sender.vatId):``}</div>
      </div>
    </section>
    <table class="lines">
      <thead><tr><th class="c-num">#</th><th>Description</th><th class="c-qty">Qty</th><th class="c-price">Unit price</th><th class="c-vat">VAT</th><th class="c-amt">Amount</th></tr></thead>
      <tbody>${h}</tbody>
    </table>
    <section class="bottom">
      <div class="pay-info">
        <div class="pi-title">Payment details</div>
        <div class="pi-line"><span>Bank</span><b>${s.bank}</b></div>
        <div class="pi-line"><span>IBAN</span><b>${s.iban}</b></div>
        <div class="pi-line"><span>BIC</span><b>${s.bic}</b></div>
        <div class="pi-line"><span>Terms</span><b>${_}</b></div>
        <div class="pi-line"><span>Reference</span><b>${t(n.meta.number)}</b></div>
      </div>
      <div class="totals">
        <div class="tot-row"><span>Subtotal</span><b>${r(u)}</b></div>
        ${d>.004?`<div class="tot-row tot-disc"><span>Discount (${Number(n.discount_pct)} %)</span><b>− ${r(d)}</b></div>`:``}
        <div class="tot-row"><span>Net total</span><b>${r(a.net)}</b></div>
        ${g}
        <div class="tot-row tot-gross"><span>Gross total</span><b>${r(a.gross)}</b></div>
      </div>
    </section>
    <footer class="foot">
      <div>${t(n.sender.name)} · ${t(n.sender.address).replace(/\n/g,`, `)}${n.sender.vatId?` · VAT ID: `+t(n.sender.vatId):``}${n.sender.email?` · `+t(n.sender.email):``}${n.sender.phone?` · `+t(n.sender.phone):``}</div>
      <div class="foot-thanks">Thank you for your business!</div>
    </footer>
  </div>`,S()}function S(){let t=e(`#preview`),n=e(`#sheet`);if(!t||!n)return;let r=t.clientWidth-64;n.style.zoom=Math.min(1,r/794)}document.addEventListener(`keydown`,t=>{if(t.key===`Enter`&&t.target.classList&&t.target.classList.contains(`it-desc`)){let n=t.target.closest(`.item-row`),r=document.querySelectorAll(`#items .item-row`);if(n&&n===r[r.length-1]){t.preventDefault(),l.items.push({desc:``,qty:1,price:0,vat:19}),_(),b();let n=e(`#items .item-row:last-child .it-desc`);n&&n.focus()}}}),document.addEventListener(`input`,e=>{let t=e.target;if(t.id===`terms`){l.meta.terms=t.value,t.value!==`custom`&&(l.meta.due=y(),v()),b();return}if(t.dataset.path){g(l,t.dataset.path,t.value),t.dataset.path===`meta.date`&&l.meta.terms!==`custom`&&(l.meta.due=y(),v()),b();return}let n=t.dataset.idx;if(n!==void 0){let e=l.items[Number(n)];if(!e)return;t.classList.contains(`it-desc`)?e.desc=t.value:t.classList.contains(`it-qty`)?e.qty=t.value===``?0:Number(t.value):t.classList.contains(`it-price`)?e.price=t.value===``?0:Number(t.value):t.classList.contains(`it-vat`)&&(e.vat=Number(t.value)),b()}}),document.addEventListener(`click`,t=>{let n=t.target.closest(`[data-del]`);if(n){l.items.splice(Number(n.dataset.del),1),_(),b();return}if(t.target.closest(`#add-line`)){l.items.push({desc:``,qty:1,price:0,vat:19}),_(),b();let t=e(`#items .item-row:last-child .it-desc`);t&&t.focus();return}if(t.target.closest(`#print-btn`)){window.print();return}if(t.target.closest(`#save-tpl`)){try{localStorage.setItem(`invoice-studio-sender-template`,JSON.stringify(l.sender)),C(`Saved`)}catch{}return}if(t.target.closest(`#load-tpl`)){try{let e=JSON.parse(localStorage.getItem(`invoice-studio-sender-template`)||`null`);e&&typeof e==`object`?(l.sender={...l.sender,...e},v(),b(),C(`Loaded`)):C(`No template saved yet`)}catch{}l.items=(Array.isArray(l.items)?l.items:[]).map(e=>({desc:String((e&&e.desc)??``),qty:Number(e&&e.qty)||0,price:Number(e&&e.price)||0,vat:Number(e&&e.vat)||0})),l.discount_pct=Number(l.discount_pct)||0}});function C(t){let n=e(`#tpl-msg`);n.textContent=t,clearTimeout(C._t),C._t=setTimeout(()=>n.textContent=``,2e3)}window.addEventListener(`resize`,S),_(),v(),b();