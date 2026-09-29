(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`tempo.v1`,t=[`#2563eb`,`#0d9488`,`#d97706`,`#dc2626`,`#7c3aed`,`#0891b2`,`#db2777`,`#65a30d`,`#ea580c`,`#4f46e5`,`#059669`,`#b45309`];function n(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4)}function r(e){return Math.round(e*100+1e-9)/100}function i(e,t){return r(e*t/60)}function a(e=new Date){return e.getFullYear()+`-`+String(e.getMonth()+1).padStart(2,`0`)+`-`+String(e.getDate()).padStart(2,`0`)}function o(e,t){let n=new Date(e+`T00:00:00`);return n.setDate(n.getDate()+t),a(n)}function s(e){return e=String(e??``),/[",\n]/.test(e)?`"`+e.replace(/"/g,`""`)+`"`:e}var c=new class{constructor(){this.projects=[],this.entries=[],this.timer=null,this.prefs={currency:`€`},this.load()}load(){try{let t=localStorage.getItem(e);if(t){let e=JSON.parse(t);this.projects=Array.isArray(e.projects)?e.projects:[],this.entries=Array.isArray(e.entries)?e.entries:[],this.timer=e.timer||null,this.prefs=Object.assign(this.prefs,e.prefs||{})}}catch{}return this}save(){try{localStorage.setItem(e,JSON.stringify({projects:this.projects,entries:this.entries,timer:this.timer,prefs:this.prefs}))}catch{}return this}reset(){return this.projects=[],this.entries=[],this.timer=null,this.save(),this}projectByName(e){let t=String(e||``).trim().toLowerCase();return this.projects.find(e=>e.name.toLowerCase()===t)||null}addProject(e,r){e=String(e||``).trim(),r=Number(r),Number.isFinite(r)||(r=0);let i=this.projectByName(e);return i?i.rate=r:(i={id:n(),name:e,rate:r,color:t[this.projects.length%t.length]},this.projects.push(i)),this.save(),i}removeProject(e){this.projects=this.projects.filter(t=>t.id!==e),this.entries=this.entries.filter(t=>t.projectId!==e),this.timer&&this.timer.projectId===e&&(this.timer=null),this.save()}addEntry(e,t,r){let i=this.projectByName(e);i||=this.addProject(String(e||`Untitled`),0);let a=Math.max(0,Math.round(Number(r)||0)),o={id:n(),projectId:i.id,date:String(t),minutes:a,note:``};return this.entries.push(o),this.save(),o}updateEntry(e,t){let n=this.entries.find(t=>t.id===e);return n&&(t.minutes!=null&&(n.minutes=Math.max(0,Math.round(Number(t.minutes)||0))),t.date&&(n.date=String(t.date)),t.note!=null&&(n.note=String(t.note)),this.save()),n}deleteEntry(e){this.entries=this.entries.filter(t=>t.id!==e),this.save()}report(e,t){let n=this.projects.map(n=>{let r=this.entries.filter(r=>r.projectId===n.id&&r.date>=e&&r.date<=t).reduce((e,t)=>e+t.minutes,0);return{name:n.name,minutes:r,amount:i(r,n.rate)}});return n.sort((e,t)=>t.minutes-e.minutes||e.name.localeCompare(t.name)),{projects:n,total_minutes:n.reduce((e,t)=>e+t.minutes,0),total_amount:r(n.reduce((e,t)=>e+t.amount,0))}}csv(e,t){let n=this.report(e,t),r=[`Project,Minutes,Amount`];for(let e of n.projects)r.push(`${s(e.name)},${e.minutes},${e.amount.toFixed(2)}`);return r.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),r.join(`
`)}startTimer(e){return this.projects.find(t=>t.id===e)?(this.timer={projectId:e,startedAt:Date.now()},this.save(),this.timer):null}stopTimer(){if(!this.timer)return null;let e=this.timer;this.timer=null;let t=this.projects.find(t=>t.id===e.projectId),r=Math.max(1,Math.round((Date.now()-e.startedAt)/6e4)),i=a();return t&&this.entries.push({id:n(),projectId:t.id,date:i,minutes:r,note:``}),this.save(),{name:t?t.name:`?`,minutes:r,date:i}}},l=a(),u={tab:`entries`,editing:null,quickProject:null,q:{proj:``,date:l,min:`60`},reportFrom:l.slice(0,8)+`01`,reportTo:l,invoice:!1},d=(e,t=document)=>t.querySelector(e),f=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),p=e=>c.prefs.currency+` `+e.toFixed(2),m=e=>{e=Math.round(e);let t=Math.floor(e/60),n=e%60;return t&&n?`${t}h ${String(n).padStart(2,`0`)}m`:t?`${t}h`:`${n}m`},h=e=>new Date(e+`T00:00:00`).toLocaleDateString(`en-GB`,{weekday:`short`,day:`numeric`,month:`short`}),g=e=>c.projects.find(t=>t.id===e)||null,_=null;function v(e){let t=d(`#toast`);t&&(t.textContent=e,t.classList.add(`on`),clearTimeout(_),_=setTimeout(()=>t.classList.remove(`on`),2400))}function y(e,t){return c.entries.reduce((n,r)=>n+(r.projectId===e&&r.date===t?r.minutes:0),0)}function b(){let e=[];for(let t=6;t>=0;t--){let n=o(l,-t),r=[];for(let e of c.projects){let t=y(e.id,n);t>0&&r.push({color:e.color,minutes:t,name:e.name})}e.push({date:n,segs:r,total:r.reduce((e,t)=>e+t.minutes,0)})}return e}var x={trash:`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M10 4h4M9 7v12m6-12v12M6 7l1 13h10l1-13"/></svg>`,dl:`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 4v10m0 0l-4-4m4 4l4-4M5 19h14"/></svg>`,doc:`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5m-5 4h5"/></svg>`,print:`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 8V3h10v5M7 17H4v-6h16v6h-3M7 14h10v7H7z"/></svg>`};function S(){document.getElementById(`app`).innerHTML=`
  <header class="topbar no-print">
    <div class="hwrap">
      <div class="logo">
        <span class="mark">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/></svg>
        </span>
        Tempo <span class="logo-sub">time &amp; billing</span>
      </div>
      <div id="timer-chip"></div>
      <div class="spacer"></div>
      <div class="hdate" id="hdate"></div>
    </div>
  </header>
  <div class="app">
    <div class="layout">
      <aside class="sidebar no-print" id="sidebar"></aside>
      <main class="main">
        <nav class="tabs no-print" id="tabs">
          <button class="tab ${u.tab===`entries`?`on`:``}" data-tab="entries">Entries</button>
          <button class="tab ${u.tab===`report`?`on`:``}" data-tab="report">Report</button>
        </nav>
        <section id="tab-entries"></section>
        <section id="tab-report" ${u.tab===`report`?``:`hidden`}></section>
      </main>
    </div>
    <footer class="foot no-print">
      <span class="kbd">n</span> new entry &nbsp; <span class="kbd">t</span> timer &nbsp; <span class="kbd">e</span> entries &nbsp; <span class="kbd">r</span> report &nbsp; <span class="kbd">esc</span> cancel
    </footer>
  </div>
  <div id="toast"></div>`,d(`#hdate`).textContent=new Date().toLocaleDateString(`en-GB`,{weekday:`long`,day:`numeric`,month:`long`})}function C(){let e=d(`#sidebar`);if(!e)return;let t=c.projects.map(e=>`
    <div class="proj ${u.quickProject===e.id?`on`:``}" data-proj="${e.id}">
      <span class="dot" style="background:${e.color}"></span>
      <span class="pname">${f(e.name)}</span>
      <span class="prate">${e.rate.toFixed(2)}/h</span>
      <button class="iconbtn proj-del" data-delproj="${e.id}" title="Delete project and its entries">&times;</button>
    </div>`).join(``);e.innerHTML=`
    <div class="card pad">
      <div class="side-h"><span>Projects</span><span class="count">${c.projects.length}</span></div>
      <div class="projs">${t||`<div class="empty-sm">No projects yet.</div>`}</div>
      <form id="proj-form" class="proj-form">
        <input name="name" placeholder="Project name" required maxlength="40" autocomplete="off">
        <div class="row2">
          <input name="rate" type="number" step="0.01" min="0" placeholder="Rate /h" required>
          <button class="btn primary sm" type="submit">Add</button>
        </div>
      </form>
    </div>
    <div class="card pad side-foot">
      <div class="row2">
        <label class="cur">
          <span>Symbol</span>
          <select id="cur-sel">
            ${[`€`,`$`,`£`].map(e=>`<option value="${e}" ${c.prefs.currency===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </label>
        <button id="erase" class="link danger" type="button">Erase all data</button>
      </div>
    </div>`}function w(){let e=d(`#tab-entries`);if(!e)return;let t=b(),n=t.reduce((e,t)=>e+t.total,0),r=Math.max(1,...t.map(e=>e.total)),i=u.q.proj||c.projects[0]&&c.projects[0].name||``;e.innerHTML=`
    <div class="card pad week-card no-print">
      <div class="side-h"><span>Last 7 days</span><span class="count">${m(n)}</span></div>
      <div class="week">
        ${t.map(e=>`
          <div class="wday">
            <div class="wbar">
              ${e.segs.map(e=>`<div class="wseg" style="height:${Math.max(5,e.minutes/r*100)}%;background:${e.color}" title="${f(e.name)} · ${m(e.minutes)}"></div>`).join(``)}
            </div>
            <div class="wlab ${e.date===l?`today`:``}">${new Date(e.date+`T00:00:00`).toLocaleDateString(`en-GB`,{weekday:`short`})}</div>
            <div class="wval">${e.total?m(e.total):`–`}</div>
          </div>`).join(``)}
      </div>
    </div>
    <div class="card">
      <div class="qwrap">
        <form id="entry-form" class="qform">
          <select id="q-proj" required>
            ${c.projects.map(e=>`<option value="${f(e.name)}" ${i===e.name?`selected`:``}>${f(e.name)}</option>`).join(``)}
          </select>
          <input id="q-date" type="date" value="${u.q.date||l}" max="${l}">
          <input id="q-min" type="number" min="1" step="5" value="${u.q.min}" placeholder="min" aria-label="Minutes">
          <button class="btn primary" type="submit">Add entry</button>
        </form>
        <button class="btn tbtn" id="timer-btn" type="button">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.6 1.6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>          <path d="M9.5 2.5h5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
          ${c.timer?`Stop timer`:`Start timer`}
        </button>
      </div>
      <div class="entries" id="entries"></div>
    </div>`,T()}function T(){let e=d(`#entries`);if(!e)return;if(!c.entries.length){e.innerHTML=`<div class="empty">No time logged yet.<br>Add an entry above or start the timer.</div>`;return}let t={};for(let e of c.entries)(t[e.date]=t[e.date]||[]).push(e);let n=Object.keys(t).sort().reverse(),r=``;for(let e of n){let n=t[e],i=n.reduce((e,t)=>e+t.minutes,0),a=e===l?`Today`:e===o(l,-1)?`Yesterday`:h(e);r+=`<div class="dhead"><span>${a}</span><span class="dsum">${m(i)}</span></div>`;for(let e of n)r+=E(e)}e.innerHTML=r}function E(e){let t=g(e.projectId),n=t?t.color:`#9ca3af`;return u.editing===e.id?`<form class="entry edit" data-eform="${e.id}">
      <span class="dot" style="background:${n}"></span>
      <input type="date" name="date" value="${e.date}">
      <input type="number" name="minutes" class="emin" value="${e.minutes}" min="0" step="5">
      <input type="text" name="note" value="${f(e.note||``)}" placeholder="Note" class="enote">
      <span class="eacts">
        <button class="btn primary sm" type="submit">Save</button>
        <button class="btn sm" type="button" data-cancel="${e.id}">Cancel</button>
        <button class="iconbtn del" type="button" data-delen="${e.id}" title="Delete entry">${x.trash}</button>
      </span>
    </form>`:`<div class="entry" data-eid="${e.id}">
    <span class="dot" style="background:${n}"></span>
    <div class="emeta"><span class="ename">${f(t?t.name:`?`)}</span>${e.note?`<span class="enote2">${f(e.note)}</span>`:``}</div>
    <button class="mins" data-edit="${e.id}" title="Edit entry">${m(e.minutes)}</button>
    <button class="iconbtn del" data-delen="${e.id}" title="Delete entry">${x.trash}</button>
  </div>`}var D=e=>new Date(e+`T00:00:00`).toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`});function O(e,t){return c.entries.reduce((n,r)=>n+(r.projectId===e&&r.date===t?r.minutes:0),0)}function k(e,t){let n=[],r=e,i=0;for(;r<=t&&i<400;)n.push(r),r=o(r,1),i++;return n}function A(){let e=d(`#tab-report`);if(!e)return;let t=u.reportFrom,n=u.reportTo,r=c.report(t,n),i=c.entries.filter(e=>e.date>=t&&e.date<=n).length,a=e=>(c.projects.find(t=>t.name===e)||{}).color||`#999`,o=e=>(c.projects.find(t=>t.name===e)||{}).rate;e.innerHTML=`
    <div class="card pad rctl no-print">
      <div class="rdates">
        <label class="dlabel">From <input type="date" id="r-from" value="${t}"></label>
        <label class="dlabel">To <input type="date" id="r-to" value="${n}"></label>
      </div>
      <div class="presets">
        <button type="button" data-pre="today">Today</button>
        <button type="button" data-pre="7d">Last 7 days</button>
        <button type="button" data-pre="month">This month</button>
        <button type="button" data-pre="lastmonth">Last month</button>
        <button type="button" data-pre="all">All time</button>
      </div>
      <div class="racts">
        <button class="btn sm" id="csv-dl" type="button">${x.dl} CSV</button>
        <button class="btn sm" id="csv-copy" type="button">Copy CSV</button>
        <button class="btn sm ${u.invoice?`primary`:``}" id="inv-btn" type="button">${x.doc} Invoice</button>
      </div>
    </div>
    ${u.invoice?j(r,t,n):``}
    <div class="cards3">
      <div class="card pad stat"><div class="k">Time logged</div><div class="v">${m(r.total_minutes)}</div></div>
      <div class="card pad stat"><div class="k">Amount</div><div class="v acc">${p(r.total_amount)}</div></div>
      <div class="card pad stat"><div class="k">Entries</div><div class="v">${i}</div></div>
    </div>
    <div class="card pad">
      <div class="side-h"><span>Time per day</span><span class="count">${h(t)} – ${h(n)}</span></div>
      <div id="chart"></div>
    </div>
    <div class="card">
      <table class="rtable">
        <thead><tr><th>Project</th><th class="hide-sm">Rate</th><th>Time</th><th>Amount</th></tr></thead>
        <tbody>
          ${r.projects.map(e=>`
            <tr>
              <td class="pl"><span class="dot" style="background:${a(e.name)}"></span>${f(e.name)}</td>
              <td class="hide-sm num">${typeof o(e.name)==`number`?o(e.name).toFixed(2)+`/h`:`–`}</td>
              <td class="num">${e.minutes?m(e.minutes):`–`}</td>
              <td class="num">${p(e.amount)}</td>
            </tr>`).join(``)}
          <tr class="total"><td>Total</td><td class="hide-sm"></td><td class="num">${m(r.total_minutes)}</td><td class="num">${p(r.total_amount)}</td></tr>
        </tbody>
      </table>
    </div>`,M(d(`#chart`),t,n)}function j(e,t,n){let r=e.projects.filter(e=>e.minutes>0),i=e=>(c.projects.find(t=>t.name===e)||{}).color||`#999`,a=e=>(c.projects.find(t=>t.name===e)||{}).rate||0;return`<div class="card pad invoice" id="invoice">
    <div class="inv-top">
      <div>
        <div class="inv-title">INVOICE</div>
        <div class="inv-sub">Time &amp; billing report</div>
      </div>
      <div class="inv-meta">
        <div><span>Period</span><b>${h(t)} – ${h(n)}</b></div>
        <div><span>Issued</span><b>${h(l)}</b></div>
      </div>
    </div>
    <table class="rtable">
      <thead><tr><th>Project</th><th class="hide-sm">Rate</th><th>Time</th><th>Amount</th></tr></thead>
      <tbody>
        ${r.map(e=>`
          <tr>
            <td class="pl"><span class="dot" style="background:${i(e.name)}"></span>${f(e.name)}</td>
            <td class="hide-sm num">${a(e.name).toFixed(2)}/h</td>
            <td class="num">${m(e.minutes)}</td>
            <td class="num">${p(e.amount)}</td>
          </tr>`).join(``)}
      </tbody>
      <tfoot><tr class="total"><td>Total</td><td class="hide-sm"></td><td class="num">${m(e.total_minutes)}</td><td class="num">${p(e.total_amount)}</td></tr></tfoot>
    </table>
    <div class="inv-foot no-print">
      <span class="inv-note">Amounts are rounded to the cent per project.</span>
      <button class="btn primary" id="inv-print" type="button">${x.print} Print / Save PDF</button>
    </div>
  </div>`}function M(e,t,n){if(!e)return;let r=k(t,n);if(!r.length){e.innerHTML=`<div class="chart-empty">Pick a date range.</div>`;return}if(r.length>366){e.innerHTML=`<div class="chart-empty">Range too large for the chart.</div>`;return}let i=r.map(e=>{let t=[];for(let n of c.projects){let r=O(n.id,e);r>0&&t.push({color:n.color,minutes:r,name:n.name})}return{date:e,segs:t,total:t.reduce((e,t)=>e+t.minutes,0)}}),a=i;if(i.length>31){a=[];for(let e=0;e<i.length;e+=7){let t=i.slice(e,e+7),n={},r={};for(let e of t)for(let t of e.segs)n[t.name]=(n[t.name]||0)+t.minutes,r[t.name]=t.color;let o=Object.entries(n).map(([e,t])=>({color:r[e],minutes:t,name:e}));a.push({date:t[0].date,segs:o,total:o.reduce((e,t)=>e+t.minutes,0)})}}let o=Math.max(60,...a.map(e=>e.total)),s;o<=120?(o=Math.ceil(o/30)*30,s=30):o<=480?(o=Math.ceil(o/60)*60,s=60):(o=Math.ceil(o/120)*120,s=120);let l=o/s,u=708/a.length,d=e=>10+143*(1-e/o),p=``;for(let e=0;e<=l;e++){let t=o/l*e,n=d(t);p+=`<line x1="46" y1="${n}" x2="754" y2="${n}" class="gl"/>`;let r=t===0?`0`:t%60==0?t/60+`h`:t+`m`;p+=`<text x="39" y="${n+4}" class="gl-l" text-anchor="end">${r}</text>`}let h=``;a.forEach((e,t)=>{let n=Math.max(3,u*.62),r=46+t*u+(u-n)/2,i=153;for(let t of e.segs){let e=t.minutes/o*143;i-=e,h+=`<rect x="${r.toFixed(1)}" y="${i.toFixed(1)}" width="${n.toFixed(1)}" height="${Math.max(1.5,e).toFixed(1)}" rx="2" fill="${t.color}"><title>${f(t.name)} · ${m(t.minutes)}</title></rect>`}});let g=Math.max(1,Math.ceil(a.length/6)),_=``;a.forEach((e,t)=>{t%g===0&&(_+=`<text x="${(46+t*u+u/2).toFixed(1)}" y="169" class="xl" text-anchor="middle">${D(e.date)}</text>`)}),e.innerHTML=`<svg viewBox="0 0 760 175" preserveAspectRatio="xMidYMid meet" class="chart">${p}${h}${_}</svg>`}function N(){C(),w(),A(),P(),L()}function P(){let e=d(`#timer-chip`);if(!e)return;if(!c.timer){e.innerHTML=``;return}let t=g(c.timer.projectId);e.innerHTML=`<div class="tchip"><span class="tdot"></span><span class="ttime" id="t-time">0:00</span><span class="tproj">${f(t?t.name:``)}</span><button class="tstop" id="t-stop" type="button">Stop</button></div>`,F()}function F(){let e=d(`#t-time`);if(!e||!c.timer)return;let t=Math.max(0,Math.floor((Date.now()-c.timer.startedAt)/1e3)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;e.textContent=(n?n+`:`+String(r).padStart(2,`0`):r)+`:`+String(i).padStart(2,`0`)}function I(){if(c.timer){let e=c.stopTimer();e&&v(`Logged ${m(e.minutes)} on ${e.name}`),N();return}let e=d(`#q-proj`),t=e&&e.value||u.q.proj||c.projects[0]&&c.projects[0].name,n=c.projectByName(t);if(!n){v(`Add a project first`);return}c.startTimer(n.id),u.quickProject=n.id,N()}function L(){d(`#tabs`).onclick=e=>{let t=e.target.closest(`[data-tab]`);t&&(u.tab=t.dataset.tab,R(u.tab))};let e=d(`#proj-form`);e&&(e.onsubmit=t=>{t.preventDefault();let n=new FormData(e),r=String(n.get(`name`)||``).trim(),i=Number(n.get(`rate`));if(!r)return;let a=c.addProject(r,Number.isFinite(i)?i:0);u.quickProject=a.id,u.q.proj=a.name,v(`Project added`),N();let o=d(`#proj-form input[name=name]`);o&&o.focus()}),d(`#sidebar`).onclick=e=>{let t=e.target.closest(`[data-delproj]`);if(t){let e=g(t.dataset.delproj);e&&confirm(`Delete "${e.name}" and all its entries?`)&&(c.removeProject(e.id),u.quickProject===e.id&&(u.quickProject=null),N());return}let n=e.target.closest(`[data-proj]`);if(n){u.quickProject=n.dataset.proj;let e=g(n.dataset.proj);e&&(u.q.proj=e.name),N()}};let t=d(`#cur-sel`);t&&(t.onchange=()=>{c.prefs.currency=t.value,c.save(),N()});let n=d(`#erase`);n&&(n.onclick=()=>{confirm(`Erase all projects and entries? This cannot be undone.`)&&(c.reset(),u.quickProject=null,u.editing=null,N(),v(`All data erased`))});let r=d(`#entry-form`);r&&(r.onsubmit=e=>{e.preventDefault();let t=d(`#q-proj`).value,n=d(`#q-date`).value||l,r=Math.round(Number(d(`#q-min`).value)||0);if(!t||r<=0)return;c.addEntry(t,n,r),u.q={proj:t,date:n,min:``},N();let i=d(`#q-min`);i&&i.focus()});let i=d(`#timer-btn`);i&&(i.onclick=I);let a=d(`#t-stop`);a&&(a.onclick=I);let o=d(`#entries`);o&&(o.onclick=e=>{let t=e.target.closest(`[data-delen]`);if(t){e.stopPropagation(),c.deleteEntry(t.dataset.delen),u.editing===t.dataset.delen&&(u.editing=null),N();return}let n=e.target.closest(`[data-edit]`);if(n){u.editing=n.dataset.edit,T(),z();let e=o.querySelector(`.emin`);e&&(e.focus(),e.select&&e.select());return}e.target.closest(`[data-cancel]`)&&(u.editing=null,T(),z())},z());let s=d(`#r-from`),f=d(`#r-to`);if(s&&f){let e=()=>{s.value&&f.value&&s.value<=f.value&&(u.reportFrom=s.value,u.reportTo=f.value,A(),B())};s.onchange=e,f.onchange=e}B()}function R(e){u.tab=e,d(`#tab-entries`).hidden=e!==`entries`,d(`#tab-report`).hidden=e!==`report`,document.querySelectorAll(`.tab`).forEach(t=>t.classList.toggle(`on`,t.dataset.tab===e))}function z(){let e=d(`#entries`);if(!e)return;let t=e.querySelector(`[data-eform]`);t&&(t.onsubmit=e=>{e.preventDefault();let n=new FormData(t);c.updateEntry(t.dataset.eform,{date:n.get(`date`),minutes:Number(n.get(`minutes`)),note:n.get(`note`)}),u.editing=null,T(),z()})}function B(){document.querySelectorAll(`[data-pre]`).forEach(e=>{e.onclick=()=>{let t=l,n=t.slice(0,8)+`01`,r=new Date,i=new Date(r.getFullYear(),r.getMonth()-1,1),a=i.getFullYear()+`-`+String(i.getMonth()+1).padStart(2,`0`)+`-01`,s=new Date(r.getFullYear(),r.getMonth(),0),d=s.getFullYear()+`-`+String(s.getMonth()+1).padStart(2,`0`)+`-`+String(s.getDate()).padStart(2,`0`),f=c.entries.reduce((e,t)=>t.date<e?t.date:e,t),[p,m]={today:[t,t],"7d":[o(t,-6),t],month:[n,t],lastmonth:[a,d],all:[f,t]}[e.dataset.pre];u.reportFrom=p,u.reportTo=m,A(),B()}});let e=d(`#csv-dl`);e&&(e.onclick=()=>{let e=c.csv(u.reportFrom,u.reportTo),t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`tempo-report_${u.reportFrom}_to_${u.reportTo}.csv`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),4e3),v(`CSV downloaded`)});let t=d(`#csv-copy`);t&&(t.onclick=async()=>{let e=c.csv(u.reportFrom,u.reportTo);try{await navigator.clipboard.writeText(e),v(`CSV copied to clipboard`)}catch{v(`Copy failed — use Download`)}});let n=d(`#inv-btn`);n&&(n.onclick=()=>{u.invoice=!u.invoice,A(),B()});let r=d(`#inv-print`);r&&(r.onclick=()=>window.print())}document.addEventListener(`keydown`,e=>{let t=(e.target.tagName||``).toLowerCase(),n=t===`input`||t===`textarea`||t===`select`;if(e.key===`Escape`){u.editing?(u.editing=null,T(),z()):n&&e.target.blur();return}if(!(n||e.metaKey||e.ctrlKey||e.altKey)){if(e.key===`n`||e.key===`/`){e.preventDefault(),R(`entries`);let t=d(`#q-proj`);t&&t.focus()}else e.key===`t`?I():e.key===`e`?R(`entries`):e.key===`r`&&R(`report`)}});function V(){try{if(localStorage.getItem(`tempo.seeded`))return}catch{return}let[e,t,n]=[`Website Redesign`,`Mobile App`,`Consulting`];c.addProject(e,95),c.addProject(t,80),c.addProject(n,60);let r=e=>o(l,-e),i=(e,t,n)=>c.addEntry(e,t,n);i(e,r(1),135),i(e,r(2),90),i(e,r(4),220),i(e,r(6),45),i(t,r(0),30),i(t,r(1),120),i(t,r(3),75),i(t,r(5),180),i(n,r(2),60),i(n,r(5),90),i(n,r(7),120);try{localStorage.setItem(`tempo.seeded`,`1`)}catch{}}window.APP={reset(){return c.reset(),u.editing=null,u.quickProject=null,N(),!0},addProject({name:e,rate:t}){let n=c.addProject(e,t);return u.quickProject=n.id,u.q.proj=n.name,N(),n},addEntry({project:e,date:t,minutes:n}){let r=c.addEntry(e,t,n);return N(),r},report({from:e,to:t}){return c.report(e||`0000-01-01`,t||`9999-12-31`)},csv({from:e,to:t}){return c.csv(e||`0000-01-01`,t||`9999-12-31`)}},S(),V(),N(),setInterval(()=>{c.timer&&F()},1e3);