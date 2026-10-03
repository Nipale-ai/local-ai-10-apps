(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),n=e=>`€ `+Number(e).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),r=e=>{let t=Number(e)||0;return(Number.isInteger(t)?t:t.toLocaleString(`en-US`,{maximumFractionDigits:1}))+`%`},i=e=>{let t=Number(e)||0;return Number.isInteger(t)?String(t):t.toLocaleString(`en-US`,{maximumFractionDigits:2})},a=e=>{let t=new Date(e+`T00:00:00`);return isNaN(t)?``:t.toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`})},o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,s=new Date,c=new Date(s.getTime()+2592e6),l={sender:{name:`Studio Nordlicht GmbH`,street:`Speicherstadtweg 12`,zip:`20457`,city:`Hamburg`,country:`Germany`,email:`billing@nordlicht.studio`,phone:`+49 40 228 1730`,vatid:`DE 314 159 265`,bank:`Hamburger Sparkasse`,iban:`DE44 2005 0550 1234 5678 90`,bic:`HASPDEHHXXX`},recipient:{name:`Bergwerk Media GmbH`,attn:`Katrin Vogel`,street:`Torstraße 140`,zip:`10119`,city:`Berlin`,country:`Germany`},meta:{number:`2026-0412`,date:o(s),due:o(c),terms:`Payment due within 30 days of the invoice date.`},items:[{desc:`Brand identity design — logo, color system, typography`,qty:1,price:2400,vat:19},{desc:`Website design — desktop & mobile templates`,qty:1,price:1850,vat:19},{desc:`Content production — copywriting & image licensing`,qty:12,price:45,vat:7}],discount_pct:0},u=JSON.parse(JSON.stringify(l));function d(e,t){let n=BigInt(Math.round((Number(t)||0)*10)),r=new Map,i=0n;for(let t of e){let e=BigInt(Math.round((Number(t.qty)||0)*100)),a=BigInt(Math.round((Number(t.price)||0)*100)),o=String(Number(t.vat)||0);r.set(o,(r.get(o)||0n)+e*a*(1000n-n)),i+=(e*a+50n)/100n}let a={},o=[],s=0n,c=0n;for(let[e,t]of r){let n=(t+50000n)/100000n,r=(n*BigInt(Math.round(Number(e)))+50n)/100n;a[e]=Number(r)/100,s+=n,c+=r,o.push({rate:Number(e),vatC:r})}return o.sort((e,t)=>t.rate-e.rate),{net:Number(s)/100,vat:Number(c)/100,gross:Number(s+c)/100,vat_by_rate:a,rows:o,netC:s,vatC:c,undiscC:i,discountC:i-s,d10:n}}var f=(e,t)=>(BigInt(Math.round((Number(e.qty)||0)*100))*BigInt(Math.round((Number(e.price)||0)*100))*(1000n-t)+50000n)/100000n;function p(){let e=d(u.items,u.discount_pct);return{net:e.net,vat:e.vat,gross:e.gross,vat_by_rate:e.vat_by_rate}}function m(e,t){return t.split(`.`).reduce((e,t)=>e==null?e:e[t],e)}function h(e,t,n){let r=t.split(`.`),i=r.pop();r.reduce((e,t)=>e[t],e)[i]=n}function g(){let n=e(`#items-rows`);n.innerHTML=u.items.map((e,n)=>`
    <div class="item-row">
      <input class="item-desc" data-k="desc" data-idx="${n}" aria-label="Line ${n+1} description" placeholder="Description" value="${t(e.desc)}">
      <input class="item-qty" type="number" step="any" min="0" data-k="qty" data-idx="${n}" aria-label="Line ${n+1} quantity" value="${e.qty}">
      <input class="item-price" type="number" step="any" min="0" data-k="price" data-idx="${n}" aria-label="Line ${n+1} unit price" value="${e.price}">
      <select class="item-vat" data-k="vat" data-idx="${n}" aria-label="Line ${n+1} VAT rate">${[0,7,19].map(t=>`<option value="${t}"${Number(e.vat)===t?` selected`:``}>${t}%</option>`).join(``)}</select>
      <button type="button" class="item-del" data-del="${n}" aria-label="Remove line ${n+1}">✕</button>
    </div>`).join(``)}function _(){let t=e(`#preview-scroll`),n=e(`#sheet`),r=e(`#sheet-wrap`),i=e(`#zoom-label`);if(!t||!n||!r)return;let a=Math.min(Math.max((t.clientWidth-48)/792,.2),1);n.style.transform=`scale(${a})`,r.style.width=792*a+`px`,r.style.height=n.offsetHeight*a+`px`,i&&(i.textContent=Math.round(a*100)+`%`)}function v(){let o=d(u.items,u.discount_pct),s=u.sender,c=u.recipient,l=u.meta,p=o.rows.filter(e=>e.rate>0).map(e=>`<div class="tot-row"><span>VAT ${e.rate}%</span><span>${n(Number(e.vatC)/100)}</span></div>`).join(``),m=o.discountC>0n?`<div class="tot-row"><span>Discount (${r(u.discount_pct)})</span><span>−${n(Number(o.discountC)/100)}</span></div>`:``;e(`#sheet`).innerHTML=`
    <div class="inv-head">
      <div class="inv-head-left">
        <div class="inv-logo">SN</div>
        <div class="inv-sender">
          <div class="inv-sender-name">${t(s.name)}</div>
          <div>${t(s.street)} · ${t(s.zip)} ${t(s.city)}</div>
          <div>${t(s.country)} · ${t(s.email)}</div>
          <div>${t(s.phone)} · VAT ID ${t(s.vatid)}</div>
        </div>
      </div>
      <div class="inv-head-right">
        <div class="inv-word">INVOICE</div>
        <div class="inv-no">No. ${t(l.number)}</div>
      </div>
    </div>
    <div class="inv-body">
      <div class="inv-grid">
        <div class="inv-billto">
          <div class="inv-label">Bill to</div>
          <div class="inv-bill-name">${t(c.name)}</div>
          ${c.attn?`<div>${t(c.attn)}</div>`:``}
          <div>${t(c.street)}</div>
          <div>${t(c.zip)} ${t(c.city)}, ${t(c.country)}</div>
        </div>
        <table class="inv-meta">
          <tr><th>Invoice no.</th><td>${t(l.number)}</td></tr>
          <tr><th>Issue date</th><td>${a(l.date)}</td></tr>
          <tr><th>Due date</th><td>${a(l.due)}</td></tr>
          <tr><th>Terms</th><td>${t(l.terms)}</td></tr>
        </table>
      </div>
      <table class="inv-items">
        <thead><tr><th class="c-num">#</th><th>Description</th><th class="c-num">Qty</th><th class="c-num">Unit price</th><th class="c-num">VAT</th><th class="c-num c-amt">Amount</th></tr></thead>
        <tbody>${u.items.map((e,r)=>`
          <tr>
            <td class="c-num">${r+1}</td>
            <td>${t(e.desc)}</td>
            <td class="c-num">${i(e.qty)}</td>
            <td class="c-num">${n(e.price)}</td>
            <td class="c-num">${Number(e.vat)||0}%</td>
            <td class="c-num c-amt">${n(Number(f(e,o.d10))/100)}</td>
          </tr>`).join(``)}</tbody>
      </table>
      <div class="inv-totals">
        <div class="tot-row"><span>Subtotal</span><span>${n(Number(o.undiscC)/100)}</span></div>
        ${m}
        <div class="tot-row tot-net"><span>Net total</span><span>${n(o.net)}</span></div>
        ${p}
        <div class="tot-row tot-grand"><span>Total due</span><span>${n(o.gross)}</span></div>
      </div>
      <div class="inv-pay">
        <div class="inv-label">Payment details</div>
        <div class="inv-pay-row"><span>Bank</span><span>${t(s.bank)}</span></div>
        <div class="inv-pay-row"><span>IBAN</span><span>${t(s.iban)}</span></div>
        <div class="inv-pay-row"><span>BIC</span><span>${t(s.bic)}</span></div>
        <div class="inv-pay-row"><span>Due by</span><span>${a(l.due)}</span></div>
      </div>
      <div class="inv-foot">
        <span>${t(s.name)} · ${t(s.city)}, ${t(s.country)}</span>
        <span>Thank you for your business!</span>
      </div>
    </div>`,_()}function y(){document.querySelectorAll(`#inv-form [data-k]:not([data-idx])`).forEach(e=>{e.value=m(u,e.dataset.k)??``})}function b(t){let n=t||{};Array.isArray(n.items)&&(u.items=n.items.map(e=>({desc:String(e.desc??``),qty:Number(e.qty)||0,price:Number(e.price)||0,vat:Number(e.vat)||0}))),n.discount_pct!=null&&(u.discount_pct=Number(n.discount_pct)||0),n.sender&&Object.assign(u.sender,n.sender),n.recipient&&Object.assign(u.recipient,n.recipient),n.meta&&Object.assign(u.meta,n.meta),g(),v();let r=e(`#f-discount`);r&&(r.value=u.discount_pct)}function x(e){let t=e.target;if(t.dataset.k){if(t.dataset.idx!==void 0){let e=u.items[+t.dataset.idx];if(!e)return;e[t.dataset.k]=t.dataset.k===`desc`?t.value:Number(t.value)||0}else h(u,t.dataset.k,t.value);v()}}var S;function C(t){let n=e(`#toast`);n.textContent=t,n.classList.add(`show`),clearTimeout(S),S=setTimeout(()=>n.classList.remove(`show`),2200)}window.APP={setInvoice:b,totals:p};function w(){try{let e=JSON.parse(localStorage.getItem(`invoice-sender-template-v1`));e&&typeof e==`object`&&Object.assign(u.sender,e)}catch{}y(),g(),v(),e(`#inv-form`).addEventListener(`input`,x),e(`#inv-form`).addEventListener(`change`,x),e(`#items-rows`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-del]`);t&&(u.items.splice(+t.dataset.del,1),g(),v())}),e(`#btn-add`).addEventListener(`click`,()=>{u.items.push({desc:``,qty:1,price:0,vat:19}),g(),v();let e=document.querySelectorAll(`.item-desc`);e.length&&e[e.length-1].focus()}),e(`#btn-reset`).addEventListener(`click`,()=>{Object.assign(u,JSON.parse(JSON.stringify(l))),y(),g(),v(),C(`Form reset to sample data`)}),e(`#btn-print`).addEventListener(`click`,()=>window.print()),e(`#btn-save-sender`).addEventListener(`click`,()=>{try{localStorage.setItem(`invoice-sender-template-v1`,JSON.stringify(u.sender)),C(`Sender template saved`)}catch{C(`Could not save template`)}}),window.addEventListener(`resize`,_)}w();