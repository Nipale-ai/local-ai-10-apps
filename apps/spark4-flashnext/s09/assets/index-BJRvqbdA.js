(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`Northbeam Systems GmbH`,tag:`Infrastructure engineering & cloud operations`,street:`Kottenburger Strasse 14`,city:`50667 Cologne`,country:`Germany`,email:`billing@northbeam-systems.de`,phone:`+49 221 4730 880`,vatid:`DE 812 447 905`,bank:`Northbeam Systems GmbH · Commerzbank Koeln`,iban:`DE44 3704 0044 0531 2206 00`,bic:`COBADEHH`,signer:`K. Voss · Operations`,legal:`Northbeam Systems GmbH · HRB 48112 Köln · Managing director: K. Voss`,terms:`Payment due within 14 days of the invoice date, without deductions. Please state the invoice number as the payment reference. Late payments accrue interest at 8% p.a. above the base rate.`},t={sender:{...e},customer:{name:`Helvetia Robotics AG`,attn:`Attn. Accounts Payable — M. Reinhart`,street:`Albisstrasse 98`,city:`8002 Zürich`,country:`Switzerland`},number:`INV-2026-0184`,date:`2026-09-14`,due:`2026-09-28`,po:`PO-4471`,currency:`EUR`,discount_pct:0,items:[{desc:`Setup service — environment provisioning`,qty:1,price:450,vat:19},{desc:`GPU rental (hours)`,qty:12.5,price:3.9,vat:19},{desc:`Handbook, printed copy`,qty:2,price:24.9,vat:7}]},n=e=>Math.round(e*100+1e-9)/100,r=e=>Number(e||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),i=e=>{let t=Number(e)||0;return Number.isInteger(t)?String(t):t.toLocaleString(`en-US`,{maximumFractionDigits:3})},a=e=>{let n=String(t.currency||`EUR`).toUpperCase(),i=n===`EUR`||n===`EURO`||n===`€`?f(e):n+` `+r(e);return i.charAt(0).toUpperCase()+i.slice(1)};function o(e,t){let r=1-(Number(t)||0)/100,i={};for(let t of e){let e=String(t.vat),n=(Number(t.qty)||0)*(Number(t.price)||0)*r;i[e]=(i[e]||0)+n}let a={},o=0,s=0;for(let e of Object.keys(i)){let t=n(i[e]),r=n(t*Number(e)/100);a[e]=r,o+=t,s+=r}return o=n(o),s=n(s),{net:o,vat:s,gross:n(o+s),vat_by_rate:a}}var s=e=>String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),c=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],l=[`zero`,`one`,`two`,`three`,`four`,`five`,`six`,`seven`,`eight`,`nine`,`ten`,`eleven`,`twelve`,`thirteen`,`fourteen`,`fifteen`,`sixteen`,`seventeen`,`eighteen`,`nineteen`],u=[``,``,`twenty`,`thirty`,`forty`,`fifty`,`sixty`,`seventy`,`eighty`,`ninety`];function d(e){let t=[],n=Math.floor(e/100),r=e%100;if(n&&t.push(l[n]+` hundred`),r){if(r<20)t.push(l[r]);else{let e=Math.floor(r/10),n=r%10;t.push(u[e]+(n?`-`+l[n]:``))}}return t.join(` `)}function f(e){let t=Math.floor(Number(e)+1e-9),n=Math.round((Number(e)-t)*100+1e-9),r=[``,`thousand`,`million`,`billion`],i=[],a=t,o=0;for(a===0&&i.push(`zero`);a>0;){let e=a%1e3;e&&i.unshift(d(e)+(r[o]?` `+r[o]:``)),a=Math.floor(a/1e3),o++}let s=n===1?`euro`:`euros`;return i.join(` `)+` `+(n?s+` and `+d(n)+` cents`:s+` exactly`)}function p(e){let t=String(e||``).split(`-`);if(t.length!==3)return s(e)||`—`;let n=Number(t[1])-1;return!(n>=0&&n<12)||!Number.isFinite(Number(t[0]))?s(e):`${Number(t[2])} ${c[n]} ${t[0]}`}function m(){return`<svg class="inv-logo" viewBox="0 0 46 46" aria-hidden="true">
    <rect x="1" y="1" width="44" height="44" rx="9" fill="#0f5c5a"></rect>
    <path d="M13 32 V14 h3.6 l10.2 12.9 V14 H37 v18 h-3.6 l-10.2 -12.9 V32 Z" fill="#ffffff"></path>
    <circle cx="37" cy="9" r="3.1" fill="#d8a94f"></circle>
  </svg>`}function h(){let e=t.sender,c=t.customer,l=o(t.items,t.discount_pct),u=Number(t.discount_pct)||0,d=t.items.map(e=>{let t=Number(e.qty)||0,a=Number(e.price)||0,o=n(t*a*(1-u/100));return`<tr>
        <td class="desc">${s(e.desc)||`<span class="empty">—</span>`}</td>
        <td class="r">${i(t)}</td>
        <td class="r">${r(a)}</td>
        <td class="r"><span class="vat-badge">${s(String(e.vat))}%</span></td>
        <td class="r">${r(o)}</td>
      </tr>`}).join(``),f=Object.keys(l.vat_by_rate).sort((e,t)=>Number(t)-Number(e)),h=n(t.items.reduce((e,t)=>e+(Number(t.qty)||0)*(Number(t.price)||0),0)),g=u>0?`<tr class="sub"><td class="k">Discount ${i(u)}%</td><td class="v">− ${r(n(h-l.net))}</td></tr>`:``,_=(u>0?`<tr class="sub"><td class="k">Line items</td><td class="v">${r(h)}</td></tr>`:`<tr><td class="k">Net amount</td><td class="v">${r(l.net)}</td></tr>`)+g+(u>0?`<tr><td class="k">Net amount</td><td class="v">${r(l.net)}</td></tr>`:``)+f.map(e=>`<tr><td class="k">VAT ${s(e)}%</td><td class="v">${r(l.vat_by_rate[e])}</td></tr>`).join(``)+`<tr class="sep"><td class="k">VAT total</td><td class="v">${r(l.vat)}</td></tr><tr class="gross"><td class="k">Amount due</td><td class="v">${s(t.currency)} ${r(l.gross)}</td></tr>`;return`<article class="page" id="invoice-page">
    <div class="band"></div>
    <header class="inv-head">
      <div class="inv-brand">
        ${m()}
        <div>
          <div class="inv-co">${s(e.name)}</div>
          <div class="inv-tag">${s(e.tag)}</div>
        </div>
      </div>
      <div class="inv-title">
        <div class="doc">Invoice</div>
        <div class="num">${s(t.number)}</div>
      </div>
    </header>

    <div class="rule"></div>

    <section class="inv-meta">
      <div>
        <div class="to-label">Invoice to</div>
        <div class="addrwin">
        <div class="addr">
          <div class="nm">${s(c.name)}</div>
          ${c.attn?`<div class="dim">${s(c.attn)}</div>`:``}
          <div class="dim">${s(c.street)}</div>
          <div class="dim">${s(c.city)}</div>
          ${c.country?`<div class="dim">${s(c.country)}</div>`:``}
        </div>
        </div>
      </div>
      <div>
        <table class="dates">
          <tr><td class="k">Invoice date</td><td class="v">${p(t.date)}</td></tr>
          <tr><td class="k">Due date</td><td class="v">${p(t.due)}</td></tr>
          ${t.po?`<tr><td class="k">Your order</td><td class="v">${s(t.po)}</td></tr>`:``}
          <tr><td class="k">Seller VAT ID</td><td class="v">${s(e.vatid)}</td></tr>
          <tr><td class="k">Contact</td><td class="v">${s(e.email)}</td></tr>
        </table>
      </div>
    </section>

    <table class="inv-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="r">Qty</th>
          <th class="r">Unit price</th>
          <th class="r">VAT</th>
          <th class="r">Amount (${s(t.currency)})</th>
        </tr>
      </thead>
      <tbody>${d}</tbody>
    </table>

    <div class="totalswrap">
      <div class="wordbox">
        <div class="wl">Amount in words</div>
        <div class="wv">${s(a(l.gross))}</div>
        <div class="wn">Please pay by <b>${p(t.due)}</b> and state invoice number
          <b>${s(t.number)}</b> as the payment reference.</div>
      </div>
      <table class="totals">${_}</table>
    </div>

    <div class="inv-bottom">
      <div class="col">
        <h4>Payment terms</h4>
        ${s(e.terms).replace(/\n/g,`<br>`)}
        ${u>0?`<div style="margin-top:5px">A discount of <b>${i(u)}%</b> was applied to every line item.</div>`:``}
      </div>
      <div class="col">
        <h4>Bank details</h4>
        <div><b>${s(e.bank)}</b></div>
        <div>IBAN ${s(e.iban)}</div>
        <div>BIC ${s(e.bic)}</div>
      </div>
      <div class="col signcol">
        <h4>Kind regards</h4>
        <div class="signtxt">Thank you for your continued trust — we are happy to support your next project.</div>
        <div class="signd">${s(e.signer||e.name)}</div>
      </div>
    </div>

    <footer class="inv-foot">
      <div>${s(e.legal||e.name+` · `+e.street+`, `+e.city)}<br>
        ${s(e.vatid)}${e.phone?` · `+s(e.phone):``}${e.email?` · `+s(e.email):``}</div>
      <div class="pg">Page 1 of 1</div>
    </footer>
  </article>`}var g=document.getElementById(`app`);g.innerHTML=`
<div class="shell">
  <div class="topbar">
    <div class="mark">N</div>
    <div>
      <h1>Invoice Studio</h1>
      <div class="sub">Fill in the details on the left — the A4 invoice on the right is print- and PDF-ready.</div>
    </div>
    <div class="grow"></div>
    <button class="btn ghost" id="btn-reset" type="button">Reset sender</button>
    <button class="btn" id="btn-print" type="button">Print / Save as PDF</button>
  </div>
  <div class="workspace">
    <aside class="panel" id="panel"></aside>
    <main class="stage">
      <div class="stage-inner">
        <div class="stage-cap">
          <span>Live preview</span>
          <span class="dot"></span>
          <span>A4 portrait · 210 × 297 mm</span>
          <span class="grow"></span>
          <span id="zoom">100 %</span>
        </div>
        <div class="scaler" id="scaler"></div>
      </div>
    </main>
  </div>
  <div class="stage-print" id="stage-print"></div>
</div>`;var _=g.querySelector(`#panel`),v=g.querySelector(`#scaler`),y=g.querySelector(`#stage-print`);function b(e,n,r,i=``){let a=r?t[r][n]:t[n];return`<div class="field"><label>${e}</label>
    <input data-k="${n}" ${r?`data-g="${r}"`:``} value="${s(a)}" ${i}></div>`}function x(){_.innerHTML=`<div class="panel-body">
    <section>
    <h2>Sender · letterhead</h2>
    ${b(`Company name`,`name`,`sender`)}
    ${b(`Tagline`,`tag`,`sender`)}
    <div class="row2">${b(`Street`,`street`,`sender`)}${b(`Postcode & city`,`city`,`sender`)}</div>
    <div class="row2">${b(`Country`,`country`,`sender`)}${b(`VAT ID`,`vatid`,`sender`)}</div>
    <div class="row2">${b(`Email`,`email`,`sender`)}${b(`Phone`,`phone`,`sender`)}</div>
    <div class="row2">${b(`IBAN`,`iban`,`sender`)}${b(`BIC`,`bic`,`sender`)}</div>
    <div class="row2">${b(`Signature line`,`signer`,`sender`)}${b(`Legal note`,`legal`,`sender`)}</div>
    <div class="field"><label>Payment terms</label>
      <textarea data-k="terms" data-g="sender">${s(t.sender.terms)}</textarea></div>
    <div class="tplbar">
      <select id="tpl-select" aria-label="Saved sender templates"></select>
      <button class="mini" id="tpl-save" type="button">Save sender</button>
      <button class="mini" id="tpl-load" type="button">Load</button>
      <button class="mini" id="tpl-del" type="button">Delete</button>
    </div>
    <p class="hint">Sender templates are stored in this browser only.</p>
  </section>

  <section>
    <h2>Customer · address window</h2>
    ${b(`Name`,`name`,`customer`)}
    ${b(`Attention / department`,`attn`,`customer`)}
    ${b(`Street`,`street`,`customer`)}
    <div class="row2">${b(`Postcode & city`,`city`,`customer`)}${b(`Country`,`country`,`customer`)}</div>
  </section>

  <section>
    <h2>Invoice details</h2>
    <div class="row2">${b(`Invoice number`,`number`)}${b(`Currency`,`currency`)}</div>
    <div class="row2">${b(`Invoice date`,`date`,null,`type="date"`)}${b(`Due date`,`due`,null,`type="date"`)}</div>
    <div class="row2">${b(`Your order / PO`,`po`)}${b(`Discount %`,`discount_pct`,null,`type="number" step="0.1" min="0" max="100"`)}</div>
  </section>

  <section>
    <h2>Line items</h2>
    <div class="items-head">
      <span>Description</span><span class="r">Qty</span><span class="r">Unit price</span>
      <span class="r">VAT %</span><span></span>
    </div>
    <div id="lines"></div>
    <button class="addline" id="add-line" type="button">+ Add line item</button>
  </section>

  </div>
  <div class="summary" id="summary"></div>`,S(),E()}function S(){let e=_.querySelector(`#lines`);e.innerHTML=t.items.map((e,t)=>`<div class="item" data-i="${t}">
        <input data-f="desc" value="${s(e.desc)}" placeholder="Description">
        <input data-f="qty" class="num" type="number" step="any" min="0" value="${s(e.qty)}">
        <input data-f="price" class="num" type="number" step="any" min="0" value="${s(e.price)}">
        <input data-f="vat" class="num" type="number" step="any" min="0" value="${s(e.vat)}">
        <button class="rm" type="button" title="Remove line">×</button>
      </div>`).join(``)}var C=`invoice-studio-templates-v1`,w=()=>{try{return JSON.parse(localStorage.getItem(C)||`{}`)||{}}catch{return{}}},T=e=>{try{localStorage.setItem(C,JSON.stringify(e))}catch{}};function E(){let e=_.querySelector(`#tpl-select`);if(!e)return;let t=Object.keys(w()).sort();e.innerHTML=`<option value="">${t.length?`Choose template…`:`No saved templates yet`}</option>`+t.map(e=>`<option value="${s(e)}">${s(e)}</option>`).join(``)}_.addEventListener(`click`,e=>{let n=e.target,r=n.closest&&n.closest(`.rm`);if(r){let e=Number(r.closest(`.item`).dataset.i);t.items.splice(e,1),t.items.length||t.items.push({desc:``,qty:1,price:0,vat:19}),S(),D();return}if(n.closest(`#add-line`)){t.items.push({desc:``,qty:1,price:0,vat:19}),S(),D();let e=_.querySelector(`#lines .item:last-child input`);e&&e.focus();return}if(n.closest(`#tpl-save`)){let e=String(t.sender.name||`Sender`).trim()||`Sender`,n=w();n[e]={...t.sender},T(n),E();let r=_.querySelector(`#tpl-select`);r&&(r.value=e);return}if(n.closest(`#tpl-load`)){let e=_.querySelector(`#tpl-select`),n=w();e&&e.value&&n[e.value]&&(t.sender={...n[e.value]},x(),D());return}if(n.closest(`#tpl-del`)){let e=_.querySelector(`#tpl-select`);if(e&&e.value){let t=w();delete t[e.value],T(t),E()}}}),_.addEventListener(`input`,e=>{let n=e.target;if(n.dataset&&n.dataset.f!==void 0){let e=t.items[Number(n.closest(`.item`).dataset.i)];e&&(e[n.dataset.f]=n.dataset.f===`desc`?n.value:Number(n.value)),D();return}if(n.dataset&&n.dataset.k){let e=n.dataset.g,r=n.type===`number`?Number(n.value):n.value;e?t[e][n.dataset.k]=r:t[n.dataset.k]=r,D()}}),g.querySelector(`#btn-print`).addEventListener(`click`,()=>window.print()),g.querySelector(`#btn-reset`).addEventListener(`click`,()=>{t.sender={...e},x(),D()});function D(){let e=h();v.innerHTML=e,y.innerHTML=e,O(),document.title=String(t.number||`Invoice`)+` · `+String(t.sender.name||`Invoice`),k()}function O(){let e=_.querySelector(`#summary`);if(!e)return;let n=o(t.items,t.discount_pct),i=`<span class="cur">${s(t.currency)}</span>`;e.innerHTML=`<div class="cell"><div class="k">Lines</div><div class="v">${t.items.length}</div></div><div class="cell"><div class="k">Net</div><div class="v">${i}${r(n.net)}</div></div><div class="cell"><div class="k">VAT</div><div class="v">${i}${r(n.vat)}</div></div><div class="cell big"><div class="k">Gross</div><div class="v">${i}${r(n.gross)}</div></div>`}function k(){let e=g.querySelector(`.stage`);if(!e)return;let t=e.clientWidth-70,n=Math.min(1,Math.max(.4,t/794)),r=v.querySelector(`.page`);v.style.transform=`scale(${n})`,v.style.transformOrigin=`top left`,v.style.width=794*n+`px`,v.style.height=(r&&r.offsetHeight||1123)*n+`px`;let i=g.querySelector(`#zoom`);i&&(i.textContent=Math.round(n*100)+` %`)}window.addEventListener(`resize`,k),window.APP={setInvoice(e){let n=e||{};return Array.isArray(n.items)&&(t.items=n.items.map(e=>({desc:e.desc==null?``:String(e.desc),qty:Number(e.qty)||0,price:Number(e.price)||0,vat:Number(e.vat)||0}))),n.discount_pct!==void 0&&n.discount_pct!==null&&(t.discount_pct=Number(n.discount_pct)||0),t.items.length||t.items.push({desc:``,qty:1,price:0,vat:19}),S(),D(),o(t.items,t.discount_pct)},totals(){return o(t.items,t.discount_pct)}},x(),D();