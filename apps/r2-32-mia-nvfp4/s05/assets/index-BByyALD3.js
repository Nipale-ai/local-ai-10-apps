(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),n=e=>String(e).padStart(2,`0`),r=e=>`${e.getFullYear()}-${n(e.getMonth()+1)}-${n(e.getDate())}`,i=()=>r(new Date),a=e=>{let[t,n,r]=String(e).split(`-`).map(Number);return new Date(t,n-1,r)},o=(e,t)=>{let n=a(e);return n.setDate(n.getDate()+t),r(n)},s=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],c=e=>{if(!e)return``;let t=i();if(e===t)return`Today`;if(e===o(t,-1))return`Yesterday`;let n=a(e),r={month:`short`,day:`numeric`};return n.getFullYear()!==new Date().getFullYear()&&(r.year=`numeric`),n.toLocaleDateString(`en-GB`,r)},l=e=>{if(e=Math.round(Number(e)||0),e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t}h ${n}m`:`${t}h`},u=e=>(Number(e)||0).toFixed(2),d=`timebills.v1`,f=[`#255ce7`,`#d97706`,`#0d9488`,`#7c3aed`,`#dc2626`,`#db2777`,`#4f46e5`,`#059669`],p={projects:[],entries:[],seq:1};try{let e=localStorage.getItem(d);if(e){let t=JSON.parse(e);t&&Array.isArray(t.projects)&&Array.isArray(t.entries)&&(p=t)}}catch{}var m=null;function h(){m&&=(clearTimeout(m),null);try{localStorage.setItem(d,JSON.stringify(p))}catch{}}function g(){m||=setTimeout(()=>{m=null,h()},150)}window.addEventListener(`pagehide`,h),window.addEventListener(`beforeunload`,h);var _=null;function v(){_||=setTimeout(()=>{_=null,Q()},60)}function y(){_&&=(clearTimeout(_),null),Q()}function b(e,t){let n=Math.round((Number(t)||0)*100),r=Math.round(Number(e)||0);return Math.floor((r*n+30)/60)}function x(e,t){e=String(e||i()),t=String(t||i());let n=new Map;p.projects.forEach((e,t)=>n.set(e.id,t));let r=Array(p.projects.length).fill(0);for(let i of p.entries){if(i.date<e||i.date>t)continue;let a=n.get(i.projectId);a!==void 0&&(r[a]+=i.minutes)}let a=0,o=0;return{projects:p.projects.map((e,t)=>{let n=r[t],i=b(n,e.rate);return a+=n,o+=i,{name:e.name,minutes:n,amount:i/100}}),total_minutes:a,total_amount:o/100}}function S(e,t){let n=x(e,t),r=e=>/[",\n]/.test(e)?`"`+e.replace(/"/g,`""`)+`"`:e,i=[`Project,Minutes,Amount`];for(let e of n.projects)i.push(`${r(e.name)},${e.minutes},${u(e.amount)}`);return i.push(`TOTAL,${n.total_minutes},${u(n.total_amount)}`),i.join(`
`)}window.APP={reset(){return M(),p={projects:[],entries:[],seq:1},h(),y(),null},addProject({name:e,rate:t}={}){let n=String(e??``).trim();if(!n)return null;let r=p.projects.find(e=>e.name.toLowerCase()===n.toLowerCase());return r?r.rate=Number(t)||0:(r={id:`p`+p.seq++,name:n,rate:Number(t)||0,color:f[p.projects.length%f.length]},p.projects.push(r)),g(),v(),{id:r.id,name:r.name,rate:r.rate}},addEntry({project:e,date:t,minutes:n}={}){let r=String(e??``).trim();if(!r)return null;let a=p.projects.find(e=>e.name.toLowerCase()===r.toLowerCase());a||(a={id:`p`+p.seq++,name:r,rate:0,color:f[p.projects.length%f.length]},p.projects.push(a));let o=Number(n)||0,s={id:`e`+p.seq++,projectId:a.id,date:String(t||i()),minutes:o};return p.entries.push(s),g(),v(),{id:s.id,project:a.name,date:s.date,minutes:o}},report({from:e,to:t}={}){return x(e,t)},csv({from:e,to:t}={}){return S(e,t)}};var C=`time`,w={from:o(i(),-29),to:i()},T=!1,E=null,D=null,O=``;function k(e){let t=String(e||``).trim().toLowerCase();return p.projects.find(e=>e.name.toLowerCase()===t)||null}function A(e){return p.projects.find(t=>t.id===e)||null}function j(){if(!p.projects.length){I(`Add a project first, then start the timer.`);return}let t=e(`#timer-project`);E={projectId:(t?t.value:p.projects[0].id)||p.projects[0].id,startedAt:Date.now()},N(),y()}function M(){if(!E)return;let e=Math.floor((Date.now()-E.startedAt)/1e3),t=Math.round(e/60);if(t>0){let e=A(E.projectId);e&&p.entries.push({id:`e`+p.seq++,projectId:e.id,date:i(),minutes:t}),I(`Timer stopped — ${l(t)} logged to ${e?e.name:`project`}.`)}else I(`Timer stopped (less than a minute — nothing logged).`);E=null,P(),g(),y()}function N(){P(),D=setInterval(F,250)}function P(){D&&=(clearInterval(D),null)}function F(){let t=e(`#clock`);if(!t||!E)return;let r=Math.floor((Date.now()-E.startedAt)/1e3),i=Math.floor(r/3600),a=Math.floor(r%3600/60),o=r%60;t.textContent=`${i}:${n(a)}:${n(o)}`}function I(e){O=e}function L(e){p.entries=p.entries.filter(t=>t.id!==e),g(),y()}function R(e){p.projects=p.projects.filter(t=>t.id!==e),p.entries=p.entries.filter(t=>t.projectId!==e),E&&E.projectId===e&&M(),g(),y()}function z(e,t){let n=A(e);n&&(n.rate=Math.max(0,Number(t)||0),g(),y())}function ee(){let e=(new Date().getDay()+6)%7,t=o(i(),-e),n=[...Array(7)].map((e,n)=>o(t,n)),r=n.map(()=>0),a=new Map(n.map((e,t)=>[e,t]));for(let e of p.entries){let t=a.get(e.date);t!==void 0&&(r[t]+=e.minutes)}return{days:n,per:r}}function B(){let e=i(),t=o(e,-6),n=new Map;p.projects.forEach((e,t)=>n.set(e.id,t));let r=Array(p.projects.length).fill(0);for(let i of p.entries){if(i.date<t||i.date>e)continue;let a=n.get(i.projectId);a!==void 0&&(r[a]+=i.minutes)}return p.projects.map((e,t)=>({name:e.name,color:e.color,minutes:r[t],amount:b(r[t],e.rate)/100})).filter(e=>e.minutes>0).sort((e,t)=>t.minutes-e.minutes)}function V(){return[...p.entries].sort((e,t)=>e.date<t.date?1:e.date>t.date?-1:e.id<t.id?1:-1).slice(0,30)}function H(e){return p.projects.map(n=>`<option value="${t(n.id)}" ${n.id===e?`selected`:``}>${t(n.name)}</option>`).join(``)}function U(){let e=i(),n=ee(),r=n.per.reduce((e,t)=>e+t,0),a=Math.max(...n.per,1),o=B(),d=V(),f=p.projects[0]?p.projects[0].id:``,m=(()=>{let e=0,t=Array(p.projects.length).fill(0),r=new Map;p.projects.forEach((e,t)=>r.set(e.id,t));let i=new Map(n.days.map((e,t)=>[e,t]));for(let e of p.entries){let n=r.get(e.projectId);n!==void 0&&i.get(e.date)!==void 0&&(t[n]+=e.minutes)}for(let n=0;n<p.projects.length;n++)e+=b(t[n],p.projects[n].rate);return e})(),h=n.days.map((t,r)=>{let i=Math.round(56*(n.per[r]/a));return`<div class="wday${t===e?` today`:``}">
      <span class="wlabel">${s[r]}</span>
      <div class="wbar"><div class="wfill" style="height:${Math.max(i,n.per[r]?4:0)}px"></div></div>
      <span class="wval">${n.per[r]?l(n.per[r]):`–`}</span>
    </div>`}).join(``),g=o.length?W(o):G(`No time logged in the last 7 days yet.`),_=d.map(e=>{let n=A(e.projectId),r=n?b(e.minutes,n.rate):0;return`<li class="entry">
      <span class="dot" style="background:${n?n.color:`#9ca3af`}"></span>
      <div class="e-main"><strong>${t(n?n.name:`Unknown`)}</strong><span class="muted">${c(e.date)}</span></div>
      <span class="e-min">${l(e.minutes)}</span>
      <span class="e-amt">${u(r/100)}</span>
      <button class="btn danger-ghost" data-action="del-entry" data-id="${e.id}" aria-label="Delete entry">Delete</button>
    </li>`}).join(``);return`
  <div class="grid2">
    <section class="card timer-card">
      <div class="card-head"><h2>Timer</h2>${E?`<span class="live"><span class="live-dot"></span>running</span>`:``}</div>
      <div class="clock" id="clock">0:00:00</div>
      <div class="timer-row">
        <select id="timer-project" data-role="timer-project" aria-label="Timer project" ${p.projects.length?``:`disabled`}>
          ${p.projects.length?H(f):`<option value="">No projects yet</option>`}
        </select>
        <button class="btn primary" data-action="timer-toggle" ${p.projects.length?``:`disabled`}>${E?`Stop`:`Start`}</button>
      </div>
    </section>
    <section class="card">
      <div class="card-head"><h2>Log time</h2></div>
      <form data-action="add-entry" class="entry-form">
        <select name="project" aria-label="Project" ${p.projects.length?``:`disabled`}>
          ${p.projects.length?H(f):`<option value="">Add a project first</option>`}
        </select>
        <input type="date" name="date" value="${e}" aria-label="Date" required>
        <input type="number" name="minutes" min="0" step="1" placeholder="45" aria-label="Minutes" required>
        <button class="btn primary" type="submit">Add</button>
      </form>
      <p class="hint">Tip: press <kbd>Enter</kbd> to add. The timer logs automatically when you stop it.</p>
    </section>
  </div>

  <section class="card">
    <div class="card-head"><h2>This week</h2><span class="muted">${l(r)} · ${u(m/100)}</span></div>
    <div class="week" aria-label="Minutes per day this week">${h}</div>
  </section>

  <section class="card">
    <div class="card-head"><h2>Time by project</h2><span class="muted">last 7 days</span></div>
    ${g}
  </section>

  <section class="card">
    <div class="card-head"><h2>Recent entries</h2><span class="muted">${p.entries.length?p.entries.length+` total`:``}</span></div>
    ${d.length?`<ul class="entries">${_}</ul>`:`<p class="empty-note">No entries yet. Start the timer or log time above.</p>`}
  </section>`}function W(e){let n=Math.max(120,12+e.length*46),r=Math.max(...e.map(e=>e.minutes),1),i=`<svg class="chart" viewBox="0 0 640 ${n}" height="${n}" role="img" aria-label="Minutes per project, last 7 days">`;return e.forEach((e,n)=>{let a=6+n*46,o=Math.max(4,320*(e.minutes/r)),s=e.name.length>22?e.name.slice(0,21)+`…`:e.name;i+=`<text x="158" y="${a+23+4}" text-anchor="end" class="clabel">${t(s)}</text>`,i+=`<rect x="170" y="${a+10}" width="${o}" height="26" rx="5" fill="${e.color}" opacity="0.92"></rect>`,i+=`<text x="${170+o+10}" y="${a+23+4}" class="cval">${l(e.minutes)} · ${u(e.amount)}</text>`}),i+=`</svg>`,i}function G(e){return`<svg class="chart" viewBox="0 0 640 120" height="120" role="img" aria-label="Chart, no data yet">
    <text x="320" y="64" text-anchor="middle" class="cempty">${t(e)}</text>
  </svg>`}function K(){let e=p.projects.map(e=>{let n=p.entries.filter(t=>t.projectId===e.id).reduce((e,t)=>e+t.minutes,0);return`<li class="proj">
      <span class="dot" style="background:${e.color}"></span>
      <div class="p-main"><strong>${t(e.name)}</strong><span class="muted">${l(n)} logged</span></div>
      <label class="rate-box"><span class="rate-sym">/h</span>
        <input type="number" class="rate-input" min="0" step="0.01" value="${e.rate}" data-id="${e.id}" aria-label="Hourly rate for ${t(e.name)}">
      </label>
      <button class="btn danger-ghost" data-action="del-project" data-id="${e.id}" aria-label="Delete project ${t(e.name)}">Delete</button>
    </li>`}).join(``);return`
  <section class="card">
    <div class="card-head"><h2>Add a project</h2></div>
    <form data-action="add-project" class="proj-form">
      <input type="text" name="name" placeholder="Project name" aria-label="Project name" required>
      <input type="number" name="rate" min="0" step="0.01" placeholder="45.00" aria-label="Hourly rate" required>
      <button class="btn primary" type="submit">Add project</button>
    </form>
    <p class="hint">The rate is used for billing: amount = minutes × rate ÷ 60, rounded to the cent.</p>
  </section>
  <section class="card">
    <div class="card-head"><h2>Projects</h2><span class="muted">${p.projects.length}</span></div>
    ${e?`<ul class="proj-list">${e}</ul>`:`<p class="empty-note">No projects yet — add your first one above.</p>`}
  </section>`}function q(){let e=x(w.from,w.to);e.total_minutes/60;let t=T?Y(e):J(e);return`
  <section class="card">
    <div class="card-head"><h2>Report</h2><span class="muted">${c(w.from)} – ${c(w.to)}</span></div>
    <div class="range-row">
      <input type="date" id="r-from" value="${w.from}" aria-label="From date">
      <span class="dash">–</span>
      <input type="date" id="r-to" value="${w.to}" aria-label="To date">
      <div class="presets">
        <button class="btn ghost" data-action="preset" data-p="7d">Last 7 days</button>
        <button class="btn ghost" data-action="preset" data-p="week">This week</button>
        <button class="btn ghost" data-action="preset" data-p="month">This month</button>
        <button class="btn ghost" data-action="preset" data-p="all">All time</button>
      </div>
    </div>
    <div class="actions">
      <button class="btn" data-action="csv-download">Download CSV</button>
      <button class="btn" data-action="csv-copy">Copy CSV</button>
      <button class="btn" data-action="invoice-toggle">${T?`Report view`:`Invoice view`}</button>
    </div>
  </section>
  <section class="card">${t}</section>`}function J(e){let n=e.projects.map(e=>`
    <tr>
      <td class="t-name">${t(e.name)}</td>
      <td class="t-num">${l(e.minutes)}</td>
      <td class="t-num">${e.minutes} min</td>
      <td class="t-num t-amt">${u(e.amount)}</td>
    </tr>`).join(``),r=p.projects.map((t,n)=>({name:t.name,color:t.color,minutes:e.projects[n].minutes,amount:e.projects[n].amount})).filter(e=>e.minutes>0).sort((e,t)=>t.minutes-e.minutes);return`
    <div class="card-head"><h2>Breakdown</h2><span class="muted">${e.total_minutes} min · ${u(e.total_amount)}</span></div>
    <table class="report-table">
      <thead><tr><th>Project</th><th class="t-num">Time</th><th class="t-num">Minutes</th><th class="t-num">Amount</th></tr></thead>
      <tbody>${n||`<tr><td colspan="4" class="empty-note">No projects yet.</td></tr>`}</tbody>
      <tfoot><tr><td class="t-total">Total</td><td class="t-num t-total">${l(e.total_minutes)}</td><td class="t-num t-total">${e.total_minutes} min</td><td class="t-num t-amt t-total">${u(e.total_amount)}</td></tr></tfoot>
    </table>
    ${r.length?W(r):G(`No time in this range yet.`)}`}function Y(e){let n=e.projects.map((e,n)=>{let r=p.projects[n];return`
    <tr>
      <td class="t-name">${t(e.name)}</td>
      <td class="t-num">${(e.minutes/60).toFixed(2)} h</td>
      <td class="t-num">${u(r?r.rate:0)}</td>
      <td class="t-num t-amt">${u(e.amount)}</td>
    </tr>`}).join(``);return`
    <div class="invoice">
      <div class="inv-head">
        <div><h2 class="inv-title">Invoice</h2><p class="muted">Timebills · time tracking &amp; billing</p></div>
        <div class="inv-period"><span>Period</span><strong>${c(w.from)} – ${c(w.to)}</strong></div>
      </div>
      <table class="report-table">
        <thead><tr><th>Project</th><th class="t-num">Hours</th><th class="t-num">Rate / h</th><th class="t-num">Amount</th></tr></thead>
        <tbody>${n||`<tr><td colspan="4" class="empty-note">No time in this range.</td></tr>`}</tbody>
        <tfoot><tr><td class="t-total">Total</td><td class="t-num t-total">${(e.total_minutes/60).toFixed(2)} h</td><td></td><td class="t-num t-amt t-total">${u(e.total_amount)}</td></tr></tfoot>
      </table>
      <div class="inv-due"><span>Amount due</span><strong>${u(e.total_amount)}</strong></div>
    </div>`}function X(){return`
  <section class="card empty-card">
    <svg class="empty-logo" viewBox="0 0 48 48" width="56" height="56" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#255ce7" stroke-width="4"/>
      <path d="M24 13v11l8 5" fill="none" stroke="#255ce7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h2>Welcome to Timebills</h2>
    <p>Track time against projects, keep an eye on your week, and turn logged hours into clean, billable reports. Your data stays in this browser.</p>
    <button class="btn primary" data-action="go-projects">Add your first project</button>
  </section>`}function Z(){let e=[[`time`,`Time`],[`projects`,`Projects`],[`report`,`Report`]].map(([e,t])=>`<button class="tab${C===e?` active`:``}" data-action="tab" data-view="${e}" aria-current="${C===e?`page`:`false`}">${t}</button>`).join(``),n;return n=C===`time`?p.projects.length?U():X():C===`projects`?K():q(),`
  <div class="shell">
    <header class="top">
      <div class="brand">
        <svg class="logo" viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="4"/>
          <path d="M24 13v11l8 5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="brand-name">Timebills</span>
      </div>
      <nav class="tabs" aria-label="Sections">${e}</nav>
    </header>
    <main class="main">
      ${O?`<div class="status" role="status">${t(O)}</div>`:``}
      ${n}
    </main>
    <footer class="foot">Data is stored locally in your browser — nothing leaves this device.</footer>
  </div>`}function Q(){let t=e(`#app`);t.innerHTML=Z(),O=``,E&&F()}function te(e){let t=i();w=e===`7d`?{from:o(t,-6),to:t}:e===`week`?{from:o(t,-((new Date().getDay()+6)%7)),to:t}:e===`month`?{from:t.slice(0,8)+`01`,to:t}:{from:`2000-01-01`,to:t},y()}function ne(){let e=S(w.from,w.to),t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`timebills_${w.from}_to_${w.to}.csv`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),4e3),I(`CSV downloaded.`),y()}async function re(){let e=S(w.from,w.to);try{await navigator.clipboard.writeText(e),I(`CSV copied to clipboard.`)}catch{I(`Could not access the clipboard — use Download CSV instead.`)}y()}var $=e(`#app`);$.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t||t.disabled)return;let n=t.dataset.action;n===`tab`?(C=t.dataset.view,y()):n===`timer-toggle`?E?M():j():n===`del-entry`?L(t.dataset.id):n===`del-project`?R(t.dataset.id):n===`preset`?te(t.dataset.p):n===`csv-download`?ne():n===`csv-copy`?re():n===`invoice-toggle`?(T=!T,y()):n===`go-projects`&&(C=`projects`,y())}),$.addEventListener(`submit`,e=>{let t=e.target;if(e.preventDefault(),t.dataset.action===`add-entry`){let e=t.project.value,n=k(e);if(!n){I(`Add a project first (Projects tab).`);return}let r=Number(t.minutes.value);if(!r||r<=0){t.minutes.classList.add(`shake`),t.minutes.focus();return}p.entries.push({id:`e`+p.seq++,projectId:n.id,date:t.date.value||i(),minutes:r}),g(),I(`Added ${l(r)} to ${n.name}.`),y()}else if(t.dataset.action===`add-project`){let e=t.name.value.trim(),n=Number(t.rate.value);if(!e)return;let r=k(e);r?(r.rate=Math.max(0,n||0),I(`Updated rate for ${r.name}.`)):(r={id:`p`+p.seq++,name:e,rate:Math.max(0,n||0),color:f[p.projects.length%f.length]},p.projects.push(r),I(`Project “${e}” added.`)),g(),y()}}),$.addEventListener(`change`,e=>{let t=e.target;t.id===`r-from`&&t.value?(w.from=t.value,y()):t.id===`r-to`&&t.value?(w.to=t.value,y()):t.classList.contains(`rate-input`)&&z(t.dataset.id,t.value)}),$.addEventListener(`input`,e=>{e.target.classList&&e.target.classList.contains(`shake`)&&e.target.classList.remove(`shake`)}),Q();