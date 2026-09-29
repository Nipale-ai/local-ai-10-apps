(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),n=e=>Math.round(e*100+1e-9)/100,r=new Intl.NumberFormat(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),i=e=>r.format(e),a=e=>`${i(e)} €`,o=e=>String(Number.isInteger(e)?e:n(e)),s=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],c=(e,t)=>{let[n,r,i]=String(e).split(`-`).map(Number);if(!n||!r||!i)return e;let a=new Date(n,r-1,i+t),o=e=>String(e).padStart(2,`0`);return`${a.getFullYear()}-${o(a.getMonth()+1)}-${o(a.getDate())}`},l=e=>{if(!e)return`—`;let[t,n,r]=String(e).split(`-`).map(Number);return!t||!n||!r?String(e):`${r} ${s[n-1]} ${t}`},u=e=>`
<svg width="${e}" height="${e}" viewBox="0 0 48 48" aria-hidden="true">
  <rect x="1" y="1" width="46" height="46" rx="10" fill="#155e75"/>
  <path d="M11 19h15.5a4.5 4.5 0 1 0-4.5-4.5M11 26h21.5a4.5 4.5 0 1 1-4.5 4.5M11 33h9"
    stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`,d={sender:{name:`Nordwind Digital GmbH`,street:`Ritterstraße 12`,city:`10969 Berlin, Germany`,phone:`+49 30 555 0182`,email:`invoicing@nordwind-digital.de`,vatId:`DE 214 887 363`,iban:`DE89 3704 0044 0532 0130 00`,bic:`COBADEFFXXX`,bank:`Commerzbank AG, Berlin`,legal:`HRB 128 457 B · Amtsgericht Berlin-Charlottenburg · Managing director: Jonas Brandt`},number:`INV-2026-0148`,issue:`2026-09-29`,due:`2026-10-13`,reference:`Project “Hafenwerk Rebrand”`,customer:{name:`Hafenwerk Studio GmbH`,contact:`c/o Lena Hartmann`,street:`Speicherstraße 8`,city:`20457 Hamburg, Germany`},items:[{desc:`Website concept & design`,qty:40,price:95,vat:19},{desc:`Frontend development (days)`,qty:12,price:680,vat:19},{desc:`Onboarding workshop (half day)`,qty:1,price:850,vat:19},{desc:`Care plan — 1 month`,qty:1,price:240,vat:19},{desc:`Stock photo licence pack`,qty:1,price:120,vat:7}],discount_pct:5,notes:`Please quote the invoice number on your transfer. Payment is due within 14 days, net, without deduction. Late payments incur statutory interest of 2 percentage points above the base rate per annum.`},f=`nw.invoice.v1`,p=`nw.sender.v1`,m=`nw.customer.v1`;function h(){try{let e=localStorage.getItem(f);if(e)return{...structuredClone(d),...JSON.parse(e)}}catch{}return structuredClone(d)}var g=h(),_=!1;try{let e=localStorage.getItem(p);e&&(g.sender={...structuredClone(d.sender),...JSON.parse(e)})}catch{}try{let e=localStorage.getItem(m);e&&(g.customer={...structuredClone(d.customer),...JSON.parse(e)})}catch{}var v=null;function y(){clearTimeout(v),v=setTimeout(()=>{try{localStorage.setItem(f,JSON.stringify(g))}catch{}},350)}function b(e,t){let r=1-t/100,i={},a=0;for(let t of e){let e=t.qty*t.price;a+=e;let n=String(t.vat);i[n]=(i[n]||0)+e*r}let o={},s=0,c=0;for(let e of Object.keys(i)){let t=n(i[e]),r=n(t*Number(e)/100);o[e]=r,s+=t,c+=r}return s=n(s),c=n(c),{net:s,vat:c,gross:n(s+c),vat_by_rate:o,linesTotal:n(a),discountAmount:n(n(a)-n(s))}}var x=e(`#app`);x.innerHTML=`
  <div class="toolbar">
    <div class="brand-line">
      ${u(28)}
      <div>
        <div class="app-name">Invoice Studio</div>
        <div class="app-sub">print-ready A4 invoices</div>
      </div>
    </div>
    <div class="toolbar-right">
      <button class="btn-ghost" id="new-btn" type="button">New</button>
      <button class="btn-ghost" id="sample-btn" type="button">Load sample</button>
      <button class="btn-ghost" id="copy-summary" type="button">Copy summary</button>
      <span class="page-badge" id="page-badge">A4 · one page</span>
      <button class="btn-primary" id="print-btn" type="button">Print / Save as PDF</button>
    </div>
  </div>
  <div class="main">
    <div class="form-col" id="form-col"></div>
    <div class="preview-col">
      <div class="preview-head">
        <span id="preview-title">Live preview</span>
        <span class="preview-head-right">
          <button class="btn-zoom" id="zoom-btn" type="button">100 %</button>
          <span id="preview-scale"></span>
        </span>
      </div>
      <div class="sheet-viewport" id="viewport">
        <div class="sheet-wrap" id="wrap"><div class="sheet" id="sheet"></div></div>
      </div>
    </div>
  </div>
  <div class="toast" id="toast"></div>`,e(`#print-btn`).addEventListener(`click`,()=>window.print()),e(`#zoom-btn`).addEventListener(`click`,()=>{j=j===`fit`?`full`:`fit`,M()}),e(`#sample-btn`).addEventListener(`click`,()=>{_=!1,g=structuredClone(d);try{let e=localStorage.getItem(p);e&&(g.sender={...structuredClone(d.sender),...JSON.parse(e)})}catch{}O(),T(),k(),y(),P(`Sample invoice loaded`)}),e(`#new-btn`).addEventListener(`click`,()=>{let e=String(g.number).match(/(\d+)\s*$/)?String(g.number).replace(/(\d+)\s*$/,(e,t)=>String(Number(t)+1).padStart(t.length,`0`)):`${g.number}-1`,t=new Date,n=e=>String(e).padStart(2,`0`),r=`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}`;_=!1,g.number=e,g.issue=r,g.due=c(r,14),g.reference=``,g.discount_pct=0,g.items=[{desc:``,qty:1,price:0,vat:19}],O(),T(),k(),y(),P(`Started ${e}`)});var S=[19,7,0];function C(){let t=e(`#form-col`);t.innerHTML=`
  <section class="card">
    <div class="card-head"><h3>Sender</h3>
      <div class="card-actions">
        <button class="btn-link" id="reset-sender" type="button">Reset</button>
        <button class="btn-link accent" id="save-sender" type="button">Save as template</button>
      </div>
    </div>
    <div class="row2">
      <div class="field"><label>Company name</label><input id="f-sender-name"></div>
      <div class="field"><label>VAT ID</label><input id="f-sender-vatId"></div>
    </div>
    <div class="field"><label>Street</label><input id="f-sender-street"></div>
    <div class="field"><label>City / ZIP / Country</label><input id="f-sender-city"></div>
    <div class="row2">
      <div class="field"><label>Phone</label><input id="f-sender-phone"></div>
      <div class="field"><label>Email</label><input id="f-sender-email"></div>
    </div>
    <div class="row2">
      <div class="field"><label>IBAN <button class="btn-mini" id="copy-iban" type="button" title="Copy IBAN">Copy</button></label><input id="f-sender-iban"></div>
      <div class="field"><label>BIC</label><input id="f-sender-bic"></div>
    </div>
    <div class="field"><label>Bank</label><input id="f-sender-bank"></div>
    <div class="field"><label>Legal notice (footer)</label><input id="f-sender-legal"></div>
  </section>

  <section class="card">
    <div class="card-head"><h3>Invoice</h3></div>
    <div class="row2">
      <div class="field"><label>Invoice number</label><input id="f-number"></div>
      <div class="field"><label>Project reference</label><input id="f-reference"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Issue date</label><input type="date" id="f-issue"></div>
      <div class="field"><label>Due date</label><input type="date" id="f-due"></div>
    </div>
    <div class="due-hint" id="due-hint"></div>
    <div class="field">
      <label>Payment terms</label>
      <select id="f-terms">
        <option value="7">Net 7 days</option>
        <option value="14" selected>Net 14 days</option>
        <option value="30">Net 30 days</option>
      </select>
    </div>
  </section>

  <section class="card">
    <div class="card-head"><h3>Customer</h3><div class="card-actions"><button class="btn-link" id="save-customer" type="button">Save customer</button></div></div>
    <div class="row2">
      <div class="field"><label>Company</label><input id="f-customer-name"></div>
      <div class="field"><label>Contact</label><input id="f-customer-contact"></div>
    </div>
    <div class="field"><label>Street</label><input id="f-customer-street"></div>
    <div class="field"><label>City / ZIP / Country</label><input id="f-customer-city"></div>
  </section>

  <section class="card">
    <div class="card-head"><h3>Line items</h3></div>
    <div id="items"></div>
    <button class="btn-add" id="add-item" type="button">+ Add line item</button>
  </section>

  <section class="card">
    <div class="card-head"><h3>Discount & notes</h3></div>
    <div class="field discount-row">
      <label>Discount</label>
      <input type="number" id="f-discount" min="0" max="100" step="0.5">
      <span class="pct">% on all line items</span>
    </div>
    <div class="field" style="margin-top:10px">
      <label>Notes (printed on the invoice)</label>
      <textarea id="f-notes" rows="3"></textarea>
    </div>
    <div class="form-totals" style="margin-top:12px">
      <span class="ft" id="ft-break">Net — · VAT —</span>
      <b id="ft-gross">—</b>
    </div>
  </section>`;let n=(t,n,r)=>{let i=e(`#`+t);return i.addEventListener(`input`,()=>{r(i.value),k(),y(),D()}),i};n(`f-sender-name`,()=>g.sender.name,e=>g.sender.name=e),n(`f-sender-vatId`,()=>g.sender.vatId,e=>g.sender.vatId=e),n(`f-sender-street`,()=>g.sender.street,e=>g.sender.street=e),n(`f-sender-city`,()=>g.sender.city,e=>g.sender.city=e),n(`f-sender-phone`,()=>g.sender.phone,e=>g.sender.phone=e),n(`f-sender-email`,()=>g.sender.email,e=>g.sender.email=e),n(`f-sender-iban`,()=>g.sender.iban,e=>g.sender.iban=e),n(`f-sender-bic`,()=>g.sender.bic,e=>g.sender.bic=e),n(`f-sender-bank`,()=>g.sender.bank,e=>g.sender.bank=e),n(`f-sender-legal`,()=>g.sender.legal,e=>g.sender.legal=e),n(`f-number`,()=>g.number,e=>g.number=e),n(`f-reference`,()=>g.reference,e=>g.reference=e),n(`f-issue`,()=>g.issue,t=>{if(g.issue=t,!_&&t){g.due=c(t,14);let n=e(`#f-due`);n&&(n.value=g.due)}}),n(`f-due`,()=>g.due,e=>{g.due=e,_=!0}),e(`#f-terms`).addEventListener(`change`,t=>{g.issue&&(g.due=c(g.issue,Number(t.target.value)),_=!0,e(`#f-due`).value=g.due,k(),y())}),n(`f-customer-name`,()=>g.customer.name,e=>g.customer.name=e),n(`f-customer-contact`,()=>g.customer.contact,e=>g.customer.contact=e),n(`f-customer-street`,()=>g.customer.street,e=>g.customer.street=e),n(`f-customer-city`,()=>g.customer.city,e=>g.customer.city=e),n(`f-discount`,()=>g.discount_pct,e=>g.discount_pct=Math.max(0,Math.min(100,Number(e)||0))),n(`f-notes`,()=>g.notes,e=>g.notes=e),e(`#add-item`).addEventListener(`click`,()=>{g.items.push({desc:``,qty:1,price:0,vat:19}),T(),k(),y(),D()}),e(`#copy-summary`).addEventListener(`click`,async()=>{let e=b(g.items,g.discount_pct),t=g.items.map((e,t)=>`${t+1}. ${e.desc||`Item`} — ${e.qty} × ${a(e.price)} (${e.vat} %) = ${a(e.qty*e.price)}`).join(`
`),n=[`Invoice ${g.number}`,`${g.sender.name} → ${g.customer.name}`,`Issued ${g.issue} · Due ${g.due}`,``,t,g.discount_pct?`Discount (${g.discount_pct} %): −${a(e.discountAmount)}`:null,`Net: ${a(e.net)}`,...Object.entries(e.vat_by_rate).filter(([,e])=>e>0).map(([e,t])=>`VAT ${e} %: ${a(t)}`),`Total: ${a(e.gross)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(n),P(`Invoice summary copied`)}catch{P(`Could not copy summary`)}}),e(`#copy-iban`).addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(g.sender.iban),P(`IBAN copied to clipboard`)}catch{P(`Could not copy IBAN`)}}),e(`#save-customer`).addEventListener(`click`,()=>{try{localStorage.setItem(m,JSON.stringify(g.customer))}catch{}P(`Customer saved for next time`)}),e(`#save-sender`).addEventListener(`click`,()=>{try{localStorage.setItem(p,JSON.stringify(g.sender))}catch{}P(`Sender saved as template`)}),e(`#reset-sender`).addEventListener(`click`,()=>{g.sender=structuredClone(d.sender),O(),k(),y(),P(`Sender reset to default`)})}function w(e){let t=[...S];return t.includes(Number(e))||t.unshift(Number(e)),t.map(t=>`<option value="${t}"${t===Number(e)?` selected`:``}>${t} %</option>`).join(``)}function T(){let n=e(`#items`);n.innerHTML=g.items.map((e,n)=>`
    <div class="item-row" data-i="${n}">
      <input class="desc" type="text" placeholder="Description" value="${t(e.desc)}">
      <input type="number" min="0" step="any" value="${e.qty}" aria-label="Quantity">
      <input type="number" min="0" step="any" value="${e.price}" aria-label="Unit price">
      <select aria-label="VAT rate">${w(e.vat)}</select>
      <button class="btn-dup" type="button" title="Duplicate line">dup</button>
      <button class="btn-remove" type="button" title="Remove line">×</button>
      <div class="amt">${a(e.qty*e.price)}</div>
    </div>`).join(``),n.querySelectorAll(`.item-row`).forEach(e=>{let t=Number(e.dataset.i),[r,i,a,o]=[e.querySelector(`.desc`),e.querySelectorAll(`input[type=number]`)[0],e.querySelectorAll(`input[type=number]`)[1],e.querySelector(`select`)];r.addEventListener(`input`,()=>{g.items[t].desc=r.value,k(),y()}),i.addEventListener(`input`,()=>{g.items[t].qty=Math.max(0,Number(i.value)||0),k(),y(),E(e,t)}),a.addEventListener(`input`,()=>{g.items[t].price=Math.max(0,Number(a.value)||0),k(),y(),E(e,t)}),o.addEventListener(`change`,()=>{g.items[t].vat=Number(o.value),k(),y()}),e.querySelector(`.btn-dup`).addEventListener(`click`,()=>{g.items.splice(t+1,0,{...g.items[t]}),T(),k(),y(),D()}),e.querySelector(`.btn-remove`).addEventListener(`click`,()=>{g.items.splice(t,1),T(),k(),y(),D()}),[r,i,a].forEach(e=>e.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault(),g.items.push({desc:``,qty:1,price:0,vat:19}),T(),k(),y(),D();let t=n.querySelectorAll(`.item-row`),r=t[t.length-1];r&&r.querySelector(`.desc`).focus()}}))}),D()}function E(e,t){let n=g.items[t];e.querySelector(`.amt`).textContent=a(n.qty*n.price)}function D(){let t=b(g.items,g.discount_pct),n=e(`#ft-gross`);n&&(n.textContent=a(t.gross));let r=e(`#ft-break`);r&&(r.textContent=`Net ${i(t.net)} · VAT ${i(t.vat)}${g.discount_pct>0?` · ${o(g.discount_pct)} % discount`:``}`)}function O(){let t=(t,n)=>{let r=e(`#`+t);r&&(r.value=n??``)};t(`f-sender-name`,g.sender.name),t(`f-sender-vatId`,g.sender.vatId),t(`f-sender-street`,g.sender.street),t(`f-sender-city`,g.sender.city),t(`f-sender-phone`,g.sender.phone),t(`f-sender-email`,g.sender.email),t(`f-sender-iban`,g.sender.iban),t(`f-sender-bic`,g.sender.bic),t(`f-sender-bank`,g.sender.bank),t(`f-sender-legal`,g.sender.legal),t(`f-number`,g.number),t(`f-reference`,g.reference),t(`f-issue`,g.issue),t(`f-due`,g.due),t(`f-customer-name`,g.customer.name),t(`f-customer-contact`,g.customer.contact),t(`f-customer-street`,g.customer.street),t(`f-customer-city`,g.customer.city),t(`f-discount`,g.discount_pct),t(`f-notes`,g.notes)}function k(){let n=g,r=b(n.items,n.discount_pct),s=Object.keys(r.vat_by_rate).map(Number).sort((e,t)=>t-e),c=n.items.map(e=>`
    <tr>
      <td class="desc">${t(e.desc)||`<span style="color:#a8b4c0">—</span>`}</td>
      <td class="num">${o(e.qty)}</td>
      <td class="num">${i(e.price)}</td>
      <td class="vat">${Number(e.vat)} %</td>
      <td class="num">${i(e.qty*e.price)}</td>
    </tr>`).join(``),d=s.map(e=>`
    <div class="trow"><span>VAT ${e} %</span><b>${i(r.vat_by_rate[String(e)])}</b></div>`).join(``),f=n.discount_pct>0?`
    <div class="trow"><span>Discount (${o(n.discount_pct)} %)</span><b>−${i(r.discountAmount)}</b></div>`:``;e(`#sheet`).innerHTML=`
  <div class="sheet-accent"></div>
  <header class="inv-head">
    <div class="brand">
      ${u(46)}
      <div class="brand-txt">
        <div class="brand-name">${t(n.sender.name)}</div>
        <div class="brand-addr">
          ${t(n.sender.street)}<br>
          ${t(n.sender.city)}<br>
          ${t(n.sender.phone)} · ${t(n.sender.email)}<br>
          VAT ID ${t(n.sender.vatId)}
        </div>
      </div>
    </div>
    <div class="inv-meta">
      <div class="inv-title">Invoice</div>
      <div class="inv-no">${t(n.number)}</div>
      <div class="meta-grid">
        <span>Issue date</span><b>${l(n.issue)}</b>
        <span>Due date</span><b>${l(n.due)}</b>
      </div>
    </div>
  </header>
  <div class="head-rule"></div>
  <section class="billto">
    <div>
      <div class="block-label">Billed to</div>
      <div class="billto-name">${t(n.customer.name)||`—`}</div>
      <div class="billto-addr">
        ${t(n.customer.contact)?t(n.customer.contact)+`<br>`:``}${t(n.customer.street)}<br>
        ${t(n.customer.city)}
      </div>
    </div>
    <div class="billto-right">
      ${t(n.reference)?`Project reference<br><b>`+t(n.reference)+`</b>`:``}
    </div>
  </section>
  <table class="items">
    <thead>
      <tr>
        <th style="width:44%">Description</th>
        <th class="r" style="width:12%">Qty</th>
        <th class="r" style="width:16%">Unit price</th>
        <th class="r" style="width:10%">VAT</th>
        <th class="r" style="width:18%">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${c||`<tr><td colspan="5" style="color:#a8b4c0">No line items</td></tr>`}
    </tbody>
  </table>
  <section class="totals">
    <div class="totals-inner">
      ${n.discount_pct>0?`<div class="trow"><span>Subtotal</span><b>${i(r.linesTotal)}</b></div>
      ${f}`:``}
      <div class="trow net${n.discount_pct>0?` divided`:``}"><span>Net total</span><b>${i(r.net)}</b></div>
      ${d}
      <div class="total-due" id="total-due"><span>Total due</span><b>${a(r.gross)}</b></div>
      <div class="total-note">Incl. VAT ${i(r.vat)} €</div>
    </div>
  </section>
  <section class="pay">
    <div>
      <h4>Payment details</h4>
      <div class="kv">
        <div><span class="k">Bank</span>${t(n.sender.bank)}</div>
        <div><span class="k">IBAN</span><b>${t(n.sender.iban)}</b></div>
        <div><span class="k">BIC</span><b>${t(n.sender.bic)}</b></div>
        <div><span class="k">Invoice no.</span><b>${t(n.number)}</b></div>
      </div>
    </div>
    <div>
      <h4>Terms & notes</h4>
      <p>${t(n.notes)||`Payment due within 14 days of the issue date.`}</p>
    </div>
  </section>
  <footer class="inv-foot">
    <div>${t(n.sender.legal)}<br>VAT ID ${t(n.sender.vatId)} · ${t(n.sender.email)}</div>
    <div class="thanks">Thank you for your business · Page 1 of 1</div>
  </footer>`;let p=e(`#due-hint`);if(p){if(n.issue&&n.due){let e=Math.round((new Date(n.due)-new Date(n.issue))/864e5);e<0?(p.textContent=`Due date is before the issue date`,p.classList.add(`warn`)):e===0?(p.textContent=`Due on the issue date`,p.classList.remove(`warn`)):(p.textContent=`Payment due in ${e} day${e===1?``:`s`}`,p.classList.remove(`warn`))}else p.textContent=``}e(`#preview-title`).textContent=`Live preview — ${n.sender.name||`your company`}`;let m=e(`#sheet`);m.classList.remove(`compact`);let h=m.scrollHeight>1123;m.classList.toggle(`compact`,h);let _=e(`#page-badge`);_&&(_.textContent=h?`A4 · compact layout`:`A4 · one page`);let v=e(`#total-due`);v&&A!==null&&r.gross!==A&&(v.classList.remove(`flash`),v.offsetWidth,v.classList.add(`flash`)),A=r.gross}var A=null,j=`fit`;function M(){let t=e(`#viewport`),n=e(`#wrap`),r=e(`#sheet`),i=Math.min((t.clientWidth-40)/794,(t.clientHeight-40)/1123,1),a=j===`fit`?i:1;n.style.width=`${794*a}px`,n.style.height=`${1123*a}px`,n.style.margin=a>=1?`0 auto`:``,r.style.transform=`scale(${a})`,e(`#preview-scale`).textContent=`${Math.round(a*100)} %`;let o=e(`#zoom-btn`);o&&(o.textContent=j===`fit`?`100 %`:`Fit page`)}var N=null;function P(t){let n=e(`#toast`);n.textContent=t,n.classList.add(`show`),clearTimeout(N),N=setTimeout(()=>n.classList.remove(`show`),2200)}window.APP={setInvoice({items:e,discount_pct:t}={}){Array.isArray(e)&&(g.items=e.map(e=>({desc:String(e.desc??``),qty:Number(e.qty)||0,price:Number(e.price)||0,vat:Number(e.vat)||0}))),t!==void 0&&(g.discount_pct=Number(t)||0),O(),T(),k(),y()},totals(){return b(g.items,g.discount_pct)}},C(),O(),T(),k(),M(),window.addEventListener(`resize`,M),new ResizeObserver(M).observe(e(`#viewport`));