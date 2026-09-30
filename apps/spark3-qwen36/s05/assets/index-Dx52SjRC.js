(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`timetrack_data`;function t(){try{let t=localStorage.getItem(e);if(t)return JSON.parse(t)}catch{}return{projects:[],entries:[]}}function n(t){localStorage.setItem(e,JSON.stringify(t))}var r={data:t(),projects:[],entries:[],init(){this.projects=this.data.projects||[],this.entries=this.data.entries||[]},persist(){this.data.projects=this.projects,this.data.entries=this.entries,n(this.data)},reset(){this.projects=[],this.entries=[],this.persist()},addProject({name:e,rate:t}){if(e=String(e).trim(),t=Number(t),!e||isNaN(t)||t<=0||this.projects.find(t=>t.name===e))return null;let n={name:e,rate:t,color:this._nextColor()};return this.projects.push(n),this.persist(),n},_nextColor(){let e=[`#3b82f6`,`#8b5cf6`,`#ec4899`,`#f59e0b`,`#10b981`,`#06b6d4`,`#f97316`,`#6366f1`,`#14b8a6`,`#e11d48`,`#7c3aed`,`#0ea5e9`,`#84cc16`,`#d946ef`,`#f43f5e`],t=new Set(this.projects.map(e=>e.color));return e.find(e=>!t.has(e))||e[this.projects.length%e.length]},addEntry({project:e,date:t,minutes:n}){if(e=String(e).trim(),t=String(t).trim(),n=Number(n),!e||!t||isNaN(n)||n<=0||!this.projects.find(t=>t.name===e))return null;let r={id:Date.now()+Math.random(),project:e,date:t,minutes:n};return this.entries.push(r),this.persist(),r},deleteEntry(e){this.entries=this.entries.filter(t=>t.id!==e),this.persist()},updateEntry(e,t){let n=this.entries.find(t=>t.id===e);return n?(t.date!==void 0&&(n.date=String(t.date).trim()),t.minutes!==void 0&&(n.minutes=Number(t.minutes)),this.persist(),n):null},report({from:e,to:t}){let n=String(e).trim(),r=String(t).trim(),i=this.projects.map(e=>{let t=this.entries.filter(t=>t.project===e.name&&t.date>=n&&t.date<=r).reduce((e,t)=>e+t.minutes,0),i=Math.round(t*e.rate/60*100+1e-9)/100;return{name:e.name,minutes:t,amount:i}});return{projects:i,total_minutes:i.reduce((e,t)=>e+t.minutes,0),total_amount:Math.round(i.reduce((e,t)=>e+t.amount,0)*100+1e-9)/100}},csv({from:e,to:t}){let n=this.report({from:e,to:t}),r=[`Project,Minutes,Amount`];for(let e of n.projects)r.push(`${e.name},${e.minutes},${e.amount.toFixed(2)}`);return r.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),r.join(`
`)}};r.init(),window.APP={reset(){r.reset(),u()},addProject({name:e,rate:t}){let n=r.addProject({name:e,rate:t});return u(),n},addEntry({project:e,date:t,minutes:n}){let i=r.addEntry({project:e,date:t,minutes:n});return u(),i},report({from:e,to:t}){return r.report({from:e,to:t})},csv({from:e,to:t}){return r.csv({from:e,to:t})},_getProjects(){return r.projects},_getEntries(){return r.entries},_deleteEntry(e){r.deleteEntry(e),u()},_updateEntry(e,t){r.updateEntry(e,t),u()}};var i=`projects`,a=0,o=!1,s=null;function c(e){return e.toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})}function l(){return new Date().toISOString().slice(0,10)}function u(){let e=document.getElementById(`app`);e.innerHTML=``,e.appendChild(d()),e.appendChild(f()),e.appendChild(h()),e.appendChild(g())}function d(){let e=document.createElement(`style`);return e.textContent=`
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #1e293b;
      --text-secondary: #64748b;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --danger: #ef4444;
      --danger-hover: #dc2626;
      --success: #10b981;
      --radius: 8px;
      --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
      --shadow-lg: 0 4px 12px rgba(0,0,0,0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      min-height: 100vh;
    }
    .app-header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .app-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .app-title svg { flex-shrink: 0; }
    .timer-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 999px;
      padding: 4px 12px;
      font-size: 14px;
      font-weight: 600;
      color: #166534;
    }
    .timer-badge.running {
      background: #fef2f2;
      border-color: #fecaca;
      color: #991b1b;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    .timer-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--success);
    }
    .running .timer-dot {
      background: var(--danger);
    }
    .timer-display { font-variant-numeric: tabular-nums; }
    .tabs {
      display: flex;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 20px;
      gap: 0;
      overflow-x: auto;
    }
    .tab {
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border: none;
      background: none;
      border-bottom: 2px solid transparent;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .tab:hover { color: var(--text); }
    .tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
    .main { padding: 20px; max-width: 960px; margin: 0 auto; }
    .card {
      background: var(--surface);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      padding: 20px;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .form-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .form-group label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .form-group input, .form-group select {
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      background: var(--surface);
      color: var(--text);
      min-width: 0;
    }
    .form-group input:focus, .form-group select:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
    }
    .btn-primary:hover { background: var(--primary-hover); }
    .btn-danger {
      background: var(--danger);
      color: white;
    }
    .btn-danger:hover { background: var(--danger-hover); }
    .btn-sm {
      padding: 4px 10px;
      font-size: 12px;
    }
    .btn-ghost {
      background: transparent;
      color: var(--text-secondary);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: var(--bg); }
    .btn-success {
      background: var(--success);
      color: white;
    }
    .btn-success:hover { background: #059669; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    th {
      text-align: left;
      padding: 10px 12px;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
      border-bottom: 2px solid var(--border);
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }
    tr:last-child td { border-bottom: none; }
    .project-dot {
      display: inline-block;
      width: 10px; height: 10px;
      border-radius: 50%;
      margin-right: 6px;
      vertical-align: middle;
    }
    .amount { font-variant-numeric: tabular-nums; font-weight: 500; }
    .minutes { font-variant-numeric: tabular-nums; }
    .actions { display: flex; gap: 4px; }
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: var(--text-secondary);
      font-size: 14px;
    }
    .empty-state svg { margin-bottom: 12px; opacity: 0.4; }
    .report-total {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: var(--radius);
      padding: 16px 20px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .report-total-label { font-weight: 600; font-size: 14px; }
    .report-total-value { font-size: 24px; font-weight: 700; color: var(--primary); font-variant-numeric: tabular-nums; }
    .report-total-sub { font-size: 13px; color: var(--text-secondary); }
    .date-inputs { display: flex; gap: 8px; align-items: flex-end; flex-wrap: wrap; }
    .chart-bar-container { display: flex; align-items: flex-end; gap: 8px; height: 120px; padding-top: 8px; }
    .chart-bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 0; }
    .chart-bar {
      width: 100%;
      max-width: 60px;
      border-radius: 4px 4px 0 0;
      min-height: 2px;
      transition: height 0.3s ease;
    }
    .chart-label {
      font-size: 10px;
      color: var(--text-secondary);
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 60px;
    }
    .chart-value { font-size: 11px; font-weight: 600; color: var(--text); }
    .entry-date { font-variant-numeric: tabular-nums; }
    .inline-edit input {
      padding: 4px 8px;
      border: 1px solid var(--primary);
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
      width: 80px;
    }
    .inline-edit input:focus { outline: none; }
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: white;
      padding: 10px 20px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: fadeInUp 0.2s ease;
      box-shadow: var(--shadow-lg);
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateX(-50%) translateY(10px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .week-nav { display: flex; align-items: center; gap: 8px; }
    .week-nav button {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 16px;
      color: var(--text-secondary);
    }
    .week-nav button:hover { background: var(--bg); }
    .week-nav span { font-weight: 600; font-size: 14px; }
    .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
    .week-day-header {
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      padding: 4px;
    }
    .week-day-cell {
      background: var(--bg);
      border-radius: 6px;
      padding: 8px;
      min-height: 100px;
    }
    .week-day-cell.today { border: 2px solid var(--primary); }
    .week-day-label { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
    .week-entry {
      font-size: 11px;
      padding: 2px 4px;
      border-radius: 3px;
      margin-bottom: 2px;
      background: var(--surface);
      border-left: 3px solid;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .week-entry:hover { opacity: 0.8; }
    .week-entry-time { color: var(--text-secondary); }
    @media (max-width: 640px) {
      .main { padding: 12px; }
      .card { padding: 14px; }
      .form-row { flex-direction: column; }
      .form-group { width: 100%; }
      .form-group input, .form-group select { width: 100%; }
      .btn { width: 100%; text-align: center; }
      table { font-size: 13px; }
      th, td { padding: 8px 6px; }
      .app-header { padding: 12px 16px; }
      .tabs { padding: 0 12px; }
      .tab { padding: 10px 14px; font-size: 13px; }
      .report-total { flex-direction: column; align-items: flex-start; }
      .week-grid { gap: 4px; }
      .week-day-cell { padding: 6px; min-height: 80px; }
    }
    .color-picker { display: flex; gap: 4px; flex-wrap: wrap; }
    .color-swatch {
      width: 24px; height: 24px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s;
    }
    .color-swatch:hover, .color-swatch.selected {
      border-color: var(--text);
      transform: scale(1.15);
    }
    .hidden { display: none !important; }
  `,e}function f(){let e=document.createElement(`div`);return e.className=`app-header`,e.innerHTML=`
    <div class="app-title">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      TimeTrack
    </div>
    <div class="timer-badge ${o?`running`:``}" id="timerBadge">
      <span class="timer-dot"></span>
      <span class="timer-display" id="timerDisplay">${p(a)}</span>
      <button class="btn btn-sm ${o?`btn-danger`:`btn-success`}" id="timerBtn" style="padding:2px 10px;font-size:12px;">
        ${o?`Stop`:`Start`}
      </button>
    </div>
  `,e.querySelector(`#timerBtn`).addEventListener(`click`,m),e}function p(e){let t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60;return t>0?`${t}:${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`:`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function m(){if(o){clearInterval(s),o=!1;let e=Math.round(a/60);if(e>0&&r.projects.length>0){let t=r.projects[0];r.addEntry({project:t.name,date:l(),minutes:e}),E(`Logged ${e} min on ${t.name}`)}a=0}else o=!0,s=setInterval(()=>{a++;let e=document.getElementById(`timerDisplay`);e&&(e.textContent=p(a))},1e3);u()}function h(){let e=document.createElement(`div`);return e.className=`tabs`,[`Projects`,`Entries`,`Weekly`,`Report`].forEach(t=>{let n=document.createElement(`button`);n.className=`tab ${t===i?`active`:``}`,n.textContent=t,n.addEventListener(`click`,()=>{i=t.toLowerCase(),u()}),e.appendChild(n)}),e}function g(){let e=document.createElement(`div`);switch(e.className=`main`,i){case`projects`:e.appendChild(_());break;case`entries`:e.appendChild(v());break;case`weekly`:e.appendChild(b());break;case`report`:e.appendChild(C())}return e}function _(){let e=document.createElement(`div`);e.className=`card`,e.innerHTML=`
    <div class="card-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
      Projects
    </div>
    <div class="form-row" style="margin-bottom:16px;">
      <div class="form-group" style="flex:2;min-width:150px;">
        <label for="projName">Name</label>
        <input type="text" id="projName" placeholder="e.g. Website Redesign" />
      </div>
      <div class="form-group" style="flex:1;min-width:100px;">
        <label for="projRate">Hourly Rate</label>
        <input type="number" id="projRate" placeholder="85.00" step="0.01" min="0" />
      </div>
      <div class="form-group" style="justify-content:flex-end;">
        <label>&nbsp;</label>
        <button class="btn btn-primary" id="addProjectBtn">Add Project</button>
      </div>
    </div>
    <div id="projectsList"></div>
  `,e.querySelector(`#addProjectBtn`).addEventListener(`click`,()=>{let t=e.querySelector(`#projName`).value.trim(),n=parseFloat(e.querySelector(`#projRate`).value);t&&n>0&&(window.APP.addProject({name:t,rate:n}),e.querySelector(`#projName`).value=``,e.querySelector(`#projRate`).value=``,e.querySelector(`#projName`).focus())}),e.querySelector(`#projName`).addEventListener(`keydown`,t=>{t.key===`Enter`&&e.querySelector(`#addProjectBtn`).click()});let t=e.querySelector(`#projectsList`),n=window.APP._getProjects();if(n.length===0)t.innerHTML=`
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
        <p>No projects yet. Add your first project above.</p>
      </div>
    `;else{let e=document.createElement(`table`);e.innerHTML=`
      <thead>
        <tr><th>Project</th><th>Rate</th><th>Entries</th><th>Total Time</th><th style="text-align:right">Actions</th></tr>
      </thead>
      <tbody id="projTableBody"></tbody>
    `;let i=e.querySelector(`#projTableBody`);n.forEach(e=>{let t=r.entries.filter(t=>t.project===e.name).length,n=r.entries.filter(t=>t.project===e.name).reduce((e,t)=>e+t.minutes,0),a=document.createElement(`tr`);a.innerHTML=`
        <td><span class="project-dot" style="background:${e.color}"></span>${D(e.name)}</td>
        <td>$${c(e.rate)}</td>
        <td class="minutes">${t}</td>
        <td class="minutes">${n} min</td>
        <td>
          <div class="actions">
            <button class="btn btn-sm btn-danger" data-delete="${D(e.name)}">Delete</button>
          </div>
        </td>
      `,a.querySelector(`[data-delete]`).addEventListener(`click`,()=>{confirm(`Delete project "${e.name}" and all its entries?`)&&(r.projects=r.projects.filter(t=>t.name!==e.name),r.entries=r.entries.filter(t=>t.project!==e.name),r.persist(),u())}),i.appendChild(a)}),t.appendChild(e)}return e}function v(){let e=document.createElement(`div`);e.className=`card`,e.innerHTML=`
    <div class="card-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      Time Entries
    </div>
    <div class="form-row" style="margin-bottom:16px;">
      <div class="form-group" style="flex:2;min-width:150px;">
        <label for="entryProject">Project</label>
        <select id="entryProject"></select>
      </div>
      <div class="form-group" style="flex:1;min-width:120px;">
        <label for="entryDate">Date</label>
        <input type="date" id="entryDate" value="${l()}" />
      </div>
      <div class="form-group" style="flex:1;min-width:80px;">
        <label for="entryMinutes">Minutes</label>
        <input type="number" id="entryMinutes" placeholder="60" min="1" />
      </div>
      <div class="form-group" style="justify-content:flex-end;">
        <label>&nbsp;</label>
        <button class="btn btn-primary" id="addEntryBtn">Log Time</button>
      </div>
    </div>
    <div id="entriesList"></div>
  `;let t=e.querySelector(`#entryProject`);window.APP._getProjects().forEach(e=>{let n=document.createElement(`option`);n.value=e.name,n.textContent=e.name,t.appendChild(n)}),e.querySelector(`#addEntryBtn`).addEventListener(`click`,()=>{let n=t.value,r=e.querySelector(`#entryDate`).value,i=parseInt(e.querySelector(`#entryMinutes`).value);n&&r&&i>0&&(window.APP.addEntry({project:n,date:r,minutes:i}),e.querySelector(`#entryMinutes`).value=``,e.querySelector(`#entryMinutes`).focus())}),e.querySelector(`#entryMinutes`).addEventListener(`keydown`,t=>{t.key===`Enter`&&e.querySelector(`#addEntryBtn`).click()});let n=e.querySelector(`#entriesList`),i=r.entries.slice().reverse();if(i.length===0)n.innerHTML=`
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <p>No time entries yet. Log your first entry above.</p>
      </div>
    `;else{let e=document.createElement(`table`);e.innerHTML=`
      <thead>
        <tr><th>Date</th><th>Project</th><th>Minutes</th><th style="text-align:right">Actions</th></tr>
      </thead>
      <tbody id="entryTableBody"></tbody>
    `;let t=e.querySelector(`#entryTableBody`);i.forEach(e=>{let n=r.projects.find(t=>t.name===e.project),i=n?Math.round(e.minutes*n.rate/60*100+1e-9)/100:0,a=document.createElement(`tr`);a.innerHTML=`
        <td class="entry-date">${e.date}</td>
        <td><span class="project-dot" style="background:${n?n.color:`#ccc`}"></span>${D(e.project)}</td>
        <td class="minutes">${e.minutes} <span style="color:var(--text-secondary);font-size:12px;">($${c(i)})</span></td>
        <td>
          <div class="actions">
            <button class="btn btn-sm btn-ghost edit-entry" data-id="${e.id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-entry" data-id="${e.id}">Delete</button>
          </div>
        </td>
      `,a.querySelector(`.edit-entry`).addEventListener(`click`,()=>{y(a,e)}),a.querySelector(`.delete-entry`).addEventListener(`click`,()=>{window.APP._deleteEntry(e.id)}),t.appendChild(a)}),n.appendChild(e)}return e}function y(e,t){let n=e.children[0],r=e.children[2],i=`<input type="date" class="inline-edit" value="${t.date}" data-field="date" />`,a=`<input type="number" class="inline-edit" value="${t.minutes}" min="1" data-field="minutes" />`;n.innerHTML=i,r.innerHTML=a;let o=e.children[3];o.innerHTML=`
    <div class="actions">
      <button class="btn btn-sm btn-primary save-edit" data-id="${t.id}">Save</button>
      <button class="btn btn-sm btn-ghost cancel-edit">Cancel</button>
    </div>
  `;let s=o.querySelector(`.save-edit`),c=o.querySelector(`.cancel-edit`);s.addEventListener(`click`,()=>{n.querySelector(`input`).value,parseInt((n.querySelector(`input`).dataset.field,r.querySelector(`input`).value));let e=n.querySelector(`input`).value,i=parseInt(r.querySelector(`input`).value);e&&i>0&&window.APP._updateEntry(t.id,{date:e,minutes:i})}),c.addEventListener(`click`,()=>u()),n.querySelector(`input`).focus()}function b(){let e=document.createElement(`div`);e.className=`card`,e.innerHTML=`
    <div class="card-title" style="justify-content:space-between;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Weekly View
      </div>
      <div class="week-nav">
        <button id="weekPrev">&lt;</button>
        <span id="weekLabel"></span>
        <button id="weekNext">&gt;</button>
        <button id="weekToday" class="btn btn-sm btn-ghost" style="padding:2px 8px;">Today</button>
      </div>
    </div>
    <div id="weekGrid"></div>
  `;let t=x(new Date);n(t);function n(n){t=n;let a=new Date(n);a.setDate(a.getDate()+6);let o=e.querySelector(`#weekLabel`);o.textContent=`${S(n)} – ${S(a)}`;let s=e.querySelector(`#weekGrid`);s.className=`week-grid`,s.innerHTML=``;let c=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],d=l();for(let e=0;e<7;e++){let t=new Date(n);t.setDate(t.getDate()+e);let i=t.toISOString().slice(0,10),a=i===d,o=document.createElement(`div`);o.className=`week-day-header`,o.textContent=`${c[e]} ${t.getDate()}`,s.appendChild(o);let l=document.createElement(`div`);l.className=`week-day-cell${a?` today`:``}`;let u=r.entries.filter(e=>e.date===i),f=u.reduce((e,t)=>e+t.minutes,0),p=`<div class="week-day-label">${a?`Today`:t.getDate()+`.`+(t.getMonth()+1)}</div>`;f>0&&(p+=`<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">${f} min</div>`),u.forEach(e=>{let t=r.projects.find(t=>t.name===e.project);p+=`<div class="week-entry" style="border-left-color:${t?t.color:`#ccc`}" data-entry-id="${e.id}">
          ${D(e.project)} <span class="week-entry-time">${e.minutes}m</span>
        </div>`}),u.length===0&&f===0&&(p+=`<div style="font-size:11px;color:var(--text-secondary);text-align:center;padding:20px 0;">—</div>`),l.innerHTML=p,s.appendChild(l)}s.querySelectorAll(`.week-entry`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseFloat(e.dataset.entryId);r.entries.find(e=>e.id===t)&&(i=`entries`,u())})})}return e.querySelector(`#weekPrev`).addEventListener(`click`,()=>{let e=new Date(t);e.setDate(e.getDate()-7),n(e)}),e.querySelector(`#weekNext`).addEventListener(`click`,()=>{let e=new Date(t);e.setDate(e.getDate()+7),n(e)}),e.querySelector(`#weekToday`).addEventListener(`click`,()=>{n(x(new Date))}),e}function x(e){let t=new Date(e),n=t.getDay(),r=(n===0?-6:1)-n;return t.setDate(t.getDate()+r),t.setHours(0,0,0,0),t}function S(e){return`${[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`][e.getMonth()]} ${e.getDate()}`}function C(){let e=document.createElement(`div`);return e.className=`card`,e.innerHTML=`
    <div class="card-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Report
    </div>
    <div class="date-inputs" style="margin-bottom:16px;">
      <div class="form-group">
        <label for="reportFrom">From</label>
        <input type="date" id="reportFrom" value="${l()}" />
      </div>
      <div class="form-group">
        <label for="reportTo">To</label>
        <input type="date" id="reportTo" value="${l()}" />
      </div>
      <div class="form-group" style="justify-content:flex-end;">
        <label>&nbsp;</label>
        <button class="btn btn-primary" id="generateReport">Generate</button>
      </div>
    </div>
    <div id="reportChart" style="margin-bottom:16px;"></div>
    <div id="reportContent"></div>
  `,e.querySelector(`#generateReport`).addEventListener(`click`,w),e.querySelector(`#reportFrom`).addEventListener(`keydown`,e=>{e.key===`Enter`&&w()}),e.querySelector(`#reportTo`).addEventListener(`keydown`,e=>{e.key===`Enter`&&w()}),e}function w(){let e=document.getElementById(`reportFrom`).value,t=document.getElementById(`reportTo`).value;if(!e||!t)return;let n=window.APP.report({from:e,to:t}),i=document.getElementById(`reportContent`),a=document.getElementById(`reportChart`);if(n.projects.length>0){let e=Math.max(...n.projects.map(e=>e.minutes),1),t=`<div class="chart-bar-container">`;n.projects.forEach(n=>{let i=r.projects.find(e=>e.name===n.name),a=i?i.color:`#3b82f6`,o=Math.max(n.minutes/e*100,2);t+=`
        <div class="chart-bar-wrapper">
          <div class="chart-value">${n.minutes}m</div>
          <div class="chart-bar" style="height:${o}px;background:${a};" title="${n.name}: ${n.minutes} min, $${c(n.amount)}"></div>
          <div class="chart-label" title="${n.name}">${D(n.name)}</div>
        </div>
      `}),t+=`</div>`,a.innerHTML=t}else a.innerHTML=``;if(n.projects.length===0)i.innerHTML=`
      <div class="empty-state">
        <p>No data for this date range.</p>
      </div>
    `;else{let a=`
      <table>
        <thead>
          <tr><th>Project</th><th>Minutes</th><th style="text-align:right">Amount</th></tr>
        </thead>
        <tbody>
    `;n.projects.forEach(e=>{let t=r.projects.find(t=>t.name===e.name),n=t?t.color:`#ccc`;a+=`
        <tr>
          <td><span class="project-dot" style="background:${n}"></span>${D(e.name)}</td>
          <td class="minutes">${e.minutes}</td>
          <td class="amount" style="text-align:right">$${c(e.amount)}</td>
        </tr>
      `}),a+=`</tbody></table>`,a+=`
      <div class="report-total">
        <div>
          <div class="report-total-label">Total</div>
          <div class="report-total-sub">${n.total_minutes} minutes logged</div>
        </div>
        <div style="text-align:right;">
          <div class="report-total-value">$${c(n.total_amount)}</div>
          <div class="report-total-sub">billed amount</div>
        </div>
      </div>
    `,a+=`
      <div style="margin-top:16px;text-align:right;">
        <button class="btn btn-primary" id="exportCsv">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>
    `,i.innerHTML=a,document.getElementById(`exportCsv`).addEventListener(`click`,()=>{let n=window.APP.csv({from:e,to:t}),r=new Blob([n],{type:`text/csv`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`timetrack-report-${e}-to-${t}.csv`,a.click(),URL.revokeObjectURL(i),E(`CSV exported`)})}}var T=null;function E(e){T&&T.remove(),T=document.createElement(`div`),T.className=`toast`,T.textContent=e,document.body.appendChild(T),setTimeout(()=>{T&&T.remove()},2500)}function D(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}u();