(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=794,t=1123,n={name:`Nordlicht Studio GmbH`,vatid:`DE 123 456 789`,street:`Torstraße 140`,city:`10119 Berlin`,phone:`+49 30 555 0142`,email:`hello@nordlicht.studio`},r={sender:{...n},customer:{name:`Hartmann & Söhne GmbH`,street:`Leipziger Straße 42`,city:`10117 Berlin`,phone:`+49 30 555 0877`},number:`NL-2026-0147`,date:`2026-09-28`,terms:14,discount_pct:5,items:[{desc:`Website redesign — concept & wireframes`,qty:1,price:1800,vat:19},{desc:`Development sprints (hours)`,qty:32,price:95,vat:19},{desc:`Printed brand handbook`,qty:3,price:24.9,vat:7},{desc:`On-site workshop, Berlin`,qty:1,price:450,vat:19}]};function i(e,t){let n=BigInt(Math.round(Number(t||0)*10)),r={},i=0n;for(let t of e){let e=BigInt(Math.round(Number(t.qty||0)*100)),a=BigInt(Math.round(Number(t.price||0)*100)),o=String(t.vat);r[o]=(r[o]||0n)+e*a*(1000n-n),i+=e*a*1000n}let a={},o=0n,s=0n;for(let e of Object.keys(r)){let t=(r[e]+50000n)/100000n,n=(t*BigInt(e)+50n)/100n;a[e]=Number(n)/100,o+=t,s+=n}let c=(i+50000n)/100000n;return{net:Number(o)/100,vat:Number(s)/100,gross:Number(o+s)/100,vat_by_rate:a,discount_cents:Number(c-o)/100}}var a=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),o=e=>(e<0?`−`:``)+Math.abs(e).toLocaleString(`de-DE`,{minimumFractionDigits:2,maximumFractionDigits:2})+` €`,s=e=>Number(e).toLocaleString(`de-DE`,{minimumFractionDigits:0,maximumFractionDigits:2}),c=e=>String(e).padStart(2,`0`);function l(e){let t=new Date(String(e||``).slice(0,10)+`T00:00:00`);return isNaN(t)?``:`${c(t.getDate())}.${c(t.getMonth()+1)}.${t.getFullYear()}`}function u(e,t){let n=new Date(String(e||``).slice(0,10)+`T00:00:00`);return isNaN(n)?``:(n.setDate(n.getDate()+Number(t||0)),`${c(n.getDate())}.${c(n.getMonth()+1)}.${n.getFullYear()}`)}function d(){let e=i(r.items,r.discount_pct),t=Object.keys(e.vat_by_rate).map(Number).sort((e,t)=>e-t),n=r.sender,c=r.customer,d=r.items.map((e,t)=>{let n=BigInt(Math.round(Number(e.qty||0)*100)),i=BigInt(Math.round(Number(e.price||0)*100)),c=BigInt(Math.round(Number(r.discount_pct||0)*10)),l=(n*i*(1000n-c)+50000n)/100000n;return`<tr>
      <td class="td-desc">${a(e.desc)||`<span class="muted">Line item</span>`}</td>
      <td class="td-num">${s(e.qty)}</td>
      <td class="td-num">${o(e.price)}</td>
      <td class="td-num">${e.vat} %</td>
      <td class="td-amt">${o(Number(l)/100)}</td>
    </tr>`}).join(``),f=t.map(t=>`<div class="tot-row"><span>VAT ${t} %</span><span>${o(e.vat_by_rate[String(t)])}</span></div>`).join(``),p=Number(r.discount_pct)>0?`<div class="tot-row tot-disc"><span>Discount (${s(r.discount_pct)} %)</span><span>${o(-e.discount_cents)}</span></div>`:``;return`
  <div class="inv">
    <div class="inv-head">
      <div class="inv-brand">
        <svg width="46" height="46" viewBox="0 0 34 34" aria-hidden="true">
          <rect x="1" y="1" width="32" height="32" rx="8" fill="#1a56db"/>
          <path d="M10 25V9h3.4l8.2 10.6V9H25v16h-3.4L13.4 14.4V25H10z" fill="#fff"/>
        </svg>
        <div>
          <div class="inv-company">${a(n.name)}</div>
          <div class="inv-tagline">Design &amp; Software · Berlin</div>
        </div>
      </div>
      <div class="inv-titlebox">
        <div class="inv-title">INVOICE</div>
        <div class="inv-meta">
          <div><span class="muted">No.</span> ${a(r.number)}</div>
          <div><span class="muted">Issued</span> ${l(r.date)}</div>
          <div><span class="muted">Due</span> ${u(r.date,r.terms)}</div>
        </div>
      </div>
    </div>

    <div class="inv-parties">
      <div class="party">
        <div class="party-label">From</div>
        <div class="party-line strong">${a(n.name)}</div>
        <div>${a(n.street)}</div>
        <div>${a(n.city)}</div>
        <div>${a(n.phone)}</div>
        <div>${a(n.email)}</div>
        <div class="muted">VAT ID ${a(n.vatid)}</div>
      </div>
      <div class="party">
        <div class="party-label">Bill to</div>
        <div class="party-line strong">${a(c.name)}</div>
        <div>${a(c.street)}</div>
        <div>${a(c.city)}</div>
        ${c.phone?`<div>${a(c.phone)}</div>`:``}
      </div>
    </div>

    <table class="inv-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="th-num">Qty</th>
          <th class="th-num">Unit price</th>
          <th class="th-num">VAT</th>
          <th class="th-num">Amount</th>
        </tr>
      </thead>
      <tbody>${d}</tbody>
    </table>

    <div class="inv-totals">
      <div class="tot-row"><span>Net total</span><span>${o(e.net)}</span></div>
      ${p}
      ${f}
      <div class="tot-gross"><span>Gross total</span><span>${o(e.gross)}</span></div>
    </div>

    <div class="inv-payment">
      <div class="pay-left">
        <div class="party-label">Payment details</div>
        <div class="pay-grid">
          <div><span class="muted">Bank</span> Berlin Hyp AG</div>
          <div><span class="muted">IBAN</span> DE88 2004 1000 0032 4890 00</div>
          <div><span class="muted">BIC</span> COBADEFFXXX</div>
          <div><span class="muted">Reference</span> ${a(r.number)}</div>
        </div>
      </div>
      <div class="pay-right">
        <div class="party-label">Payment terms</div>
        <div>Payable within ${Number(r.terms)} days of issue</div>
        <div class="muted">due by ${u(r.date,r.terms)}</div>
      </div>
    </div>

    <div class="inv-foot">
      <div>${a(n.name)} · HRB 123456 B, Amtsgericht Charlottenburg · VAT ID ${a(n.vatid)}</div>
      <div>Thank you for your business.</div>
    </div>
  </div>`}function f(){let e=d();document.getElementById(`screen-invoice`).innerHTML=e,document.getElementById(`print-invoice`).innerHTML=e}var p=document.getElementById(`li-rows`);function m(e,t){return`<div class="li-row">
    <input type="text" class="li-desc" id="li-${t}-desc" aria-label="Line item ${t+1} description" value="${a(e.desc)}">
    <input type="number" class="li-qty" id="li-${t}-qty" aria-label="Line item ${t+1} quantity" step="0.01" min="0" value="${e.qty}">
    <input type="number" class="li-price" id="li-${t}-price" aria-label="Line item ${t+1} unit price" step="0.01" min="0" value="${e.price}">
    <select class="li-vat" id="li-${t}-vat" aria-label="Line item ${t+1} VAT rate">
      <option value="0">0 %</option><option value="7">7 %</option><option value="19">19 %</option>
    </select>
    <div class="li-amt" id="li-${t}-amt"></div>
    <button class="li-del" type="button" aria-label="Remove line item ${t+1}">×</button>
  </div>`}function h(){p.innerHTML=r.items.map((e,t)=>m(e,t)).join(``),r.items.forEach((e,t)=>{p.querySelector(`#li-${t}-vat`).value=String(e.vat),p.querySelector(`#li-${t}-desc`).addEventListener(`input`,e=>{r.items[t].desc=e.target.value,b()}),p.querySelector(`#li-${t}-qty`).addEventListener(`input`,e=>{r.items[t].qty=e.target.value===``?0:Number(e.target.value),b()}),p.querySelector(`#li-${t}-price`).addEventListener(`input`,e=>{r.items[t].price=e.target.value===``?0:Number(e.target.value),b()}),p.querySelector(`#li-${t}-vat`).addEventListener(`change`,e=>{r.items[t].vat=Number(e.target.value),b()}),p.querySelector(`.li-row:nth-child(${t+1}) .li-del`).addEventListener(`click`,()=>{r.items.splice(t,1),r.items.length||r.items.push({desc:``,qty:1,price:0,vat:19}),h(),b()})})}function g(){let e=i(r.items,r.discount_pct);return r.items.forEach((e,t)=>{let n=BigInt(Math.round(Number(e.qty||0)*100)),i=BigInt(Math.round(Number(e.price||0)*100)),a=BigInt(Math.round(Number(r.discount_pct||0)*10)),s=(n*i*(1000n-a)+50000n)/100000n;document.getElementById(`li-${t}-amt`).textContent=o(Number(s)/100)}),e}var _={"f-sender-name":[`sender`,`name`],"f-sender-vatid":[`sender`,`vatid`],"f-sender-street":[`sender`,`street`],"f-sender-city":[`sender`,`city`],"f-sender-phone":[`sender`,`phone`],"f-sender-email":[`sender`,`email`],"f-cust-name":[`customer`,`name`],"f-cust-street":[`customer`,`street`],"f-cust-city":[`customer`,`city`],"f-cust-phone":[`customer`,`phone`],"f-number":null,"f-date":null,"f-terms":null,"f-discount":null};function v(){for(let[e,t]of Object.entries(_)){let n=document.getElementById(e);n&&(t?n.value=r[t[0]][t[1]]:e===`f-number`?n.value=r.number:e===`f-date`?n.value=r.date:e===`f-terms`?n.value=String(r.terms):e===`f-discount`&&(n.value=String(r.discount_pct)))}}function y(){for(let[e,t]of Object.entries(_)){let n=document.getElementById(e);n&&n.addEventListener(`input`,()=>{t?r[t[0]][t[1]]=n.value:e===`f-number`?r.number=n.value:e===`f-date`?r.date=n.value:e===`f-terms`?r.terms=Number(n.value):e===`f-discount`&&(r.discount_pct=n.value===``?0:Number(n.value)),b()})}}function b(){f(),g()}var x=document.getElementById(`preview-clip`),S=document.getElementById(`sheet-scale`);function C(){let n=x.clientWidth-44,r=Math.min(1,n/e);S.style.transform=`scale(${r})`,r<1?x.style.height=t*r+`px`:x.style.height=``}window.addEventListener(`resize`,C),document.getElementById(`btn-add-line`).addEventListener(`click`,()=>{r.items.push({desc:``,qty:1,price:0,vat:19}),h(),b();let e=p.querySelector(`.li-row:last-child .li-desc`);e&&e.focus()}),document.getElementById(`btn-print`).addEventListener(`click`,()=>window.print()),document.getElementById(`btn-save-sender`).addEventListener(`click`,()=>{try{localStorage.setItem(`invoicestudio.sender`,JSON.stringify(r.sender))}catch{}let e=document.getElementById(`btn-save-sender`),t=e.textContent;e.textContent=`Sender saved`,setTimeout(()=>{e.textContent=t},1400)});function w(){try{let e=localStorage.getItem(`invoicestudio.sender`);e&&(r.sender={...n,...JSON.parse(e)})}catch{}}window.APP={setInvoice(e){r.items=(Array.isArray(e&&e.items)?e.items:[]).map(e=>({desc:String(e.desc??``),qty:Number(e.qty??0),price:Number(e.price??0),vat:Number(e.vat??0)})),r.discount_pct=Number((e&&e.discount_pct)??0),v(),h(),b()},totals(){return i(r.items,r.discount_pct)}},w(),v(),y(),h(),b(),C();