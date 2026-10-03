(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`tempo.store.v1`,t=[`#1d6fd6`,`#d9531e`,`#0f9d6e`,`#9c36b5`,`#d6336c`,`#c98a00`,`#0e8fa8`,`#5c6ac4`,`#7a8599`],n={projects:[],entries:[],timer:null,seq:1};function r(){try{let t=localStorage.getItem(e);if(t){let e=JSON.parse(t);n.projects=Array.isArray(e.projects)?e.projects:[],n.entries=Array.isArray(e.entries)?e.entries:[],n.timer=e.timer||null,n.seq=e.seq||n.entries.length+n.projects.length+1}}catch{}}var i=null;function a(){i===null&&(i=setTimeout(o,120))}function o(){i!==null&&(clearTimeout(i),i=null);try{localStorage.setItem(e,JSON.stringify({projects:n.projects,entries:n.entries,timer:n.timer,seq:n.seq}))}catch{}}typeof window<`u`&&(window.addEventListener(`pagehide`,o),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&o()}));function s(){return`x`+n.seq+++`-`+Date.now().toString(36)}function c(e){let t=String(e).trim().toLowerCase();return n.projects.find(e=>e.name.toLowerCase()===t)||null}function l(e,r){let i=c(e);return i||(i={id:s(),name:String(e).trim(),rate:Number.isFinite(+r)?+r:0,color:t[n.projects.length%t.length]},n.projects.push(i),a(),i)}function u(e,t,r){let i=c(e);i||=l(e,0);let o=Number.isFinite(+r)?+r:0,u={id:s(),projectId:i.id,date:String(t),minutes:o,created:Date.now()};return n.entries.push(u),a(),u}function d(e){let t=n.entries.findIndex(t=>t.id===e);t>=0&&(n.entries.splice(t,1),a())}function f(e,t){let r=n.entries.find(t=>t.id===e);r&&(Object.assign(r,t),a())}function p(e){let t=n.projects.findIndex(t=>t.id===e);t>=0&&(n.projects.splice(t,1),n.entries=n.entries.filter(t=>t.projectId!==e),n.timer&&n.timer.projectId===e&&(n.timer=null),a())}function m(){n.projects=[],n.entries=[],n.timer=null,n.seq=1;try{localStorage.removeItem(e)}catch{}}function h(e,t){let n=Math.round(Math.abs(e)*100)*Math.round(Math.abs(t)*100),r=Math.floor(n/6e3);return r+ +((n-r*6e3)*2>=6e3)}function g(e,t){let r=new Map;for(let i of n.entries)i.date>=e&&i.date<=t&&r.set(i.projectId,(r.get(i.projectId)||0)+i.minutes);let i=[],a=0,o=0;for(let e of n.projects){let t=r.get(e.id)||0,n=t?h(t,e.rate):0;i.push({name:e.name,minutes:t,amount:n/100}),a+=t,o+=n}return{projects:i,total_minutes:a,total_amount:o/100}}function _(e){let t=String(e);return/[",\n]/.test(t)?`"`+t.replace(/"/g,`""`)+`"`:t}function v(e,t){let n=g(e,t),r=[`Project,Minutes,Amount`];for(let e of n.projects)r.push([_(e.name),e.minutes,e.amount.toFixed(2)].join(`,`));return r.push([`TOTAL`,n.total_minutes,n.total_amount.toFixed(2)].join(`,`)),r.join(`
`)}function y(e){n.timer={projectId:e,startedAt:Date.now()},o()}function b(){if(!n.timer)return null;let e=Math.max(1,Math.round((Date.now()-n.timer.startedAt)/6e4)),t=n.timer.projectId;n.timer=null;let r=n.projects.find(e=>e.id===t),i=r?u(r.name,x(),e):null;return o(),i}function x(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function S(e,t){let[n,r,i]=e.split(`-`).map(Number),a=new Date(n,r-1,i);return a.setDate(a.getDate()+t),x(a)}function C(){let e=new Date,t=(e.getDay()+6)%7;return S(x(e),-t)}window.APP={reset(){m(),w.rangeFrom=C(),w.rangeTo=x(),F()},addProject(e){let t=l(e.name,e.rate);return F(),t&&t.id},addEntry(e){let t=u(e.project,e.date,e.minutes);return Y(),t&&t.id},report(e){return e||={},g(String(e.from||`0000-01-01`),String(e.to||`9999-12-31`))},csv(e){return e||={},v(String(e.from||`0000-01-01`),String(e.to||`9999-12-31`))}},r();var w={rangeFrom:C(),rangeTo:x(),invoice:!1,editingId:null,lastProjectId:null},T=e=>document.querySelector(e),E=e=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),D=e=>`$`+(Math.abs(e)<1e3?e.toFixed(2):e.toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})),O=e=>{let t=Math.floor(e/60),n=e%60;return t?n?`${t}h ${n}m`:`${t}h`:`${n}m`},k=e=>n.projects.find(t=>t.id===e)||null;function A(){T(`#app`).innerHTML=`
  <header class="topbar">
    <div class="brand">
      <span class="mark" aria-hidden="true">T</span>
      <h1>Tempo</h1>
      <span class="tag">time tracking &amp; project billing</span>
    </div>
    <div class="rangebar" role="group" aria-label="Report date range">
      <label>From <input type="date" id="from" aria-label="Report start date"></label>
      <label>To <input type="date" id="to" aria-label="Report end date"></label>
      <button id="preset-week" class="chip" type="button" title="This week">This week</button>
      <button id="preset-month" class="chip" type="button" title="This month">This month</button>
      <button id="preset-all" class="chip" type="button" title="All time">All time</button>
      <button id="export-csv" class="primary" type="button" title="Download CSV export">Export CSV</button>
    </div>
  </header>
  <div class="layout">
    <div class="col">
      <section class="card no-print" aria-labelledby="timer-h">
        <h2 id="timer-h">Timer</h2>
        <div class="timer-row">
          <span class="timer-clock" id="timer-clock" aria-live="off">0:00:00</span>
          <button id="timer-btn" class="primary" type="button" aria-label="Start timer">Start</button>
        </div>
        <div class="form-row" style="margin-top:10px">
          <div class="field">
            <label for="timer-project">Timer project</label>
            <select id="timer-project" aria-label="Project for the timer"></select>
          </div>
        </div>
        <p class="timer-sub" id="timer-sub">Stopped. Running time is logged to today when you stop.</p>
      </section>

      <section class="card no-print" aria-labelledby="proj-h">
        <h2 id="proj-h">Projects <span id="proj-count" class="timer-sub"></span></h2>
        <form id="proj-form" class="form-row grow" autocomplete="off">
          <div class="field"><label for="p-name">Name</label>
            <input type="text" id="p-name" placeholder="Acme website" required aria-label="New project name"></div>
          <div class="field" style="flex:0 1 110px"><label for="p-rate">Rate /h</label>
            <input type="number" id="p-rate" min="0" step="0.01" placeholder="95.00" required aria-label="Hourly rate in currency units"></div>
          <button class="primary" type="submit" aria-label="Add project">Add</button>
        </form>
        <ul class="plist" id="proj-list" style="margin-top:12px"></ul>
      </section>
    </div>

    <div class="col">
      <section class="card no-print" aria-labelledby="log-h">
        <h2 id="log-h">Log time</h2>
        <form id="entry-form" class="form-row grow" autocomplete="off">
          <div class="field" style="flex:2 1 140px"><label for="e-project">Project</label>
            <select id="e-project" aria-label="Project for the new entry" required></select></div>
          <div class="field"><label for="e-date">Date</label>
            <input type="date" id="e-date" aria-label="Entry date" required></div>
          <div class="field" style="flex:0 1 100px"><label for="e-min">Minutes</label>
            <input type="number" id="e-min" min="1" step="1" value="60" required aria-label="Duration in minutes"></div>
          <button class="primary" type="submit" aria-label="Log time entry">Log</button>
        </form>
        <div class="form-row" style="margin-top:10px" role="group" aria-label="Quick durations">
          <button class="chip" type="button" data-quick="15" aria-label="Quick add 15 minutes">15 m</button>
          <button class="chip" type="button" data-quick="30" aria-label="Quick add 30 minutes">30 m</button>
          <button class="chip" type="button" data-quick="45" aria-label="Quick add 45 minutes">45 m</button>
          <button class="chip" type="button" data-quick="60" aria-label="Quick add 60 minutes">1 h</button>
          <button class="chip" type="button" data-quick="90" aria-label="Quick add 90 minutes">1.5 h</button>
          <button class="chip" type="button" data-quick="120" aria-label="Quick add 120 minutes">2 h</button>
        </div>
        <p class="hint">Fast flow: pick project, Enter in minutes logs the entry and stays ready for the next one. Press <b>n</b> to jump to minutes, <b>s</b> to start/stop the timer.</p>
      </section>

      <section class="card" aria-labelledby="rep-h">
        <h2 id="rep-h">Report
          <span style="display:flex;gap:8px">
            <button id="invoice-btn" class="small" type="button" aria-pressed="false" aria-label="Toggle invoice view">Invoice view</button>
            <button id="export-csv-2" class="small" type="button" aria-label="Export report as CSV">Export CSV</button>
          </span>
        </h2>
        <div id="report-area"></div>
      </section>

      <section class="card no-print" aria-labelledby="ent-h">
        <h2 id="ent-h">Time entries <span id="ent-count" class="timer-sub"></span></h2>
        <div id="entries-area"></div>
      </section>
    </div>
  </div>`,T(`#from`).value=w.rangeFrom,T(`#to`).value=w.rangeTo,T(`#e-date`).value=x(),T(`#from`).addEventListener(`change`,e=>{w.rangeFrom=e.target.value||w.rangeFrom,B()}),T(`#to`).addEventListener(`change`,e=>{w.rangeTo=e.target.value||w.rangeTo,B()}),T(`#preset-week`).addEventListener(`click`,()=>{N(C(),x())}),T(`#preset-month`).addEventListener(`click`,()=>{let e=x();N(e.slice(0,8)+`01`,e)}),T(`#preset-all`).addEventListener(`click`,()=>{N(`2000-01-01`,`2100-01-01`)}),T(`#export-csv`).addEventListener(`click`,P),T(`#export-csv-2`).addEventListener(`click`,P),T(`#invoice-btn`).addEventListener(`click`,()=>{w.invoice=!w.invoice,T(`#invoice-btn`).setAttribute(`aria-pressed`,String(w.invoice)),B()}),T(`#proj-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=T(`#p-name`).value.trim();t&&(l(t,parseFloat(T(`#p-rate`).value)||0),T(`#p-name`).value=``,T(`#p-rate`).value=``,F(),T(`#p-name`).focus())}),T(`#entry-form`).addEventListener(`submit`,e=>{e.preventDefault(),M()}),document.querySelectorAll(`[data-quick]`).forEach(e=>{e.addEventListener(`click`,()=>{T(`#e-min`).value=e.dataset.quick,M()})}),T(`#timer-btn`).addEventListener(`click`,()=>{if(n.timer)b(),F();else{let e=T(`#timer-project`).value||n.projects[0]&&n.projects[0].id;if(!e){alert(`Add a project first.`);return}y(e),F()}}),T(`#entries-area`).addEventListener(`click`,e=>{let t=e.target.closest(`button`);if(!t)return;let n=t.dataset.id;if(t.dataset.act===`del`)d(n),w.editingId===n&&(w.editingId=null),F();else if(t.dataset.act===`edit`){if(w.editingId=w.editingId===n?null:n,U(),w.editingId){let e=T(`#entries-area`).querySelector(`.editform input`);e&&e.focus()}}else if(t.dataset.act===`cancel`)w.editingId=null,U();else if(t.dataset.act===`save`){let e=t.closest(`.editform`),r=e.querySelector(`[name=date]`).value,i=parseInt(e.querySelector(`[name=minutes]`).value,10);r&&Number.isFinite(i)&&i>=0&&(f(n,{date:r,minutes:i}),w.editingId=null,F())}}),T(`#proj-list`).addEventListener(`click`,e=>{if(e.target.closest(`#demo-btn`)){j();return}let t=e.target.closest(`button[data-delproj]`);if(!t)return;let n=t.dataset.delproj,r=k(n);r&&confirm(`Delete project "${r.name}" and all its entries?`)&&(p(n),F())}),document.addEventListener(`keydown`,e=>{let t=e.target;if((!t||t.tagName!==`INPUT`&&t.tagName!==`SELECT`&&t.tagName!==`TEXTAREA`&&!t.isContentEditable)&&!(e.metaKey||e.ctrlKey||e.altKey)){if(e.key===`s`)e.preventDefault(),T(`#timer-btn`).click();else if(e.key===`n`){e.preventDefault();let t=T(`#e-min`);t&&(t.select(),t.focus())}}})}function j(){let e=x(),t=t=>S(e,-t);l(`Website Relaunch`,85),l(`Server Audit`,120.5),l(`Content Workshop`,65),u(`Website Relaunch`,t(1),90),u(`Website Relaunch`,t(2),150),u(`Website Relaunch`,t(5),105),u(`Server Audit`,t(1),45),u(`Server Audit`,t(3),120),u(`Content Workshop`,t(0),60),u(`Content Workshop`,t(9),180),o(),F()}function M(){let e=T(`#e-project`).value,t=T(`#e-date`).value,n=parseInt(T(`#e-min`).value,10),r=k(e);if(!r||!t||!Number.isFinite(n)||n<=0)return;u(r.name,t,n),w.lastProjectId=e,o(),F();let i=T(`#e-project`);i&&(i.value=e);let a=T(`#e-min`);a&&(a.select(),a.focus())}function N(e,t){w.rangeFrom=e,w.rangeTo=t,T(`#from`).value=e,T(`#to`).value=t,B()}function P(){let e=v(w.rangeFrom,w.rangeTo),t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`tempo-report-${w.rangeFrom}-to-${w.rangeTo}.csv`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),500)}function F(){L(),R(!0),B(),U()}function I(e){return n.projects.map(t=>`<option value="${t.id}" ${t.id===e?`selected`:``}>${E(t.name)} · ${D(t.rate)}/h</option>`).join(``)}function L(){let e=T(`#e-project`),t=T(`#timer-project`),r=e?w.lastProjectId&&k(w.lastProjectId)?w.lastProjectId:e.value:``,i=t?n.timer?n.timer.projectId:t.value:``;e.innerHTML=I(r||n.projects[0]&&n.projects[0].id),t.innerHTML=I(i||n.projects[0]&&n.projects[0].id),T(`#proj-count`).textContent=n.projects.length?`(${n.projects.length})`:``,T(`#proj-list`).innerHTML=n.projects.map(e=>{let t=n.entries.filter(t=>t.projectId===e.id).length;return`<li>
      <span class="dot" style="background:${e.color}" aria-hidden="true"></span>
      <span class="pname">${E(e.name)}</span>
      <span class="prate">${D(e.rate)}/h · ${t} ${t===1?`entry`:`entries`}</span>
      <button class="icon-btn" data-delproj="${e.id}" aria-label="Delete project ${E(e.name)}" title="Delete project">✕</button>
    </li>`}).join(``)||`<li class="plist-empty" style="border:none;background:none;flex-direction:column;align-items:stretch;gap:8px">
      <span class="timer-sub">No projects yet — add your first one above.</span>
      <button id="demo-btn" type="button" aria-label="Load sample data to explore the app">Load sample data</button>
    </li>`}function R(e){let t=T(`#timer-btn`),r=T(`#timer-clock`),i=T(`#timer-sub`);if(t){if(n.timer){let e=k(n.timer.projectId);t.textContent=`Stop`,t.classList.remove(`primary`),t.setAttribute(`aria-label`,`Stop timer and log the time`),r.classList.add(`running`),i.textContent=`Running on ${e?e.name:`…`} since ${new Date(n.timer.startedAt).toLocaleTimeString()}.`,z(),R._iv??=setInterval(z,250)}else R._iv!=null&&(clearInterval(R._iv),R._iv=null),t.textContent=`Start`,t.classList.add(`primary`),t.disabled=n.projects.length===0,t.setAttribute(`aria-label`,n.projects.length?`Start timer`:`Start timer (add a project first)`),r.classList.remove(`running`),r.textContent=`0:00:00`,i.textContent=n.projects.length?`Stopped. Running time is logged to today when you stop.`:`Add a project to start tracking.`}}function z(){if(!n.timer)return;let e=Math.floor((Date.now()-n.timer.startedAt)/1e3),t=Math.floor(e/3600),r=Math.floor(e%3600/60),i=e%60,a=T(`#timer-clock`);a&&(a.textContent=`${t}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`)}function B(){let e=T(`#report-area`),t=g(w.rangeFrom,w.rangeTo),r=`${w.rangeFrom} – ${w.rangeTo}`,i=``;w.invoice&&(i+=`<div class="invoice-head">
      <div><div class="t">Invoice summary</div><div class="s">Billing period ${E(r)}</div></div>
      <div class="s" style="text-align:right">Tempo · Time &amp; Billing<br>${t.projects.length} ${t.projects.length===1?`project`:`projects`} · ${O(t.total_minutes)}</div>
    </div>`),!t.projects.length||!t.total_minutes?i+=`<p class="empty">No time in this range (${E(r)}). Widen the dates or log some time.</p>`:(i+=`<table class="report">
      <caption class="timer-sub" style="text-align:left;padding:0 0 8px">Period ${E(r)} · ${O(t.total_minutes)} total</caption>
      <thead><tr><th scope="col">Project</th><th scope="col">Minutes</th><th scope="col">Amount</th></tr></thead>
      <tbody>${t.projects.map(e=>{let t=n.projects.find(t=>t.name===e.name);return`<tr><td><span class="pill" style="background:${t?t.color:`#999`}"></span>${E(e.name)}</td>
        <td>${e.minutes}</td><td>${D(e.amount)}</td></tr>`}).join(``)}</tbody>
      <tfoot><tr><td>Total</td><td>${t.total_minutes}</td><td>${D(t.total_amount)}</td></tr></tfoot>
    </table>`,i+=V(),i+=H(t)),e.innerHTML=i}function V(){let[e,t,r]=w.rangeFrom.split(`-`).map(Number),[i,a,o]=w.rangeTo.split(`-`).map(Number),s=new Date(e,t-1,r),c=new Date(i,a-1,o),l=Math.round((c-s)/864e5);if(l<0||l>13)return``;let u=new Map;for(let e of n.entries)e.date>=w.rangeFrom&&e.date<=w.rangeTo&&u.set(e.date,(u.get(e.date)||0)+e.minutes);let d=[];for(let e=0;e<=l;e++){let t=S(w.rangeFrom,e),n=u.get(t)||0,[r,i,a]=t.split(`-`).map(Number),o=new Date(r,i-1,a).toLocaleDateString(`en-GB`,{weekday:`short`});d.push(`<div class="daycell ${n?`has`:``}" title="${t}: ${n} min">
      <span class="dw">${o}</span><span class="dm">${a}</span><span class="dh">${n?O(n):`·`}</span>
    </div>`)}return`<div class="daystrip" role="img" aria-label="Minutes per day chart for the selected period">${d.join(``)}</div>`}function H(e){let t=e.projects.filter(e=>e.minutes>0),r=Math.max(...t.map(e=>e.minutes)),i=t.length;return`<div class="chart-wrap">
    <svg class="chart" viewBox="0 0 600 ${Math.max(110,26+i*30+8)}" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="Bar chart of minutes per project for the selected period">${t.map((e,t)=>{let i=n.projects.find(t=>t.name===e.name),a=Math.max(3,e.minutes/r*532),o=26+t*30;return`
      <text x="8" y="${o+10}" font-size="13" fill="#46566a">${E(e.name)} — ${e.minutes} min · ${D(e.amount)}</text>
      <rect x="8" y="${o+14}" width="532" height="16" rx="4" fill="#eef2f7"></rect>
      <rect x="8" y="${o+14}" width="${a}" height="16" rx="4" fill="${i?i.color:`#1d5fbf`}"></rect>`}).join(``)}</svg>
  </div>`}function U(){let e=T(`#entries-area`),t=[...n.entries].sort((e,t)=>e.date<t.date?1:e.date>t.date?-1:(t.created||0)-(e.created||0));if(T(`#ent-count`).textContent=n.entries.length?`(${n.entries.length})`:``,!t.length){e.innerHTML=`<p class="empty">No entries yet. Log time above or start the timer.</p>`;return}let r=t.slice(0,200),i=[],a=null;for(let e of r)(!a||a.date!==e.date)&&(a={date:e.date,items:[],min:0},i.push(a)),a.items.push(e),a.min+=e.minutes;e.innerHTML=i.map(e=>`
    <div class="daygroup">
      <div class="dayhead"><span>${W(e.date)}</span><span class="dsum">${O(e.min)}</span></div>
      <ul class="elist">${e.items.map(e=>q(e)).join(``)}</ul>
    </div>`).join(``)+(t.length>200?`<p class="timer-sub">Showing the 200 most recent of ${t.length} entries. The report counts all of them.</p>`:``)}function W(e){let t=x();if(e===t)return`Today`;if(e===S(t,-1))return`Yesterday`;let[n,r,i]=e.split(`-`).map(Number);return new Date(n,r-1,i).toLocaleDateString(`en-GB`,{weekday:`short`,day:`numeric`,month:`short`,year:`numeric`})}var G=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M11.3 1.7l3 3L5 14H2v-3l9.3-9.3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,K=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 4h11M6.5 1.8h3M4 4l.7 9.2h6.6L12 4M6.3 7v3.6M9.7 7v3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;function q(e){let t=k(e.projectId),n=t?h(e.minutes,t.rate):0;return w.editingId===e.id?`<li><span class="editform">
      <input type="date" name="date" value="${E(e.date)}" aria-label="Edit entry date">
      <input type="number" name="minutes" min="0" step="1" value="${e.minutes}" style="width:90px" aria-label="Edit entry minutes">
      <button class="primary small" data-act="save" data-id="${e.id}" type="button" aria-label="Save changes to entry">Save</button>
      <button class="small" data-act="cancel" data-id="${e.id}" type="button" aria-label="Cancel editing">Cancel</button>
    </span></li>`:`<li>
    <span class="dot" style="background:${t?t.color:`#999`}" aria-hidden="true"></span>
    <span class="ename">${E(t?t.name:`—`)}</span>
    <span class="emins">${e.minutes} min</span>
    <span class="eamt">${D(n/100)}</span>
    <button class="icon-btn" data-act="edit" data-id="${e.id}" aria-label="Edit entry for ${E(t?t.name:`project`)} on ${E(e.date)}" title="Edit entry">${G}</button>
    <button class="icon-btn" data-act="del" data-id="${e.id}" aria-label="Delete entry for ${E(t?t.name:`project`)} on ${E(e.date)}" title="Delete entry">${K}</button>
  </li>`}var J=!1;function Y(){J||(J=!0,setTimeout(()=>{J=!1,F()},150))}A(),F(),setInterval(()=>{n.timer&&z()},1e3);