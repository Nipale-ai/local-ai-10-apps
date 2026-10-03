(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`timebill.v1`,t=`timebill.timer.v1`,n=[`#4f46e5`,`#0e9488`,`#d97706`,`#dc2626`,`#7c3aed`,`#0369a1`,`#059669`,`#db2777`,`#65a30d`,`#b45309`],r=d(),i=`track`,a=g(_()),o=g(new Date),s=0,c=g(new Date),l=p(),u=r.projects.length%n.length;function d(){try{let t=JSON.parse(localStorage.getItem(e));if(t&&Array.isArray(t.projects)&&Array.isArray(t.entries))return t}catch{}return{projects:[],entries:[]}}function f(){localStorage.setItem(e,JSON.stringify(r))}function p(){try{let e=JSON.parse(localStorage.getItem(t));if(e&&e.startedAt&&r.projects.some(t=>t.id===e.projectId))return e}catch{}return null}function m(){l?localStorage.setItem(t,JSON.stringify(l)):localStorage.removeItem(t)}function h(){return crypto.randomUUID?crypto.randomUUID():`id-`+Date.now()+`-`+Math.random().toString(36).slice(2)}function g(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function _(){let e=new Date;return new Date(e.getFullYear(),e.getMonth(),1)}function v(){return g(new Date)}function y(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function b(e){return r.projects.find(t=>t.id===e)}function x(e){let t=Math.floor(e/60),n=e%60;return t?`${t}h ${String(n).padStart(2,`0`)}m`:`${n}m`}function S(e){let t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60;return`${t}:${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function C(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(`en-US`,{weekday:`short`,month:`short`,day:`numeric`})}function w(e){return Math.round(Number(e)*100)}function T(e,t){let n=w(t);return Math.floor((2*e*n+60)/120)}function E(e){return(e/100).toFixed(2)}function D(e,t){let n=new Map;for(let i of r.entries)i.date<e||i.date>t||n.set(i.projectId,(n.get(i.projectId)||0)+i.minutes);let i=[],a=0,o=0;for(let e of r.projects){let t=n.get(e.id)||0,r=T(t,e.rate);i.push({name:e.name,minutes:t,amount:r/100}),a+=t,o+=r}return{projects:i,total_minutes:a,total_amount:o/100}}function O(e){return e=String(e),/[",\n\r]/.test(e)?`"`+e.replace(/"/g,`""`)+`"`:e}function k(e,t){let n=D(e,t),r=[`project,minutes,amount`];for(let e of n.projects)r.push(`${O(e.name)},${e.minutes},${e.amount.toFixed(2)}`);return r.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),r.join(`
`)+`
`}window.APP={reset(){r={projects:[],entries:[]},u=0,f(),l=null,m(),z()},addProject({name:e,rate:t}){let i={id:h(),name:String(e),rate:Number(t)||0,color:n[u++%n.length]};return r.projects.push(i),f(),R(),{id:i.id,name:i.name,rate:i.rate}},addEntry({project:e,date:t,minutes:i}){let a=r.projects.find(t=>t.name===e);a||(a={id:h(),name:String(e),rate:0,color:n[u++%n.length]},r.projects.push(a));let o={id:h(),projectId:a.id,date:String(t),minutes:Math.round(Number(i)),note:``};return r.entries.push(o),f(),R(),{id:o.id,project:a.name,date:o.date,minutes:o.minutes}},report({from:e,to:t}){return D(String(e),String(t))},csv({from:e,to:t}){return k(String(e),String(t))}};var A=null;function j(e,t){let n=document.getElementById(`toast`);n||(n=document.createElement(`div`),n.id=`toast`,n.setAttribute(`role`,`status`),n.setAttribute(`aria-live`,`polite`),document.body.appendChild(n)),n.innerHTML=``;let r=document.createElement(`span`);if(r.textContent=e,n.appendChild(r),t){let e=document.createElement(`button`);e.type=`button`,e.textContent=t.label,e.className=`toast-action`,e.addEventListener(`click`,()=>{t.fn(),n.classList.remove(`show`)}),n.appendChild(e)}n.classList.add(`show`),clearTimeout(A),A=setTimeout(()=>n.classList.remove(`show`),t?6e3:2200)}function M(){return l?Math.max(0,Math.floor((Date.now()-l.startedAt)/1e3)):0}function N(e){l={projectId:e,startedAt:Date.now()},m(),F(),z()}function P(){if(!l)return;let e=M(),t=Math.round(e/60),n=b(l.projectId);t>0&&n&&(r.entries.push({id:h(),projectId:n.id,date:v(),minutes:t,note:`Tracked with timer`}),f(),j(`Logged ${x(t)} to ${n.name}`)),l=null,m(),z()}function F(){document.querySelectorAll(`[data-timer-clock]`).forEach(e=>{e.textContent=S(M())}),document.title=l?`▶ ${S(M())} — TimeBill`:`TimeBill — Time tracking & billing`}setInterval(()=>{l&&F()},1e3);function I(e){let t=String(e||``).trim().toLowerCase().replace(`,`,`.`);if(!t)return null;let n;return(n=t.match(/^(\d+):(\d{1,2})$/))?n[1]*60+ +n[2]:(n=t.match(/^(\d+(?:\.\d+)?)\s*h(?:\s*(\d{1,2})\s*m?)?$/))?Math.round(n[1]*60)+(+n[2]||0):(n=t.match(/^(\d+)\s*m(?:in)?$/))?+n[1]:(n=t.match(/^(\d+(?:\.\d+)?)$/))?t.includes(`.`)?Math.round(n[1]*60):+n[1]:null}var L=!1;function R(){L||(L=!0,setTimeout(()=>{L=!1,z()},30))}function z(){V()}var B=document.getElementById(`app`);function V(){B.innerHTML=`
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#4f46e5"/><path d="M16 8v9l6 4" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/></svg>
          TimeBill <span class="tag">time &amp; billing</span>
        </div>
        <div class="spacer"></div>
        ${H()}
      </div>
      <nav class="tabs" role="tablist" aria-label="Sections">
        <button class="tab" role="tab" aria-selected="${i===`track`}" data-action="tab" data-view="track">Track</button>
        <button class="tab" role="tab" aria-selected="${i===`projects`}" data-action="tab" data-view="projects">Projects</button>
        <button class="tab" role="tab" aria-selected="${i===`report`}" data-action="tab" data-view="report">Report</button>
      </nav>
    </header>
    <main id="main">${U()}</main>
  `,l&&F()}function H(){let e=l?b(l.projectId):null;return`
    <div class="timer-chip" role="group" aria-label="Timer">
      <span class="timer-clock ${l?`running`:``}" data-timer-clock>${l?S(M()):`0:00:00`}</span>
      ${e?`<span class="timer-project">${y(e.name)}</span>`:``}
      <button class="btn ${l?`danger`:`primary`}" data-action="timer-toggle" aria-label="${l?`Stop timer`:`Start timer`}" title="${l?`Stop timer`:`Start timer`}">
        ${l?`<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect width="14" height="14" rx="2" fill="currentColor"/></svg>`:`<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>`}
        ${l?`Stop`:`Start`}
      </button>
    </div>`}function U(){return i===`projects`?J():i===`report`?Y():W()}function W(){let e=K();return`
    <div class="grid">
      <section class="card" aria-labelledby="h-quick">
        <h2 id="h-quick">Log time</h2>
        ${r.projects.length?`<p class="sub">Type a duration like <b>1h 30</b>, <b>90</b> or <b>1:30</b> — press Enter to save.</p>`:`<p class="sub">No projects yet — <button type="button" class="btn small primary" data-action="tab" data-view="projects" style="vertical-align:middle">Add a project</button> first, then log time here.</p>`}
        <form class="form-row" id="quick-form">
          <div class="field wide">
            <label for="q-project">Project</label>
            <select id="q-project" name="project">${G()}</select>
          </div>
          <div class="field">
            <label for="q-date">Date</label>
            <input id="q-date" name="date" type="date" value="${c}" required>
          </div>
          <div class="field">
            <label for="q-duration">Duration</label>
            <input id="q-duration" name="duration" inputmode="numeric" placeholder="1h 30" autocomplete="off" required>
          </div>
          <div class="field wide">
            <label for="q-note">Note (optional)</label>
            <input id="q-note" name="note" placeholder="What did you work on?" autocomplete="off">
          </div>
          <button class="btn primary" type="submit">Add entry</button>
        </form>
      </section>

      <section class="card" aria-labelledby="h-timer">
        <h2 id="h-timer">Timer</h2>
        <p class="sub">Start it, work, stop it — the time lands on today.</p>
        <div class="timer-big">
          <div class="clock ${l?`running`:``}" data-timer-clock role="timer" aria-label="Elapsed time">${l?S(M()):`0:00:00`}</div>
          <div class="field" style="width:min(280px,100%)">
            <label for="t-project">Project</label>
            <select id="t-project">${G(l?l.projectId:null)}</select>
          </div>
          <button class="btn ${l?`danger`:`primary`}" data-action="timer-toggle" style="min-width:140px" aria-label="${l?`Stop timer`:`Start timer`}">
            ${l?`■ Stop timer`:`▶ Start timer`}
          </button>
        </div>
      </section>

      <section class="card" aria-labelledby="h-week">
        <h2 id="h-week">This week</h2>
        <p class="sub">Tap a day to preselect it in the form.</p>
        <div style="display:flex;gap:6px;margin-bottom:10px">
          <button class="btn small" data-action="week-prev" type="button" aria-label="Previous week">← Prev</button>
          <button class="btn small" data-action="week-today" type="button" ${s===0?`disabled`:``}>This week</button>
          <button class="btn small" data-action="week-next" type="button" aria-label="Next week">Next →</button>
        </div>
        ${e}
      </section>

      <section class="card" aria-labelledby="h-entries">
        <h2 id="h-entries">Recent entries</h2>
        <p class="sub">${r.entries.length?`${r.entries.length} entr${r.entries.length===1?`y`:`ies`} total — newest first.`:`Nothing logged yet.`}</p>
        ${q()}
      </section>
    </div>`}function G(e){return r.projects.length?r.projects.map(t=>`<option value="${t.id}" ${t.id===e?`selected`:``}>${y(t.name)}</option>`).join(``):`<option value="">— add a project first —</option>`}function K(){let e=new Date,t=new Date(e);t.setDate(e.getDate()-(e.getDay()+6)%7+s*7);let n=[];for(let e=0;e<7;e++){let r=new Date(t);r.setDate(t.getDate()+e),n.push(r)}let i={};for(let e of r.entries)i[e.date]=(i[e.date]||0)+e.minutes;return`
    <div class="week-strip" role="group" aria-label="Week overview">
      ${n.map(e=>{let t=g(e),n=i[t]||0;return`<button type="button" class="week-day ${t===v()?`today`:``} ${t===c?`selected`:``}"
          data-action="pick-day" data-date="${t}" aria-label="${C(t)}: ${n?x(n):`no time`}">
          <span class="wd">${e.toLocaleDateString(`en-US`,{weekday:`short`})}</span>
          <span class="wn">${e.getDate()}</span>
          <span class="wt">${n?x(n):`–`}</span>
        </button>`}).join(``)}
    </div>`}function q(){if(!r.entries.length)return`<div class="empty"><div class="big">⏱</div>No entries yet.<br>Add your first project, then log time above.</div>`;let e=[...r.entries].sort((e,t)=>t.date.localeCompare(e.date)||(t.id<e.id?-1:1)),t=e.slice(0,250),n=``,i=null;for(let r of t){if(r.date!==i){i=r.date;let t=e.filter(e=>e.date===r.date).reduce((e,t)=>e+t.minutes,0);n+=`<div class="day-head"><span>${C(r.date)}</span><span class="total">${x(t)}</span></div>`}let t=b(r.projectId);n+=`
      <div class="entry-row" data-entry="${r.id}">
        <span class="dot" style="background:${t?t.color:`#ccc`}" aria-hidden="true"></span>
        <div class="entry-main">
          <div class="entry-title">${y(t?t.name:`Unknown project`)}</div>
          ${r.note?`<div class="entry-note">${y(r.note)}</div>`:``}
        </div>
        <span class="entry-min">${x(r.minutes)}</span>
        <span class="entry-actions">
          <button class="btn ghost icon-btn" data-action="edit-entry" data-id="${r.id}" aria-label="Edit entry: ${y(t?t.name:``)} ${x(r.minutes)} on ${r.date}" title="Edit entry">✎</button>
          <button class="btn ghost icon-btn danger" data-action="delete-entry" data-id="${r.id}" aria-label="Delete entry: ${y(t?t.name:``)} ${x(r.minutes)} on ${r.date}" title="Delete entry">🗑</button>
        </span>
      </div>`}return e.length>250&&(n+=`<p class="muted" style="text-align:center">Showing the 250 newest of ${e.length} entries. Use the report for full data.</p>`),n}function J(){let e=r.projects.map(e=>{let t=r.entries.filter(t=>t.projectId===e.id).reduce((e,t)=>e+t.minutes,0);return`
      <div class="project-row">
        <span class="dot" style="background:${e.color}" aria-hidden="true"></span>
        <div class="entry-main">
          <div class="project-name">${y(e.name)}</div>
          <div class="project-meta">$${E(w(e.rate))}/h · ${x(t)} logged · $${E(T(t,e.rate))} all-time</div>
        </div>
        <span class="entry-actions">
          <button class="btn ghost icon-btn" data-action="edit-project" data-id="${e.id}" aria-label="Edit project ${y(e.name)}" title="Edit project">✎</button>
          <button class="btn ghost icon-btn danger" data-action="delete-project" data-id="${e.id}" aria-label="Delete project ${y(e.name)}" title="Delete project">🗑</button>
        </span>
      </div>`}).join(``);return`
    <div class="grid">
      <section class="card" aria-labelledby="h-addproj">
        <h2 id="h-addproj">Add project</h2>
        <p class="sub">Set an hourly rate — reports bill minutes × rate.</p>
        <form class="form-row narrow" id="project-form">
          <div class="field">
            <label for="p-name">Project name</label>
            <input id="p-name" name="name" placeholder="e.g. Website redesign" required maxlength="60">
          </div>
          <div class="field">
            <label for="p-rate">Rate ($/hour)</label>
            <input id="p-rate" name="rate" inputmode="decimal" placeholder="99.99" required>
          </div>
          <div class="field wide">
            <label>Color</label>
            <div class="swatches" id="p-colors">${n.map((e,t)=>`<button type="button" class="swatch" style="background:${e}" data-color="${e}" aria-label="Color ${t+1}" aria-pressed="${t===u%n.length}"></button>`).join(``)}</div>
          </div>
          <button class="btn primary" type="submit">Add project</button>
        </form>
      </section>
      <section class="card" aria-labelledby="h-projlist">
        <h2 id="h-projlist">Projects</h2>
        <p class="sub">${r.projects.length?`${r.projects.length} project${r.projects.length===1?``:`s`}`:`No projects yet.`}</p>
        ${e||`<div class="empty"><div class="big">📁</div>Create your first project to start tracking.</div>`}
      </section>
    </div>`}function Y(){let e=D(a,o),t=Math.max(1,...e.projects.map(e=>e.minutes)),n=Math.max(120,8+e.projects.length*34+10),i=``;e.projects.forEach((e,n)=>{let a=8+n*34,o=Math.max(2,e.minutes/t*400),s=r.projects.find(t=>t.name===e.name),c=s?s.color:`#4f46e5`;i+=`
      <text x="140" y="${a+15}" text-anchor="end" font-size="12.5" font-weight="600" fill="#4b5265">${y(e.name.length>18?e.name.slice(0,17)+`…`:e.name)}</text>
      <rect x="150" y="${a+3}" width="${o}" height="20" rx="5" fill="${c}"><title>${y(e.name)}: ${x(e.minutes)}</title></rect>
      <text x="${150+o+8}" y="${a+17}" font-size="12" fill="#6b7280" font-weight="600">${x(e.minutes)}</text>`});let s=e.projects.length?`
    <svg class="chart-svg" viewBox="0 0 640 ${n}" role="img" aria-label="Chart of time per project" preserveAspectRatio="xMidYMid meet">
      <line x1="150" y1="8" x2="150" y2="${n-6}" stroke="#e4e7ec"/>${i}</svg>`:`<div class="empty"><div class="big">📊</div>No time in this range yet.</div>`,c=2*Math.PI*54,l=0,u=[];e.projects.forEach((t,n)=>{let i=r.projects.find(e=>e.name===t.name),a=i?i.color:`#4f46e5`,o=e.total_minutes?t.minutes/e.total_minutes:0,s=o*c;u.push(`<circle cx="70" cy="70" r="54" fill="none" stroke="${a}" stroke-width="22"
      stroke-dasharray="${s} ${c-s}" stroke-dashoffset="${-l}" transform="rotate(-90 70 70)"><title>${y(t.name)}: ${Math.round(o*100)}%</title></circle>`),l+=s});let d=e.projects.length?`
    <svg width="220" height="160" viewBox="0 0 220 160" role="img" aria-label="Donut graph of time share per project" style="max-width:100%">
      ${u.join(``)}
      <text x="70" y="66" text-anchor="middle" font-size="17" font-weight="700" fill="#1c2130">${x(e.total_minutes)}</text>
      <text x="70" y="84" text-anchor="middle" font-size="11" fill="#5b6170">total</text>
      ${e.projects.slice(0,5).map((e,t)=>{let n=r.projects.find(t=>t.name===e.name);return`<rect x="150" y="${34+t*20}" width="10" height="10" rx="3" fill="${n?n.color:`#4f46e5`}"/>
          <text x="166" y="${43+t*20}" font-size="11" fill="#4b5265">${y(e.name.length>10?e.name.slice(0,9)+`…`:e.name)}</text>`}).join(``)}
    </svg>`:``;return`
    <div class="grid">
      <section class="card" aria-labelledby="h-range">
        <h2 id="h-range">Billing report</h2>
        <p class="sub">Minutes and amounts per project, exact to the cent.</p>
        <div class="report-head">
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end">
            <div class="field"><label for="r-from">From</label><input id="r-from" type="date" value="${a}" data-action-change="report-from"></div>
            <div class="field"><label for="r-to">To</label><input id="r-to" type="date" value="${o}" data-action-change="report-to"></div>
            <button class="btn" data-action="report-month" type="button">This month</button>
            <button class="btn" data-action="report-week" type="button">This week</button>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn primary" data-action="download-csv" type="button">⬇ Download CSV</button>
            <button class="btn" data-action="copy-csv" type="button">Copy CSV</button>
            <button class="btn" data-action="print-report" type="button" aria-label="Print invoice-ready report">🖨 Print</button>
          </div>
        </div>
      </section>

      <div class="stat-cards">
        <div class="stat"><div class="k">Total time</div><div class="v">${x(e.total_minutes)}</div></div>
        <div class="stat"><div class="k">Total amount</div><div class="v">$${e.total_amount.toFixed(2)}</div></div>
        <div class="stat"><div class="k">Projects billed</div><div class="v">${e.projects.length}</div></div>
      </div>

      <section class="card" aria-labelledby="h-table">
        <h2 id="h-table">Detail</h2>
        <p class="sub">${y(a)} – ${y(o)} · generated ${new Date().toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`})}</p>
        ${e.projects.length?`
        <div class="table-wrap">
          <table class="report">
            <thead><tr><th scope="col">Project</th><th scope="col" class="num">Rate</th><th scope="col" class="num">Minutes</th><th scope="col" class="num">Hours</th><th scope="col" class="num">Amount</th></tr></thead>
            <tbody>
              ${e.projects.map(e=>{let t=r.projects.find(t=>t.name===e.name);return`<tr><td><span class="pname"><span class="dot" style="background:${t?t.color:`#ccc`}" aria-hidden="true"></span>${y(e.name)}</span></td>
                  <td class="num">$${t?E(w(t.rate)):`0.00`}/h</td>
                  <td class="num">${e.minutes}</td><td class="num">${(e.minutes/60).toFixed(2)}</td><td class="num">$${e.amount.toFixed(2)}</td></tr>`}).join(``)}
            </tbody>
            <tfoot><tr class="total"><td>TOTAL</td><td class="num">${e.total_minutes}</td><td class="num">${(e.total_minutes/60).toFixed(2)}</td><td class="num">$${e.total_amount.toFixed(2)}</td></tr></tfoot>
          </table>
        </div>`:`<div class="empty">No billable time in this date range.</div>`}
      </section>

      <section class="card chart-card" aria-labelledby="h-chart">
        <h2 id="h-chart">Time per project</h2>
        <p class="sub">Share of tracked minutes in the selected range.</p>
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center">${s}${d}</div>
      </section>
    </div>`}document.addEventListener(`click`,e=>{let t=e.target.closest(`#p-colors .swatch`);if(t){document.querySelectorAll(`#p-colors .swatch`).forEach(e=>e.setAttribute(`aria-pressed`,String(e===t)));return}let n=e.target.closest(`[data-action]`);if(!n)return;let u=n.dataset.action;if(u===`tab`)i=n.dataset.view,V();else if(u===`timer-toggle`)!l&&!r.projects.length?(j(`Add a project first`),i=`projects`,V()):l?P():N(document.getElementById(`t-project`)?.value||r.projects[0]?.id);else if(u===`week-prev`)s--,V();else if(u===`week-next`)s++,V();else if(u===`pick-day`)c=n.dataset.date,V(),document.getElementById(`q-duration`)?.focus();else if(u===`week-today`)s=0,V();else if(u===`delete-entry`){let e=r.entries.findIndex(e=>e.id===n.dataset.id);if(e>=0){let[t]=r.entries.splice(e,1);f(),V(),j(`Deleted ${x(t.minutes)} entry`,{label:`Undo`,fn:()=>{r.entries.splice(e,0,t),f(),V(),j(`Entry restored`)}})}}else if(u===`edit-entry`)Q(n.dataset.id);else if(u===`delete-project`){let e=b(n.dataset.id);e&&confirm(`Delete project "${e.name}" and its ${r.entries.filter(t=>t.projectId===e.id).length} entries?`)&&(r.projects=r.projects.filter(t=>t.id!==e.id),r.entries=r.entries.filter(t=>t.projectId!==e.id),f(),V(),j(`Project deleted`))}else if(u===`edit-project`)$(n.dataset.id);else if(u===`report-month`){let e=new Date;a=g(new Date(e.getFullYear(),e.getMonth(),1)),o=v(),V()}else if(u===`report-week`){let e=new Date,t=new Date(e);t.setDate(e.getDate()-(e.getDay()+6)%7),a=g(t),o=v(),V()}else if(u===`download-csv`){let e=new Blob([k(a,o)],{type:`text/csv`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`timebill_${a}_${o}.csv`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),500),j(`CSV downloaded`)}else if(u===`copy-csv`){let e=k(a,o);(navigator.clipboard?navigator.clipboard.writeText(e):Promise.reject()).then(()=>j(`CSV copied to clipboard`)).catch(()=>j(`Copy failed — use Download instead`))}}),document.addEventListener(`change`,e=>{let t=e.target;t.dataset.actionChange===`report-from`&&t.value&&(a=t.value,V()),t.dataset.actionChange===`report-to`&&t.value&&(o=t.value,V())}),document.addEventListener(`submit`,e=>{let t=e.target;if(t.id===`quick-form`){e.preventDefault();let n=t.project.value;if(!n){j(`Add a project first`);return}let i=I(t.duration.value);if(i==null||i<=0){j(`Enter a duration like 1h 30, 90 or 1:30`),t.duration.focus();return}r.entries.push({id:h(),projectId:n,date:t.date.value||v(),minutes:i,note:t.note.value.trim()}),f(),c=t.date.value||v(),V(),j(`Logged ${x(i)}`);let a=document.getElementById(`q-duration`);a&&(a.value=``,a.focus())}if(t.id===`project-form`){e.preventDefault();let i=t.name.value.trim(),a=parseFloat(t.rate.value.replace(`,`,`.`));if(!i){j(`Give the project a name`);return}if(!(a>=0)){j(`Enter an hourly rate, e.g. 99.99`);return}let o=document.querySelector(`#p-colors .swatch[aria-pressed="true"]`),s=o?o.dataset.color:n[u++%n.length];r.projects.push({id:h(),name:i,rate:a,color:s}),f(),V(),j(`Project “${i}” added`)}});function X(){document.getElementById(`modal-root`)?.remove()}function Z(e,t,n){X();let r=document.createElement(`div`);r.id=`modal-root`,r.innerHTML=`
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="${y(e)}">
      <div class="modal-head"><h3>${y(e)}</h3>
        <button class="btn ghost icon-btn" data-modal-close aria-label="Close dialog" title="Close">✕</button></div>
      <div class="modal-body">${t}</div>
    </div>`,document.body.appendChild(r),r.addEventListener(`click`,e=>{e.target.closest(`[data-modal-close]`)&&X()}),document.addEventListener(`keydown`,function e(t){t.key===`Escape`&&(X(),document.removeEventListener(`keydown`,e))}),n&&n(r);let i=r.querySelector(`input, select`);i&&i.focus()}function Q(e){let t=r.entries.find(t=>t.id===e);t&&(b(t.projectId),Z(`Edit entry`,`
    <form id="edit-entry-form">
      <div class="field" style="margin-bottom:10px"><label for="em-project">Project</label>
        <select id="em-project">${r.projects.map(e=>`<option value="${e.id}" ${e.id===t.projectId?`selected`:``}>${y(e.name)}</option>`).join(``)}</select></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
        <div class="field"><label for="em-date">Date</label><input id="em-date" type="date" value="${t.date}" required></div>
        <div class="field"><label for="em-mins">Minutes</label><input id="em-mins" inputmode="numeric" value="${t.minutes}" required></div>
      </div>
      <div class="field" style="margin-bottom:14px"><label for="em-note">Note</label><input id="em-note" value="${y(t.note||``)}" maxlength="140"></div>
      <div style="display:flex;gap:8px">
        <button class="btn primary" type="submit">Save changes</button>
        <button class="btn" type="button" data-modal-close>Cancel</button>
        <button class="btn danger" type="button" id="em-delete" style="margin-left:auto" aria-label="Delete this entry">Delete</button>
      </div>
    </form>`,n=>{n.querySelector(`#edit-entry-form`).addEventListener(`submit`,e=>{e.preventDefault();let r=I(n.querySelector(`#em-mins`).value),i=n.querySelector(`#em-date`).value;if(!(r>0)||!/^\d{4}-\d{2}-\d{2}$/.test(i)){j(`Check minutes and date`);return}t.projectId=n.querySelector(`#em-project`).value,t.minutes=r,t.date=i,t.note=n.querySelector(`#em-note`).value.trim(),f(),X(),V(),j(`Entry updated`)}),n.querySelector(`#em-delete`).addEventListener(`click`,()=>{r.entries=r.entries.filter(t=>t.id!==e),f(),X(),V(),j(`Entry deleted`)})}))}function $(e){let t=b(e);t&&Z(`Edit project`,`
    <form id="edit-project-form">
      <div class="field" style="margin-bottom:10px"><label for="pm-name">Name</label><input id="pm-name" value="${y(t.name)}" maxlength="60" required></div>
      <div class="field" style="margin-bottom:10px"><label for="pm-rate">Rate ($/hour)</label><input id="pm-rate" inputmode="decimal" value="${t.rate}" required></div>
      <div class="field" style="margin-bottom:14px"><label>Color</label>
        <div class="swatches">${n.map(e=>`<button type="button" class="swatch" style="background:${e}" data-color="${e}" aria-label="Color ${e}" aria-pressed="${e===t.color}"></button>`).join(``)}</div></div>
      <div style="display:flex;gap:8px">
        <button class="btn primary" type="submit">Save changes</button>
        <button class="btn" type="button" data-modal-close>Cancel</button>
      </div>
    </form>`,e=>{let n=t.color;e.querySelectorAll(`.swatch`).forEach(t=>t.addEventListener(`click`,()=>{n=t.dataset.color,e.querySelectorAll(`.swatch`).forEach(e=>e.setAttribute(`aria-pressed`,String(e===t)))})),e.querySelector(`#edit-project-form`).addEventListener(`submit`,r=>{r.preventDefault();let i=e.querySelector(`#pm-name`).value.trim(),a=parseFloat(e.querySelector(`#pm-rate`).value.replace(`,`,`.`));if(!i||!(a>=0)){j(`Check name and rate`);return}t.name=i,t.rate=a,t.color=n,f(),X(),V(),j(`Project updated`)})})}V();