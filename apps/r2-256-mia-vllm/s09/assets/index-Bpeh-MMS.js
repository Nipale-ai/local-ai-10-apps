(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`Lichtwerk Studio GmbH`,street:`Torstraße 128`,postal:`10119`,city:`Berlin`,vatId:`DE 812 345 678`,email:`hello@lichtwerk.studio`,phone:`+49 30 555 014 20`,bank:`Spreebank Berlin AG`,iban:`DE21 3702 0500 0008 0901 02`,bic:`SPBBDEBBXXX`,terms:`Payable within 14 days net. Please quote the invoice number as payment reference.`},t={name:`Hafenkontor GmbH`,street:`Speicherstadt 14`,postal:`20457`,city:`Hamburg`,vatId:`DE 300 111 222`,number:`C-1207`};function n(){return new Date().toISOString().slice(0,10)}function r(){let r=n(),i=new Date(r+`T00:00:00`);return i.setDate(i.getDate()+14),{sender:{...e},customer:{...t},meta:{number:`2026-0042`,date:r,due:i.toISOString().slice(0,10),dueTouched:!1,subject:`Brand refresh & website — October 2026`},items:[{desc:`Brand identity refresh`,qty:1,price:2400,vat:19},{desc:`Website design & build (responsive)`,qty:2,price:1450,vat:19},{desc:`Animated logo, per second`,qty:30,price:45,vat:19},{desc:`Print brochure A5, offset run`,qty:250,price:3.2,vat:7},{desc:`Stock photo license pack`,qty:5,price:29,vat:0}],discount_pct:5}}var i=r();function a(e){return Math.floor(e*100+.5+1e-6)/100}function o(e,t){let n=(Number(t)||0)/100,r={};for(let t of e||[]){let e=String(Number(t.vat)||0),i=(Number(t.qty)||0)*(Number(t.price)||0)*(1-n);r[e]=(r[e]||0)+i}let i=Object.keys(r).sort((e,t)=>Number(t)-Number(e)),o={},s=0,c=0;for(let e of i){let t=a(r[e]),n=a(t*(Number(e)/100));o[e]=n,s+=t,c+=n}return s=a(s),c=a(c),{net:s,vat:c,gross:a(s+c),vat_by_rate:o}}function s(e){let t=0;for(let n of e||[])t+=(Number(n.qty)||0)*(Number(n.price)||0);return a(t)}var c={senderFields:[[`s-name`,`sender`,`name`,`Company / name`,`text`,`span2`],[`s-street`,`sender`,`street`,`Street & no.`,`text`,`span2`],[`s-postal`,`sender`,`postal`,`Postal code`,`text`,``],[`s-city`,`sender`,`city`,`City`,`text`,``],[`s-vatId`,`sender`,`vatId`,`VAT ID`,`text`,``],[`s-email`,`sender`,`email`,`Email`,`text`,``],[`s-phone`,`sender`,`phone`,`Phone`,`text`,`span2`]],customerFields:[[`c-name`,`customer`,`name`,`Company / name`,`text`,`span2`],[`c-street`,`customer`,`street`,`Street & no.`,`text`,`span2`],[`c-postal`,`customer`,`postal`,`Postal code`,`text`,``],[`c-city`,`customer`,`city`,`City`,`text`,``],[`c-vatId`,`customer`,`vatId`,`VAT ID (optional)`,`text`,``],[`c-number`,`customer`,`number`,`Customer no. (optional)`,`text`,``]],metaFields:[[`m-number`,`meta`,`number`,`Invoice number`,`text`,``],[`m-date`,`meta`,`date`,`Invoice date`,`date`,``],[`m-due`,`meta`,`due`,`Due date`,`date`,``],[`m-subject`,`meta`,`subject`,`Subject / reference`,`text`,`span2`]],payFields:[[`s-bank`,`sender`,`bank`,`Bank`,`text`,`span2`],[`s-iban`,`sender`,`iban`,`IBAN`,`text`,`span2`],[`s-bic`,`sender`,`bic`,`BIC (optional)`,`text`,``],[`s-terms`,`sender`,`terms`,`Payment terms`,`text`,`span2`]]};function l(e){for(let[e,t]of Object.entries(c)){let n=document.getElementById(e);n.innerHTML=t.map(([e,t,n,r,i,a])=>`
      <div class="field ${a}">
        <label for="${e}">${r}</label>
        <input id="${e}" type="${i}" data-sec="${t}" data-key="${n}">
      </div>`).join(``)}document.querySelectorAll(`input[data-sec]`).forEach(t=>{t.addEventListener(`input`,()=>{i[t.dataset.sec][t.dataset.key]=t.value,t.id===`m-date`&&!i.meta.dueTouched&&(i.meta.due=u(t.value,14),document.getElementById(`m-due`).value=i.meta.due),t.id===`m-due`&&(i.meta.dueTouched=!0),e()})});let t=document.getElementById(`f-discount`);t.addEventListener(`input`,()=>{let n=parseFloat(t.value);i.discount_pct=Number.isFinite(n)?Math.max(0,Math.min(100,n)):0,e()})}function u(e,t){if(!e)return``;let n=new Date(e+`T00:00:00`);return isNaN(n)?``:(n.setDate(n.getDate()+t),n.toISOString().slice(0,10))}function d(){document.querySelectorAll(`input[data-sec]`).forEach(e=>{e.value=i[e.dataset.sec][e.dataset.key]??``}),document.getElementById(`f-discount`).value=String(i.discount_pct),m()}var f=()=>document.getElementById(`items`);function p(e,t){return`
  <div class="item-row" data-i="${t}">
    <input class="it-desc" type="text" placeholder="Description of service or product" aria-label="Item ${t+1} description" value="${(e=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]))(e.desc)}">
    <input class="it-qty" type="number" min="0" step="0.01" aria-label="Item ${t+1} quantity" value="${e.qty}">
    <input class="it-price" type="number" min="0" step="0.01" aria-label="Item ${t+1} unit price in euros" value="${e.price}">
    <select class="it-vat" aria-label="Item ${t+1} VAT rate">
      <option value="19"${Number(e.vat)===19?` selected`:``}>19 %</option>
      <option value="7"${Number(e.vat)===7?` selected`:``}>7 %</option>
      <option value="0"${Number(e.vat)===0?` selected`:``}>0 %</option>
    </select>
    <button class="it-del" type="button" aria-label="Remove item ${t+1}" title="Remove item">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
  </div>`}function m(){f().innerHTML=i.items.map(p).join(``)}function h(e){let t=f(),n=t=>{let n=t.target.closest(`.item-row`);if(!n)return;let r=i.items[Number(n.dataset.i)];r&&(t.target.classList.contains(`it-desc`)?r.desc=t.target.value:t.target.classList.contains(`it-qty`)?r.qty=Math.max(0,parseFloat(t.target.value)||0):t.target.classList.contains(`it-price`)?r.price=Math.max(0,parseFloat(t.target.value)||0):t.target.classList.contains(`it-vat`)&&(r.vat=Number(t.target.value)),e())};t.addEventListener(`input`,n),t.addEventListener(`change`,n),t.addEventListener(`click`,t=>{let n=t.target.closest(`.it-del`);if(!n)return;let r=n.closest(`.item-row`);i.items.splice(Number(r.dataset.i),1),m(),e()}),document.getElementById(`addItem`).addEventListener(`click`,()=>{i.items.push({desc:``,qty:1,price:0,vat:19}),m();let t=f().querySelectorAll(`.item-row`);t[t.length-1]?.querySelector(`.it-desc`)?.focus(),e()})}var g=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),_=e=>(Math.round(e*100)/100).toFixed(2),v=e=>String(Math.round(e*100)/100);function y(e){if(!e)return`—`;let t=new Date(e+`T00:00:00`);return isNaN(t)?`—`:t.toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`})}function b(){let e=i.sender,t=i.customer,n=i.meta,r=o(i.items,i.discount_pct),c=Number(i.discount_pct)||0,l=s(i.items),u=a(l-r.net),d=i.items.map((e,t)=>{let n=a((Number(e.qty)||0)*(Number(e.price)||0)*(1-c/100));return`<tr>
      <td class="td-i">${t+1}</td>
      <td class="td-desc">${g(e.desc)||`<span class="empty">—</span>`}</td>
      <td class="num">${v(Number(e.qty)||0)}</td>
      <td class="num">${_(Number(e.price)||0)}</td>
      <td class="num">${Number(e.vat)||0} %</td>
      <td class="num strong">${_(n)}</td>
    </tr>`}).join(``),f=Object.keys(r.vat_by_rate).sort((e,t)=>Number(t)-Number(e)).map(e=>`<div class="trow"><span>VAT ${e} %</span><b>${_(r.vat_by_rate[e])}</b></div>`).join(``),p=c>0?`
      <div class="trow"><span>Subtotal</span><b>${_(l)}</b></div>
      <div class="trow discount"><span>Discount (${c} %)</span><b>−${_(u)}</b></div>`:``,m=[t.vatId?`VAT ID: ${g(t.vatId)}`:``,t.number?`Customer no. ${g(t.number)}`:``].filter(Boolean).join(` · `);return`
  <div class="sheet-head">
    <div class="sh-left">
      <svg class="logo" viewBox="0 0 48 48" width="46" height="46" role="img" aria-label="${g(e.name)} logo">
        <rect x="1" y="1" width="46" height="46" rx="10" fill="#1f4e79"></rect>
        <path d="M16 12v22h16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="32" cy="16" r="4" fill="#e8b64c"></circle>
      </svg>
      <div>
        <div class="sh-name">${g(e.name)}</div>
        <div class="sh-tag">Brand &amp; Digital Design Studio</div>
      </div>
    </div>
    <div class="sh-right">
      <div>${g(e.street)} · ${g(e.postal)} ${g(e.city)}</div>
      <div>${g(e.email)} · ${g(e.phone)}</div>
      <div>VAT ID: ${g(e.vatId)}</div>
    </div>
  </div>
  <div class="rule"></div>

  <div class="inv-meta">
    <div>
      <div class="inv-title">Invoice</div>
      <div class="inv-no">No. ${g(n.number)}</div>
    </div>
    <div class="inv-dates">
      <div class="kv"><span>Invoice date</span><b>${y(n.date)}</b></div>
      <div class="kv"><span>Due date</span><b>${y(n.due)}</b></div>
    </div>
  </div>

  <div class="addr-row">
    <div class="addr">
      <div class="label-caps">Invoice to</div>
      <div class="addr-name">${g(t.name)}</div>
      <div>${g(t.street)}</div>
      <div>${g(t.postal)} ${g(t.city)}</div>
      ${m?`<div class="addr-muted">${m}</div>`:``}
    </div>
    <div class="subject">
      <div class="label-caps">Subject</div>
      <div class="subject-text">${g(n.subject)}</div>
    </div>
  </div>

  <table class="inv-table">
    <colgroup><col class="c-i"><col class="c-desc"><col class="c-qty"><col class="c-price"><col class="c-vat"><col class="c-amt"></colgroup>
    <thead>
      <tr><th></th><th>Description</th><th class="num">Qty</th><th class="num">Unit price</th><th class="num">VAT</th><th class="num">Amount</th></tr>
    </thead>
    <tbody>${d}</tbody>
  </table>

  <div class="after-table">
    ${c>0?`<div class="disc-note">A discount of ${c} % has been applied to all line items.</div>`:`<div></div>`}
    <div class="totals">
      ${p}
      <div class="trow"><span>Net total</span><b>${_(r.net)}</b></div>
      ${f}
      <div class="trow gross"><span>Total (gross)</span><b>${_(r.gross)}</b></div>
    </div>
  </div>

  <div class="pay">
    <div class="pay-col">
      <div class="label-caps">Payment details</div>
      <div>${g(e.bank)}</div>
      <div>IBAN ${g(e.iban)}</div>
      ${e.bic?`<div>BIC ${g(e.bic)}</div>`:``}
    </div>
    <div class="pay-col">
      <div class="label-caps">Payment terms</div>
      <div>Due by <b>${y(n.due)}</b>. ${g(e.terms)}</div>
    </div>
    <div class="pay-col">
      <div class="label-caps">Questions about this invoice?</div>
      <div>${g(e.email)}</div>
      <div>${g(e.phone)}</div>
      <div class="thanks">Thank you for your business!</div>
    </div>
  </div>

  <div class="sheet-foot">
    ${g(e.name)} · Managing Director: Mara Vogel · Amtsgericht Berlin-Charlottenburg, HRB 98765 B · VAT ID: ${g(e.vatId)}
  </div>`}var x=e=>document.querySelector(e),S=x(`#sheet`),C=x(`.sheet-wrap`);function w(){S.innerHTML=b(),requestAnimationFrame(T)}function T(){let e=x(`.preview-scroll`);if(!e)return;let t=e.clientWidth-40,n=e.clientHeight-40,r=Math.max(S.scrollHeight,1123),i=Math.min(t/794,n/r,1);C.style.width=794*i+`px`,C.style.height=r*i+`px`,S.style.transform=`scale(${i})`}var E;function D(e){let t=x(`#toast`);t.textContent=e,t.classList.add(`show`),clearTimeout(E),E=setTimeout(()=>t.classList.remove(`show`),2200)}function O(){Object.assign(i,r()),d(),w(),D(`Reset to the sample invoice`)}x(`#saveTpl`).addEventListener(`click`,()=>{try{localStorage.setItem(`invoice.sender`,JSON.stringify(i.sender)),D(`Sender saved as template`)}catch{D(`Could not save template`)}}),x(`#resetBtn`).addEventListener(`click`,O),x(`#printBtn`).addEventListener(`click`,()=>window.print()),l(w),h(w);try{let e=JSON.parse(localStorage.getItem(`invoice.sender`)||`null`);e&&typeof e==`object`&&Object.assign(i.sender,e)}catch{}d(),w(),window.addEventListener(`resize`,T),window.APP={setInvoice({items:e,discount_pct:t}={}){Array.isArray(e)&&(i.items=e.map(e=>({desc:String(e?.desc??``),qty:Number(e?.qty)||0,price:Number(e?.price)||0,vat:Number(e?.vat)||0})),m()),t!=null&&(i.discount_pct=Math.max(0,Math.min(100,Number(t)||0)),x(`#f-discount`).value=String(i.discount_pct)),w()},totals(){return o(i.items,i.discount_pct)}};