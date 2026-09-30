(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`billable.v1`,t=[`#3455e0`,`#0d9488`,`#d97706`,`#7c3aed`,`#db2777`,`#059669`,`#dc2626`,`#2563eb`,`#c026d3`,`#475569`];function n(){return{projects:[],entries:[],timer:null,seq:1}}function r(){try{let t=localStorage.getItem(e);if(t){let e=JSON.parse(t);if(e&&Array.isArray(e.projects)&&Array.isArray(e.entries))return e.seq=e.seq||Math.max(1,...e.projects.map(e=>e.id||0),...e.entries.map(e=>e.id||0))+1,e}}catch{}return n()}var i=r(),a=`track`,o={from:v(),to:_()},s=null,c=null,l=null;function u(){localStorage.setItem(e,JSON.stringify(i))}function d(){return i.seq++}function f(e,t){let n=e*t*100/60;return Math.round(n+1e-7)}function p(e,t){let n=new Map;for(let e of i.projects)n.set(e.id,{minutes:0});for(let r of i.entries)if(r.date>=e&&r.date<=t){let e=n.get(r.projectId);e&&(e.minutes+=r.minutes)}let r=[];for(let e of i.projects){let t=n.get(e.id);if(t&&t.minutes>0){let n=f(t.minutes,e.rate);r.push({id:e.id,name:e.name,color:e.color,rate:e.rate,minutes:t.minutes,cents:n,amount:n/100})}}return{projects:r,total_minutes:r.reduce((e,t)=>e+t.minutes,0),total_amount:r.reduce((e,t)=>e+t.amount,0)}}function m(e){return e=String(e),/[",\n;]/.test(e)?`"`+e.replace(/"/g,`""`)+`"`:e}function h(e,t){let n=p(e,t),r=[`name,minutes,amount`];for(let e of n.projects)r.push(`${m(e.name)},${e.minutes},${e.cents===void 0?e.amount.toFixed(2):(e.cents/100).toFixed(2)}`);let i=n.projects.reduce((e,t)=>e+(t.cents===void 0?Math.round(t.amount*100):t.cents),0);return r.push(`TOTAL,${n.total_minutes},${(i/100).toFixed(2)}`),r.join(`
`)}function g(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function _(){return g(new Date)}function v(){let e=new Date;return g(new Date(e.getFullYear(),e.getMonth(),1))}function y(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function b(e){return y(e).toLocaleDateString(`en-US`,{weekday:`long`,month:`short`,day:`numeric`})}function x(e){return y(e).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`})}function S(e){let t=e<0?`-`:``,n=Math.abs(e),r=Math.floor(n/100),i=String(n%100).padStart(2,`0`);return`${t}$${r.toLocaleString(`en-US`)}.${i}`}function C(e){e=Math.round(e);let t=Math.floor(e/60),n=e%60;return t===0?`${n}m`:n===0?`${t}h`:`${t}h ${String(n).padStart(2,`0`)}m`}function w(e){let t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return`${n}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`}function T(e){if(e=String(e||``).trim().toLowerCase().replace(`,`,`.`),!e)return NaN;let t=e.match(/^(\d+(?:\.\d+)?)\s*h(?:\s*(\d+)\s*m?)?$/);return t?Math.round(parseFloat(t[1])*60)+(t[2]?parseInt(t[2],10):0):(t=e.match(/^(\d+(?:\.\d+)?)\s*m$/),t?Math.round(parseFloat(t[1])):(t=e.match(/^(\d+):(\d{1,2})$/),t?parseInt(t[1],10)*60+parseInt(t[2],10):(t=e.match(/^(\d+(?:\.\d+)?)$/),t?Math.round(parseFloat(t[1])):NaN)))}function E(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function D(e){return i.projects.find(t=>t.name===e)}function O({name:e,rate:n,color:r}){e=String(e||``).trim()||`Untitled project`,n=Number(n),(!isFinite(n)||n<0)&&(n=0);let a={id:d(),name:e,rate:n,color:r||t[i.projects.length%t.length],createdAt:Date.now()};return i.projects.push(a),u(),a}function k({project:e,date:t,minutes:n,note:r}){let a=D(e);a||=O({name:e,rate:0});let o=String(t||_()).slice(0,10),s=Math.round(Number(n));(!isFinite(s)||s<0)&&(s=0);let c={id:d(),projectId:a.id,date:o,minutes:s,note:String(r||``).trim(),createdAt:Date.now()};return i.entries.push(c),u(),c}function A(e,t){let n=i.entries.find(t=>t.id===e);n&&(t.projectId!==void 0&&(n.projectId=t.projectId),t.date!==void 0&&(n.date=t.date),t.minutes!==void 0&&(n.minutes=Math.max(0,Math.round(Number(t.minutes)||0))),t.note!==void 0&&(n.note=String(t.note).trim()),u())}function j(e){i.entries=i.entries.filter(t=>t.id!==e),u()}function M(e,t){let n=i.projects.find(t=>t.id===e);if(n){if(t.name!==void 0&&(n.name=String(t.name).trim()||n.name),t.rate!==void 0){let e=Number(t.rate);isFinite(e)&&e>=0&&(n.rate=e)}t.color!==void 0&&(n.color=t.color),u()}}function N(e){i.projects=i.projects.filter(t=>t.id!==e),i.entries=i.entries.filter(t=>t.projectId!==e),i.timer&&i.timer.projectId===e&&(i.timer=null),u()}function P(){i=n(),s=null,c=null,u()}window.APP={reset(){P(),K()},addProject(e){let t=O(e||{});return K(),{name:t.name,rate:t.rate}},addEntry(e){let t=k(e||{});return K(),t},report(e){let t=p(String(e&&e.from||``),String(e&&e.to||``));return{projects:t.projects.map(e=>({name:e.name,minutes:e.minutes,amount:e.amount})),total_minutes:t.total_minutes,total_amount:t.total_amount}},csv(e){return h(String(e&&e.from||``),String(e&&e.to||``))}};var F={clock:(e=18)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 1.8"/></svg>`,list:(e=18)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>`,chart:(e=18)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/></svg>`,folder:(e=18)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.4h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,play:(e=16)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>`,stop:(e=16)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="7" width="10" height="10" rx="1.5"/></svg>`,pencil:(e=15)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>`,trash:(e=15)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>`,download:(e=16)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16"/></svg>`,plus:(e=16)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`};function I(e){return i.projects.length?i.projects.map(t=>`<option value="${t.id}" ${e===t.id?`selected`:``}>${E(t.name)}</option>`).join(``):`<option value="">No projects yet</option>`}function L(){let e=p(v(),_());return`
  <aside class="sidebar">
    <div class="brand">
      <svg class="mark" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#3455e0"/><circle cx="16" cy="17" r="8.5" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M16 12.5V17l3.4 2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4.5h8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>
      <div><div class="name">Billable</div><div class="sub">Time &amp; billing</div></div>
    </div>
    <button class="nav-item ${a===`track`?`active`:``}" data-action="tab" data-tab="track">${F.clock()} Track</button>
    <button class="nav-item ${a===`projects`?`active`:``}" data-action="tab" data-tab="projects">${F.folder()} Projects</button>
    <button class="nav-item ${a===`report`?`active`:``}" data-action="tab" data-tab="report">${F.chart()} Report</button>
    <div class="side-foot">
      <div class="label">This month</div>
      <div class="value">${S(Math.round(e.total_amount*100))}</div>
      <div class="hint">${C(e.total_minutes)} tracked</div>
    </div>
  </aside>`}function R(){return`
  <div class="topbar">
    <svg class="mark" width="24" height="24" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#3455e0"/><circle cx="16" cy="17" r="8.5" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M16 12.5V17l3.4 2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4.5h8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>
    <div class="name" style="font-weight:700;font-size:15px">Billable</div>
  </div>`}function z(){let e=(e,t,n)=>`
    <button class="nav-item ${a===e?`active`:``}" data-action="tab" data-tab="${e}">${t(20)}${n}</button>`;return`<nav class="bottom-nav">${e(`track`,F.clock,`Track`)}${e(`projects`,F.folder,`Projects`)}${e(`report`,F.chart,`Report`)}</nav>`}function B(){let e=new Date,t=new Date(e);t.setDate(e.getDate()-(e.getDay()+6)%7);let n=[],r=new Map;for(let e of i.entries)r.set(e.date,(r.get(e.date)||0)+e.minutes);let a=0;for(let e=0;e<7;e++){let i=new Date(t);i.setDate(t.getDate()+e);let o=g(i),s=r.get(o)||0;a=Math.max(a,s),n.push({key:o,mins:s,label:[`M`,`T`,`W`,`T`,`F`,`S`,`S`][e],isToday:o===_()})}return`
  <div class="card">
    <h2>This week <span style="float:right;text-transform:none;letter-spacing:0;font-weight:600">${C(n.reduce((e,t)=>e+t.mins,0))}</span></h2>
    <div class="week">
      ${n.map(e=>`
        <div class="day ${e.mins>0?`has`:``} ${e.isToday?`today`:``}" title="${b(e.key)}: ${C(e.mins)}">
          <div class="bar-wrap"><div class="bar" style="height:${a>0?Math.max(4,Math.round(e.mins/a*70)):4}px"></div></div>
          <div class="d-total">${e.mins>0?C(e.mins):``}</div>
          <div class="d-label">${e.label}</div>
        </div>`).join(``)}
    </div>
  </div>`}function V(){if(!i.projects.length)return``;let e=p(v(),_()),t=new Map(e.projects.map(e=>[e.id,e]));return`<div class="chips">${i.projects.map(e=>{let n=t.get(e.id);return`<span class="chip"><span class="cdot" style="background:${e.color}"></span>${E(e.name)}<span class="amt">${n?C(n.minutes)+` · `+S(n.cents):`—`}</span></span>`}).join(``)}</div>`}function H(){let e=i.timer,t=[...i.entries].sort((e,t)=>t.date.localeCompare(e.date)||t.id-e.id),n=new Map;for(let e of t)n.has(e.date)||n.set(e.date,[]),n.get(e.date).push(e);let r=new Map(i.projects.map(e=>[e.id,e])),a=e=>{let t=r.get(e.projectId);return s===e.id?`
      <div class="entry-row" data-id="${e.id}">
        <form class="form-row" style="flex:1" data-form="edit-entry" data-id="${e.id}">
          <select name="projectId" class="field" style="flex:1 1 130px">${I(e.projectId)}</select>
          <input type="date" name="date" value="${e.date}" style="width:140px;flex:none">
          <input type="text" name="minutes" value="${e.minutes}" placeholder="90 or 1h 30" style="width:92px;flex:none" required>
          <input type="text" name="note" value="${E(e.note)}" placeholder="Note (optional)" style="flex:1 1 120px">
          <button class="btn primary small" type="submit">Save</button>
          <button class="btn small" type="button" data-action="cancel-edit-entry">Cancel</button>
        </form>
      </div>`:`
    <div class="entry-row" data-id="${e.id}">
      <span class="cdot" style="background:${t?t.color:`#ccc`}"></span>
      <div class="who">
        <div class="pname">${E(t?t.name:`Unknown project`)}</div>
        ${e.note?`<div class="note">${E(e.note)}</div>`:``}
      </div>
      <div class="dur">${C(e.minutes)}</div>
      <div class="acts">
        <button class="icon-btn" title="Edit entry" data-action="edit-entry" data-id="${e.id}">${F.pencil()}</button>
        <button class="icon-btn del" title="Delete entry" data-action="delete-entry" data-id="${e.id}">${F.trash()}</button>
      </div>
    </div>`},o=[...n.entries()].map(([e,t])=>{let n=t.reduce((e,t)=>e+t.minutes,0);return`
    <div class="day-group">
      <div class="day-head"><span>${e===_()?`Today · `:``}${b(e)}</span><span class="t">${C(n)}</span></div>
      ${t.map(a).join(``)}
    </div>`}).join(``);return`
  ${R()}
  <div class="page-head">
    <div><h1>Track time</h1><div class="desc">Log work with a timer or quick entry — everything bills automatically.</div></div>
  </div>

  <div class="card">
    <h2>Timer</h2>
    <div class="timer-card">
      <div class="timer-clock ${e?`running`:``}" id="timer-clock">${e?w(Date.now()-e.startedAt):`0:00:00`}</div>
      <form class="fields" data-form="timer" id="timer-form">
        <div class="field" style="flex:1 1 160px"><label>Project</label><select name="projectId">${I(e?e.projectId:(i.projects[0]||{}).id)}</select></div>
        <div class="field" style="flex:1 1 160px"><label>What are you working on?</label><input type="text" name="note" placeholder="Optional note" value="${e?E(e.note||``):``}"></div>
        ${e?`<button class="btn stop" type="submit" style="align-self:flex-end">${F.stop()} Stop timer</button><span class="timer-status" style="align-self:flex-end;padding-bottom:9px"><span class="dot-live"></span>Recording</span>`:`<button class="btn primary" type="submit" style="align-self:flex-end" ${i.projects.length?``:`disabled`}>${F.play()} Start timer</button>`}
      </form>
    </div>
  </div>

  <div class="card">
    <h2>Quick entry</h2>
    <form class="form-row" data-form="quick" id="quick-form">
      <div class="field grow" style="flex:1.4 1 150px"><label>Project</label><select name="projectId">${I((i.projects[0]||{}).id)}</select></div>
      <div class="field" style="flex:0 1 150px"><label>Date</label><input type="date" name="date" value="${_()}"></div>
      <div class="field" style="flex:0 1 110px"><label>Duration</label><input type="text" name="minutes" placeholder="1h 30" autocomplete="off" required></div>
      <div class="field grow"><label>Note</label><input type="text" name="note" placeholder="Optional note" autocomplete="off"></div>
      <button class="btn primary" type="submit">${F.plus()} Add</button>
    </form>
    <div style="font-size:12px;color:var(--faint);margin-top:8px">Tip: type durations like <b>90</b>, <b>1h 30</b>, <b>45m</b> or <b>1:30</b>. Press Enter to save and keep typing.</div>
  </div>

  ${B()}

  ${i.projects.length?`
  <div class="card">
    <h2>Projects this month</h2>
    ${V()}
  </div>`:``}

  <div class="card">
    <h2>Time log</h2>
    ${t.length?o:`<div class="empty"><div class="big">No time logged yet</div>Add your first project, then start the timer or use quick entry above.</div>`}
  </div>`}function U(){let e=i.projects.map(e=>{let n=i.entries.filter(t=>t.projectId===e.id).reduce((e,t)=>e+t.minutes,0),r=f(n,e.rate);return c===e.id?`
      <div class="proj-row">
        <form class="form-row" style="flex:1;align-items:center" data-form="edit-project" data-id="${e.id}">
          <input type="text" name="name" value="${E(e.name)}" style="flex:1 1 140px" required>
          <input type="number" name="rate" value="${e.rate}" min="0" step="0.01" style="width:96px" required>
          <div class="swatches">${t.map(t=>`<button type="button" class="swatch ${t===e.color?`sel`:``}" style="background:${t}" data-action="pick-color" data-color="${t}"></button>`).join(``)}</div>
          <button class="btn primary small" type="submit">Save</button>
          <button class="btn small" type="button" data-action="cancel-edit-project">Cancel</button>
        </form>
      </div>`:`
    <div class="proj-row">
      <span class="cdot" style="background:${e.color}"></span>
      <div class="info">
        <div class="nm">${E(e.name)}</div>
        <div class="meta">${S(e.rate*100).replace(`.00`,``).replace(`$`,`$`)+`/h`} · ${C(n)} all-time · ${S(r)}</div>
      </div>
      <div class="acts">
        <button class="icon-btn" title="Edit project" data-action="edit-project" data-id="${e.id}">${F.pencil()}</button>
        <button class="icon-btn del" title="Delete project" data-action="delete-project" data-id="${e.id}">${F.trash()}</button>
      </div>
    </div>`}).join(``);return`
  ${R()}
  <div class="page-head">
    <div><h1>Projects</h1><div class="desc">Each project has an hourly rate used for all billing.</div></div>
  </div>

  <div class="card">
    <h2>New project</h2>
    <form class="form-row" data-form="add-project">
      <div class="field grow"><label>Name</label><input type="text" name="name" placeholder="e.g. Website redesign" required></div>
      <div class="field" style="flex:0 1 140px"><label>Hourly rate ($)</label><input type="number" name="rate" placeholder="85" min="0" step="0.01" required></div>
      <button class="btn primary" type="submit">${F.plus()} Add project</button>
    </form>
  </div>

  <div class="card">
    <h2>All projects</h2>
    ${i.projects.length?e:`<div class="empty"><div class="big">No projects yet</div>Create your first project above to start tracking time.</div>`}
  </div>`}function W(e){let t=e.total_minutes;if(!t)return``;let n=15.9155,r=25;return`
  <div class="donut-wrap">
    <div class="donut">
      <svg width="150" height="150" viewBox="0 0 60 60">
        <circle r="${n}" cx="30" cy="30" fill="none" stroke="#edeff4" stroke-width="7.5"/>
        ${e.projects.map(e=>{let i=e.minutes/t,a=`<circle r="${n}" cx="30" cy="30" fill="none" stroke="${e.color}" stroke-width="7.5" stroke-dasharray="${(i*100).toFixed(3)} ${(100-i*100).toFixed(3)}" stroke-dashoffset="${r.toFixed(3)}"/>`;return r-=i*100,a}).join(``)}
      </svg>
      <div class="center"><div class="big">${C(t)}</div><div class="small">tracked</div></div>
    </div>
    <div class="legend">
      ${e.projects.map(e=>`
        <div class="li"><span class="cdot" style="background:${e.color}"></span><span class="nm">${E(e.name)}</span><span class="pc">${Math.round(e.minutes/t*100)}%</span></div>`).join(``)}
    </div>
  </div>`}function G(){let{from:e,to:t}=o,n=e&&t&&e<=t,r=n?p(e,t):{projects:[],total_minutes:0,total_amount:0},a=Math.max(1,...r.projects.map(e=>e.minutes)),s=i.entries.filter(n=>n.date>=e&&n.date<=t).length,c=(e,t,n)=>`<button class="preset ${o.from===t&&o.to===n?`active`:``}" data-action="preset" data-from="${t}" data-to="${n}">${e}</button>`,l=new Date;l.setDate(l.getDate()-29);let u=new Date;u.setDate(u.getDate()-(u.getDay()+6)%7);let d=r.projects.map(e=>`
    <tr>
      <td><div class="p-cell"><span class="cdot" style="background:${e.color}"></span><span class="nm">${E(e.name)}</span><span class="rate rate-col">@ ${S(e.rate*100).replace(`.00`,``)}/h</span></div></td>
      <td class="num">${C(e.minutes)}</td>
      <td class="share-cell"><div class="share-bar"><i style="width:${Math.round(e.minutes/a*100)}%;background:${e.color}"></i></div></td>
      <td class="num">${S(e.cents)}</td>
    </tr>`).join(``);return`
  ${R()}
  <div class="page-head">
    <div><h1>Report</h1><div class="desc">Billable summary for a date range — invoice-ready.</div></div>
    <button class="btn primary" data-action="download-csv" ${r.projects.length?``:`disabled`}>${F.download()} Export CSV</button>
  </div>

  <div class="card">
    <div class="range-bar">
      <div class="field"><label>From</label><input type="date" name="from" data-role="report-from" value="${e}"></div>
      <div class="field"><label>To</label><input type="date" name="to" data-role="report-to" value="${t}"></div>
      <div class="presets" style="margin-left:auto;align-self:center">
        ${c(`This week`,g(u),_())}
        ${c(`This month`,v(),_())}
        ${c(`Last 30 days`,g(l),_())}
      </div>
    </div>
  </div>

  ${n?`
  <div class="stat-cards">
    <div class="stat"><div class="k">Total time</div><div class="v">${C(r.total_minutes)}</div><div class="s">${r.total_minutes} min</div></div>
    <div class="stat"><div class="k">Total amount</div><div class="v">${S(Math.round(r.total_amount*100))}</div><div class="s">${r.projects.length} project${r.projects.length===1?``:`s`} billed</div></div>
    <div class="stat"><div class="k">Entries</div><div class="v">${s}</div><div class="s">${x(e)} – ${x(t)}</div></div>
  </div>

  <div class="report-grid">
    <div class="card" style="margin-bottom:0">
      <h2>By project</h2>
      ${r.projects.length?`
      <table class="tbl">
        <thead><tr><th>Project</th><th class="num">Time</th><th class="share-cell">Share</th><th class="num">Amount</th></tr></thead>
        <tbody>
          ${d}
          <tr class="total-row"><td>Total</td><td class="num">${C(r.total_minutes)}</td><td class="share-cell"></td><td class="num">${S(Math.round(r.total_amount*100))}</td></tr>
        </tbody>
      </table>`:`<div class="empty"><div class="big">Nothing in this range</div>No time entries between ${x(e)} and ${x(t)}.</div>`}
    </div>
    <div class="card" style="margin-bottom:0">
      <h2>Time split</h2>
      ${r.projects.length?W(r):`<div class="empty">Add entries to see the split.</div>`}
    </div>
  </div>`:`
  <div class="card"><div class="empty"><div class="big">Invalid date range</div>“From” must be on or before “To”.</div></div>`}`}function K(){let e=document.getElementById(`app`);e.innerHTML=`
    ${L()}
    <main class="main">${a===`track`?H():a===`projects`?U():G()}</main>
    ${z()}
  `,J()}var q=null;function J(){if(q&&=(clearInterval(q),null),!i.timer)return;let e=()=>document.getElementById(`timer-clock`),t=()=>{let t=e();t&&i.timer&&(t.textContent=w(Date.now()-i.timer.startedAt))};t(),q=setInterval(t,1e3)}function Y(e){let t=document.querySelector(`.toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`toast`,n.textContent=e,document.body.appendChild(n),clearTimeout(l),l=setTimeout(()=>n.remove(),2600)}function X(){let e=h(o.from,o.to),t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`billable-${o.from}-to-${o.to}.csv`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),4e3),Y(`CSV exported`)}document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.action;if(n===`tab`)a=t.dataset.tab,s=null,c=null,K(),window.scrollTo(0,0);else if(n===`edit-entry`)s=Number(t.dataset.id),c=null,K();else if(n===`cancel-edit-entry`)s=null,K();else if(n===`delete-entry`)i.entries.find(e=>e.id===Number(t.dataset.id)),j(Number(t.dataset.id)),K(),Y(`Entry deleted`);else if(n===`edit-project`)c=Number(t.dataset.id),s=null,K();else if(n===`cancel-edit-project`)c=null,K();else if(n===`delete-project`){let e=i.projects.find(e=>e.id===Number(t.dataset.id));e&&confirm(`Delete project “${e.name}” and all its time entries?`)&&(N(e.id),K(),Y(`Project deleted`))}else if(n===`pick-color`){let e=t.closest(`form`);e.querySelectorAll(`.swatch`).forEach(e=>e.classList.remove(`sel`)),t.classList.add(`sel`),e.dataset.color=t.dataset.color}else n===`preset`?(o={from:t.dataset.from,to:t.dataset.to},K()):n===`download-csv`&&X()}),document.addEventListener(`change`,e=>{let t=e.target;t.dataset.role===`report-from`&&(o.from=t.value,K()),t.dataset.role===`report-to`&&(o.to=t.value,K())}),document.addEventListener(`submit`,e=>{let t=e.target.closest(`form[data-form]`);if(!t)return;e.preventDefault();let n=t.dataset.form,r=new FormData(t);if(n===`quick`){let e=T(r.get(`minutes`));if(!isFinite(e)){Y(`Could not read the duration`),t.querySelector(`[name=minutes]`).focus();return}let n=Number(r.get(`projectId`)),a=i.projects.find(e=>e.id===n);if(!a){Y(`Create a project first`);return}let o=k({projectIdPlaceholder:!0,project:a.name,date:r.get(`date`),minutes:e,note:r.get(`note`)});K(),Y(`Added ${C(o.minutes)} to ${a.name}`);let s=document.getElementById(`quick-form`);if(s){let e=s.querySelector(`[name=minutes]`);e&&e.focus()}}else if(n===`timer`){if(i.timer){let e=i.timer,t=Math.round((Date.now()-e.startedAt)/6e4),n=i.projects.find(t=>t.id===e.projectId);i.timer=null,t>0&&n?(k({project:n.name,date:_(),minutes:t,note:e.note}),K(),Y(`Logged ${C(t)} to ${n.name}`)):(u(),K(),Y(`Under a minute — nothing logged`))}else{let e=Number(r.get(`projectId`)),t=i.projects.find(t=>t.id===e);if(!t){Y(`Create a project first`);return}i.timer={projectId:t.id,note:String(r.get(`note`)||``).trim(),startedAt:Date.now()},u(),K()}}else if(n===`add-project`){let e=O({name:r.get(`name`),rate:r.get(`rate`)});K(),Y(`Project “${e.name}” created`)}else n===`edit-entry`?(A(Number(t.dataset.id),{projectId:Number(r.get(`projectId`)),date:r.get(`date`),minutes:T(r.get(`minutes`)),note:r.get(`note`)}),s=null,K(),Y(`Entry updated`)):n===`edit-project`&&(M(Number(t.dataset.id),{name:r.get(`name`),rate:r.get(`rate`),color:t.dataset.color}),c=null,K(),Y(`Project updated`))}),K();