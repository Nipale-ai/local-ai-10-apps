(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t=document)=>t.querySelector(e),t=e=>String(e).padStart(2,`0`),n=e=>`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`,r=()=>n(new Date),i=e=>{let[t,n,r]=String(e).split(`-`).map(Number);return new Date(t,n-1,r)},a=(e,t)=>{let n=new Date(e);return n.setDate(n.getDate()+t),n},o=e=>Math.round(e*100+1e-9)/100,s=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);function c(e){e=Math.max(0,Math.round(e));let t=Math.floor(e/60),n=e%60;return t&&n?`${t}h ${n}m`:t?`${t}h`:`${n}m`}function l(e){return i(e).toLocaleDateString(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`})}function u(e){return e===r()?`Today`:e===n(a(new Date,-1))?`Yesterday`:i(e).toLocaleDateString(`en-US`,{weekday:`long`,month:`short`,day:`numeric`})}function d(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function f(e){return(v.settings.currency||`$`)+Number(e||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})}function p(e){if(e=String(e||``).trim(),!e)return null;if(/^\d+:\d{1,2}$/.test(e)){let[t,n]=e.split(`:`).map(Number);return t*60+n}return/^\d+$/.test(e)?Number(e):/^\d+\.?\d*$/.test(e)?Math.round(Number(e)):null}var m=`hourglass.v1`,h=[`#3b82f6`,`#0d9488`,`#d97706`,`#7c3aed`,`#dc2626`,`#0284c7`,`#65a30d`,`#db2777`,`#4f46e5`,`#059669`,`#b45309`,`#9333ea`];function g(){try{return window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}catch{return`light`}}function _(){try{let e=localStorage.getItem(m);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.projects)&&Array.isArray(t.entries))return{projects:t.projects,entries:t.entries,settings:{currency:`$`,...t.settings},timer:t.timer||null}}}catch{}return{projects:[],entries:[],settings:{currency:`$`,theme:g()},timer:null}}var v=_();function y(){try{localStorage.setItem(m,JSON.stringify(v))}catch{}}var b={tab:`log`,from:x(),to:S(),preset:`this-week`,filterProject:null,editingEntry:null,confirm:null,invoice:!1,projectForm:null,timerProject:null,showAll:!1,lastProject:null,lastDate:null};function x(e=new Date){let t=new Date(e);return t.setDate(t.getDate()-(t.getDay()+6)%7),n(t)}function S(e=new Date){return n(a(i(x(e)),6))}function C(e,t){let n=v.projects.map(n=>{let r=0;for(let i of v.entries)i.projectId===n.id&&i.date>=e&&i.date<=t&&(r+=i.minutes);return{name:n.name,minutes:r,amount:o(r*n.rate/60)}});return{projects:n,total_minutes:n.reduce((e,t)=>e+t.minutes,0),total_amount:o(n.reduce((e,t)=>e+t.amount,0))}}function w(e,t){let n=C(e,t),r=e=>/[",\n]/.test(e)?`"`+String(e).replace(/"/g,`""`)+`"`:String(e),i=[`project,minutes,amount`];for(let e of n.projects)i.push(`${r(e.name)},${e.minutes},${e.amount.toFixed(2)}`);return i.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),i.join(`
`)}function T(e,t){if(e=String(e||``).trim(),!e)return null;let n=v.projects.find(t=>t.name.toLowerCase()===e.toLowerCase());return n?n.rate=Number(t)||0:(n={id:s(),name:e,rate:Number(t)||0,color:h[v.projects.length%h.length]},v.projects.push(n)),y(),V(),n}function E(e,t,n){let r=v.projects.find(t=>t.id===e);if(!r)return;let i=String(t||``).trim();i&&(r.name=i),r.rate=Number(n)||0,y(),V()}function D(e){v.projects=v.projects.filter(t=>t.id!==e),v.entries=v.entries.filter(t=>t.projectId!==e),v.timer&&v.timer.projectId===e&&(v.timer=null),b.filterProject===e&&(b.filterProject=null),y(),V()}function O(e,t,n,r){let i=Math.max(0,Math.round(Number(n)||0));if(!e||!t||i<=0)return null;let a={id:s(),projectId:e,date:String(t),minutes:i,note:String(r||``).trim()};return v.entries.push(a),y(),V(),a}function k(e,t,n,r,i){let a=v.entries.find(t=>t.id===e);if(!a)return;let o=Math.max(0,Math.round(Number(r)||0));t&&(a.projectId=t),n&&(a.date=String(n)),o>0&&(a.minutes=o),a.note=String(i||``).trim(),y(),V()}function A(e){v.entries=v.entries.filter(t=>t.id!==e),y(),V()}function j(e){e&&(v.timer={projectId:e,startedAt:Date.now()},y(),V())}function M(){if(!v.timer)return;let e=v.timer;v.timer=null;let t=Math.max(1,Math.round((Date.now()-e.startedAt)/6e4)),r=v.projects.find(t=>t.id===e.projectId);r&&(v.entries.push({id:s(),projectId:r.id,date:n(new Date(e.startedAt)),minutes:t,note:``}),F(`Logged ${c(t)} to ${r.name}`)),y(),V()}function N(){let n=e(`#timer-elapsed`);if(!n)return;if(!v.timer){n.textContent=``;return}let r=Math.max(0,Date.now()-v.timer.startedAt),i=Math.floor(r/1e3),a=Math.floor(i/3600),o=Math.floor(i%3600/60),s=i%60;n.textContent=(a?`${a}:`:``)+`${t(o)}:${t(s)}`}setInterval(N,1e3);var P=null;function F(t){let n=e(`#toast`);n||(n=document.createElement(`div`),n.id=`toast`,n.setAttribute(`role`,`status`),document.body.appendChild(n)),n.textContent=t,n.classList.add(`show`),clearTimeout(P),P=setTimeout(()=>n.classList.remove(`show`),2600)}function I(){let e=new Date,t=(e,t)=>{let n={id:s(),name:e,rate:t,color:h[v.projects.length%h.length]};return v.projects.push(n),n},r=t(`Website Relaunch`,85),i=t(`Server Audit`,120.5),o=t(`Content Writing`,55),c=(t,r,i,o)=>v.entries.push({id:s(),projectId:t.id,date:n(a(e,-r)),minutes:i,note:o||``});c(r,0,95,`Landing page copy`),c(r,1,130,`Design review`),c(i,1,45,`Log review`),c(o,2,60,`Blog draft`),c(r,3,150,`Checkout flow`),c(i,4,90,`Security scan`),c(o,5,45,`Case study`),c(r,6,75,`Accessibility fixes`),c(i,8,120,`Capacity review`),c(o,9,30,`Newsletter`),c(r,10,110,`CMS setup`),y(),V(),F(`Sample data loaded`)}function L(){let e=w(b.from,b.to),t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`time-report_${b.from}_to_${b.to}.csv`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),5e3),F(`CSV downloaded`)}var R=e=>v.projects.find(t=>t.id===e);function z(e){let t=0,n=0;for(let r of v.entries){if(r.date!==e)continue;let i=R(r.projectId);i&&(t+=r.minutes,n+=r.minutes*i.rate/60)}return{minutes:t,amount:o(n)}}function B(){let e=i(x());return[...Array(7)].map((t,r)=>n(a(e,r)))}function V(){let t=e(`#app`);t&&(document.documentElement.dataset.theme=v.settings&&v.settings.theme||g(),t.innerHTML=$(),N())}function H(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{plus:`<path d="M12 5v14M5 12h14"/>`,pencil:`<path d="M17 3l4 4L7 21H3v-4L17 3z"/>`,trash:`<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6"/>`,x:`<path d="M6 6l12 12M18 6L6 18"/>`,download:`<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v3h16v-3"/>`,play:`<path d="M7 5l12 7-12 7V5z"/>`,stop:`<rect x="6" y="6" width="12" height="12" rx="1.5"/>`,check:`<path d="M4 12.5l5 5L20 6.5"/>`,clock:`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,file:`<path d="M6 3h8l4 4v14H6V3zM14 3v4h4"/>`,filter:`<path d="M4 5h16l-6 7v6l-4 2v-8L4 5z"/>`,sun:`<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>`,moon:`<path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5z"/>`}[e]||``}</svg>`}function U(e){return v.projects.length?v.projects.map(t=>`<option value="${t.id}"${t.id===e?` selected`:``}>${d(t.name)}</option>`).join(``):`<option value="">No projects yet</option>`}function W(){let e=b.projectForm?`<form class="proj-form" id="proj-form">
        <input id="pf-name" class="input" type="text" placeholder="Project name" value="${b.projectForm.id?d(R(b.projectForm.id)?.name||``):``}" maxlength="60" autocomplete="off">
        <div class="pf-row">
          <input id="pf-rate" class="input" type="text" inputmode="decimal" placeholder="Rate / hour" value="${b.projectForm.id?String(R(b.projectForm.id)?.rate??``):``}" autocomplete="off">
          <span class="pf-unit">${d(v.settings.currency||`$`)}/h</span>
        </div>
        <div class="pf-actions">
          <button type="submit" class="btn primary sm">${H(`check`)} Save</button>
          <button type="button" class="btn sm" data-act="project-cancel">Cancel</button>
        </div>
      </form>`:`<button class="btn primary block" data-act="project-new">${H(`plus`)} New project</button>`,t=v.projects.map(e=>{let t=b.filterProject===e.id,n=b.confirm&&b.confirm.kind===`project`&&b.confirm.id===e.id;return`<div class="proj-item${t?` active`:``}" data-act="select-project" data-id="${e.id}" title="Click to filter the log">
        <span class="dot" style="background:${e.color}"></span>
        <span class="proj-name">${d(e.name)}</span>
        <span class="proj-rate">${f(e.rate)}/h</span>
        <span class="proj-actions">
          <button class="icon-btn" data-act="project-edit" data-id="${e.id}" title="Edit project">${H(`pencil`)}</button>
          ${n?`<button class="icon-btn danger confirm" data-act="project-del" data-id="${e.id}">Sure?</button>`:`<button class="icon-btn" data-act="project-del" data-id="${e.id}" title="Delete project">${H(`trash`)}</button>`}
        </span>
      </div>`}).join(``);return`<aside class="sidebar">
    <div class="brand">
      <div class="brand-mark">${H(`clock`)}</div>
      <div class="brand-text">
        <div class="brand-name">Hourglass</div>
        <div class="brand-sub">Time &amp; billing</div>
      </div>
    </div>
    ${e}
    <nav class="proj-list" aria-label="Projects">${t||`<div class="proj-empty">No projects yet.<br>Create one to start.</div>`}</nav>
    <div class="side-foot">
      <div class="foot-row"><span class="foot-dot"></span> Data stays in this browser</div>
      <div class="foot-row foot-curr">
        <label class="foot-label" for="curr-sel">Currency</label>
        <select id="curr-sel" class="input foot-select">
          ${[`$`,`€`,`£`,`kr`,`zł`].map(e=>`<option value="${e}"${(v.settings.currency||`$`)===e?` selected`:``}>${e===`$`?`$ (USD)`:e===`€`?`€ (EUR)`:e===`£`?`£ (GBP)`:e===`kr`?`kr (SEK)`:`zł (PLN)`}</option>`).join(``)}
        </select>
      </div>
    </div>
  </aside>`}function G(){let e=!!v.timer,t=v.timer?v.timer.projectId:b.timerProject||v.projects[0]&&v.projects[0].id||``;return`<header class="topbar">
    <nav class="tabs" role="tablist">
      <button class="tab${b.tab===`log`?` active`:``}" data-act="tab" data-tab="log" role="tab" aria-selected="${b.tab===`log`}">Log</button>
      <button class="tab${b.tab===`report`?` active`:``}" data-act="tab" data-tab="report" role="tab" aria-selected="${b.tab===`report`}">Report</button>
    </nav>
    <div class="top-right">
      <div class="timer">
        <select id="timer-project" class="input timer-select" aria-label="Timer project">
          ${U(t)}
        </select>
        <button class="btn ${e?`danger`:`primary`} timer-btn" data-act="timer-toggle">
          ${H(e?`stop`:`play`)} ${e?`Stop`:`Start`}
        </button>
        <span class="timer-elapsed${e?` running`:``}" id="timer-elapsed"></span>
      </div>
      <button class="icon-btn theme-btn" data-act="theme" title="Toggle dark mode">
        ${H((v.settings&&v.settings.theme)===`dark`?`sun`:`moon`)}
      </button>
    </div>
  </header>`}function K(){let e=r(),t=B();return`<div class="week-strip" aria-label="This week">
    ${t.map(n=>{let r=z(n),a=Math.max(1,...t.map(e=>z(e).minutes)),o=Math.round(r.minutes/a*100);return`<button class="week-day${n===e?` today`:``}" data-act="week-day" data-date="${n}" title="${l(n)} — ${c(r.minutes)}">
        <span class="week-letter">${i(n).toLocaleDateString(`en-US`,{weekday:`narrow`})}</span>
        <span class="week-bar"><span style="height:${r.minutes?Math.max(8,o):0}%"></span></span>
        <span class="week-min">${r.minutes?c(r.minutes):`·`}</span>
      </button>`}).join(``)}
  </div>`}function q(){return`<form class="quick-add" id="quick-add">
    <select id="qa-project" class="input" aria-label="Project">${U((b.lastProject&&R(b.lastProject)?b.lastProject:null)||v.projects[0]&&v.projects[0].id||``)}</select>
    <input id="qa-date" class="input" type="date" value="${b.lastDate||r()}" aria-label="Date">
    <input id="qa-duration" class="input qa-dur" type="text" inputmode="numeric" placeholder="45 or 1:30" aria-label="Duration" autocomplete="off">
    <input id="qa-note" class="input qa-note" type="text" placeholder="Note (optional)" maxlength="120" autocomplete="off">
    <button type="submit" class="btn primary">${H(`plus`)} Add</button>
  </form>`}function J(e){let t=R(e.projectId);if(b.editingEntry===e.id)return`<form class="entry edit" id="entry-form" data-id="${e.id}">
      <select class="input" name="projectId">${U(e.projectId)}</select>
      <input class="input" type="date" name="date" value="${e.date}">
      <input class="input e-min-in" type="text" inputmode="numeric" name="minutes" value="${e.minutes}">
      <input class="input" type="text" name="note" value="${d(e.note||``)}" placeholder="Note">
      <button type="submit" class="btn primary sm">${H(`check`)} Save</button>
      <button type="button" class="btn sm" data-act="entry-cancel">Cancel</button>
    </form>`;let n=b.confirm&&b.confirm.kind===`entry`&&b.confirm.id===e.id;return`<div class="entry" data-id="${e.id}">
    <span class="dot" style="background:${t?t.color:`#94a3b8`}"></span>
    <span class="e-proj">${t?d(t.name):`—`}</span>
    ${e.note?`<span class="e-note">${d(e.note)}</span>`:``}
    <span class="e-min">${c(e.minutes)}</span>
    <span class="e-amt">${t?f(e.minutes*t.rate/60):``}</span>
    <span class="e-actions">
      <button class="icon-btn" data-act="entry-edit" data-id="${e.id}" title="Edit entry">${H(`pencil`)}</button>
      ${n?`<button class="icon-btn danger confirm" data-act="entry-del" data-id="${e.id}">Sure?</button>`:`<button class="icon-btn" data-act="entry-del" data-id="${e.id}" title="Delete entry">${H(`trash`)}</button>`}
    </span>
  </div>`}function Y(){let e=z(r()),t={};for(let e of v.entries)b.filterProject&&e.projectId!==b.filterProject||(t[e.date]=t[e.date]||[]).push(e);let n=Object.keys(t).sort((e,t)=>e<t?1:-1),i=b.showAll?n:n.slice(0,14),a=b.filterProject?R(b.filterProject):null,s;return v.projects.length?n.length?(s=i.map(e=>{let n=t[e].sort((e,t)=>e.id<t.id?-1:1),r=n.reduce((e,t)=>e+t.minutes,0),i=o(n.reduce((e,t)=>{let n=R(t.projectId);return e+(n?t.minutes*n.rate/60:0)},0));return`<div class="day">
        <div class="day-head">
          <span class="day-label">${u(e)}</span>
          <span class="day-sub">${l(e)}</span>
          <span class="day-tot">${c(r)} · ${f(i)}</span>
        </div>
        ${n.map(J).join(``)}
      </div>`}).join(``),n.length>14&&!b.showAll&&(s+=`<button class="btn ghost show-more" data-act="show-more">Show ${n.length-14} more day${n.length-14==1?``:`s`}</button>`)):s=`<div class="empty">
      <div class="empty-art">${H(`clock`)}</div>
      <h2>Nothing logged${a?` for `+d(a.name):``} yet</h2>
      <p>Start the timer above, or add an entry manually.</p>
    </div>`:s=`<div class="empty">
      <div class="empty-art">${H(`clock`)}</div>
      <h2>No projects yet</h2>
      <p>Create a project with an hourly rate, then log time against it.<br>Hourglass turns those minutes into billable amounts.</p>
      <div class="empty-actions">
        <button class="btn primary" data-act="project-new">${H(`plus`)} Create your first project</button>
        <button class="btn" data-act="sample">Load sample data</button>
      </div>
    </div>`,`<section class="view">
    ${a?`<div class="filter-chip">${H(`filter`)} ${d(a.name)} <button class="icon-btn" data-act="clear-filter" title="Clear filter">${H(`x`)}</button></div>`:``}
    <div class="log-top">
      <div class="today-card">
        <span class="today-label">Today</span>
        <span class="today-val">${c(e.minutes)}</span>
        <span class="today-amt">${f(e.amount)}</span>
      </div>
      ${K()}
    </div>
    ${q()}
    <div class="entries">${s}</div>
  </section>`}function X(){let e=new Date;return[[`today`,`Today`,r(),r()],[`this-week`,`This week`,x(e),S(e)],[`last-week`,`Last week`,n(a(i(x(e)),-7)),n(a(i(x(e)),-1))],[`this-month`,`This month`,n(new Date(e.getFullYear(),e.getMonth(),1)),n(new Date(e.getFullYear(),e.getMonth()+1,0))],[`last-month`,`Last month`,n(new Date(e.getFullYear(),e.getMonth()-1,1)),n(new Date(e.getFullYear(),e.getMonth(),0))],[`all`,`All time`,v.entries.length?v.entries.map(e=>e.date).sort()[0]:r(),r()]].map(([e,t,n,r])=>`<button class="chip${b.preset===e&&b.from===n&&b.to===r?` active`:``}" data-act="preset" data-key="${e}" data-from="${n}" data-to="${r}">${t}</button>`).join(``)}function Z(){let e=C(b.from,b.to),t=[...e.projects].sort((e,t)=>t.minutes-e.minutes||e.name.localeCompare(t.name)),r=e.total_minutes>0?e.total_amount/(e.total_minutes/60):0,o=e.projects.filter(e=>e.minutes>0).length,s=`<div class="table-wrap">
    <table class="report-table">
      <thead><tr>
        <th>Project</th><th class="num">Rate</th><th class="num">Time</th><th class="num">Minutes</th><th class="num">Amount</th>
      </tr></thead>
      <tbody>
        ${t.map(e=>{let t=v.projects.find(t=>t.name===e.name);return`<tr class="${e.minutes?``:`zero`}">
            <td><span class="dot" style="background:${t?t.color:`#94a3b8`}"></span>${d(e.name)}</td>
            <td class="num">${f(t?t.rate:0)}/h</td>
            <td class="num">${c(e.minutes)}</td>
            <td class="num">${e.minutes}</td>
            <td class="num strong">${f(e.amount)}</td>
          </tr>`}).join(``)||`<tr><td colspan="5" class="zero">No projects.</td></tr>`}
      </tbody>
      <tfoot><tr>
        <td class="total-label">Total</td><td></td><td class="num">${c(e.total_minutes)}</td><td class="num">${e.total_minutes}</td><td class="num strong">${f(e.total_amount)}</td>
      </tr></tfoot>
    </table>
  </div>`,u=Math.max(1,...t.map(e=>e.minutes)),p=`<div class="chart" aria-label="Time per project">
    ${t.filter(e=>e.minutes>0).map(e=>{let t=v.projects.find(t=>t.name===e.name);return`<div class="chart-row">
        <span class="chart-label">${d(e.name)}</span>
        <span class="chart-track"><span class="chart-bar" style="width:${e.minutes/u*100}%;background:${t?t.color:`#94a3b8`}"></span></span>
        <span class="chart-val">${c(e.minutes)}</span>
      </div>`}).join(``)||`<div class="chart-empty">No time in this range yet.</div>`}
  </div>`,m=[],h=i(b.from),g=i(b.to),_=0;for(;h<=g&&_<62;)m.push(n(h)),h=a(h,1),_++;let y=!(m.length>61)&&m.length?`<div class="daily" aria-label="Time per day">
        ${m.map(e=>{let t=z(e).minutes,n=Math.max(1,...m.map(e=>z(e).minutes)),r=Math.round(t/n*100),a=i(e).toLocaleDateString(`en-US`,{weekday:`narrow`});return`<div class="daily-col" title="${l(e)} — ${c(t)}">
            <span class="daily-bar"><span style="height:${t?Math.max(6,r):0}%"></span></span>
            <span class="daily-wd">${a}</span>
          </div>`}).join(``)}
      </div>`:``,x=`<div class="cards">
    <div class="card">
      <div class="card-label">Total time</div>
      <div class="card-value">${c(e.total_minutes)}</div>
      <div class="card-sub">${e.total_minutes} minutes</div>
    </div>
    <div class="card">
      <div class="card-label">Amount</div>
      <div class="card-value">${f(e.total_amount)}</div>
      <div class="card-sub">rounded per project</div>
    </div>
    <div class="card">
      <div class="card-label">Active projects</div>
      <div class="card-value">${o}<span class="card-of"> / ${e.projects.length}</span></div>
      <div class="card-sub">in this range</div>
    </div>
    <div class="card">
      <div class="card-label">Effective rate</div>
      <div class="card-value">${f(r)}<span class="card-of">/h</span></div>
      <div class="card-sub">blended, all projects</div>
    </div>
  </div>`,S=b.invoice?Q(e):`<div class="report-grid">${s}${p}${y?`<div class="daily-card"><div class="panel-title">Per day</div>${y}</div>`:``}</div>`;return`<section class="view">
    <div class="range-bar">
      <input type="date" id="rp-from" class="input" value="${b.from}" aria-label="From">
      <span class="range-sep">–</span>
      <input type="date" id="rp-to" class="input" value="${b.to}" aria-label="To">
      <div class="presets">${X()}</div>
      <div class="range-actions">
        <button class="btn${b.invoice?` primary`:``}" data-act="invoice">${H(`file`)} Invoice view</button>
        <button class="btn primary" data-act="csv">${H(`download`)} Export CSV</button>
      </div>
    </div>
    ${x}
    ${S}
  </section>`}function Q(e){let t=[...e.projects].sort((e,t)=>t.minutes-e.minutes||e.name.localeCompare(t.name)),n=v.settings.currency||`$`;return`<div class="invoice">
    <div class="invoice-head">
      <div>
        <div class="invoice-title">Time report</div>
        <div class="invoice-period">${l(b.from)} — ${l(b.to)}</div>
      </div>
      <div class="invoice-meta">
        <div>Generated</div>
        <div class="invoice-strong">${l(r())}</div>
      </div>
    </div>
    <table class="invoice-table">
      <thead><tr><th>Project</th><th class="num">Rate</th><th class="num">Time</th><th class="num">Amount</th></tr></thead>
      <tbody>
        ${t.map(e=>{let t=v.projects.find(t=>t.name===e.name);return`<tr>
            <td>${d(e.name)}</td>
            <td class="num">${n} ${Number(t?t.rate:0).toFixed(2)}/h</td>
            <td class="num">${c(e.minutes)}</td>
            <td class="num">${n} ${e.amount.toFixed(2)}</td>
          </tr>`}).join(``)}
      </tbody>
      <tfoot><tr>
        <td colspan="2" class="total-label">Total</td>
        <td class="num">${c(e.total_minutes)}</td>
        <td class="num invoice-total">${n} ${e.total_amount.toFixed(2)}</td>
      </tr></tfoot>
    </table>
    <div class="invoice-foot">
      <span>Amounts are minutes × hourly rate ÷ 60, rounded to cents per project.</span>
      <button class="btn primary sm" data-act="csv">${H(`download`)} Download CSV</button>
    </div>
  </div>`}function $(){return`<div class="app">
    ${W()}
    <main class="main">
      ${G()}
      ${b.tab===`log`?Y():Z()}
      <div class="kbd-hint"><b>t</b> timer · <b>n</b> new entry · <b>r</b> report · <b>esc</b> leave field</div>
    </main>
  </div>`}function ee(t){let n=t.target.closest(`[data-act]`);if(!n)return;let r=n.dataset.act,i=n.dataset.id;switch(r){case`tab`:b.tab=n.dataset.tab,b.editingEntry=null,b.confirm=null,V();break;case`project-new`:b.projectForm={},V(),setTimeout(()=>e(`#pf-name`)&&e(`#pf-name`).focus(),0);break;case`project-cancel`:b.projectForm=null,V();break;case`project-edit`:t.stopPropagation(),b.projectForm={id:i},V(),setTimeout(()=>e(`#pf-name`)&&e(`#pf-name`).focus(),0);break;case`project-del`:t.stopPropagation(),b.confirm&&b.confirm.kind===`project`&&b.confirm.id===i?D(i):(b.confirm={kind:`project`,id:i},V());break;case`select-project`:b.filterProject=b.filterProject===i?null:i,V();break;case`clear-filter`:b.filterProject=null,V();break;case`entry-edit`:b.editingEntry=i,b.confirm=null,V();break;case`entry-cancel`:b.editingEntry=null,V();break;case`entry-del`:b.confirm&&b.confirm.kind===`entry`&&b.confirm.id===i?A(i):(b.confirm={kind:`entry`,id:i},V());break;case`timer-toggle`:if(v.timer)M();else{let t=e(`#timer-project`),n=t?t.value:``;if(!n){F(`Create a project first`);break}j(n)}break;case`preset`:b.from=n.dataset.from,b.to=n.dataset.to,b.preset=n.dataset.key,V();break;case`invoice`:b.invoice=!b.invoice,V();break;case`csv`:L();break;case`week-day`:b.tab=`log`,V(),setTimeout(()=>{let t=e(`#qa-date`);t&&(t.value=n.dataset.date,t.focus())},0);break;case`show-more`:b.showAll=!0,V();break;case`sample`:I();break;case`theme`:v.settings.theme=v.settings.theme===`dark`?`light`:`dark`,y(),V()}}function te(t){let n=t.target;if(n.id===`quick-add`){t.preventDefault();let n=e(`#qa-project`).value,i=e(`#qa-date`).value||r(),a=p(e(`#qa-duration`).value),o=e(`#qa-note`).value;if(!n){F(`Create a project first`);return}if(a===null||a<=0){F(`Enter a duration, e.g. 45 or 1:30`);return}let s=R(n);b.lastProject=n,b.lastDate=i,O(n,i,a,o),F(`Logged ${c(a)} to ${s?s.name:`project`}`),setTimeout(()=>{let t=e(`#qa-duration`);t&&(t.value=``,t.focus())},0)}else if(n.id===`proj-form`){t.preventDefault();let n=e(`#pf-name`).value,r=Number(String(e(`#pf-rate`).value).replace(`,`,`.`))||0;if(!n.trim()){F(`Project name is required`);return}b.projectForm&&b.projectForm.id?E(b.projectForm.id,n,r):T(n,r),b.projectForm=null,V()}else if(n.id===`entry-form`){t.preventDefault();let e=n.dataset.id;k(e,n.elements.projectId.value,n.elements.date.value,n.elements.minutes.value,n.elements.note.value),b.editingEntry=null,V()}}function ne(e){let t=e.target;t.id===`rp-from`?(b.from=t.value||b.from,b.to<b.from&&(b.to=b.from),b.preset=null,V()):t.id===`rp-to`?(b.to=t.value||b.to,b.from>b.to&&(b.from=b.to),b.preset=null,V()):t.id===`timer-project`?b.timerProject=t.value:t.id===`curr-sel`&&(v.settings.currency=t.value,y(),V())}document.addEventListener(`keydown`,t=>{let n=(t.target.tagName||``).toLowerCase();if(n===`input`||n===`select`||n===`textarea`){t.key===`Escape`&&t.target.blur();return}if(t.key===`t`||t.key===`T`){if(t.preventDefault(),v.timer)M();else{let t=e(`#timer-project`),n=t?t.value:``;n?j(n):F(`Create a project first`)}}else t.key===`n`||t.key===`N`?(t.preventDefault(),b.tab=`log`,V(),setTimeout(()=>{let t=e(`#qa-duration`);t&&t.focus()},0)):(t.key===`r`||t.key===`R`)&&(t.preventDefault(),b.tab=`report`,V())}),window.APP={reset(){v.projects=[],v.entries=[],v.timer=null,b.filterProject=null,b.editingEntry=null,b.confirm=null,y(),V()},addProject({name:e,rate:t}={}){return T(e,t)},addEntry({project:e,date:t,minutes:n}={}){if(e==null||!t)return null;let r=v.projects.find(t=>t.name===e)||v.projects.find(t=>t.name.toLowerCase()===String(e).toLowerCase());return r||=T(e,0),r?O(r.id,String(t),n):null},report({from:e,to:t}={}){return C(String(e),String(t))},csv({from:e,to:t}={}){return w(String(e),String(t))}},e(`#app`).addEventListener(`click`,ee),e(`#app`).addEventListener(`submit`,te),e(`#app`).addEventListener(`change`,ne),V();