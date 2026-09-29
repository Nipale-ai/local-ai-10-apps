(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`***`,t=[`#3b6fe0`,`#e0533f`,`#1f9d6b`,`#8a5cff`,`#e0a32f`,`#d64f8f`,`#2f9bc9`,`#7a8a3a`,`#5b6470`,`#c85a2f`,`#3a7da6`,`#9c3f8f`],n=e=>Math.round(e*100+1e-9)/100,r=null,i=new Set;function a(){return{projects:[],entries:[],currency:`€`,timer:null,seq:1}}function o(){if(r)return r;try{let t=localStorage.getItem(e);if(t){let e=JSON.parse(t);if(e&&Array.isArray(e.projects)&&Array.isArray(e.entries))return r=Object.assign(a(),e),r.projects||(r.projects=[]),r.entries||(r.entries=[]),typeof r.seq!=`number`&&(r.seq=r.projects.length+r.entries.length+1||1),r.currency||(r.currency=`€`),r}}catch{}return r=a(),r}function s(){try{localStorage.setItem(e,JSON.stringify(r))}catch{}}function c(){s(),i.forEach(e=>e(r))}function l(){return o()}function u(){r=a();try{localStorage.removeItem(e)}catch{}c()}function d(){return`p`+r.seq+++`-`+Math.random().toString(36).slice(2,7)}function f({name:e,rate:n}){o();let i=String(e??``).trim();if(!i)return null;let a=r.projects.find(e=>e.name===i);if(a)return a;let s=t[r.projects.length%t.length],l={id:d(),name:i,rate:Number.isFinite(+n)?+n:0,color:s};return r.projects.push(l),c(),l}function ee(e,t){o();let n=r.projects.find(t=>t.id===e);if(!n)return null;if(t.name!=null){let e=String(t.name).trim();e&&(n.name=e)}return t.rate!=null&&Number.isFinite(+t.rate)&&(n.rate=+t.rate),t.color!=null&&(n.color=t.color),c(),n}function te(e){o(),r.projects=r.projects.filter(t=>t.id!==e),r.entries=r.entries.filter(t=>t.projectId!==e),r.timer&&r.timer.projectId===e&&(r.timer=null),c()}function p(e){return o(),r.projects.find(t=>t.name===e)||null}function m({project:e,date:t,minutes:n,projectId:i}){o();let a=i;if(!a&&e!=null){let t=p(e);if(!t)return null;a=t.id}if(!a||!r.projects.some(e=>e.id===a))return null;let s=w(t);if(!s)return null;let l=Math.round(+n);(!Number.isFinite(l)||l<0)&&(l=0);let u={id:d(),projectId:a,date:s,minutes:l};return r.entries.push(u),c(),u}function h(e,t){o();let n=r.entries.find(t=>t.id===e);if(!n)return null;if(t.date!=null){let e=w(t.date);e&&(n.date=e)}if(t.minutes!=null){let e=Math.round(+t.minutes);Number.isFinite(e)&&e>=0&&(n.minutes=e)}return t.projectId!=null&&r.projects.some(e=>e.id===t.projectId)&&(n.projectId=t.projectId),c(),n}function g(e){o(),r.entries=r.entries.filter(t=>t.id!==e),c()}function _(e){o(),r.projects.some(t=>t.id===e)&&(r.timer={projectId:e,startedAt:Date.now()},c())}function v(){if(o(),!r.timer)return null;let{projectId:e,startedAt:t}=r.timer,n=Math.max(1,Math.round((Date.now()-t)/6e4));return r.timer=null,m({projectId:e,date:S(),minutes:n})}function ne(){o(),r.timer=null,c()}function y(e,t,n){return!(t&&e<t||n&&e>n)}function b({from:e,to:t}={}){o();let i=e?w(e):null,a=t?w(t):null,s=r.projects.map(e=>{let t=0;for(let n of r.entries)n.projectId===e.id&&y(n.date,i,a)&&(t+=n.minutes);return{name:e.name,minutes:t,amount:n(t*e.rate/60)}});return{projects:s,total_minutes:s.reduce((e,t)=>e+t.minutes,0),total_amount:n(s.reduce((e,t)=>e+t.amount,0))}}function x({from:e,to:t}={}){let n=b({from:e,to:t}),r=e=>{let t=String(e);return/[",\n]/.test(t)?`"`+t.replace(/"/g,`""`)+`"`:t},i=[`Project,Minutes,Amount`];for(let e of n.projects)i.push(`${r(e.name)},${e.minutes},${e.amount.toFixed(2)}`);return i.push(`TOTAL,${n.total_minutes},${n.total_amount.toFixed(2)}`),i.join(`
`)}function S(){let e=new Date;return`${e.getFullYear()}-${C(e.getMonth()+1)}-${C(e.getDate())}`}function C(e){return String(e).padStart(2,`0`)}function w(e){if(typeof e!=`string`)return null;let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.trim());return t?t[0]:null}function T(e=new Date){let t=new Date(e.getFullYear(),e.getMonth(),e.getDate()),n=(t.getDay()+6)%7;return t.setDate(t.getDate()-n),`${t.getFullYear()}-${C(t.getMonth()+1)}-${C(t.getDate())}`}function E(e=new Date){let t=new Date(e);return t.setDate(t.getDate()+6),`${t.getFullYear()}-${C(t.getMonth()+1)}-${C(t.getDate())}`}function D(e=new Date){return`${e.getFullYear()}-${C(e.getMonth()+1)}-01`}function O(e=new Date){let t=new Date(e.getFullYear(),e.getMonth()+1,0);return`${t.getFullYear()}-${C(t.getMonth()+1)}-${C(t.getDate())}`}function k(e,t){let[n,r,i]=e.split(`-`).map(Number),a=new Date(n,r-1,i);return a.setDate(a.getDate()+t),`${a.getFullYear()}-${C(a.getMonth()+1)}-${C(a.getDate())}`}function A(e,t=r?r.currency:`€`){return`${t} ${(Number(e)||0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,`,`)}`}function j(e){let t=Math.round(e)||0,n=Math.floor(t/60),r=t%60;return n===0?`${r}m`:r===0?`${n}h`:`${n}h ${r}m`}var M=e=>String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`),N=()=>document.getElementById(`app`),P={tab:`report`,from:T(),to:S(),editingEntry:null,editingProject:null,timerTick:null},F={play:`<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4.5 3.2v9.6a.6.6 0 0 0 .92.5l7.3-4.8a.6.6 0 0 0 0-1L5.42 2.7A.6.6 0 0 0 4.5 3.2Z" fill="currentColor"/></svg>`,stop:`<svg width="13" height="13" viewBox="0 0 16 16"><rect x="3.5" y="3.5" width="9" height="9" rx="2" fill="currentColor"/></svg>`,plus:`<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3.2v9.6M3.2 8h9.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,trash:`<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.5 4.5h9M6.2 4.5V3.3a.8.8 0 0 1 .8-.8h2a.8.8 0 0 1 .8.8v1.2M5 4.5l.5 8a.8.8 0 0 0 .8.75h3.4a.8.8 0 0 0 .8-.75L11 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,edit:`<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.3 2.9l1.8 1.8a1 1 0 0 1 0 1.4L6 13.2l-2.6.7.7-2.6 7.1-7.1a1 1 0 0 1 .1-.3Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,csv:`<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0L5 7m3 3 3-3M3 12.5h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,print:`<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4.5 6V2.8h7V6M4.5 11h-1A1.5 1.5 0 0 1 2 9.5v-2A1.5 1.5 0 0 1 3.5 6h9A1.5 1.5 0 0 1 14 7.5v2A1.5 1.5 0 0 1 12.5 11h-1M4.5 9h7v4.2h-7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,reset:`<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M12.5 8a4.5 4.5 0 1 1-1.4-3.2M12 2v3h-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`};function I(){return`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.4" stroke="#fff" stroke-width="1.7"/><path d="M12 7.4V12l3 1.8" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`}function L(e){let t=l();return t.projects.length?t.projects.map(t=>`<option value="${M(t.id)}"${t.id===e?` selected`:``}>${M(t.name)}</option>`).join(``):`<option value="">No projects yet</option>`}function R(e){let t=Math.floor(e/1e3),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60,a=e=>String(e).padStart(2,`0`);return`${a(n)}:${a(r)}:${a(i)}`}function z(){let e=l(),t=b({from:P.from,to:P.to});N().innerHTML=`
    <div class="topbar">
      <div class="brand">
        <div class="mark">${I()}</div>
        <div>
          <div class="name">Chrono Bill</div>
          <div class="tag">Time tracking &amp; project billing</div>
        </div>
      </div>
      <div class="topbar-right no-print">
        <button class="btn sm" data-act="csv">${F.csv} Export CSV</button>
        <button class="btn sm" data-act="print">${F.print} Print</button>
        <button class="btn sm ghost" data-act="reset" title="Clear all data">${F.reset}</button>
      </div>
    </div>
    <div class="layout">
      <div class="col">
        ${B(e)}
        ${V(e)}
      </div>
      <div class="col">
        ${U()}
        ${W()}
        ${G(e,t)}
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `,ie()}function B(e){let t=e.timer,n=t?e.projects.find(e=>e.id===t.projectId):null,r=t?t.projectId:e.projects[0]&&e.projects[0].id;return t&&n?`
    <div class="card">
      <div class="card-head"><span class="card-title">Running timer</span></div>
      <div class="timer">
        <div class="timer-row">
          <span class="pulse"></span>
          <span class="timer-display running" id="timer-disp">${R(Date.now()-t.startedAt)}</span>
        </div>
        <div class="timer-project"><span class="dot" style="background:${M(n.color)}"></span>${M(n.name)}</div>
        <div class="timer-actions">
          <button class="btn primary" data-act="stop-timer">${F.stop} Stop &amp; log</button>
          <button class="btn ghost" data-act="cancel-timer">Discard</button>
        </div>
      </div>
    </div>`:`
    <div class="card">
      <div class="card-head"><span class="card-title">Timer</span><span class="card-sub">log time live</span></div>
      <div class="timer">
        <div class="field">
          <label for="timer-proj">Project</label>
          <select class="select" id="timer-proj">${L(r)}</select>
        </div>
        <div class="timer-actions">
          <button class="btn primary" data-act="start-timer">${F.play} Start timer</button>
        </div>
        <div class="hint">Stop to log the elapsed minutes on today's entry.</div>
      </div>
    </div>`}function V(e){let t=e.projects.length?`<div class="plist">${e.projects.map(e=>H(e)).join(``)}</div>`:`<div class="empty">No projects yet.<br>Add your first one below.</div>`;return`
    <div class="card">
      <div class="card-head"><span class="card-title">Projects</span><span class="card-sub">${e.projects.length}</span></div>
      ${t}
      <form class="grid-form" data-act="add-project" style="margin-top:14px">
        <div class="field"><label>New project</label><input class="input" name="name" placeholder="Project name" autocomplete="off" required></div>
        <div class="grid-2">
          <div class="field"><label>Rate / hour</label><input class="input" name="rate" type="number" min="0" step="0.01" placeholder="0.00" inputmode="decimal"></div>
          <div class="field"><label>&nbsp;</label><button class="btn primary" type="submit">${F.plus} Add</button></div>
        </div>
      </form>
    </div>`}function H(e){return P.editingProject===e.id?`
    <form class="pitem editing" data-act="save-project" data-id="${M(e.id)}" style="flex-wrap:wrap">
      <input type="hidden" name="id" value="${M(e.id)}">
      <div class="field" style="flex:1 1 100%"><label>Name</label><input class="input" name="name" value="${M(e.name)}"></div>
      <div class="field" style="flex:1"><label>Rate</label><input class="input" name="rate" type="number" min="0" step="0.01" value="${e.rate}"></div>
      <div class="field" style="flex:1"><label>Color</label>
        <div class="row">${t.map(t=>`<button type="button" class="swatch-btn${t===e.color?` sel`:``}" data-act="pick-color" data-color="${t}" data-id="${M(e.id)}" style="background:${t}"></button>`).join(``)}</div>
      </div>
      <div class="row" style="width:100%;justify-content:flex-end">
        <button class="btn sm ghost" data-act="cancel-edit" type="button">Cancel</button>
        <button class="btn sm primary" type="submit">Save</button>
      </div>
    </form>`:`
    <div class="pitem">
      <span class="swatch" style="background:${M(e.color)}"></span>
      <span class="pname">${M(e.name)}</span>
      <span class="prate">${A(e.rate)}</span>
      <span class="pmenu">
        <button class="btn icon ghost" data-act="edit-project" data-id="${M(e.id)}" title="Edit">${F.edit}</button>
        <button class="btn icon ghost" data-act="del-project" data-id="${M(e.id)}" title="Delete">${F.trash}</button>
      </span>
    </div>`}function U(){let e=[[`Today`,S(),S()],[`7 days`,k(S(),-6),S()],[`This week`,T(),E()],[`Last week`,k(T(),-7),k(T(),-1)],[`This month`,D(),O()]];return`
    <div class="card no-print">
      <div class="rangebar">
        <div class="field"><label>From</label><input class="input" type="date" id="from" value="${M(P.from)}"></div>
        <div class="field"><label>To</label><input class="input" type="date" id="to" value="${M(P.to)}"></div>
        <div class="quick">
          ${e.map(([e,t,n])=>`<button class="chip${P.from===t&&P.to===n?` on`:``}" data-act="quick" data-from="${t}" data-to="${n}">${e}</button>`).join(``)}
        </div>
      </div>
    </div>`}function W(){return`<div class="tabs no-print">${[[`report`,`Report`],[`weekly`,`Weekly`],[`entries`,`Entries`],[`invoice`,`Invoice`]].map(([e,t])=>`<button class="tab${P.tab===e?` on`:``}" data-act="tab" data-tab="${e}">${t}</button>`).join(``)}</div>`}function G(e,t){return P.tab===`report`?K(e,t):P.tab===`weekly`?J(e):P.tab===`entries`?Y(e):re(e,t)}function K(e,t){let n=t.projects.length?t.projects.map((t,n)=>`<div class="rrow">
          <div class="rname"><span class="dot" style="background:${M(e.projects[n]&&e.projects[n].color||`#888`)}"></span><span class="nm">${M(t.name)}</span></div>
          <div class="rmin">${j(t.minutes)} <span class="muted num">(${t.minutes})</span></div>
          <div class="ramt">${A(t.amount)}</div>
        </div>`).join(``):`<div class="empty">Add a project to see the report.</div>`,r=t.projects.filter(e=>e.minutes>0).length;t.total_minutes/60;let i=`
    <div class="kpis">
      <div class="kpi"><span class="kpi-l">Total billed</span><span class="kpi-v accent">${A(t.total_amount)}</span></div>
      <div class="kpi"><span class="kpi-l">Total time</span><span class="kpi-v">${j(t.total_minutes)}</span></div>
      <div class="kpi"><span class="kpi-l">Billable projects</span><span class="kpi-v">${r}</span></div>
    </div>`;return`
    <div class="card">
      <div class="card-head">
        <span class="card-title">Report</span>
        <span class="card-sub">${M(P.from)} → ${M(P.to)}</span>
      </div>
      ${t.projects.length?i:``}
      <div class="report">
        <div class="rrow head"><span>Project</span><span style="text-align:right">Time</span><span style="text-align:right">Amount</span></div>
        ${n}
        <div class="rtotal">
          <div class="lbl">Total</div>
          <div class="rmin">${j(t.total_minutes)} <span class="muted num">(${t.total_minutes})</span></div>
          <div class="ramt">${A(t.total_amount)}</div>
        </div>
      </div>
      ${q(e,t)}
    </div>`}function q(e,t){let n=Math.max(1,...t.projects.map(e=>e.minutes)),r=t.projects.filter(e=>e.minutes>0);return r.length?`<div style="margin-top:18px"><div class="card-title" style="margin-bottom:12px">Time per project</div><div class="chart">${r.map((t,r)=>{let i=(e.projects.find(e=>e.name===t.name)||{}).color||`#888`,a=Math.max(2,t.minutes/n*100);return`<div class="bar-row">
      <div class="lbl"><span class="dot" style="background:${M(i)}"></span>${M(t.name)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${a}%;background:${M(i)}"></div></div>
      <div class="bar-val">${j(t.minutes)}</div>
    </div>`}).join(``)}</div></div>`:``}function J(e){let t=T(),n=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],r=S(),i=[];for(let n=0;n<7;n++){let r=k(t,n),a=0;for(let t of e.entries)t.date===r&&(a+=t.minutes);i.push({d:r,m:a})}let a=Math.max(1,...i.map(e=>e.m)),o=i.map((e,t)=>{let i=Math.round(e.m/a*52)+(e.m>0?4:0);return`<div class="wday${e.d===r?` today`:``}">
      <span class="wd">${n[t]}</span>
      <span class="wbar"><i style="height:${i}px"></i></span>
      <span class="wmin">${e.m?j(e.m):`–`}</span>
    </div>`}).join(``),s=i.reduce((e,t)=>e+t.m,0);return`
    <div class="card">
      <div class="card-head"><span class="card-title">This week</span><span class="card-sub">${M(t)} → ${M(k(t,6))}</span></div>
      <div class="week">${o}</div>
      <div class="row" style="margin-top:14px;justify-content:space-between">
        <span class="muted">Week total</span>
        <span class="num" style="font-weight:700">${j(s)} · ${s} min</span>
      </div>
    </div>`}function Y(e){let t=e.entries.filter(e=>(!P.from||e.date>=P.from)&&(!P.to||e.date<=P.to)).slice().sort((e,t)=>e.date<t.date?1:e.date>t.date?-1:0),n=t.length?`<div class="elist">${t.map(t=>X(e,t)).join(``)}</div>`:`<div class="empty">No entries in this range.</div>`;return`
    <div class="card">
      <div class="card-head"><span class="card-title">Log time</span><span class="card-sub">${t.length} in range</span></div>
      <form class="grid-form" data-act="add-entry" style="margin-bottom:16px">
        <div class="field"><label>Project</label><select class="select" name="project">${L(e.projects[0]&&e.projects[0].id)}</select></div>
        <div class="grid-2">
          <div class="field"><label>Date</label><input class="input" type="date" name="date" value="${M(P.to||S())}" required></div>
          <div class="field"><label>Minutes</label><input class="input" type="number" name="minutes" min="0" step="1" placeholder="0" inputmode="numeric" required></div>
        </div>
        <button class="btn primary" type="submit">${F.plus} Add entry</button>
      </form>
      ${n}
    </div>`}function X(e,t){let n=e.projects.find(e=>e.id===t.projectId)||{},r=b({from:t.date,to:t.date}).projects.find(e=>e.name===n.name);return P.editingEntry===t.id?`
    <form class="erow editing" data-act="save-entry" data-id="${M(t.id)}">
      <input type="hidden" name="id" value="${M(t.id)}">
      <select class="select" name="project" style="width:auto">${L(t.projectId)}</select>
      <input class="input" type="date" name="date" value="${M(t.date)}" style="width:auto">
      <input class="input" type="number" name="minutes" min="0" value="${t.minutes}" style="width:78px">
      <button class="btn sm primary" type="submit">Save</button>
      <button class="btn sm ghost" type="button" data-act="cancel-edit">✕</button>
    </form>`:`
    <div class="erow">
      <span class="edate">${M(t.date)}</span>
      <span class="ename"><span class="dot" style="background:${M(n.color||`#888`)}"></span><span class="nm">${M(n.name||`—`)}</span></span>
      <span class="emin">${j(t.minutes)}</span>
      <span class="eamt">${A(r?r.amount:0)}</span>
      <span class="eact">
        <button class="btn icon ghost" data-act="edit-entry" data-id="${M(t.id)}" title="Edit">${F.edit}</button>
        <button class="btn icon ghost" data-act="del-entry" data-id="${M(t.id)}" title="Delete">${F.trash}</button>
      </span>
    </div>`}function re(e,t){let n=t.projects.filter(e=>e.minutes>0),r=n.length?n.map(e=>`<div class="inv-line"><span class="nm">${M(e.name)}</span><span class="q">${j(e.minutes)} (${e.minutes} min)</span><span class="a">${A(e.amount)}</span></div>`).join(``):`<div class="empty">Nothing billable in this range.</div>`;return`
    <div class="card">
      <div class="card-head no-print"><span class="card-title">Invoice preview</span>
        <button class="btn sm" data-act="print">${F.print} Print / PDF</button></div>
      <div class="inv">
        <div class="inv-top">
          <div><div class="co">Your Studio</div><div class="muted" style="font-size:12.5px">hello@yourstudio.example</div></div>
          <div class="meta"><div><strong>Period</strong><br>${M(P.from)} → ${M(P.to)}</div></div>
        </div>
        <div class="inv-body">
          ${r}
          <div class="inv-sum"><span>Total due</span><span class="a">${A(t.total_amount)}</span></div>
        </div>
      </div>
    </div>`}function ie(){P.timerTick&&=(clearInterval(P.timerTick),null),l().timer&&(P.timerTick=setInterval(()=>{let e=document.getElementById(`timer-disp`),t=l();if(!e||!t.timer){clearInterval(P.timerTick),P.timerTick=null;return}e.textContent=R(Date.now()-t.timer.startedAt)},1e3))}var Z=null;function Q(e){let t=document.getElementById(`toast`);t&&(t.textContent=e,t.classList.add(`show`),clearTimeout(Z),Z=setTimeout(()=>t.classList.remove(`show`),1900))}function ae(){let e=N();e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-act]`);if(!t||t.tagName===`FORM`)return;let n=t.dataset.act,r=t.dataset.id;switch(n){case`start-timer`:{let e=document.getElementById(`timer-proj`);if(!e||!e.value){Q(`Add a project first`);return}_(e.value),z();break}case`stop-timer`:{let e=v();z(),e&&Q(`Logged to today`);break}case`cancel-timer`:ne(),z();break;case`del-project`:confirm(`Delete this project and its entries?`)&&(te(r),z());break;case`edit-project`:P.editingProject=r,z();break;case`del-entry`:g(r),z();break;case`edit-entry`:P.editingEntry=r,z();break;case`cancel-edit`:P.editingEntry=null,P.editingProject=null,z();break;case`pick-color`:{t.parentElement.querySelectorAll(`.swatch-btn`).forEach(e=>e.classList.remove(`sel`)),t.classList.add(`sel`),t.dataset.picked=`1`;let e=t.closest(`form`);e.dataset.color=t.dataset.color;break}case`tab`:P.tab=t.dataset.tab,z();break;case`quick`:P.from=t.dataset.from,P.to=t.dataset.to,z();break;case`csv`:oe();break;case`print`:window.print();break;case`reset`:confirm(`Delete all projects and entries?`)&&(u(),z(),Q(`All data cleared`))}}),e.addEventListener(`submit`,e=>{let t=e.target,n=t.dataset.act;if(!n)return;e.preventDefault();let r=new FormData(t);if(n===`add-project`){let e=(r.get(`name`)||``).trim();if(!e)return;f({name:e,rate:parseFloat(r.get(`rate`)||`0`)||0}),z();let t=N().querySelector(`[data-act="add-project"] [name="name"]`);t&&t.focus()}else if(n===`save-project`)ee(r.get(`id`),{name:r.get(`name`),rate:parseFloat(r.get(`rate`)||`0`)||0,color:t.dataset.color}),P.editingProject=null,z();else if(n===`add-entry`){let e=r.get(`project`),t=parseInt(r.get(`minutes`)||`0`,10)||0;if(!e||t<=0){Q(`Pick a project and minutes`);return}m({projectId:e,date:r.get(`date`),minutes:t}),z();let n=N().querySelector(`[data-act="add-entry"] [name="minutes"]`);n&&n.focus()}else n===`save-entry`&&(h(r.get(`id`),{projectId:r.get(`project`),date:r.get(`date`),minutes:parseInt(r.get(`minutes`)||`0`,10)||0}),P.editingEntry=null,z())}),e.addEventListener(`change`,e=>{e.target.id===`from`?(P.from=e.target.value||P.from,z()):e.target.id===`to`&&(P.to=e.target.value||P.to,z())})}function oe(){let e=x({from:P.from,to:P.to}),t=new Blob([e],{type:`text/csv`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`report-${P.from}_${P.to}.csv`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3),Q(`CSV downloaded`)}function se(){window.APP={reset:()=>{u(),z()},addProject:e=>{let t=f(e);return z(),t},addEntry:e=>{let t=m(e);return z(),t},report:e=>b(e||{}),csv:e=>x(e||{})}}function $(){l(),se(),ae(),z()}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$):$();