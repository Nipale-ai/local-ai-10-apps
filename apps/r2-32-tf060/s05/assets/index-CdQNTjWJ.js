(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`tempo.v1`,t=[`#2563eb`,`#059669`,`#d97706`,`#dc2626`,`#7c3aed`,`#0891b2`,`#db2777`,`#65a30d`,`#9333ea`,`#0d9488`];function n(){return{projects:[],entries:[]}}function r(){let e=[{id:s(),name:`Acme Website`,rate:95,color:t[0]},{id:s(),name:`Design System`,rate:120,color:t[1]},{id:s(),name:`Support Retainer`,rate:65,color:t[2]}],n=[],r=new Date;for(let t=20;t>=0;t--){let i=new Date(r);i.setDate(i.getDate()-t);let a=i.getDay();if(a===0||a===6)continue;let o=_(i),c=e[(t+a)%3];if(n.push({id:s(),projectId:c.id,date:o,minutes:60+(t*37+a*53)%240}),t%3==0){let r=e[(t+1)%3];n.push({id:s(),projectId:r.id,date:o,minutes:30+(t*17+a*7)%90})}}return{projects:e,entries:n,sample:!0}}function i(){try{let t=localStorage.getItem(e);if(!t)return r();let i=JSON.parse(t);return!i||!Array.isArray(i.projects)||!Array.isArray(i.entries)?n():i}catch{return n()}}var a=i(),o=0;function s(){return`id`+Date.now().toString(36)+(o++).toString(36)+Math.random().toString(36).slice(2,6)}function c(e,t){let n=Math.round(Number(t)*100);return Math.floor((e*n+30)/60)}function l(e,t){let n=String(e||``),r=String(t||``);n>r&&([n,r]=[r,n]);let i={};for(let e of a.entries)e.date>=n&&e.date<=r&&(i[e.projectId]=(i[e.projectId]||0)+e.minutes);let o=a.projects.map(e=>{let t=i[e.id]||0;return{name:e.name,minutes:t,amount:c(t,e.rate)/100}});return{projects:o,total_minutes:o.reduce((e,t)=>e+t.minutes,0),total_amount:o.reduce((e,t)=>e+Math.round(t.amount*100),0)/100}}function u(e,t){let n=l(e,t),r=e=>`"`+String(e).replace(/"/g,`""`)+`"`,i=[`name,minutes,amount`];for(let e of n.projects)i.push(`${r(e.name)},${e.minutes},${e.amount.toFixed(2)}`);return i.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),i.join(`
`)}function d(){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}var ee=0;function f(){clearTimeout(ee),ee=setTimeout(d,200)}window.addEventListener(`beforeunload`,d),document.addEventListener(`visibilitychange`,()=>{document.hidden&&d()});function p(e,n){let r=String(e??``).trim();if(!r)return null;let i=a.projects.find(e=>e.name===r);if(i)return i.rate=Number(n)||0,i;let o={id:s(),name:r,rate:Number(n)||0,color:t[a.projects.length%t.length]};return a.projects.push(o),o}function m(e,t,n){let r=String(e??``),i=String(t??``),o=Math.round(Number(n)||0);if(!r||!i||o<=0)return null;let c=a.projects.find(e=>e.name===r);c||=p(r,0);let l={id:s(),projectId:c.id,date:i,minutes:o};return a.entries.push(l),l}function te(e){a.entries=a.entries.filter(t=>t.id!==e)}function ne(e){a.entries=a.entries.filter(t=>t.projectId!==e),a.projects=a.projects.filter(t=>t.id!==e)}window.APP={reset(){a=n(),D={running:!1,startedAt:0,projectId:null,lastSeconds:0},q(),d(),I()},addProject({name:e,rate:t}={}){let n=p(e,t);return n&&(f(),I()),n?{id:n.id,name:n.name,rate:n.rate}:null},addEntry({project:e,date:t,minutes:n}={}){let r=m(e,t,n);return r&&(f(),I()),r?{id:r.id,project:re(r.projectId),date:r.date,minutes:r.minutes}:null},report(e={}){return l(e.from,e.to)},csv(e={}){return u(e.from,e.to)}};function re(e){let t=a.projects.find(t=>t.id===e);return t?t.name:``}function h(e){return a.projects.find(t=>t.id===e)}function g(){let e=new Date;return e.getFullYear()+`-`+String(e.getMonth()+1).padStart(2,`0`)+`-`+String(e.getDate()).padStart(2,`0`)}function _(e){return e.getFullYear()+`-`+String(e.getMonth()+1).padStart(2,`0`)+`-`+String(e.getDate()).padStart(2,`0`)}function v(e){let t=new Date(e+`T00:00:00`);return isNaN(t)?e:t.toLocaleDateString(`en-GB`,{weekday:`short`,day:`numeric`,month:`short`})}function y(e){let t=new Date(e+`T00:00:00`);return isNaN(t)?e:t.toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`})}function b(e){e=Math.round(e||0);let t=Math.floor(e/60),n=e%60;return t&&n?t+`h `+String(n).padStart(2,`0`)+`m`:t?t+`h`:n+`m`}function x(e){return(e/60).toFixed(2)+`h`}function S(e){return`$`+Number(e).toFixed(2)}function C(e){let t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60;return t+`:`+String(n).padStart(2,`0`)+`:`+String(r).padStart(2,`0`)}function w(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}var T=`log`,E=ie(),D={running:!1,startedAt:0,projectId:null,lastSeconds:0},O=null,k=100,A=null,j=null,M=``,N=``;function ie(){let e=new Date,t=new Date(e);return t.setDate(t.getDate()-29),{from:_(t),to:_(e)}}var P=document.getElementById(`app`),F=!1;function I(){F||(F=!0,setTimeout(()=>{F=!1,L()},0))}function L(){P&&(P.innerHTML=ae(),Te(),T===`log`?G():K(),Y())}function ae(){return`
  <div class="shell">
    <header class="topbar">
      <div class="brand">
        <span class="logo" aria-hidden="true">${R()}</span>
        <div class="brand-text">
          <h1>Tempo</h1>
          <span class="tagline">Time tracking &amp; billing</span>
        </div>
      </div>
      <nav class="tabs" role="tablist" aria-label="Views">
        <button class="tab ${T===`log`?`active`:``}" data-view="log" role="tab" aria-selected="${T===`log`}">Log</button>
        <button class="tab ${T===`report`?`active`:``}" data-view="report" role="tab" aria-selected="${T===`report`}">Report</button>
      </nav>
    </header>
    <main id="main" role="tabpanel">${a.sample?oe():``}${T===`log`?se():he()}</main>
    <footer class="foot">Data is stored locally in your browser.</footer>
  </div>
  <div class="toasts" id="toasts" aria-live="polite"></div>`}function oe(){return`
  <div class="banner" role="note">
    <span class="banner-text">You are viewing <strong>sample data</strong> so you can explore the app. Add your own projects and entries, or start fresh.</span>
    <button class="btn small" id="clear-sample" aria-label="Clear sample data and start fresh">Clear sample data</button>
  </div>`}function R(){return`<svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="30" height="30" rx="8" fill="#2563eb"/>
    <circle cx="16" cy="16" r="9" stroke="#fff" stroke-width="2"/>
    <path d="M16 10.5V16l3.5 2.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`}function se(){return`
  <section class="grid2">
    ${ce()}
    ${le()}
  </section>
  <section class="card">
    <div class="card-head">
      <h2>Last 7 days</h2>
      <span class="muted" id="week-total"></span>
    </div>
    <div class="chartbox" id="week-chart" aria-label="Minutes per day, last 7 days"></div>
  </section>
  <section class="card">
    <div class="card-head">
      <h2>Entries</h2>
      <span class="muted">${a.entries.length} total</span>
    </div>
    ${ue()}
    <div id="entries">${B()}</div>
  </section>
  <section class="card">
    <div class="card-head">
      <h2>Projects</h2>
      <span class="muted">${a.projects.length}</span>
    </div>
    <form class="proj-form" id="proj-form">
      <div class="fcol grow">
        <label for="p-name">Name</label>
        <input id="p-name" name="p-name" placeholder="e.g. Acme website" maxlength="80" autocomplete="off" />
      </div>
      <div class="fcol">
        <label for="p-rate">Rate / hour</label>
        <input id="p-rate" name="p-rate" type="number" min="0" step="0.01" inputmode="decimal" placeholder="85.00" />
      </div>
      <button class="btn" type="submit">Add project</button>
    </form>
    <div id="projects">${de()}</div>
  </section>`}function z(e){let t=a.projects.map(t=>`<option value="${w(t.id)}"${t.id===e?` selected`:``}>${w(t.name)}</option>`).join(``);return`<option value="" disabled${e?``:` selected`}>Choose a project…</option>`+t}function ce(){return`
  <section class="card timer-card">
    <h2>Timer</h2>
    <label for="timer-project">Project</label>
    <select id="timer-project">${z(D.projectId||(a.projects[0]?a.projects[0].id:``))}</select>
    <div class="clock" id="clock" role="timer" aria-label="Elapsed time">${C(D.running?J():D.lastSeconds)}</div>
    <button class="btn ${D.running?`danger`:`primary`}" id="timer-btn" aria-label="${D.running?`Stop timer`:`Start timer`}">${D.running?`Stop`:`Start`}</button>
    <p class="hint">Stop to log the elapsed time as an entry for today.</p>
  </section>`}function le(){return`
  <section class="card quick-card">
    <h2>Quick entry</h2>
    <form id="quick-form">
      <div class="fcol grow">
        <label for="q-project">Project</label>
        <select id="q-project">${z(a.projects[0]?a.projects[0].id:``)}</select>
      </div>
      <div class="frow">
        <div class="fcol">
          <label for="q-date">Date</label>
          <input type="date" id="q-date" value="${g()}" />
        </div>
        <div class="fcol">
          <label for="q-min">Minutes</label>
          <input type="number" id="q-min" min="1" max="1440" step="5" value="30" inputmode="numeric" />
        </div>
      </div>
      <button class="btn primary" type="submit">Add entry</button>
      <p class="hint">Press <kbd>N</kbd> to jump here · Enter adds and keeps focus</p>
    </form>
  </section>`}function ue(){if(!a.entries.length)return``;let e=[`<option value="">All projects</option>`];for(let t of a.projects)e.push(`<option value="${t.id}"${t.id===N?` selected`:``}>${w(t.name)}</option>`);return`<div class="entry-filters">
    <input class="entry-search" id="entry-search" type="search" placeholder="Search entries or dates" value="${w(M)}" aria-label="Search entries" />
    <select id="entry-project-filter" aria-label="Filter by project">${e.join(``)}</select>
  </div>`}function B(){if(!a.entries.length)return`<div class="empty-state">
      <span class="empty-icon" aria-hidden="true">${R()}</span>
      <p class="empty-title">No time logged yet</p>
      <p class="empty-sub">Start the timer, or add a quick entry above to get going.</p>
    </div>`;let e=[...a.entries].sort((e,t)=>e.date===t.date?0:e.date<t.date?1:-1),t=M.trim().toLowerCase(),n=N,r=e.filter(e=>{if(n&&e.projectId!==n)return!1;if(t){let n=h(e.projectId);if(!((n?n.name:``)+` `+e.date).toLowerCase().includes(t))return!1}return!0}),i=t!==``||n!==``;if(!r.length)return`<div class="empty-state">
      <p class="empty-title">No matching entries</p>
      <p class="empty-sub">Nothing matches your filter. Try a different search or project.</p>
    </div>`;let o=r.slice(0,k),s=new Map;for(let e of o)s.has(e.date)||s.set(e.date,[]),s.get(e.date).push(e);let l=``;i&&(l+=`<div class="filter-note muted">Showing ${r.length} of ${e.length} entries</div>`);for(let[e,t]of s){let n=0,r=0;for(let e of t){let t=h(e.projectId);n+=e.minutes,r+=c(e.minutes,t?t.rate:0)}l+=`<div class="day-head"><span>${v(e)}</span><span class="muted">${b(n)} · ${S(r/100)}</span></div>`;for(let e of t){let t=h(e.projectId),n=c(e.minutes,t?t.rate:0)/100,r=O&&O.kind===`entry`&&O.id===e.id;if(A===e.id){l+=`<div class="entry edit-row">
          <span class="dot" style="background:${t?t.color:`#94a3b8`}"></span>
          <select class="e-edit" id="edit-project">${z(e.projectId)}</select>
          <input class="e-edit" type="date" id="edit-date" value="${w(e.date)}" />
          <input class="e-edit" type="number" id="edit-min" min="1" max="1440" step="5" value="${e.minutes}" aria-label="Minutes" />
          <button class="btn small primary" data-act="save-entry" data-id="${e.id}">Save</button>
          <button class="btn small" data-act="cancel-edit" aria-label="Cancel editing">Cancel</button>
        </div>`;continue}l+=`<div class="entry">
        <span class="dot" style="background:${t?t.color:`#94a3b8`}" aria-hidden="true"></span>
        <span class="e-name" title="${t?w(t.name):``}">${t?w(t.name):`—`}</span>
        <span class="e-min">${b(e.minutes)}</span>
        <span class="e-amt">${S(n)}</span>
        <button class="icon-btn" data-act="edit-entry" data-id="${e.id}" aria-label="Edit entry" title="Edit entry">${H()}</button>
        <button class="icon-btn ${r?`armed`:``}" data-act="del-entry" data-id="${e.id}" aria-label="${r?`Confirm delete entry`:`Delete entry`}" title="${r?`Click again to confirm`:`Delete entry`}">${U()}</button>
      </div>`}}return r.length>o.length&&(l+=`<button class="btn ghost" id="more-entries" aria-label="Show more entries">Show ${Math.min(200,r.length-o.length)} more of ${r.length-o.length} hidden</button>`),l}function V(){let e=document.getElementById(`entries`);e&&(e.innerHTML=B())}function de(){return a.projects.length?a.projects.map(e=>{let t=0;for(let n of a.entries)n.projectId===e.id&&(t+=n.minutes);let n=c(t,e.rate),r=O&&O.kind===`project`&&fe(O,e.id);return j===e.id?`<div class="proj edit-row">
          <span class="dot" style="background:${e.color}"></span>
          <input class="p-edit" id="ep-name" value="${w(e.name)}" maxlength="80" aria-label="Project name" />
          <input class="p-edit" type="number" id="ep-rate" min="0" step="0.01" inputmode="decimal" value="${e.rate}" aria-label="Rate per hour" />
          <button class="btn small primary" data-act="save-project" data-id="${e.id}">Save</button>
          <button class="btn small" data-act="cancel-pedit" aria-label="Cancel editing">Cancel</button>
        </div>`:`<div class="proj">
        <span class="dot" style="background:${e.color}" aria-hidden="true"></span>
        <div class="p-info">
          <span class="p-name">${w(e.name)}</span>
          <span class="muted p-sub">${S(e.rate)} / hour</span>
        </div>
        <span class="p-min">${b(t)}</span>
        <span class="p-amt">${S(n/100)}</span>
        <button class="icon-btn" data-act="edit-project" data-id="${e.id}" aria-label="Edit project" title="Edit project">${H()}</button>
        <button class="icon-btn ${r?`armed`:``}" data-act="del-project" data-id="${e.id}" aria-label="${r?`Confirm delete project`:`Delete project`}" title="${r?`Click again to confirm`:`Delete project`}">${U()}</button>
      </div>`}).join(``):`<p class="empty">No projects yet. Add one above — a project has a name and an hourly rate.</p>`}function fe(e,t){return e&&e.id===t}function H(){return`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`}function U(){return`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>`}function pe(e){let t=e.total_minutes/60,n=t>0?e.total_amount/t:0;return`<div class="tiles">${[{label:`Total time`,value:e.total_minutes?b(e.total_minutes):`0m`,sub:x(e.total_minutes)},{label:`Total amount`,value:S(e.total_amount),sub:e.projects.length+` project`+(e.projects.length===1?``:`s`)},{label:`Effective rate`,value:t>0?S(n)+`/h`:`—`,sub:`blended`},{label:`Days with time`,value:String(me(E.from,E.to)),sub:`in range`}].map(e=>`<div class="tile"><span class="tile-label">${e.label}</span><span class="tile-value">${e.value}</span><span class="tile-sub">${e.sub}</span></div>`).join(``)}</div>`}function me(e,t){let n=new Set;for(let r of a.entries)r.date>=e&&r.date<=t&&n.add(r.date);return n.size}function he(){let e=l(E.from,E.to),t=e.projects.map(e=>{let t=a.projects.find(t=>t.name===e.name),n=t?t.rate:0;return`<tr>
        <td>${w(e.name)}</td>
        <td class="num">${e.minutes}</td>
        <td class="num">${x(e.minutes)}</td>
        <td class="num">${S(n)}</td>
        <td class="num">${S(e.amount)}</td>
      </tr>`}).join(``);return`
  <section class="card">
    <div class="range-row">
      <div class="fcol">
        <label for="r-from">From</label>
        <input type="date" id="r-from" value="${w(E.from)}" />
      </div>
      <div class="fcol">
        <label for="r-to">To</label>
        <input type="date" id="r-to" value="${w(E.to)}" />
      </div>
      <div class="range-btns">
        <button class="btn small" data-range="month" aria-label="Set range to this month">This month</button>
        <button class="btn small" data-range="30" aria-label="Set range to last 30 days">Last 30 days</button>
        <button class="btn small" data-range="7" aria-label="Set range to last 7 days">Last 7 days</button>
      </div>
    </div>
  </section>
  ${pe(e)}
  <section class="card invoice" id="invoice">
    <div class="inv-head">
      <div>
        <h2>Statement of work</h2>
        <p class="muted">${v(E.from)} – ${v(E.to)} · ${b(e.total_minutes)} · ${e.projects.length} project${e.projects.length===1?``:`s`}</p>
      </div>
      <div class="inv-actions">
        <button class="btn primary" id="csv-btn" aria-label="Download CSV export">Download CSV</button>
        <button class="btn" id="print-btn" aria-label="Print report">Print</button>
      </div>
    </div>
    <div class="table-wrap">
      <table class="rep-table">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col" class="num">Minutes</th>
            <th scope="col" class="num">Hours</th>
            <th scope="col" class="num">Rate</th>
            <th scope="col" class="num">Amount</th>
          </tr>
        </thead>
        <tbody>${t||`<tr><td colspan="5" class="empty">No projects in this range.</td></tr>`}</tbody>
        <tfoot>
          <tr>
            <td>TOTAL</td>
            <td class="num">${e.total_minutes}</td>
            <td class="num">${x(e.total_minutes)}</td>
            <td></td>
            <td class="num">${S(e.total_amount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
  <section class="grid2">
    <div class="card">
      <div class="card-head"><h2>Time by project</h2></div>
      <div class="donut-wrap">
        <div class="chartbox" id="chart-project" aria-label="Share of time by project"></div>
        <div class="legend" id="legend-project"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h2>Time by day</h2></div>
      <div class="chartbox" id="chart-day" aria-label="Minutes per day"></div>
    </div>
  </section>`}function W(e,t,n={}){if(!e)return;let r=Math.max(150,e.clientWidth||320),i=n.height||170,a=Math.max(1,...t.map(e=>e.value)),o=Math.max(1,t.length),s=(r-6-6)/o,c=`<svg class="chart" width="${r}" height="${i}" viewBox="0 0 ${r} ${i}" role="img" aria-label="${w(n.label||`Chart`)}">`;c+=`<line x1="6" y1="${i-22+.5}" x2="${r-6}" y2="${i-22+.5}" stroke="#dfe3ea" stroke-width="1"/>`,t.forEach((e,t)=>{let r=(i-18-22)*(e.value/a),o=6+t*s+s*.18,l=i-22-r;c+=`<rect x="${o.toFixed(1)}" y="${l.toFixed(1)}" width="${(s*.64).toFixed(1)}" height="${Math.max(0,r).toFixed(1)}" rx="3" fill="${e.color||`#2563eb`}"/>`;let u=(6+t*s+s/2).toFixed(1);e.value>0&&(c+=`<text x="${u}" y="${(l-5).toFixed(1)}" text-anchor="middle" class="cv">${w(n.fmt?n.fmt(e.value):String(e.value))}</text>`),c+=`<text x="${u}" y="${i-22+14}" text-anchor="middle" class="cl">${w(e.label)}</text>`}),c+=`</svg>`,e.innerHTML=c}function G(){let e=document.getElementById(`week-chart`);if(!e)return;let t=new Date,n=`0000-00-00`;for(let e of a.entries)e.date>n&&(n=e.date);n!==`0000-00-00`&&n>_(t)&&(t=new Date(n+`T00:00:00`));let r=[],i=0;for(let e=6;e>=0;e--){let n=new Date(t);n.setDate(n.getDate()-e);let o=_(n),s=0;for(let e of a.entries)e.date===o&&(s+=e.minutes);i+=s,r.push({label:n.toLocaleDateString(`en-GB`,{weekday:`short`}),value:s,color:`#2563eb`})}W(e,r,{label:`Minutes per day, last 7 days`,fmt:e=>b(e)});let o=document.getElementById(`week-total`);o&&(o.textContent=i?b(i)+` logged`:`no time logged`)}function ge(e,t){let n=[],r=new Date(e+`T00:00:00`),i=new Date(t+`T00:00:00`),a=0;for(;r<=i&&a<400;)n.push(_(r)),r.setDate(r.getDate()+1),a++;return n}function _e(e,t,n={}){if(!e)return;let r=t.reduce((e,t)=>e+t.value,0),i=2*Math.PI*62,a=`<svg class="chart" width="168" height="168" viewBox="0 0 168 168" role="img" aria-label="${w(n.label||`Share by project`)}">`;if(a+=`<circle cx="84" cy="84" r="62" fill="none" stroke="#edf0f4" stroke-width="24"/>`,r>0){let e=0;for(let n of t){if(n.value<=0)continue;let t=n.value/r;a+=`<circle cx="84" cy="84" r="62" fill="none" stroke="${n.color}" stroke-width="24" stroke-dasharray="${(t*i).toFixed(2)} ${i.toFixed(2)}" stroke-dashoffset="${(-e*i).toFixed(2)}" transform="rotate(-90 84 84)"/>`,e+=t}}a+=`<text x="84" y="80" text-anchor="middle" class="dc-val">${w(n.center||``)}</text>`,a+=`<text x="84" y="98" text-anchor="middle" class="dc-lab">${w(n.centerSub||``)}</text>`,a+=`</svg>`,e.innerHTML=a}function K(){let e=l(E.from,E.to),t=document.getElementById(`chart-project`);if(t){let n=[...e.projects].sort((e,t)=>t.minutes-e.minutes),r=e.total_minutes;_e(t,n.map(e=>{let t=a.projects.find(t=>t.name===e.name);return{label:e.name,value:e.minutes,color:t?t.color:`#2563eb`}}),{label:`Share of time by project`,center:r?b(r):`0m`,centerSub:`total time`});let i=document.getElementById(`legend-project`);i&&(i.innerHTML=n.map(e=>{let t=a.projects.find(t=>t.name===e.name),n=r?Math.round(e.minutes/r*100):0;return`<div class="legend-row">
            <span class="dot" style="background:${t?t.color:`#2563eb`}"></span>
            <span class="legend-name">${w(e.name)}</span>
            <span class="legend-val">${b(e.minutes)} · ${n}%</span>
          </div>`}).join(``)||`<p class="empty">No time in this range.</p>`)}let n=document.getElementById(`chart-day`);if(n){let e=ge(E.from,E.to),t=new Map(e.map(e=>[e,0]));for(let e of a.entries)t.has(e.date)&&t.set(e.date,t.get(e.date)+e.minutes);let r;if(e.length<=31)r=e.map(e=>({label:y(e),value:t.get(e),color:`#059669`}));else{let n=Math.ceil(e.length/12);r=[];for(let i=0;i<e.length;i+=n){let a=e.slice(i,i+n),o=a.reduce((e,n)=>e+(t.get(n)||0),0);r.push({label:y(a[0]),value:o,color:`#059669`})}}W(n,r,{label:`Minutes per day`,fmt:e=>b(e)})}}function ve(){try{let t=localStorage.getItem(e+`.timer`);if(!t)return;let n=JSON.parse(t);n&&n.running&&n.startedAt&&n.projectId&&h(n.projectId)&&Date.now()>n.startedAt&&(D={running:!0,startedAt:n.startedAt,projectId:n.projectId,lastSeconds:0})}catch{}}function q(){try{D.running?localStorage.setItem(e+`.timer`,JSON.stringify({running:!0,startedAt:D.startedAt,projectId:D.projectId})):localStorage.removeItem(e+`.timer`)}catch{}}function J(){return Math.floor((Date.now()-D.startedAt)/1e3)}function Y(){let e=document.getElementById(`clock`);e&&(e.textContent=D.running?C(J()):C(D.lastSeconds))}setInterval(()=>{D.running&&Y()},250);function ye(){if(D.running){let e=J(),t=Math.round(e/60);D.running=!1,D.lastSeconds=e;let n=h(D.projectId);t>=1&&n?(m(n.name,g(),t),f(),X(`Logged ${b(t)} on ${n.name}`)):X(t<1?`Less than a minute — not saved`:`No project selected`)}else{let e=document.getElementById(`timer-project`),t=h(e?e.value:``);if(!t){X(`Add a project first`),L();return}D.projectId=t.id,D.running=!0,D.startedAt=Date.now(),D.lastSeconds=0}q(),L()}function X(e){let t=document.getElementById(`toasts`);if(!t)return;let n=document.createElement(`div`);n.className=`toast`,n.textContent=e,t.appendChild(n),setTimeout(()=>{n.classList.add(`out`),setTimeout(()=>n.remove(),350)},2600)}var Z=0;function be(e,t){O={kind:e,id:t},clearTimeout(Z),Z=setTimeout(()=>{O=null,I()},3e3)}function xe(e){e.preventDefault();let t=Q(`q-project`),n=Q(`q-date`),r=parseInt(Q(`q-min`),10);if(!t){X(`Choose a project`);return}if(!n){X(`Pick a date`);return}if(!r||r<=0){X(`Enter minutes`);return}let i=h(t);m(i?i.name:t,n,r),f(),X(`Added ${b(r)} on ${i?i.name:``}`),L();let a=document.getElementById(`q-min`);a&&(a.value=`30`,a.focus(),a.select())}function Se(e){e.preventDefault();let t=Q(`p-name`),n=parseFloat(Q(`p-rate`));if(!t){X(`Enter a project name`);return}p(t,isNaN(n)?0:n),f(),X(`Project “${t}” added`),L();let r=document.getElementById(`p-name`);r&&r.focus()}function Q(e){let t=document.getElementById(e);return t?t.value:``}function Ce(){let e=u(E.from,E.to),t=new Blob([e],{type:`text/csv;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`tempo-${E.from}-to-${E.to}.csv`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3),X(`CSV downloaded`)}function we(e){let t=new Date;if(e===`month`)E={from:_(new Date(t.getFullYear(),t.getMonth(),1)),to:_(t)};else if(e===`30`){let e=new Date(t);e.setDate(e.getDate()-29),E={from:_(e),to:_(t)}}else if(e===`7`){let e=new Date(t);e.setDate(e.getDate()-6),E={from:_(e),to:_(t)}}L()}function $(e){T=e,L()}function Te(){document.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>$(e.dataset.view))});let e=document.getElementById(`main`);if(!e)return;let t=document.getElementById(`clear-sample`);t&&t.addEventListener(`click`,()=>{window.APP.reset(),setTimeout(()=>X(`Sample data cleared — start fresh`),20)}),e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`[data-act="del-entry"],[data-act="del-project"]`);if(n){let e=n.dataset.act===`del-entry`?`entry`:`project`,t=n.dataset.id;if(O&&O.kind===e&&O.id===t){if(e===`entry`){let e=h((a.entries.find(e=>e.id===t)||{}).projectId);te(t),X(`Entry deleted${e?` from `+e.name:``}`)}else{let e=h(t);ne(t),X(`Project “${e?e.name:``}” deleted`)}O=null,clearTimeout(Z),f(),L()}else be(e,t),L();return}let r=t.closest(`[data-act]`);if(r){let e=r.dataset.act,t=r.dataset.id;if(e===`edit-entry`){A=t,j=null,L();let e=document.getElementById(`edit-min`);e&&e.focus();return}if(e===`cancel-edit`){A=null,L();return}if(e===`save-entry`){let e=a.entries.find(e=>e.id===t);if(e){let t=Q(`edit-project`),n=Q(`edit-date`),r=parseInt(Q(`edit-min`),10);t&&n&&r>0&&(e.projectId=t,e.date=n,e.minutes=r)}A=null,f(),X(`Entry updated`),L();return}if(e===`edit-project`){j=t,A=null,L();let e=document.getElementById(`ep-name`);e&&e.focus();return}if(e===`cancel-pedit`){j=null,L();return}if(e===`save-project`){let e=h(t);if(e){let t=Q(`ep-name`),n=parseFloat(Q(`ep-rate`));t&&(e.name=t),!isNaN(n)&&n>=0&&(e.rate=n)}j=null,f(),X(`Project updated`),L();return}}if(t.closest(`#timer-btn`)){ye();return}if(t.closest(`#csv-btn`)){Ce();return}if(t.closest(`#print-btn`)){window.print();return}if(t.closest(`#more-entries`)){k+=200,L();return}let i=t.closest(`[data-range]`);if(i){we(i.dataset.range);return}});let n=document.getElementById(`quick-form`);n&&n.addEventListener(`submit`,xe);let r=document.getElementById(`proj-form`);r&&r.addEventListener(`submit`,Se);let i=document.getElementById(`entry-search`);i&&i.addEventListener(`input`,()=>{M=i.value,V()});let o=document.getElementById(`entry-project-filter`);o&&o.addEventListener(`change`,()=>{N=o.value,V()});let s=document.getElementById(`timer-project`);s&&s.addEventListener(`change`,()=>{D.running||(D.projectId=s.value)});let c=document.getElementById(`r-from`),l=document.getElementById(`r-to`);c&&c.addEventListener(`change`,()=>{c.value&&(E.from=c.value,L())}),l&&l.addEventListener(`change`,()=>{l.value&&(E.to=l.value,L())})}document.addEventListener(`keydown`,e=>{let t=e.target&&e.target.tagName||``;t!==`INPUT`&&t!==`SELECT`&&t!==`TEXTAREA`&&(e.key===`1`?$(`log`):e.key===`2`?$(`report`):e.key===`n`||e.key===`N`?($(`log`),setTimeout(()=>{let e=document.getElementById(`q-min`);e&&(e.focus(),e.select())},0)):(e.key===`t`||e.key===`T`)&&($(`log`),setTimeout(()=>ye(),0)))}),ve(),L(),window.addEventListener(`resize`,()=>{T===`log`?G():K()});