(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`app`),t={sender:{name:`Nordlicht Digital GmbH`,tagline:`Digital products · Data engineering · Cloud`,street:`Speicherstadt 12`,city:`20457 Hamburg`,country:`Germany`,email:`hello@nordlicht.digital`,phone:`+49 40 555 010`,vatId:`DE 812 442 107`},customer:{name:`Helium Robotics AB`,street:`Hantverksvägen 4`,city:`161 52 Bromma`,country:`Sweden`,email:`accounts@heliumrobotics.se`},meta:{no:`RE-2026-0148`,date:`2026-09-24`,due:`2026-10-15`,ref:`PO-4412`},items:[{desc:`Frontend development (hours)`,qty:32.5,price:95,vat:19},{desc:`Backend development (hours)`,qty:18.25,price:105,vat:19},{desc:`Printed user handbook`,qty:3,price:24.9,vat:7},{desc:`Travel expenses (flat)`,qty:1,price:120,vat:0}],discount_pct:0},n=structuredClone(t),r=e=>Number(e).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),i=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function a(e){let t=new Date(e+`T12:00:00`);return isNaN(t)?e||``:t.toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`})}function o(){let e=Math.min(100,Math.max(0,Number(n.discount_pct)||0)),t=Math.round(e*10),r={},i=0;for(let e of n.items){let n=Math.round((Number(e.qty)||0)*100),a=Math.round((Number(e.price)||0)*100);if(n<=0||a<=0)continue;i+=n*a;let o=String(e.vat);r[o]=(r[o]||0n)+BigInt(n)*BigInt(a)*BigInt(1e3-t)}let a={},o=0n,s=0n;for(let e of Object.keys(r).sort((e,t)=>Number(e)-Number(t))){let t=(r[e]+50000n)/100000n,n=(t*BigInt(e)+50n)/100n;a[e]=Number(n)/100,o+=t,s+=n}return{net:Number(o)/100,vat:Number(s)/100,gross:Number(o+s)/100,vat_by_rate:a,beforeCents:i,netCents:Number(o)}}function s(e){e&&Array.isArray(e.items)&&(n.items=e.items.map(e=>({desc:String(e.desc??``),qty:Number(e.qty)||0,price:Number(e.price)||0,vat:Number(e.vat)||0}))),e&&typeof e.discount_pct==`number`&&isFinite(e.discount_pct)&&(n.discount_pct=e.discount_pct),f(),h()}window.APP={setInvoice:s,totals:()=>o()},e.innerHTML=`
<div class="topbar">
  <div class="brand">
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <rect x="1" y="1" width="24" height="24" rx="7" fill="#0e7490"/>
      <path d="M7 19 V7 l6 7.2 V7 l6 12" fill="none" stroke="#e6fbff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1>Invoice Studio</h1>
  </div>
  <div class="top-actions">
    <button type="button" id="btn-save">Save sender template</button>
    <button type="button" id="btn-load">Load saved template</button>
    <button type="button" id="btn-reset">Reset form</button>
    <button type="button" id="btn-print" class="primary">Print / Save as PDF</button>
  </div>
</div>
<div class="workspace">
  <aside class="form-panel" id="form-panel"></aside>
  <main class="stage"><section class="sheet" id="sheet" aria-label="Invoice preview"></section></main>
</div>
`;var c=document.getElementById(`form-panel`),l=document.getElementById(`sheet`),u=(e,t,n,r={})=>`<label class="fld"><span>${e}</span><input type="text" name="${r.name||``}" data-bind="${t}"${r.num?` data-num="1" inputmode="decimal"`:``} value="${i(n)}" autocomplete="off" spellcheck="false"></label>`;function d(){let e=n.sender,t=n.customer,r=n.meta;c.innerHTML=`
  <form id="form" autocomplete="off" novalidate>
    <section class="fcard">
      <h2>Sender</h2>
      <label class="fld"><span>Company name</span><input type="text" name="name" data-bind="sender.name" value="${i(e.name)}"></label>
      <div class="cols2">
        ${u(`Street address`,`sender.street`,e.street,{name:`street`})}
        ${u(`ZIP / City`,`sender.city`,e.city,{name:`city`})}
      </div>
      <div class="cols2">
        ${u(`Country`,`sender.country`,e.country,{name:`country`})}
        ${u(`VAT ID`,`sender.vatId`,e.vatId,{name:`vatid`})}
      </div>
      <div class="cols2">
        ${u(`Email`,`sender.email`,e.email,{name:`email`})}
        ${u(`Phone`,`sender.phone`,e.phone,{name:`phone`})}
      </div>
    </section>
    <section class="fcard">
      <h2>Bill to</h2>
      <label class="fld"><span>Customer name</span><input type="text" name="name" data-bind="customer.name" value="${i(t.name)}"></label>
      <div class="cols2">
        ${u(`Street address`,`customer.street`,t.street,{name:`street`})}
        ${u(`ZIP / City`,`customer.city`,t.city,{name:`city`})}
      </div>
      <div class="cols2">
        ${u(`Country`,`customer.country`,t.country,{name:`country`})}
        ${u(`Customer email`,`customer.email`,t.email,{name:`email`})}
      </div>
    </section>
    <section class="fcard">
      <h2>Invoice details</h2>
      <div class="cols2">
        <label class="fld"><span>Invoice number</span><input type="text" name="invoice-no" data-bind="meta.no" value="${i(r.no)}"></label>
        <label class="fld"><span>Customer reference</span><input type="text" name="ref" data-bind="meta.ref" value="${i(r.ref)}"></label>
      </div>
      <div class="cols2">
        <label class="fld"><span>Invoice date</span><input type="date" name="date" data-bind="meta.date" value="${i(r.date)}"></label>
        <label class="fld"><span>Due date</span><input type="date" name="due" data-bind="meta.due" value="${i(r.due)}"></label>
      </div>
    </section>
    <section class="fcard">
      <h2>Line items</h2>
      <div class="item-head"><span>Description</span><span>Qty</span><span>Unit price</span><span>VAT %</span><span></span></div>
      <div id="items"></div>
      <button type="button" id="btn-add" class="ghost">+ Add line item</button>
      <div class="cols2">
        <label class="fld"><span>Discount (%)</span><input type="text" name="discount" data-bind="discount_pct" data-num="1" inputmode="decimal" value="${i(n.discount_pct)}"></label>
        <div class="totals-mini" id="totals-mini"></div>
      </div>
    </section>
  </form>`,f(),p()}function f(){let e=document.getElementById(`items`);e&&(e.innerHTML=n.items.map((e,t)=>`
  <div class="item-row">
    <input type="text" name="desc" data-bind="items.${t}.desc" aria-label="Description for line ${t+1}" value="${i(e.desc)}" placeholder="Service or product">
    <input type="text" name="qty" data-bind="items.${t}.qty" data-num="1" inputmode="decimal" aria-label="Quantity for line ${t+1}" value="${i(e.qty)}">
    <input type="text" name="price" data-bind="items.${t}.price" data-num="1" inputmode="decimal" aria-label="Unit price for line ${t+1}" value="${i(e.price)}">
    <select name="vat" data-bind="items.${t}.vat" data-num="1" aria-label="VAT rate for line ${t+1}">
      ${[0,7,19].map(t=>`<option value="${t}"${Number(e.vat)===t?` selected`:``}>${t}</option>`).join(``)}
    </select>
    <button type="button" class="rm" data-remove="${t}" aria-label="Remove line ${t+1}" title="Remove line">✕</button>
  </div>`).join(``))}function p(){let e=o(),t=document.getElementById(`totals-mini`);t&&(t.innerHTML=`<span>Net</span><b>€ ${r(e.net)}</b><span>VAT</span><b>€ ${r(e.vat)}</b><span>Gross</span><b>€ ${r(e.gross)}</b>`)}var m=`<svg width="42" height="42" viewBox="0 0 26 26" aria-hidden="true">
  <rect x="1" y="1" width="24" height="24" rx="7" fill="#0e7490"/>
  <path d="M7 19 V7 l6 7.2 V7 l6 12" fill="none" stroke="#e6fbff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;function h(){let e=o(),t=n.sender,s=n.customer,c=n.meta,u=Math.min(100,Math.max(0,Number(n.discount_pct)||0)),d=(e.beforeCents-e.netCents)/100,f=n.items.map((e,t)=>{let n=Math.round((Number(e.qty)||0)*100)*Math.round((Number(e.price)||0)*100)/1e4;return`<tr class="item${t%2?` alt`:``}">
      <td class="c-desc">${i(e.desc)||`&nbsp;`}</td>
      <td class="c-qty">${r(e.qty)}</td>
      <td class="c-price">${r(e.price)}</td>
      <td class="c-vat">${i(e.vat)} %</td>
      <td class="c-amt">${r(n)}</td>
    </tr>`}).join(``),p=Object.entries(e.vat_by_rate).map(([e,t])=>`<div class="trow"><span>VAT ${i(e)} %</span><span>${r(t)}</span></div>`).join(``),h=u>0&&d>0||u>0?`<div class="trow"><span>Discount ${r(u)} %</span><span>− ${r(d)}</span></div>`:``,g=Math.max(0,Math.round((new Date(c.due+`T12:00:00`)-new Date(c.date+`T12:00:00`))/864e5)||30);l.innerHTML=`
  <header class="s-head">
    <div class="s-mark">
      ${m}
      <div>
        <p class="s-co">${i(t.name)}</p>
        <p class="s-tag">${i(t.tagline)}</p>
        <p class="s-contact">${i(t.street)}, ${i(t.city)}, ${i(t.country)} · ${i(t.email)} · ${i(t.phone)}</p>
      </div>
    </div>
    <div class="s-title">
      <h2>INVOICE</h2>
      <p class="s-no">${i(c.no)}</p>
    </div>
  </header>

  <div class="s-parties">
    <div class="s-window">
      <p class="s-to">Invoice to</p>
      <p class="s-cust">${i(s.name)}</p>
      <p>${i(s.street)}<br>${i(s.city)}<br>${i(s.country)}</p>
    </div>
    <div class="s-due">
      <p class="s-to">Invoice details</p>
      <dl>
        <dt>Invoice number</dt><dd>${i(c.no)}</dd>
        <dt>Invoice date</dt><dd>${i(a(c.date))}</dd>
        <dt>Due date</dt><dd>${i(a(c.due))}</dd>
        <dt>Your reference</dt><dd>${i(c.ref)||`—`}</dd>
      </dl>
    </div>
  </div>

  <table class="s-table">
    <thead><tr><th>Description</th><th class="c-qty">Qty</th><th class="c-price">Unit price</th><th class="c-vat">VAT</th><th class="c-amt">Amount</th></tr></thead>
    <tbody>${f}</tbody>
  </table>

  <div class="s-foot">
    <div class="s-pay">
      <h3>Payment</h3>
      <p>Payment terms: payable within ${g} days of the invoice date, without deduction.</p>
      <p><b>Bank:</b> Hamburger Sparkasse<br>
      <b>IBAN:</b> DE89 2005 0550 1234 5678 90<br>
      <b>BIC:</b> HASPDEHH<br>
      <b>Reference:</b> ${i(c.no)}</p>
    </div>
    <div class="s-totals">
      <div class="trow"><span>Net amount</span><span>${r(e.net)}</span></div>
      ${h}
      ${p}
      <div class="trow t-gross"><span>Total due</span><span>${r(e.gross)}</span></div>
      <p class="t-cur">All amounts in EUR (€)</p>
    </div>
  </div>

  <footer class="s-bottom">
    <p>Thank you for your business. Please contact ${i(t.email)} with any questions about this invoice.</p>
    <p>${i(t.name)} · ${i(t.street)}, ${i(t.city)} · VAT ID ${i(t.vatId)} · Managing director: A. Brandt</p>
  </footer>
  `}e.addEventListener(`input`,e=>{let t=e.target,r=t.dataset?t.dataset.bind:null;if(!r)return;let i=r.split(`.`),a=n;for(let e=0;e<i.length-1;e++)a=a[i[e]];let o=i[i.length-1];if(t.dataset.num!==void 0){let e=parseFloat(String(t.value).replace(`,`,`.`));isFinite(e)||(e=0),a[o]=e}else a[o]=t.value;h(),p()}),e.addEventListener(`click`,e=>{let t=e.target.closest?e.target.closest(`[data-remove]`):null;if(t){n.items.splice(Number(t.dataset.remove),1),f(),h(),p();return}e.target.id===`btn-add`&&(n.items.push({desc:``,qty:1,price:0,vat:19}),f(),h(),p())}),document.getElementById(`btn-print`).addEventListener(`click`,()=>window.print()),document.getElementById(`btn-save`).addEventListener(`click`,()=>{try{localStorage.setItem(`invoice-sender-template`,JSON.stringify(n.sender))}catch{}}),document.getElementById(`btn-load`).addEventListener(`click`,()=>{try{let e=localStorage.getItem(`invoice-sender-template`);e&&(Object.assign(n.sender,JSON.parse(e)),d(),h())}catch{}}),document.getElementById(`btn-reset`).addEventListener(`click`,()=>{n=structuredClone(t),d(),h()}),d(),h();