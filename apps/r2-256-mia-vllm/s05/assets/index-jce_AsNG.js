(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),n=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,9);function r(e){return String(e).padStart(2,`0`)}function i(e=new Date){return`${e.getFullYear()}-${r(e.getMonth()+1)}-${r(e.getDate())}`}function a(e,t){let[n,r,a]=e.split(`-`).map(Number);return i(new Date(n,r-1,a+t))}function o(e){let t=Math.round(e),n=Math.floor(t/60),i=t%60;return n===0?`${i}m`:`${n}h ${r(i)}m`}function s(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),a=t%60;return`${n}:${r(i)}:${r(a)}`}function c(e){let t=e<0,[n,r]=(Math.abs(e)/100).toFixed(2).split(`.`),i=n.replace(/\B(?=(\d{3})+(?!\d))/g,`,`);return`${t?`−`:``}$${i}.${r}`}function l(e){return String(Number.isInteger(e)?e:Math.round(e*100)/100)}function u(e,t){let n=Math.round(Number(t)*100),r=Number(e)||0;if(Number.isInteger(r)){let e=r*n,t=Math.floor(e/60);return(e-t*60)*2>=60?t+1:t}let i=r*n/60;return Math.floor(i+.5+1e-9)}function d(e){let t=String(e??``).trim().toLowerCase().replace(`,`,`.`);if(!t)return NaN;let n=t.match(/^(\d+)\s*:\s*(\d{1,2})$/);if(n)return n[1]*60+ +n[2];if(n=t.match(/^(\d+(?:\.\d+)?)\s*h\s*(\d{1,2})?\s*m?$/),n)return Math.round(n[1]*60)+(n[2]?+n[2]:0);if(n=t.match(/^(\d+(?:\.\d+)?)\s*m$/),n)return Math.round(+n[1]);if(n=t.match(/^(\d+(?:\.\d+)?)$/),n){let e=+n[1];return Number.isInteger(e)?e:Math.round(e*60)}return NaN}var f=[`#0e7265`,`#4f46e5`,`#b45309`,`#be185d`,`#1d4ed8`,`#047857`,`#a21caf`,`#b91c1c`,`#0e7490`,`#7c3aed`,`#4d7c0f`,`#92400e`],p=`billable.v1`;function m(){let e={projects:[],entries:[],timer:null};try{let t=localStorage.getItem(p);if(!t)return e;let n=JSON.parse(t);return{projects:Array.isArray(n.projects)?n.projects.filter(e=>e&&e.id):[],entries:Array.isArray(n.entries)?n.entries.filter(e=>e&&e.id):[],timer:n.timer&&n.timer.projectId?n.timer:null}}catch{return e}}var h=m(),g=null;function _(){try{localStorage.setItem(p,JSON.stringify(h))}catch{}}function v(){g||=setTimeout(()=>{g=null,_()},40)}window.addEventListener(`beforeunload`,()=>{g&&(clearTimeout(g),_())}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&(g&&=(clearTimeout(g),null),_())});var y=e=>h.projects.find(t=>t.id===e),b=e=>h.projects.find(t=>t.name===String(e)),x={tab:`time`,reportFrom:i(new Date(new Date().getFullYear(),new Date().getMonth(),1)),reportTo:i(),editingEntry:null,editingProject:null,confirmDelete:null,showAllEntries:!1,lastReport:null},S=null;function C(){S||=setTimeout(()=>{S=null,W()},24)}function w(){return f[h.projects.length%f.length]}function T({name:e,rate:t,color:r}={}){let i={id:n(),name:String(e??`Untitled project`),rate:Number(t)||0,color:r||w(),createdAt:new Date().toISOString()};return h.projects.push(i),v(),C(),i}function E({project:e,date:t,minutes:r,note:a}={}){let o=b(e);o||=T({name:e,rate:0});let s={id:n(),projectId:o.id,date:String(t??i()),minutes:Number(r)||0,note:a?String(a):``,createdAt:new Date().toISOString()};return h.entries.push(s),v(),C(),s}function D(e,t){let n=h.entries.find(t=>t.id===e);n&&(Object.assign(n,t),v(),C())}function O(e){h.entries=h.entries.filter(t=>t.id!==e),v(),C()}function k(e,t){let n=y(e);n&&(Object.assign(n,t),v(),C())}function A(e){h.projects=h.projects.filter(t=>t.id!==e),h.entries=h.entries.filter(t=>t.projectId!==e),h.timer&&h.timer.projectId===e&&(h.timer=null),v(),C()}function j(){h={projects:[],entries:[],timer:null},x.tab=`time`,x.editingEntry=null,x.editingProject=null,x.confirmDelete=null,x.showAllEntries=!1,x.lastReport=null,_(),C()}function M(e,t){let n=e||`0000-01-01`,r=t||`9999-12-31`,i=new Map,a=0;for(let e=0;e<h.entries.length;e++){let t=h.entries[e];t.date>=n&&t.date<=r&&(i.set(t.projectId,(i.get(t.projectId)||0)+t.minutes),a++)}let o=[];for(let e of h.projects){let t=i.get(e.id)||0;o.push({name:e.name,minutes:t,amount:u(t,e.rate),rate:e.rate,color:e.color})}let s=0,c=0;for(let e of o)s+=e.minutes,c+=e.amount;return{projects:o,total_minutes:s,total_amount:c,entryCount:a}}function N(e){return e=String(e),/[",\n\r]/.test(e)?`"`+e.replace(/"/g,`""`)+`"`:e}function P(e,t){let n=M(e,t),r=[`name,minutes,amount`];for(let e of n.projects)r.push(`${N(e.name)},${l(e.minutes)},${(e.amount/100).toFixed(2)}`);return r.push(`TOTAL,${l(n.total_minutes)},${(n.total_amount/100).toFixed(2)}`),r.join(`
`)+`
`}window.APP={reset:()=>{j()},addProject:e=>T(e),addEntry:e=>E(e),report:({from:e,to:t}={})=>{let n=M(e,t);return{projects:n.projects.map(e=>({name:e.name,minutes:e.minutes,amount:e.amount/100})),total_minutes:n.total_minutes,total_amount:n.total_amount/100}},csv:({from:e,to:t}={})=>P(e,t)};var F=null;function I(e,t){h.timer={projectId:e,note:t||``,startedAt:Date.now()},v(),C(),B()}function L(){if(!h.timer)return null;let t=Date.now()-h.timer.startedAt,n=Math.max(1,Math.round(t/6e4)),r=(e(`#timerNote`)?e(`#timerNote`).value.trim():``)||h.timer.note||``,a=E({project:(y(h.timer.projectId)||{}).name,date:i(),minutes:n,note:r});return h.timer=null,v(),C(),H(`Logged ${o(n)} to ${(y(a.projectId)||{}).name||`project`}`),a}function R(){h.timer=null,v(),C()}function z(){return h.timer?(Date.now()-h.timer.startedAt)/1e3:0}function B(){if(F&&clearInterval(F),F=null,!h.timer){document.title=`Billable — Time tracking & project billing`;return}F=setInterval(()=>{let t=e(`#timerDisplay`),n=z();t&&(t.textContent=s(n));let r=e(`#pillTimer`);r&&(r.textContent=s(n)),document.title=`${s(n)} · Billable`;let i=e(`#timerToday`);i&&(i.textContent=o(V()+Math.round(n/60)))},1e3)}function V(){let e=i(),t=0;for(let n of h.entries)n.date===e&&(t+=n.minutes);return t}function H(t){let n=e(`#toast-region`);if(!n)return;let r=document.createElement(`div`);r.className=`toast`,r.textContent=t,n.appendChild(r),setTimeout(()=>{r.classList.add(`out`),setTimeout(()=>r.remove(),300)},2600)}function U(e){return`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${{play:`<path d="M8 5.5v13l11-6.5z"/>`,stop:`<rect x="7" y="7" width="10" height="10" rx="1.5"/>`,trash:`<path d="M5 7h14M10 7V5h4v2m-7 0 1 12h8l1-12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,pencil:`<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,plus:`<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,download:`<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,print:`<path d="M7 8V4h10v4M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2m-10-3h10v7H7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V6a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,clock:`<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,check:`<path d="M5 12.5 10 17.5 19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,x:`<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`}[e]||``}</svg>`}function W(){let n=e(`#app`);if(!n)return;let r=!!h.timer;n.innerHTML=`
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="22" height="22"><rect width="32" height="32" rx="7" fill="#0e7265"/><path d="M16 8v8l5.5 3.2" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="16" cy="16" r="10.2" stroke="#fff" stroke-width="2.4" fill="none"/></svg></span>
        <span class="brand-name">Billable</span>
      </div>
      <nav class="tabs" role="tablist" aria-label="Sections">
        <button role="tab" aria-selected="${x.tab===`time`}" class="tab ${x.tab===`time`?`active`:``}" data-action="tab" data-tab="time">Time</button>
        <button role="tab" aria-selected="${x.tab===`projects`}" class="tab ${x.tab===`projects`?`active`:``}" data-action="tab" data-tab="projects">Projects</button>
        <button role="tab" aria-selected="${x.tab===`report`}" class="tab ${x.tab===`report`?`active`:``}" data-action="tab" data-tab="report">Report</button>
      </nav>
      ${r?`<span class="running-pill" title="Timer running for ${t((y(h.timer.projectId)||{}).name||``)}"><span class="pulse-dot" aria-hidden="true"></span><span id="pillTimer">${t(s(z()))}</span><span class="pill-project">${t((y(h.timer.projectId)||{}).name||``)}</span></span>`:``}
    </header>
    <main class="main">
      ${x.tab===`time`?K():x.tab===`projects`?ee():re()}
    </main>
    <footer class="footer">
      <span>Data stays in this browser · <button class="linklike" data-action="sample-data">Load sample data</button></span>
      <span class="kbd-hint"><kbd>N</kbd> new entry · <kbd>T</kbd> timer · <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> tabs</span>
    </footer>
  `,ie()}function G(e){return h.projects.length?h.projects.map(n=>`<option value="${n.id}" ${n.id===e?`selected`:``}>${t(n.name)}</option>`).join(``):`<option value="">No projects yet</option>`}function K(){let e=!!h.timer,n=i(),r=X(n),a=h.entries.filter(e=>e.date>=r[0]&&e.date<=r[6]),l=a.reduce((e,t)=>e+t.minutes,0),d=[...h.entries].sort((e,t)=>t.date<e.date?-1:t.date>e.date?1:(t.createdAt||``).localeCompare(e.createdAt||``)),f=x.entryFilter?d.filter(e=>e.projectId===x.entryFilter):d,p=x.showAllEntries?f.slice(0,400):f.slice(0,40);return`
    ${h.projects.length===0?`
    <section class="card callout">
      <div>
        <h2 class="callout-title">Welcome to Billable</h2>
        <p class="muted">Create your first project with an hourly rate, then log time with the timer or the form below.</p>
      </div>
      <button class="btn btn-primary" data-action="tab" data-tab="projects">Create a project</button>
    </section>`:``}
    <section class="grid-2">
      <div class="card timer-card">
        <h2 class="card-title">${U(`clock`)} Timer</h2>
        <div class="timer-row">
          <div class="timer-display ${e?`running`:``}" id="timerDisplay" role="timer" aria-label="Elapsed time">${s(z())}</div>
          <button class="btn ${e?`btn-danger`:`btn-primary`} btn-timer" data-action="${e?`stop-timer`:`start-timer`}" aria-label="${e?`Stop timer`:`Start timer`}" title="${e?`Stop timer`:`Start timer`}">
            ${U(e?`stop`:`play`)}${e?`Stop`:`Start`}
          </button>
          ${e?`<button class="btn btn-ghost btn-icon" data-action="discard-timer" aria-label="Discard running timer" title="Discard running timer">${U(`x`)}</button>`:``}
        </div>
        <label class="field">
          <span class="field-label">Project</span>
          <select id="timerProject" class="input">${G(h.timer?h.timer.projectId:h.projects[0]?.id)}</select>
        </label>
        <label class="field">
          <span class="field-label">Note <span class="muted">(optional)</span></span>
          <input id="timerNote" class="input" type="text" placeholder="What are you working on?" value="${t(h.timer?h.timer.note:``)}" maxlength="140">
        </label>
        <p class="timer-meta">Today: <strong id="timerToday">${o(V())}</strong> · This week: <strong>${o(l)}</strong></p>
      </div>

      <div class="card">
        <h2 class="card-title">${U(`plus`)} Log time</h2>
        <form id="quickForm" data-action="quick-entry" autocomplete="off">
          <div class="form-row">
            <label class="field grow">
              <span class="field-label">Project</span>
              <select id="qeProject" class="input" required>${G(h.projects[0]?.id)}</select>
            </label>
            <label class="field">
              <span class="field-label">Date</span>
              <input id="qeDate" class="input" type="date" value="${n}" required>
            </label>
          </div>
          <div class="form-row">
            <label class="field">
              <span class="field-label">Duration</span>
              <input id="qeMinutes" class="input" inputmode="numeric" placeholder="e.g. 90, 1:30, 1h30" required>
            </label>
            <label class="field grow">
              <span class="field-label">Note <span class="muted">(optional)</span></span>
              <input id="qeNote" class="input" type="text" placeholder="Description" maxlength="140">
            </label>
          </div>
          <button class="btn btn-primary btn-block" type="submit">Add entry</button>
        </form>
      </div>
    </section>

    ${h.projects.length?`
    <section class="card">
      <h2 class="card-title">Projects</h2>
      <div class="chip-row">
        ${h.projects.map(e=>`<button class="chip" data-action="pick-project" data-id="${e.id}" title="Log time for ${t(e.name)}"><span class="dot" style="background:${e.color}"></span>${t(e.name)}<span class="chip-rate">${c(u(60,e.rate))}/h</span></button>`).join(``)}
      </div>
    </section>`:``}

    <section class="card">
      <div class="card-head">
        <h2 class="card-title">This week <span class="muted">${Q(r[0],r[6])}</span></h2>
      </div>
      ${$(r,a)}
    </section>

    <section class="card">
      <div class="card-head">
        <h2 class="card-title">Entries <span class="muted">${d.length?`${f.length===d.length?`${d.length} total`:`${f.length} of ${d.length}`}`:``}</span></h2>
        <div class="btn-row">
          ${h.projects.length>1?`
          <select class="input input-inline" data-action-change="entry-filter" aria-label="Filter entries by project">
            <option value="">All projects</option>
            ${h.projects.map(e=>`<option value="${e.id}" ${x.entryFilter===e.id?`selected`:``}>${t(e.name)}</option>`).join(``)}
          </select>`:``}
          ${f.length>40&&!x.showAllEntries?`<button class="btn btn-ghost btn-sm" data-action="show-all">Show more</button>`:``}
        </div>
      </div>
      ${f.length===0?Y(x.entryFilter?`No entries for this project`:`No time logged yet`,x.entryFilter?`Try another project or clear the filter.`:`Use the timer or the form above to log your first entry.`):`
      <div class="entry-groups">
        ${q(p)}
      </div>
      ${f.length>40&&!x.showAllEntries?`<p class="muted small" style="margin:10px 4px 2px">Showing latest 40 of ${f.length} entries.</p>`:``}
      `}
    </section>
  `}function q(e){let n=new Map;for(let t of e)n.has(t.date)||n.set(t.date,[]),n.get(t.date).push(t);let r=i(),s=``;for(let[e,i]of n){let n=i.reduce((e,t)=>e+t.minutes,0),l=0;for(let e of i){let t=y(e.projectId);t&&(l+=u(e.minutes,t.rate))}s+=`
      <div class="entry-group">
        <div class="entry-day">
          <span class="entry-date">${e===r?`Today`:e===a(r,-1)?`Yesterday`:Z(e)}</span>
          <span class="entry-day-total">${o(n)} · ${c(l)}</span>
        </div>
        ${i.map(e=>{let n=y(e.projectId)||{name:`Unknown`,color:`#98a2b3`,rate:0};return x.editingEntry===e.id?J(e,n):`
          <div class="entry-row" data-id="${e.id}">
            <span class="dot dot-lg" style="background:${n.color}" aria-hidden="true"></span>
            <div class="entry-main">
              <span class="entry-project">${t(n.name)}</span>
              ${e.note?`<span class="entry-note">${t(e.note)}</span>`:``}
            </div>
            <div class="entry-nums">
              <span class="entry-mins">${o(e.minutes)}</span>
              <span class="entry-amount">${c(u(e.minutes,n.rate))}</span>
            </div>
            <div class="entry-actions">
              <button class="btn btn-ghost btn-icon" data-action="edit-entry" data-id="${e.id}" aria-label="Edit entry: ${t(n.name)}, ${t(e.date)}, ${o(e.minutes)}" title="Edit entry">${U(`pencil`)}</button>
              <button class="btn btn-ghost btn-icon btn-icon-danger" data-action="del-entry" data-id="${e.id}" aria-label="Delete entry: ${t(n.name)}, ${t(e.date)}, ${o(e.minutes)}" title="Delete entry">${U(`trash`)}</button>
            </div>
          </div>`}).join(``)}
      </div>`}return s}function J(e,n){return`
  <div class="entry-row editing" data-id="${e.id}">
    <form class="entry-edit" data-action="save-entry" data-id="${e.id}">
      <label class="field grow"><span class="field-label">Project</span>
        <select class="input" name="projectId">${G(e.projectId)}</select>
      </label>
      <label class="field"><span class="field-label">Date</span>
        <input class="input" type="date" name="date" value="${t(e.date)}" required>
      </label>
      <label class="field"><span class="field-label">Minutes</span>
        <input class="input" name="minutes" inputmode="numeric" value="${e.minutes}" required>
      </label>
      <label class="field grow"><span class="field-label">Note</span>
        <input class="input" name="note" type="text" value="${t(e.note||``)}" maxlength="140">
      </label>
      <div class="entry-edit-actions">
        <button class="btn btn-primary btn-sm" type="submit" aria-label="Save changes">Save</button>
        <button class="btn btn-ghost btn-sm" type="button" data-action="cancel-edit" aria-label="Cancel editing">Cancel</button>
      </div>
    </form>
  </div>`}function Y(e,n){return`<div class="empty"><div class="empty-art" aria-hidden="true"><svg viewBox="0 0 48 48" width="44" height="44"><circle cx="24" cy="24" r="19" fill="none" stroke="#c6ccd6" stroke-width="2.5"/><path d="M24 13v11l8 4.6" fill="none" stroke="#c6ccd6" stroke-width="2.5" stroke-linecap="round"/></svg></div><p class="empty-title">${t(e)}</p><p class="muted">${t(n)}</p></div>`}function X(e){let[t,n,r]=e.split(`-`).map(Number),i=a(e,-((new Date(t,n-1,r).getDay()+6)%7));return[0,1,2,3,4,5,6].map(e=>a(i,e))}function Z(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(`en-US`,{weekday:`short`,month:`short`,day:`numeric`})}function Q(e,t){return`${Z(e)} – ${Z(t)}`}function $(e,t){let n=e.map(e=>t.filter(t=>t.date===e).reduce((e,t)=>e+t.minutes,0)),r=Math.max(60,...n),a=i();return`
    <svg class="week-chart chart" viewBox="0 0 560 150" role="img" aria-label="Weekly chart: time per day this week" preserveAspectRatio="xMidYMid meet">
      ${n.map((t,n)=>{let i=Math.round(t/r*116),s=6+n*78.28571428571429+8,c=128-i,l=62.28571428571429,u=e[n]===a;return`
      <g>
        <rect x="${s}" y="${c}" width="${l}" height="${Math.max(i,t>0?3:0)}" rx="4" fill="${u?`#0e7265`:`#7fb8ae`}"></rect>
        ${t>0?`<text x="${s+l/2}" y="${c-5}" text-anchor="middle" class="chart-val">${o(t)}</text>`:``}
        <text x="${s+l/2}" y="144" text-anchor="middle" class="chart-lbl ${u?`chart-lbl-strong`:``}">${[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`][n]}</text>
      </g>`}).join(``)}
    </svg>`}function ee(){let e=new Map;for(let t of h.entries){let n=e.get(t.projectId)||{minutes:0,count:0};n.minutes+=t.minutes,n.count++,e.set(t.projectId,n)}let n=x.editingProject;return`
    <section class="grid-2">
      <div class="card">
        <h2 class="card-title">${U(`plus`)} ${n?`Edit project`:`New project`}</h2>
        <form data-action="${n?`save-project`:`create-project`}" autocomplete="off">
          <input type="hidden" name="projectId" value="${n?t(n):``}">
          <label class="field">
            <span class="field-label">Name</span>
            <input class="input" name="name" type="text" required maxlength="80" placeholder="e.g. Website redesign" value="${n?t((y(n)||{}).name||``):``}">
          </label>
          <label class="field">
            <span class="field-label">Hourly rate ($ per hour)</span>
            <input class="input" name="rate" type="number" min="0" step="0.01" required placeholder="e.g. 85.00" value="${n?(y(n)||{}).rate:``}">
          </label>
          <div class="field">
            <span class="field-label" id="color-label">Color</span>
            <div class="swatch-row" role="radiogroup" aria-labelledby="color-label">
              ${f.map((e,t)=>`<button type="button" class="swatch ${t===(x.swatchIdx??0)?`sel`:``}" style="background:${e}" data-action="pick-color" data-color="${e}" role="radio" aria-checked="${t===(x.swatchIdx??0)}" aria-label="Color ${t+1}"></button>`).join(``)}
            </div>
          </div>
          <div class="btn-row">
            <button class="btn btn-primary" type="submit">${n?`Save project`:`Add project`}</button>
            ${n?`<button class="btn btn-ghost" type="button" data-action="cancel-project-edit">Cancel</button>`:``}
          </div>
        </form>
      </div>
      <div class="card">
        <h2 class="card-title">Your projects <span class="muted">${h.projects.length}</span></h2>
        ${h.projects.length===0?Y(`No projects yet`,`Create your first project with an hourly rate.`):`<div class="project-list">${h.projects.map(n=>{let r=e.get(n.id)||{minutes:0,count:0};return`
          <div class="project-row" data-id="${n.id}">
            <span class="dot dot-lg" style="background:${n.color}" aria-hidden="true"></span>
            <div class="entry-main">
              <span class="entry-project">${t(n.name)}</span>
              <span class="entry-note">${c(u(60,n.rate))}/hour · ${r.count} ${r.count===1?`entry`:`entries`} · ${o(r.minutes)} logged · ${c(u(r.minutes,n.rate))} total</span>
            </div>
            <div class="entry-actions">
              <button class="btn btn-ghost btn-icon" data-action="edit-project" data-id="${n.id}" aria-label="Edit project ${t(n.name)}" title="Edit project">${U(`pencil`)}</button>
              <button class="btn btn-ghost btn-icon btn-icon-danger" data-action="del-project" data-id="${n.id}" aria-label="Delete project ${t(n.name)} and its entries" title="Delete project and its entries">${U(`trash`)}</button>
            </div>
          </div>`}).join(``)}</div>`}
      </div>
    </section>`}function te(e){let t=new Date,n=i(t);if(e===`week`){let e=X(n);return[e[0],e[6]]}if(e===`month`)return[i(new Date(t.getFullYear(),t.getMonth(),1)),n];if(e===`lastmonth`)return[i(new Date(t.getFullYear(),t.getMonth()-1,1)),i(new Date(t.getFullYear(),t.getMonth(),0))];if(e===`7d`)return[a(n,-6),n];if(e===`30d`)return[a(n,-29),n];if(e===`year`)return[i(new Date(t.getFullYear(),0,1)),n];if(e===`all`){if(!h.entries.length)return[n,n];let e=h.entries[0].date,t=h.entries[0].date;for(let n of h.entries)n.date<e&&(e=n.date),n.date>t&&(t=n.date);return[e,t]}return[n,n]}function ne(e,t){let n=2*Math.PI*72,r=0,i=e.length;return`
  <svg class="donut chart" viewBox="0 0 190 190" width="190" height="190" role="img" aria-label="Donut chart of time distribution per project">
    <circle cx="95" cy="95" r="72" fill="none" stroke="#eef0f3" stroke-width="26"></circle>
    ${e.slice(0,12).map(e=>{let a=(t>0?e.minutes/t:0)*n,o=i>1&&a>4?2.5:0,s=`<circle cx="95" cy="95" r="72" fill="none" stroke="${e.color}" stroke-width="26" stroke-dasharray="${Math.max(0,a-o)} ${n-Math.max(0,a-o)}" stroke-dashoffset="${-r-o/2}" transform="rotate(-90 95 95)"></circle>`;return r+=a,s}).join(``)}
    <text x="95" y="93" text-anchor="middle" class="donut-val">${o(t)}</text>
    <text x="95" y="113" text-anchor="middle" class="donut-lbl">total time</text>
  </svg>`}function re(){let e=M(x.reportFrom,x.reportTo);x.lastReport=e;let n=Math.max(1,...e.projects.map(e=>e.minutes)),r=e.projects.slice(0,12).map(e=>{let r=Math.max(2,Math.round(e.minutes/n*390));return`
      <g>
        <text x="0" y="21" class="chart-name">${t(e.name.length>26?e.name.slice(0,25)+`…`:e.name)}</text>
        <rect x="170" y="8" width="${r}" height="18" rx="4" fill="${e.color}"></rect>
        <text x="${174+r}" y="21" class="chart-val2">${o(e.minutes)} · ${c(e.amount)}</text>
      </g>`}).join(``),i=Math.max(120,e.projects.slice(0,12).length*34+16);return`
    <section class="card">
      <div class="card-head">
        <h2 class="card-title">Report <span class="muted">${Q(x.reportFrom,x.reportTo)}</span></h2>
        <div class="btn-row">
          <button class="btn btn-ghost" data-action="print-report" aria-label="Print invoice" title="Print / save as PDF">${U(`print`)} Print</button>
          <button class="btn btn-primary" data-action="export-csv" aria-label="Export CSV" title="Download CSV">${U(`download`)} Export CSV</button>
        </div>
      </div>
      <div class="form-row report-controls">
        <label class="field"><span class="field-label">From</span>
          <input class="input" type="date" id="reportFrom" value="${t(x.reportFrom)}" data-action-change="report-range">
        </label>
        <label class="field"><span class="field-label">To</span>
          <input class="input" type="date" id="reportTo" value="${t(x.reportTo)}" data-action-change="report-range">
        </label>
        <div class="preset-row" role="group" aria-label="Date range presets">
          <button class="btn btn-ghost btn-sm" data-action="preset" data-preset="week">This week</button>
          <button class="btn btn-ghost btn-sm" data-action="preset" data-preset="month">This month</button>
          <button class="btn btn-ghost btn-sm" data-action="preset" data-preset="lastmonth">Last month</button>
          <button class="btn btn-ghost btn-sm" data-action="preset" data-preset="30d">Last 30 days</button>
          <button class="btn btn-ghost btn-sm" data-action="preset" data-preset="year">This year</button>
          <button class="btn btn-ghost btn-sm" data-action="preset" data-preset="all">All time</button>
        </div>
      </div>
    </section>

    ${e.projects.length===0?`
    <section class="card">${Y(`Nothing in this range`,`No time entries fall within this date range. Adjust the dates or log some time.`)}</section>
    `:`
    <section class="grid-2">
      <div class="card stat-card">
        <div class="stat">
          <span class="stat-label">Total time</span>
          <span class="stat-value">${o(e.total_minutes)}</span>
          <span class="stat-sub">${e.total_minutes} minutes · ${e.entryCount} ${e.entryCount===1?`entry`:`entries`}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total amount</span>
          <span class="stat-value stat-accent">${c(e.total_amount)}</span>
          <span class="stat-sub">${e.projects.length} ${e.projects.length===1?`project`:`projects`} billed</span>
        </div>
        <div class="stat-donut">${ne(e.projects,e.total_minutes)}</div>
      </div>
      <div class="card">
        <h2 class="card-title">Time per project</h2>
        <svg class="report-chart chart" viewBox="0 0 640 ${i}" role="img" aria-label="Chart of time per project" preserveAspectRatio="xMidYMid meet">
          ${r||``}
        </svg>
      </div>
    </section>

    <section class="card invoice">
      <div class="invoice-head">
        <div>
          <h2 class="invoice-title">Statement</h2>
          <p class="muted">Billable period: ${Q(x.reportFrom,x.reportTo)}</p>
        </div>
        <div class="invoice-brand" aria-hidden="true"><svg viewBox="0 0 32 32" width="26" height="26"><rect width="32" height="32" rx="7" fill="#0e7265"/><path d="M16 8v8l5.5 3.2" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="16" cy="16" r="10.2" stroke="#fff" stroke-width="2.4" fill="none"/></svg></div>
      </div>
      <table class="report-table">
        <thead>
          <tr><th scope="col">Project</th><th scope="col" class="num">Time</th><th scope="col" class="num">Minutes</th><th scope="col" class="num">Rate</th><th scope="col" class="num">Amount</th></tr>
        </thead>
        <tbody>
          ${e.projects.map(e=>`
          <tr>
            <td><span class="dot" style="background:${e.color}"></span> ${t(e.name)}</td>
            <td class="num">${o(e.minutes)}</td>
            <td class="num">${e.minutes}</td>
            <td class="num">${c(u(60,e.rate))}/h</td>
            <td class="num strong">${c(e.amount)}</td>
          </tr>`).join(``)}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td class="num">${o(e.total_minutes)}</td>
            <td class="num">${e.total_minutes}</td>
            <td class="num"></td>
            <td class="num strong">${c(e.total_amount)}</td>
          </tr>
        </tfoot>
      </table>
    </section>`}
  `}function ie(){let t=e(`#timerProject`);t&&h.timer&&(t.value=h.timer.projectId),B()}document.addEventListener(`click`,t=>{let n=t.target.closest(`[data-action]`);if(!n)return;let r=n.dataset.action;if(r===`tab`)x.tab=n.dataset.tab,x.editingEntry=null,x.confirmDelete=null,W();else if(r===`start-timer`){let t=e(`#timerProject`),n=t&&t.value?t.value:h.projects[0]&&h.projects[0].id;if(!n){H(`Create a project first`),x.tab=`projects`,W();return}I(n,e(`#timerNote`)?e(`#timerNote`).value.trim():``)}else if(r===`stop-timer`)L();else if(r===`discard-timer`)R();else if(r===`pick-project`){let t=n.dataset.id;x.tab=`time`,W();let r=e(`#qeProject`);r&&(r.value=t,e(`#qeMinutes`).focus())}else if(r===`show-all`)x.showAllEntries=!0,W();else if(r===`edit-entry`)x.editingEntry=n.dataset.id,W();else if(r===`cancel-edit`)x.editingEntry=null,W();else if(r===`del-entry`)O(n.dataset.id),H(`Entry deleted`);else if(r===`edit-project`)x.editingProject=n.dataset.id,x.swatchIdx=f.indexOf((y(n.dataset.id)||{}).color),x.swatchIdx<0&&(x.swatchIdx=0),x.tab=`projects`,W(),window.scrollTo({top:0,behavior:`smooth`});else if(r===`cancel-project-edit`)x.editingProject=null,W();else if(r===`del-project`){let e=y(n.dataset.id);A(n.dataset.id),H(`Deleted “${e?e.name:`project`}” and its entries`)}else if(r===`pick-color`)x.swatchIdx=f.indexOf(n.dataset.color),document.querySelectorAll(`.swatch`).forEach(e=>{let t=e.dataset.color===n.dataset.color;e.classList.toggle(`sel`,t),e.setAttribute(`aria-checked`,String(t))});else if(r===`preset`){let[e,t]=te(n.dataset.preset);x.reportFrom=e,x.reportTo=t,W()}else if(r===`export-csv`){let e=P(x.reportFrom,x.reportTo);try{let t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`billable_${x.reportFrom}_to_${x.reportTo}.csv`,document.body.appendChild(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(n.href),n.remove()},500),H(`CSV downloaded`)}catch{H(`Could not download CSV`)}}else r===`print-report`?window.print():r===`sample-data`&&ae()}),document.addEventListener(`submit`,t=>{let n=t.target.closest(`form[data-action]`);if(!n)return;t.preventDefault();let r=n.dataset.action;if(r===`quick-entry`){let t=e(`#qeProject`).value,r=y(t);if(!r){H(`Create a project first`);return}let a=e(`#qeDate`).value||i(),s=d(e(`#qeMinutes`).value);if(!Number.isFinite(s)||s<=0){H(`Enter a duration like 90, 1:30 or 1h30`),e(`#qeMinutes`).focus();return}let c=e(`#qeNote`).value.trim();E({project:r.name,date:a,minutes:s,note:c}),n.reset(),e(`#qeDate`).value=i(),H(`Logged ${o(s)} to ${r.name}`),e(`#qeMinutes`).focus()}else if(r===`save-entry`){let e=n.dataset.id,t=new FormData(n),r=d(t.get(`minutes`));if(!Number.isFinite(r)||r<=0){H(`Enter a valid duration`);return}D(e,{projectId:t.get(`projectId`),date:t.get(`date`)||i(),minutes:r,note:String(t.get(`note`)||``).trim()}),x.editingEntry=null,H(`Entry updated`)}else if(r===`create-project`){let e=new FormData(n),t=String(e.get(`name`)||``).trim(),r=parseFloat(e.get(`rate`));if(!t||!Number.isFinite(r)||r<0){H(`Enter a name and an hourly rate`);return}T({name:t,rate:r,color:f[x.swatchIdx??0]}),x.swatchIdx=0,H(`Project “${t}” created`)}else if(r===`save-project`){let e=new FormData(n),t=n.querySelector(`[name=projectId]`).value,r=String(e.get(`name`)||``).trim(),i=parseFloat(e.get(`rate`));if(!r||!Number.isFinite(i)||i<0){H(`Enter a name and an hourly rate`);return}k(t,{name:r,rate:i,color:f[x.swatchIdx??0]}),x.editingProject=null,H(`Project updated`)}}),document.addEventListener(`change`,t=>{let n=t.target.closest(`[data-action-change]`);if(n&&n.dataset.actionChange===`report-range`){let t=e(`#reportFrom`).value,n=e(`#reportTo`).value;if(t&&(x.reportFrom=t),n&&(x.reportTo=n),x.reportFrom>x.reportTo){let e=x.reportFrom;x.reportFrom=x.reportTo,x.reportTo=e}W()}}),document.addEventListener(`change`,e=>{e.target.id===`timerProject`&&h.timer&&e.target.value&&(h.timer.projectId=e.target.value,v()),e.target.dataset&&e.target.dataset.actionChange===`entry-filter`&&(x.entryFilter=e.target.value||null,x.showAllEntries=!1,W())}),document.addEventListener(`input`,e=>{e.target.id===`timerNote`&&h.timer&&(h.timer.note=e.target.value,v())}),document.addEventListener(`keydown`,t=>{let n=(t.target.tagName||``).toLowerCase();if(!(n===`input`||n===`textarea`||n===`select`||t.target.isContentEditable||t.metaKey||t.ctrlKey||t.altKey)){if(t.key===`n`)t.preventDefault(),x.tab=`time`,W(),setTimeout(()=>{let t=e(`#qeMinutes`)||e(`#qeProject`);t&&t.focus()},30);else if(t.key===`t`){if(t.preventDefault(),h.timer)L();else{let t=e(`#timerProject`),n=t&&t.value?t.value:h.projects[0]&&h.projects[0].id;if(!n){H(`Create a project first`),x.tab=`projects`,W();return}I(n,``),H(`Timer started`)}}else t.key===`1`?(x.tab=`time`,W()):t.key===`2`?(x.tab=`projects`,W()):t.key===`3`&&(x.tab=`report`,W())}});function ae(){let e=[`Website redesign`,`Client support retainer`,`Mobile app MVP`],t=[85,120,95.5],n=[`#0e7265`,`#4f46e5`,`#b45309`],r=e.map(e=>b(e)),o=0;for(let t of e)r[o++];e.forEach((e,r)=>{b(e)||T({name:e,rate:t[r],color:n[r]})});let s=[`Design review`,`Sprint planning`,`Bug fixing`,`Client call`,`Feature work`,`Code review`,`Deployment`,`Documentation`],c=i();for(let e=0;e<21;e++){let t=a(c,-e);if((new Date(t.replace(/-/g,`/`)).getDay()+6)%7>4)continue;let n=1+Math.floor(Math.random()*2);for(let e=0;e<n;e++){let e=h.projects[Math.floor(Math.random()*h.projects.length)],n=[30,45,60,75,90,120,150][Math.floor(Math.random()*7)];E({project:e.name,date:t,minutes:n,note:s[Math.floor(Math.random()*s.length)]})}}H(`Sample data loaded`),x.tab=`time`,W()}W(),B();