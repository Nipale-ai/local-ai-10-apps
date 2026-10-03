(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`timel.v1`,t={projects:[],entries:[]},n=1,r=`entries`,i=!1,a=0,o=null,s=``,c=``,l=null,u=[`#2563eb`,`#059669`,`#d97706`,`#dc2626`,`#7c3aed`,`#0891b2`,`#db2777`,`#65a30c`];function d(){try{let r=localStorage.getItem(e);if(r){let e=JSON.parse(r);t.projects=e.projects||[],t.entries=e.entries||[],n=Math.max(1,...t.projects.map(e=>e.id),...t.entries.map(e=>e.id))+1}}catch{}}function f(){try{localStorage.setItem(e,JSON.stringify({projects:t.projects,entries:t.entries}))}catch{}}function p(){return n++}function m(){let e=new Set(t.projects.map(e=>e.color));for(let t of u)if(!e.has(t))return t;return u[t.projects.length%u.length]}function h(e,t){let n=Math.round(t*100);return Math.floor((e*n+30)/60)}function g(e){return(e/100).toFixed(2)}function _(){return new Date().toISOString().slice(0,10)}function v(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function y(e,n){let r=new Map;for(let i of t.entries)i.date<e||i.date>n||r.set(i.projectId,(r.get(i.projectId)||0)+i.minutes);let i=[],a=0,o=0;for(let e of t.projects){let t=r.get(e.id)||0,n=h(t,e.rate);i.push({name:e.name,minutes:t,amount:n/100}),a+=t,o+=n}return{projects:i,total_minutes:a,total_amount:o/100}}function b(e,t){let n=y(e,t),r=e=>/[",\n]/.test(e)?`"`+String(e).replace(/"/g,`""`)+`"`:String(e),i=[`name,minutes,amount`];for(let e of n.projects)i.push(`${r(e.name)},${e.minutes},${e.amount.toFixed(2)}`);return i.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),i.join(`
`)}window.APP={reset(){t.projects=[],t.entries=[],i=!1,o=null,f(),C()},addProject({name:e,rate:n}){let r={id:p(),name:String(e),rate:Number(n),color:m()};return t.projects.push(r),f(),C(),r},addEntry({project:e,date:n,minutes:r}){let i=t.projects.find(t=>t.name===e);if(!i)return null;let a={id:p(),projectId:i.id,date:String(n),minutes:Number(r),note:``};return t.entries.push(a),f(),C(),a},report({from:e,to:t}){return y(e,t)},csv({from:e,to:t}){return b(e,t)}};var x=document.getElementById(`app`),S=!1;function C(){S||(S=!0,requestAnimationFrame(()=>{S=!1,w(),f()}))}function w(){let e=`
  <header class="app-header">
    <div class="brand">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11" fill="none" stroke="#2563eb" stroke-width="2.5"/><line x1="13" y1="13" x2="13" y2="6" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/><line x1="13" y1="13" x2="18" y2="15" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/></svg>
      <h1>TimeLedger</h1>
    </div>
    <nav class="tabs" aria-label="Views">
      <button class="tab ${r===`entries`?`active`:``}" data-action="view" data-view="entries">Entries</button>
      <button class="tab ${r===`projects`?`active`:``}" data-action="view" data-view="projects">Projects</button>
      <button class="tab ${r===`report`?`active`:``}" data-action="view" data-view="report">Report</button>
    </nav>
  </header>`,t=``;t=r===`entries`?E():r===`projects`?O():k(),x.innerHTML=e+`<main class="app-main">${t}</main>`}function T(e){return t.projects.length?t.projects.map(t=>`<option value="${v(t.name)}" ${e===t.name?`selected`:``}>${v(t.name)}</option>`).join(``):`<option value="">No projects yet</option>`}function E(){let e=_(),n=i?j(Date.now()-a):`0:00:00`;t.projects.find(e=>e.id===o)||t.projects[0];let r=[...t.entries].sort((e,t)=>t.date.localeCompare(e.date)||t.id-e.id),s=r.length?r.map(e=>{let n=t.projects.find(t=>t.id===e.projectId),r=h(e.minutes,n?n.rate:0);return`<div class="entry">
          <span class="dot" style="background:${n?n.color:`#ccc`}"></span>
          <span class="entry-name">${v(n?n.name:`?`)}</span>
          <span class="entry-date">${v(e.date)}</span>
          <span class="entry-min">${e.minutes} min</span>
          <span class="entry-amt">${g(r)}</span>
          <button class="btn" data-action="edit-entry" data-id="${e.id}" aria-label="Edit entry">Edit</button>
          <button class="btn btn-danger" data-action="del-entry" data-id="${e.id}" aria-label="Delete entry">Delete</button>
        </div>`}).join(``):`<div class="empty">No entries yet. Start the timer or log time below.</div>`,c=l?t.entries.find(e=>e.id===l):null,u=c?(t.projects.find(e=>e.id===c.projectId)||{name:``}).name:``,d=c?c.date:e,f=c?c.minutes:``,p=c?c.note:``;return`
  <section class="card timer-card">
    <h2>Timer</h2>
    <div class="timer-row">
      <select id="timer-project" aria-label="Project for timer" data-action="timer-project">
        ${t.projects.map(e=>`<option value="${e.id}" ${e.id===o?`selected`:``}>${v(e.name)}</option>`).join(``)||`<option value="">No projects</option>`}
      </select>
      <button class="btn ${i?`btn-stop`:`btn-start`}" data-action="timer-toggle" ${t.projects.length?``:`disabled`}>${i?`Stop`:`Start`}</button>
    </div>
    <div class="clock ${i?`running`:``}" id="clock" aria-live="polite">${n}</div>
  </section>
  <section class="card entry-form-card">
    <h2>${c?`Edit entry`:`Log time`}</h2>
    ${c?`<div class="edit-note">Editing an existing entry. Save to apply changes.</div>`:``}
    <form id="entry-form" data-action="entry-form">
      <div class="form-row">
        <div class="field"><label for="ef-project">Project</label>
          <select id="ef-project" name="project">${T(u)}</select>
        </div>
        <div class="field"><label for="ef-date">Date</label>
          <input type="date" id="ef-date" name="date" value="${d}">
        </div>
        <div class="field"><label for="ef-minutes">Minutes</label>
          <input type="number" id="ef-minutes" name="minutes" min="1" step="1" value="${f}" placeholder="30">
        </div>
      </div>
      <div class="field"><label for="ef-note">Note</label>
        <input type="text" id="ef-note" name="note" value="${v(p)}" placeholder="What did you work on?">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary" ${t.projects.length?``:`disabled`}>${c?`Save changes`:`Add entry`}</button>
        ${c?`<button type="button" class="btn" data-action="cancel-edit">Cancel</button>`:``}
      </div>
    </form>
  </section>
  <section class="card entry-list-card">
    <h2>Entries</h2>
    <div id="entry-list">${s}</div>
  </section>
  <section class="card chart-card">
    <h2>Time per project</h2>
    ${D()}
  </section>`}function D(){let e=new Map;for(let n of t.entries)e.set(n.projectId,(e.get(n.projectId)||0)+n.minutes);return A({projects:t.projects.map(t=>({name:t.name,minutes:e.get(t.id)||0}))})}function O(){return`
  <section class="card proj-form-card">
    <h2>Add project</h2>
    <form id="proj-form" data-action="proj-form">
      <div class="form-row">
        <div class="field"><label for="pf-name">Name</label>
          <input type="text" id="pf-name" name="name" placeholder="Website Relaunch">
        </div>
        <div class="field"><label for="pf-rate">Hourly rate</label>
          <input type="number" id="pf-rate" name="rate" min="0" step="0.01" placeholder="85">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Add project</button>
    </form>
  </section>
  <section class="card proj-list-card">
    <h2>Projects</h2>
    <div id="proj-list">${t.projects.length?t.projects.map(e=>{let n=t.entries.filter(t=>t.projectId===e.id).reduce((e,t)=>e+t.minutes,0);return`<div class="proj">
          <span class="dot" style="background:${e.color}"></span>
          <span class="proj-name">${v(e.name)}</span>
          <span class="proj-rate">${g(Math.round(e.rate*100))}/h</span>
          <span class="proj-min">${n} min</span>
          <button class="btn btn-danger" data-action="del-project" data-id="${e.id}" aria-label="Delete project ${v(e.name)}">Delete</button>
        </div>`}).join(``):`<div class="empty">No projects yet. Add one below.</div>`}</div>
  </section>`}function k(){s||=_(),c||=_();let e=y(s,c),n=e.projects.map(e=>{let n=t.projects.find(t=>t.name===e.name);return`<tr>
      <td><span class="p-dot" style="background:${n?n.color:`#ccc`}"></span>${v(e.name)}</td>
      <td class="num">${e.minutes}</td>
      <td class="num">${g(Math.round(e.amount*100))}</td>
    </tr>`}).join(``),r=e.projects.length?`<table class="report" aria-label="Report by project">
      <thead><tr><th>Project</th><th class="num">Minutes</th><th class="num">Amount</th></tr></thead>
      <tbody>${n}
        <tr class="total"><td>TOTAL</td><td class="num">${e.total_minutes}</td><td class="num">${g(Math.round(e.total_amount*100))}</td></tr>
      </tbody></table>`:`<div class="empty">No data in this range.</div>`;return`
  <section class="card report-card">
    <h2>Report</h2>
    <form id="report-form" data-action="report-form">
      <div class="form-row">
        <div class="field"><label for="rf-from">From</label>
          <input type="date" id="rf-from" name="from" value="${s}">
        </div>
        <div class="field"><label for="rf-to">To</label>
          <input type="date" id="rf-to" name="to" value="${c}">
        </div>
      </div>
      <div class="form-row">
        <button type="button" class="btn" data-action="preset" data-preset="week">This week</button>
        <button type="button" class="btn" data-action="preset" data-preset="month">This month</button>
        <button type="button" class="btn" data-action="preset" data-preset="all">All time</button>
      </div>
    </form>
    <div class="report-summary">
      <div class="stat"><div class="k">Total minutes</div><div class="v">${e.total_minutes}</div></div>
      <div class="stat"><div class="k">Total amount</div><div class="v">${g(Math.round(e.total_amount*100))}</div></div>
    </div>
    ${r}
    <div class="chart-wrap">
      <h3>Time per project</h3>
      ${A(e)}
    </div>
    <div class="report-actions">
      <button class="btn btn-primary" data-action="csv" aria-label="Export CSV">Export CSV</button>
      <button class="btn" data-action="print" aria-label="Print invoice">Print invoice</button>
    </div>
  </section>`}function A(e){let n=e.projects.filter(e=>e.minutes>0);if(!n.length)return`<div class="empty">No time logged in this range.</div>`;let r=Math.max(...n.map(e=>e.minutes)),i=n.length,a=512/i*.6,o=512/i,s=``;return n.forEach((e,n)=>{let i=e.minutes/r*152,c=24+n*o+(o-a)/2,l=176-i,u=t.projects.find(t=>t.name===e.name);s+=`<rect class="bar" x="${c}" y="${l}" width="${a}" height="${i}" rx="4" fill="${u?u.color:`#ccc`}"/>`,s+=`<text class="val" x="${c+a/2}" y="${l-6}" text-anchor="middle">${e.minutes}</text>`,s+=`<text class="lbl" x="${c+a/2}" y="188" text-anchor="middle">${v(e.name.slice(0,10))}</text>`}),`<svg class="chart" viewBox="0 0 560 200" role="img" aria-label="Bar chart of minutes per project">
    <line class="axis" x1="24" y1="176" x2="536" y2="176"/>
    ${s}
  </svg>`}function j(e){let t=Math.floor(e/1e3),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return`${n}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`}x.addEventListener(`click`,e=>{let n=e.target.closest(`button`);if(!n)return;let u=n.dataset.action;if(u===`view`)r=n.dataset.view,C();else if(u===`timer-toggle`){if(i){let e=Math.round((Date.now()-a)/6e4);if(i=!1,e>0&&o){let n=t.projects.find(e=>e.id===o);n&&t.entries.push({id:p(),projectId:n.id,date:_(),minutes:e,note:`timer`})}}else i=!0,a=Date.now(),!o&&t.projects.length&&(o=t.projects[0].id);C()}else if(u===`del-entry`){let e=Number(n.dataset.id);t.entries=t.entries.filter(t=>t.id!==e),C()}else if(u===`edit-entry`)l=Number(n.dataset.id),C();else if(u===`cancel-edit`)l=null,C();else if(u===`del-project`){let e=Number(n.dataset.id);t.entries=t.entries.filter(t=>t.projectId!==e),t.projects=t.projects.filter(t=>t.id!==e),o===e&&(o=null),C()}else if(u===`print`)window.print();else if(u===`csv`){let e=b(s,c),t=new Blob([e],{type:`text/csv`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`timel-${s}-${c}.csv`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}else if(u===`preset`){let e=n.dataset.preset,t=new Date;if(e===`week`){let e=new Date(t);e.setDate(t.getDate()-t.getDay()+1),s=e.toISOString().slice(0,10),c=_()}else e===`month`?(s=new Date(t.getFullYear(),t.getMonth(),1).toISOString().slice(0,10),c=_()):(s=`2000-01-01`,c=_());C()}}),x.addEventListener(`submit`,e=>{e.preventDefault();let n=e.target,r=n.dataset.action;if(r===`entry-form`){let e=n.project.value,r=n.date.value,i=Number(n.minutes.value),a=n.note.value;if(!e||!r||i<=0)return;let o=t.projects.find(t=>t.name===e);if(!o)return;if(l){let e=t.entries.find(e=>e.id===l);e&&(e.projectId=o.id,e.date=r,e.minutes=i,e.note=a),l=null}else t.entries.push({id:p(),projectId:o.id,date:r,minutes:i,note:a});f(),C()}else if(r===`proj-form`){let e=n.name.value.trim(),r=Number(n.rate.value);if(!e||isNaN(r)||r<0)return;t.projects.push({id:p(),name:e,rate:r,color:m()}),n.name.value=``,n.rate.value=``,C()}}),x.addEventListener(`change`,e=>{e.target.id===`timer-project`&&(o=e.target.value||null,C())}),setInterval(()=>{if(i){let e=document.getElementById(`clock`);e&&(e.textContent=j(Date.now()-a),e.classList.add(`running`))}},250),d(),w(),window.addEventListener(`pagehide`,()=>f()),window.addEventListener(`beforeunload`,()=>f());