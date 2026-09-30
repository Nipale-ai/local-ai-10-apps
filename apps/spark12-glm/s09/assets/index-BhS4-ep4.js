(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=(e,t=document)=>Array.from(t.querySelectorAll(e)),n=e=>{let t=parseFloat(e);return Number.isFinite(t)?t:0};function r(e){let t=e*100,n=Math.floor(t),r=t-n;return(Math.abs(r-.5)<1e-9?n+1:Math.round(t))/100}function i(e,t){let i=new Map,a=0,o=n(t);for(let t of e){let e=n(t.qty)*n(t.price)*(1-o/100);a+=n(t.qty)*n(t.price);let r=String(n(t.vat));i.set(r,(i.get(r)||0)+e)}let s={},c={},l=0,u=0;for(let[e,t]of i){let i=r(t),a=r(i*n(e)/100);c[e]=i,s[e]=a,l+=i,u+=a}l=r(l),u=r(u);let d=r(a);return{net:l,vat:u,gross:r(l+u),vat_by_rate:s,net_by_rate:c,subtotal:d,discount:r(d-l)}}var a=e=>r(e).toFixed(2)+` €`,o=e=>{let t=r(e);return String(Number.isInteger(t)?t:parseFloat(t.toFixed(2)))},s=o,c=e=>o(e)+` %`,l=e=>{if(!e)return`—`;let[t,n,r]=e.split(`-`).map(Number);return!t||!n||!r?e:new Date(t,n-1,r).toLocaleDateString(`en-US`,{year:`numeric`,month:`short`,day:`numeric`})},u=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),d=e=>String(e||``).replace(/\s+/g,``).replace(/(.{4})/g,`$1 `).trim();function f(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}var p=new Date,m=new Date(p.getTime()+12096e5),h={sender:{name:`Nordlicht Studio GmbH`,tagline:`Brand & Digital Design`,street:`Alte Bahnhofstraße 12`,city:`20144 Hamburg`,country:`Germany`,email:`hello@nordlicht.studio`,phone:`+49 40 123 456 78`,vatId:`DE 312 456 789`,iban:`DE44 5001 0517 5407 3249 31`,bic:`INGDDEFFXXX`,bank:`ING-DiBa AG`,reg:`HRB 123456 B, Amtsgericht Hamburg`,ceo:`Managing Directors: Lena Fink, Jonas Brandt`},recipient:{contact:`Frau Dr. Miriam Petersen`,name:`Petersen & Partner Architekten PartG`,street:`Zeil 106`,city:`60313 Frankfurt am Main`,country:`Germany`},number:`2026-0142`,date:f(p),due:f(m),items:[{desc:`Corporate design refresh — logo, typography and color system`,qty:1,price:4800,vat:19},{desc:`Website relaunch — UX concept, design and implementation (hourly rate)`,qty:38,price:95,vat:19},{desc:`Print design — image brochure, 24 pages, concept to press release`,qty:1,price:1650,vat:19},{desc:`Image licensing — company photography (reduced rate)`,qty:1,price:240,vat:7}],discount_pct:5,terms:`Payment is due within 14 days of the invoice date by bank transfer. Please quote the invoice number as payment reference. Goods and services remain our property until paid in full.`},g=JSON.parse(JSON.stringify(h));function _(e,t){return t.split(`.`).reduce((e,t)=>e==null?e:e[t],e)}function v(e,t,n){let r=t.split(`.`),i=r.pop(),a=r.reduce((e,t)=>e[t],e);a[i]=n}function y(){t(`[data-bind]`).forEach(e=>{e.value=_(g,e.dataset.bind)??``})}function b(){document.body.addEventListener(`input`,e=>{let t=e.target.dataset&&e.target.dataset.bind;t&&(v(g,t,e.target.value),w(),E())})}function x(){let t=e(`#items-rows`);t.innerHTML=g.items.map((e,t)=>`
    <div class="item-row" data-idx="${t}">
      <input type="text" data-field="desc" value="${u(e.desc)}" placeholder="Description of service or product">
      <input type="number" data-field="qty" value="${e.qty}" min="0" step="any" placeholder="1">
      <input type="number" data-field="price" value="${e.price}" min="0" step="any" placeholder="0.00">
      <select data-field="vat">
        ${[19,7,0].map(t=>`<option value="${t}" ${n(e.vat)===t?`selected`:``}>${t} %</option>`).join(``)}
      </select>
      <button class="item-del" type="button" title="Remove line" data-del="${t}">×</button>
    </div>
  `).join(``)}function S(){let r=e(`#items-rows`);r.addEventListener(`input`,e=>{let t=e.target.closest(`.item-row`);if(!t)return;let r=Number(t.dataset.idx),i=e.target.dataset.field;i&&g.items[r]&&(g.items[r][i]=i===`desc`?e.target.value:n(e.target.value),w(),E())}),r.addEventListener(`click`,e=>{let t=e.target.closest(`[data-del]`);t&&(g.items.splice(Number(t.dataset.del),1),x(),w(),E())}),e(`#btn-add-item`).addEventListener(`click`,()=>{g.items.push({desc:``,qty:1,price:0,vat:19}),x(),w(),E();let e=t(`#items-rows .item-row input[data-field="desc"]`);e.length&&e[e.length-1].focus()})}function C(){let e=g,t=i(e.items,e.discount_pct),o=e.items.map((t,i)=>{let o=r(n(t.qty)*n(t.price)*(1-n(e.discount_pct)/100));return`<tr>
      <td class="c-pos">${i+1}</td>
      <td class="c-desc">${u(t.desc)||`<span style="color:#b6bec8">—</span>`}</td>
      <td class="c-qty num">${s(n(t.qty))}</td>
      <td class="c-price num">${a(n(t.price))}</td>
      <td class="c-vat ctr">${c(n(t.vat))}</td>
      <td class="c-amt num">${a(o)}</td>
    </tr>`}).join(``),f=Object.keys(t.vat_by_rate).sort((e,t)=>n(t)-n(e)).map(e=>`
    <div class="t-row vatline">
      <span class="k">VAT ${c(n(e))} <small>· on ${a(t.net_by_rate[e])}</small></span>
      <span class="v">${a(t.vat_by_rate[e])}</span>
    </div>`).join(``),p=n(e.discount_pct)>0?`
    <div class="t-row disc">
      <span class="k">Discount (${c(n(e.discount_pct))})</span>
      <span class="v">−${a(t.discount)}</span>
    </div>`:``;return`
    <div class="folds"><span></span><span></span></div>
    <div class="sh-head">
      <div class="sh-brand">
        <svg class="sh-logo" viewBox="0 0 44 44" aria-hidden="true">
          <rect width="44" height="44" rx="9" fill="#16324f"/>
          <path d="M14 31V13l16 18V13" stroke="#fff" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div>
          <div class="sh-name">${u(e.sender.name)}</div>
          <div class="sh-tag">${u(e.sender.tagline||``)}</div>
        </div>
      </div>
      <div class="sh-senderinfo">
        ${u(e.sender.street)} · ${u(e.sender.city)}<br>
        ${u(e.sender.country)}<br>
        ${u(e.sender.email)} · ${u(e.sender.phone)}<br>
        VAT ID: ${u(e.sender.vatId)}
      </div>
    </div>
    <div class="sh-rule"></div>

    <div class="sh-titlebar">
      <h1 class="sh-title">Invoice<small>for design and consulting services as agreed</small></h1>
      <div class="sh-meta">
        <div class="sh-meta-row"><span class="k">Invoice number</span><span class="v">${u(e.number)}</span></div>
        <div class="sh-meta-row"><span class="k">Invoice date</span><span class="v">${l(e.date)}</span></div>
        <div class="sh-meta-row"><span class="k">Due date</span><span class="v">${l(e.due)}</span></div>
      </div>
    </div>

    <div class="sh-parties">
      <div class="sh-label">Invoice to</div>
      <div class="sh-addr">
        ${e.recipient.contact?u(e.recipient.contact)+`<br>`:``}
        <span class="strong">${u(e.recipient.name)}</span><br>
        ${u(e.recipient.street)}<br>
        ${u(e.recipient.city)}<br>
        ${u(e.recipient.country)}
      </div>
    </div>

    <table class="sh-items">
      <thead>
        <tr>
          <th class="c-pos">#</th>
          <th>Description</th>
          <th class="num">Qty</th>
          <th class="num">Unit price</th>
          <th class="ctr">VAT</th>
          <th class="num">Amount</th>
        </tr>
      </thead>
      <tbody>${o||`<tr><td class="c-pos"></td><td class="c-desc" style="color:#8a94a2">No line items yet</td><td class="c-qty num"></td><td class="c-price num"></td><td class="c-vat ctr"></td><td class="c-amt num"></td></tr>`}</tbody>
    </table>

    <div class="sh-totals">
      ${n(e.discount_pct)>0?`<div class="t-row"><span class="k">Subtotal</span><span class="v">${a(t.subtotal)}</span></div>`:``}
      ${p}
      <div class="t-row"><span class="k">Net total</span><span class="v">${a(t.net)}</span></div>
      ${f}
      <div class="t-row gross"><span class="k">Gross total</span><span class="v">${a(t.gross)}</span></div>
    </div>

    <div class="sh-bottom">
      <div class="sh-terms">
        <div class="sh-label">Payment terms</div>
        <p>${u(e.terms)}</p>
      </div>
      <div class="sh-bank">
        <div class="sh-label">Bank details</div>
        <table>
          <tr><td class="k">Account holder</td><td class="v">${u(e.sender.name)}</td></tr>
          <tr><td class="k">IBAN</td><td class="v">${u(d(e.sender.iban))}</td></tr>
          <tr><td class="k">BIC</td><td class="v">${u(e.sender.bic)}</td></tr>
          <tr><td class="k">Bank</td><td class="v">${u(e.sender.bank)}</td></tr>
        </table>
      </div>
    </div>

    <div class="sh-foot">
      <div class="sh-foot-line">
        <span>${u(e.sender.name)} · ${u(e.sender.street)} · ${u(e.sender.city)} · ${u(e.sender.country)}</span>
        <span class="sh-page">Page 1 of 1</span>
      </div>
      <div>${u(e.sender.reg)} · ${u(e.sender.ceo)} · VAT ID: ${u(e.sender.vatId)}</div>
    </div>
  `}function w(){e(`#sheet`).innerHTML=C(),T()}function T(){let t=e(`#sheet`);t.classList.remove(`compact`,`compact-x`,`compact-y`);let n=0;for(;t.scrollHeight>1123&&n<3;)t.classList.add([`compact`,`compact-x`,`compact-y`][n]),n++}function E(){let t=i(g.items,g.discount_pct);e(`#sum-net`).textContent=a(t.net),e(`#sum-vat`).textContent=a(t.vat),e(`#sum-gross`).textContent=a(t.gross)}function D(){let t=e(`#preview-pane`),n=Math.max(.35,Math.min(1,(t.clientWidth-56)/794));e(`#scaler`).style.transform=`scale(${n})`;let r=e(`#sheet-holder`);r.style.width=794*n+`px`,r.style.height=1123*n+`px`}var O=`invoice-sender-template-v1`;function k(){try{localStorage.setItem(O,JSON.stringify(g.sender)),j(`Sender template saved`)}catch{j(`Could not save template`)}}function A(){try{let e=localStorage.getItem(O);if(!e){j(`No saved sender template yet`);return}g.sender={...g.sender,...JSON.parse(e)},y(),w(),j(`Sender template loaded`)}catch{j(`Could not load template`)}}function j(t){let n=e(`#flash`);n||(n=document.createElement(`div`),n.id=`flash`,n.className=`no-print`,Object.assign(n.style,{position:`fixed`,bottom:`18px`,left:`50%`,transform:`translateX(-50%)`,background:`#16324f`,color:`#fff`,padding:`8px 16px`,borderRadius:`8px`,fontSize:`13px`,zIndex:`50`,boxShadow:`0 4px 14px rgba(16,24,40,.25)`,transition:`opacity .3s`}),document.body.appendChild(n)),n.textContent=t,n.style.opacity=`1`,clearTimeout(j._t),j._t=setTimeout(()=>{n.style.opacity=`0`},1800)}function M(){try{let e=localStorage.getItem(O);e&&(g.sender={...g.sender,...JSON.parse(e)})}catch{}b(),S(),x(),y(),w(),E(),D(),window.addEventListener(`resize`,D),e(`#btn-print`).addEventListener(`click`,()=>window.print()),e(`#btn-save-sender`).addEventListener(`click`,k),e(`#btn-load-sender`).addEventListener(`click`,A),e(`#btn-reset`).addEventListener(`click`,()=>{g=JSON.parse(JSON.stringify(h)),x(),y(),w(),E(),j(`Reset to sample invoice`)})}M(),window.APP={setInvoice({items:e,discount_pct:t}={}){Array.isArray(e)&&(g.items=e.map(e=>({desc:String(e?.desc??``),qty:n(e?.qty),price:n(e?.price),vat:n(e?.vat)}))),t!=null&&(g.discount_pct=n(t)),x(),y(),w(),E()},totals(){let e=i(g.items,g.discount_pct);return{net:e.net,vat:e.vat,gross:e.gross,vat_by_rate:{...e.vat_by_rate}}}};