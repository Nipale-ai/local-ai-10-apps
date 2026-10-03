(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{let t=Number(String(e??``).replace(`,`,`.`));return Number.isFinite(t)?t:0},t=e=>(Number.isFinite(e)?e:0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),n={EUR:`€`,USD:`$`,GBP:`£`},r=()=>n[s.meta?.currency]||`€`,i=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),a=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],o=e=>{let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));return t?`${Number(t[3])} ${a[Number(t[2])-1]} ${t[1]}`:String(e||``)},s=structuredClone({sender:{company:`Northbeam Studio GmbH`,rep:`Managing Director Dr. Alina Wegner`,street:`Große Elbstraße 118`,city:`22767 Hamburg`,country:`Germany`,email:`billing@northbeam.studio`,phone:`+49 40 555 0182`,web:`northbeam.studio`,bank:`Hanseatic Bank Nord`,iban:`DE89 3702 0500 0007 4020 07`,bic:`HANSDE33XXX`,taxid:`DE 812 445 907`,terms:`Payable within 14 days without deduction. Please state the invoice number as the payment reference.`,notes:`Thank you for your continued partnership. For questions about this invoice, contact billing@northbeam.studio. Overdue balances accrue default interest at 8 % p.a. above the base rate.`},customer:{name:`Helix Robotics GmbH`,attn:`Attn: Finn Jensen`,street:`Technologiepark 9`,city:`80992 Munich`,country:`Germany`},meta:{number:`NB-2026-0142`,issue:`2026-10-01`,due:`2026-10-15`,service:`September 2026`,currency:`EUR`},items:[{desc:`Frontend development (hours)`,qty:32.5,price:95,vat:19},{desc:`UI design sprint`,qty:1,price:1450,vat:19},{desc:`Printed user handbook`,qty:3,price:24.9,vat:7},{desc:`Hosting and maintenance, first year`,qty:1,price:240,vat:0}],discountPct:5});function c(){let t=Math.round(e(s.discountPct)*10),n=new Map;for(let r of s.items){let i=e(r.vat),a=BigInt(Math.round(e(r.qty)*100)),o=BigInt(Math.round(e(r.price)*100));n.set(i,(n.get(i)??0n)+a*o*BigInt(1e3-t))}let r={},i=0n,a=0n;for(let[e,t]of n){let n=(t+50000n)/100000n;i+=n;let o;o=Number.isInteger(e)?(n*BigInt(e)+50n)/100n:BigInt(Math.floor(Number(n)*e+.5+1e-6)),a+=o,r[String(e)]=Number(o)/100}return{net:Number(i)/100,vat:Number(a)/100,gross:Number(i+a)/100,vat_by_rate:r}}function l(){let t=0n;for(let n of s.items)t+=BigInt(Math.round(e(n.qty)*100))*BigInt(Math.round(e(n.price)*100));return Number(t+50n)/100}var u=document.getElementById(`invoice-page`);function d(){let n=s.sender,a=s.customer,d=s.meta,p=c(),m=e(s.discountPct),h=l(),g=Math.round((h-p.net)*100+1e-9)/100,_=Object.keys(p.vat_by_rate).sort((e,t)=>Number(t)-Number(e)),v=s.items.map((n,r)=>{let a=Math.round(e(n.qty)*100*(e(n.price)*100)*(1e3-Math.round(m*10))/1e5)/100;return`<tr><td class="n-idx">${r+1}</td><td>${i(n.desc)||`<span class="ph">Item description</span>`}</td>
      <td class="num">${t(e(n.qty))}</td><td class="num">${t(e(n.price))}</td>
      <td class="num">${i(String(e(n.vat)))}&thinsp;%</td><td class="num strong">${t(a)}</td></tr>`}).join(``),b=_.map(e=>`<div class="t-row"><span>VAT ${i(e)}&thinsp;% <em>(on ${t(f(e))})</em></span><span>${t(p.vat_by_rate[e])}&thinsp;${r()}</span></div>`).join(``);u.innerHTML=`
    <div class="inv-head">
      <div class="brand">
        <div class="mono-sq big">N</div>
        <div>
          <div class="company">${i(n.company)}</div>
          <div class="senderline">${i(n.street)} · ${i(n.city)} · ${i(n.country)}</div>
          <div class="senderline">${i(n.email)} · ${i(n.phone)} · ${i(n.web)}</div>
        </div>
      </div>
      <div class="inv-title">INVOICE</div>
    </div>
    <div class="rule"></div>
    <div class="inv-meta-row">
      <div class="billto">
        <div class="mini-label">Invoice to</div>
        <div class="cust-name">${i(a.name)}</div>
        <div>${i(a.attn)}</div>
        <div>${i(a.street)}</div>
        <div>${i(a.city)}${a.country?` · `+i(a.country):``}</div>
      </div>
      <table class="meta">
        <tr><td>Invoice number</td><td><strong>${i(d.number)}</strong></td></tr>
        <tr><td>Invoice date</td><td>${i(o(d.issue))}</td></tr>
        <tr><td>Service period</td><td>${i(d.service)}</td></tr>
        <tr><td>Due date</td><td><strong>${i(o(d.due))}</strong></td></tr>
        <tr><td>Currency</td><td>${i(d.currency)} (${r()})</td></tr>
      </table>
    </div>
    <table class="inv-items">
      <thead><tr><th class="n-idx">#</th><th>Description</th><th class="num">Qty</th><th class="num">Unit price</th><th class="num">VAT</th><th class="num">Amount</th></tr></thead>
      <tbody>${v||`<tr><td colspan="6" class="empty">No line items yet</td></tr>`}</tbody>
    </table>
    <div class="below">
      <div class="payment">
        <div class="mini-label">Payment</div>
        <div class="pay-bank">${i(n.bank)}</div>
        <div><span class="pay-k">IBAN</span> ${i(n.iban)}</div>
        <div><span class="pay-k">BIC</span> ${i(n.bic)}</div>
        <div class="pay-terms">${i(n.terms)}</div>
        <div class="pay-due">Please pay by <strong>${i(o(d.due))}</strong>.</div>
      </div>
      <div class="totals">
        <div class="t-row"><span>Net before discount</span><span>${t(h)}&thinsp;${r()}</span></div>
        ${m>0?`<div class="t-row disc"><span>Discount (${i(String(m))}&thinsp;%)</span><span>−${t(g)}&thinsp;${r()}</span></div>`:``}
        <div class="t-row"><span>Net</span><span>${t(p.net)}&thinsp;${r()}</span></div>
        ${b}
        <div class="t-row grand"><span>Total due</span><span>${t(p.gross)}&thinsp;${r()}</span></div>
      </div>
    </div>
    <div class="inv-notes">
      <div class="mini-label">Notes</div>
      <div>${i(n.notes)}</div>
    </div>
    <div class="inv-foot">
      ${i(n.company)} · ${i(n.rep)} · ${i(n.street)}, ${i(n.city)} · VAT ID ${i(n.taxid)} · ${i(n.bank)} · IBAN ${i(n.iban)} · BIC ${i(n.bic)}
    </div>`,document.getElementById(`tbGross`).textContent=`${t(p.gross)} ${r()}`,y()}function f(t){let n=Math.round(e(s.discountPct)*10),r=0n;for(let i of s.items)e(i.vat)===Number(t)&&(r+=BigInt(Math.round(e(i.qty)*100))*BigInt(Math.round(e(i.price)*100))*BigInt(1e3-n));return Number((r+50000n)/100000n)/100}function p(){let n=document.getElementById(`itemRows`);n.innerHTML=s.items.map((n,a)=>`
    <tr data-i="${a}">
      <td class="n-idx">${a+1}</td>
      <td><input type="text" data-item="${a}" data-f="desc" value="${i(n.desc)}" aria-label="Description, line ${a+1}"></td>
      <td><input type="number" step="any" min="0" data-item="${a}" data-f="qty" value="${n.qty}" aria-label="Quantity, line ${a+1}"></td>
      <td><input type="number" step="any" min="0" data-item="${a}" data-f="price" value="${n.price}" aria-label="Unit price, line ${a+1}"></td>
      <td><input type="number" step="any" min="0" max="100" data-item="${a}" data-f="vat" value="${n.vat}" aria-label="VAT rate percent, line ${a+1}" list="vatrates"></td>
      <td class="num line-amt">${t(Math.round(e(n.qty)*100*e(n.price)*100*(1e3-Math.round(e(s.discountPct)*10)))/1e7)}&thinsp;${r()}</td>
      <td class="td-x"><button type="button" class="btn-x" data-del="${a}" aria-label="Remove line ${a+1}" title="Remove line">×</button></td>
    </tr>`).join(``)+`<datalist id="vatrates"><option value="0"></option><option value="7"></option><option value="19"></option></datalist>`}function m(){let n=Math.round(e(s.discountPct)*10);document.querySelectorAll(`#itemRows tr`).forEach(i=>{let a=Number(i.dataset.i),o=s.items[a];if(a==null||!o)return;let c=i.querySelector(`.line-amt`);c&&(c.innerHTML=t(Math.round(e(o.qty)*100*e(o.price)*100*(1e3-n))/1e7)+`&thinsp;`+r())})}function h(){document.querySelectorAll(`[data-s]`).forEach(e=>{e.value=s.sender[e.dataset.s]??``}),document.querySelectorAll(`[data-c]`).forEach(e=>{e.value=s.customer[e.dataset.c]??``}),document.querySelectorAll(`[data-m]`).forEach(e=>{e.value=s.meta[e.dataset.m]??``}),document.getElementById(`discount`).value=s.discountPct}var g=`invoice-studio.sender.v1`,_=`invoice-studio.state.v1`,v=null;function y(){clearTimeout(v),v=setTimeout(()=>{try{localStorage.setItem(_,JSON.stringify(s))}catch{}},250)}function b(){try{let t=localStorage.getItem(_);if(!t)return;let n=JSON.parse(t);n&&n.sender&&n.customer&&n.meta&&Array.isArray(n.items)&&(Object.assign(s.sender,n.sender),Object.assign(s.customer,n.customer),Object.assign(s.meta,n.meta),s.items=n.items.map(t=>({desc:String(t?.desc??``),qty:e(t?.qty),price:e(t?.price),vat:e(t?.vat)})),s.discountPct=e(n.discountPct))}catch{}}function x(e){let t=/^(.*?)(\d+)$/.exec(String(e||``));if(!t)return String(e||``);let n=t[2];return t[1]+String(Number(n)+1).padStart(n.length,`0`)}function S(e,t){let n=new Date(e+`T00:00:00Z`);return Number.isNaN(n.getTime())?e:(n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10))}function C(e){document.getElementById(`tplStatus`).textContent=e}document.getElementById(`formPanel`).addEventListener(`input`,t=>{let n=t.target;if(n.dataset.s){s.sender[n.dataset.s]=n.value,d();return}if(n.dataset.c){s.customer[n.dataset.c]=n.value,d();return}if(n.dataset.m){s.meta[n.dataset.m]=n.value,d();return}if(n.dataset.item!=null){let t=s.items[Number(n.dataset.item)];if(!t)return;let r=n.dataset.f;r===`desc`?t.desc=n.value:t[r]=e(n.value),m(),d();return}n.id===`discount`&&(s.discountPct=e(n.value),m(),d())}),document.getElementById(`formPanel`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-del]`);t&&(s.items.splice(Number(t.dataset.del),1),p(),d())}),document.getElementById(`btnAdd`).addEventListener(`click`,()=>{s.items.push({desc:``,qty:1,price:0,vat:19}),p(),d()}),document.getElementById(`btnNew`).addEventListener(`click`,()=>{let e=new Date().toISOString().slice(0,10);s.meta.number=x(s.meta.number),s.meta.issue=e,s.meta.due=S(e,14),s.meta.service=``,s.customer={name:``,attn:``,street:``,city:``,country:`Germany`},s.items=[{desc:``,qty:1,price:0,vat:19}],s.discountPct=0,h(),p(),d()}),document.getElementById(`formPanel`).addEventListener(`keydown`,e=>{if(e.key!==`Enter`)return;let t=e.target;if(t.dataset?.item!=null&&t.dataset.f===`desc`&&Number(t.dataset.item)===s.items.length-1){e.preventDefault(),s.items.push({desc:``,qty:1,price:0,vat:19}),p(),d();let t=document.querySelectorAll(`#itemRows input[data-f="desc"]`);t[t.length-1]?.focus()}}),document.getElementById(`btnPrint`).addEventListener(`click`,()=>window.print()),document.getElementById(`btnSaveTpl`).addEventListener(`click`,()=>{try{localStorage.setItem(g,JSON.stringify(s.sender)),C(`Template saved`)}catch{C(`Could not save`)}}),document.getElementById(`btnLoadTpl`).addEventListener(`click`,()=>{try{let e=localStorage.getItem(g);if(!e){C(`No saved template`);return}Object.assign(s.sender,JSON.parse(e)),h(),d(),C(`Template loaded`)}catch{C(`Template unreadable`)}}),window.APP={setInvoice(t){t||={},s.items=(Array.isArray(t.items)?t.items:[]).map(t=>({desc:String(t?.desc??``),qty:e(t?.qty),price:e(t?.price),vat:e(t?.vat)})),s.discountPct=e(t.discount_pct??t.discountPct??0),p(),d()},totals:c};try{let e=localStorage.getItem(g);e&&Object.assign(s.sender,JSON.parse(e))}catch{}b(),h(),p(),d();