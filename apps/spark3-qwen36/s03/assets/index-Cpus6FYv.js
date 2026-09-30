(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),(function(){let e={dark:!1},t=document.createElement(`style`);t.textContent=`
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    :root {
      --bg: #faf9f7;
      --bg-alt: #f2f0ed;
      --bg-card: #ffffff;
      --text: #1a1a1a;
      --text-secondary: #555555;
      --text-tertiary: #888888;
      --accent: #c46830;
      --accent-hover: #b05a28;
      --accent-light: rgba(196, 104, 48, 0.08);
      --accent-glow: rgba(196, 104, 48, 0.25);
      --border: rgba(0,0,0,0.07);
      --border-strong: rgba(0,0,0,0.13);
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03);
      --shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04);
      --shadow-lg: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
      --radius: 10px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --nav-bg: rgba(250, 249, 247, 0.9);
      --nav-border: rgba(0,0,0,0.05);
      --footer-bg: #f2f0ed;
      transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
    }

    .dark {
      --bg: #0c0c0f;
      --bg-alt: #141418;
      --bg-card: #1a1a20;
      --text: #eaeaea;
      --text-secondary: #9999a0;
      --text-tertiary: #666670;
      --accent: #e07838;
      --accent-hover: #f08848;
      --accent-light: rgba(224, 120, 56, 0.1);
      --accent-glow: rgba(224, 120, 56, 0.3);
      --border: rgba(255,255,255,0.06);
      --border-strong: rgba(255,255,255,0.12);
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2);
      --shadow: 0 2px 8px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.25);
      --shadow-lg: 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3);
      --nav-bg: rgba(12, 12, 15, 0.92);
      --nav-border: rgba(255,255,255,0.05);
      --footer-bg: #08080b;
    }

    html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; overflow-x: hidden; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    /* ─── Navigation ─── */
    #nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      transition: box-shadow 0.3s ease;
    }
    #nav.scrolled { box-shadow: 0 1px 16px rgba(0,0,0,0.06); }
    .dark #nav.scrolled { box-shadow: 0 1px 16px rgba(0,0,0,0.3); }
    .nav-inner {
      max-width: 1200px; margin: 0 auto;
      padding: 0 32px; height: 60px;
      display: flex; align-items: center; justify-content: space-between;
      background: var(--nav-bg);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--nav-border);
    }
    .nav-logo {
      display: flex; align-items: center; gap: 8px;
      font-weight: 700; font-size: 17px;
      color: var(--text); text-decoration: none;
      letter-spacing: -0.03em;
    }
    .nav-logo svg { flex-shrink: 0; }
    .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
    .nav-links a {
      color: var(--text-secondary); text-decoration: none;
      font-size: 13.5px; font-weight: 500; letter-spacing: 0.01em;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }
    .dark-toggle {
      background: none; border: 1px solid var(--border-strong);
      border-radius: 50%; width: 34px; height: 34px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: var(--text-secondary);
      transition: all 0.2s; flex-shrink: 0;
    }
    .dark-toggle:hover { color: var(--text); border-color: var(--text-tertiary); }
    .dark-toggle .moon-icon { display: none; }
    .dark .dark-toggle .moon-icon { display: block; }
    .dark .dark-toggle .sun-icon { display: none; }

    /* ─── Sections ─── */
    section { padding: 110px 32px; max-width: 1200px; margin: 0 auto; }
    .section-divider {
      width: 48px; height: 3px;
      background: var(--accent);
      border-radius: 2px;
      margin: 0 auto 20px;
      opacity: 0.6;
    }
    .section-header { text-align: center; margin-bottom: 72px; }
    .section-header h2 {
      font-size: clamp(26px, 3.5vw, 38px);
      font-weight: 700; letter-spacing: -0.035em;
      line-height: 1.15; margin-bottom: 14px;
    }
    .section-header p {
      font-size: 17px; color: var(--text-secondary);
      max-width: 480px; margin: 0 auto; line-height: 1.6;
    }

    /* ─── Hero ─── */
    #hero {
      min-height: 100vh; display: flex; align-items: center;
      padding-top: 72px;
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%);
    }
    #hero::before {
      content: '';
      position: absolute; top: -20%; right: -10%;
      width: 600px; height: 600px;
      background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
      pointer-events: none;
      opacity: 0.3;
    }
    #hero::after {
      content: '';
      position: absolute; bottom: -30%; left: -15%;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(196, 104, 48, 0.08) 0%, transparent 70%);
      pointer-events: none;
      opacity: 0.5;
    }
    .dark #hero::before { opacity: 0.15; }
    .dark #hero::after { opacity: 0.3; background: radial-gradient(circle, rgba(224, 120, 56, 0.06) 0%, transparent 70%); }
    .hero-content {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 48px; align-items: center; width: 100%;
      position: relative; z-index: 1;
    }
    .hero-text h1 {
      font-size: clamp(34px, 5vw, 60px);
      font-weight: 800; letter-spacing: -0.045em;
      line-height: 1.06; margin-bottom: 22px;
      opacity: 0; transform: translateY(20px);
      animation: heroFadeIn 0.8s ease 0.2s forwards;
    }
    .hero-sub {
      font-size: clamp(15px, 1.6vw, 18px);
      color: var(--text-secondary); line-height: 1.65;
      margin-bottom: 34px; max-width: 460px;
      opacity: 0; transform: translateY(20px);
      animation: heroFadeIn 0.8s ease 0.35s forwards;
    }
    .hero-actions {
      opacity: 0; transform: translateY(20px);
      animation: heroFadeIn 0.8s ease 0.5s forwards;
    }
    .hero-badge {
      opacity: 0; transform: translateY(20px);
      animation: heroFadeIn 0.8s ease 0.1s forwards;
    }
    .hero-visual {
      opacity: 0; transform: translateX(30px);
      animation: heroSlideIn 0.9s ease 0.3s forwards;
    }
    @keyframes heroFadeIn {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroSlideIn {
      to { opacity: 1; transform: translateX(0); }
    }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 13px 30px; border-radius: 50px;
      font-size: 14.5px; font-weight: 600;
      text-decoration: none; cursor: pointer; border: none;
      transition: all 0.25s ease; letter-spacing: 0.005em;
    }
    .btn-primary {
      background: var(--accent); color: #fff;
    }
    .btn-primary:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px var(--accent-glow);
    }
    .btn-secondary {
      background: transparent; color: var(--text);
      border: 1px solid var(--border-strong);
    }
    .btn-secondary:hover {
      border-color: var(--text-tertiary);
      transform: translateY(-2px);
    }
    .btn-outline {
      background: transparent; color: var(--text);
      border: 1px solid var(--border-strong);
    }
    .btn-outline:hover {
      background: var(--accent-light);
      border-color: var(--accent); color: var(--accent);
    }

    /* ─── Product Visual ─── */
    .hero-visual {
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    #product-visual {
      width: 100%; max-width: 400px; aspect-ratio: 1;
      position: relative;
    }
    .product-device {
      width: 100%; height: 100%; position: relative;
    }
    .device-body {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 62%; height: 62%;
      border-radius: 28px;
      background: linear-gradient(148deg, #e5e1dd, #d5d1cd);
      box-shadow:
        0 24px 64px rgba(0,0,0,0.1),
        0 6px 16px rgba(0,0,0,0.06),
        inset 0 1px 0 rgba(255,255,255,0.5),
        inset 0 -1px 0 rgba(0,0,0,0.04);
      overflow: hidden;
    }
    .dark .device-body {
      background: linear-gradient(148deg, #353540, #282830);
      box-shadow:
        0 24px 64px rgba(0,0,0,0.4),
        0 6px 16px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.06),
        inset 0 -1px 0 rgba(0,0,0,0.2);
    }
    .device-top {
      position: absolute; top: 10%; left: 50%;
      transform: translateX(-50%);
      width: 28%; height: 28%;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        var(--accent), #e8a060, var(--accent),
        #c06030, var(--accent)
      );
      box-shadow: 0 0 36px var(--accent-glow), 0 0 72px var(--accent-glow);
      animation: devicePulse 4s ease-in-out infinite;
    }
    .device-top::after {
      content: '';
      position: absolute; top: 15%; left: 15%;
      width: 70%; height: 70%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
    }
    .device-texture {
      position: absolute; inset: 0;
      border-radius: 28px;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 3px,
        rgba(0,0,0,0.012) 3px, rgba(0,0,0,0.012) 4px
      );
    }
    .device-seam {
      position: absolute; bottom: 0; left: 10%; right: 10%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
    }
    .dark .device-seam {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    }
    .device-base {
      position: absolute; bottom: -6%; left: 50%;
      transform: translateX(-50%);
      width: 76%; height: 10%;
      border-radius: 0 0 18px 18px;
      background: linear-gradient(180deg, #c8c4c0, #b8b4b0);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    .dark .device-base {
      background: linear-gradient(180deg, #303038, #282830);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    }
    .device-base::after {
      content: '';
      position: absolute; top: 0; left: 5%; right: 5%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
    }
    .dark .device-base::after {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    }
    @keyframes devicePulse {
      0%, 100% { opacity: 0.8; filter: brightness(1); }
      50% { opacity: 1; filter: brightness(1.15); }
    }
    .glow-ring {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 130%; height: 130%;
      border-radius: 50%;
      background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 65%);
      pointer-events: none;
      animation: glowPulse 4s ease-in-out infinite;
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.04); }
    }

    /* ─── Features ─── */
    .features-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    }
    .feature-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 30px 26px;
      transition: all 0.3s ease;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent);
    }
    .feature-icon {
      width: 52px; height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--accent-light), rgba(196, 104, 48, 0.04));
      display: flex; align-items: center; justify-content: center;
      color: var(--accent); margin-bottom: 18px;
      box-shadow: 0 2px 8px rgba(196, 104, 48, 0.08);
      transition: all 0.3s ease;
    }
    .feature-card:hover .feature-icon {
      box-shadow: 0 4px 16px var(--accent-glow);
      transform: scale(1.05);
    }
    .feature-card h3 {
      font-size: 16.5px; font-weight: 700;
      margin-bottom: 8px; letter-spacing: -0.02em;
    }
    .feature-card p {
      font-size: 13.5px; color: var(--text-secondary);
      line-height: 1.65;
    }

    /* ─── Specs ─── */
    #specs { background: var(--bg-alt); max-width: 100%; padding-left: 32px; padding-right: 32px; }
    .specs-container {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.2fr;
      gap: 56px; align-items: center;
    }
    .specs-visual { display: flex; align-items: center; justify-content: center; overflow: hidden; }
    #specs-visual { width: 100%; max-width: 280px; aspect-ratio: 1; }
    .specs-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
    .spec-item {
      display: grid; grid-template-columns: 150px 1fr; gap: 16px;
      padding: 14px 0; border-bottom: 1px solid var(--border);
      transition: background-color 0.2s ease;
    }
    .spec-item:hover { background: var(--accent-light); border-radius: 6px; padding-left: 12px; margin-left: -12px; margin-right: -12px; }
    .spec-item:last-child { border-bottom: none; }
    .spec-label {
      font-size: 12px; font-weight: 600;
      color: var(--text-tertiary); text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .spec-value { font-size: 14px; color: var(--text); }

    /* ─── Pricing ─── */
    .pricing-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 20px; margin-bottom: 28px;
    }
    .pricing-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 34px 26px; text-align: center;
      position: relative; transition: all 0.3s ease;
    }
    .pricing-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .pricing-card.pricing-featured {
      border-color: var(--accent);
      box-shadow: var(--shadow-lg), 0 0 0 1px var(--accent-glow);
      transform: scale(1.02);
    }
    .pricing-card.pricing-featured:hover {
      transform: scale(1.02) translateY(-4px);
    }
    .pricing-badge {
      display: inline-block; padding: 4px 14px;
      border-radius: 50px; font-size: 11px;
      font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; margin-bottom: 14px;
      background: var(--accent-light); color: var(--accent);
    }
    .pricing-badge.featured { background: var(--accent); color: #fff; }
    .pricing-card h3 {
      font-size: 20px; font-weight: 700;
      margin-bottom: 6px; letter-spacing: -0.02em;
    }
    .price {
      font-size: 46px; font-weight: 800;
      letter-spacing: -0.04em; line-height: 1.1;
      margin-bottom: 2px;
    }
    .price-sub {
      font-size: 13px; color: var(--text-tertiary);
      margin-bottom: 24px;
    }
    .pricing-features {
      list-style: none; text-align: left;
      margin-bottom: 24px;
    }
    .pricing-features li {
      padding: 7px 0; font-size: 13px;
      color: var(--text-secondary);
      display: flex; align-items: center; gap: 10px;
    }
    .pricing-features li::before {
      content: ''; width: 16px; height: 16px;
      border-radius: 50%; flex-shrink: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath d='M4 8l3 3 5-5' stroke='%23c46830' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: contain; background-repeat: no-repeat; background-position: center;
    }
    .pricing-card .btn { width: 100%; }
    .pricing-note {
      text-align: center; font-size: 13px;
      color: var(--text-tertiary);
    }

    /* ─── FAQ ─── */
    .faq-list { max-width: 740px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid var(--border); transition: background-color 0.2s ease; }
    .faq-item:hover { background: var(--accent-light); }
    .faq-item.open:hover { background: rgba(196, 104, 48, 0.12); }
    .dark .faq-item.open:hover { background: rgba(224, 120, 56, 0.12); }
    .faq-question {
      width: 100%; background: none; border: none;
      padding: 22px 0; display: flex;
      align-items: center; justify-content: space-between;
      gap: 16px; font-size: 15.5px; font-weight: 600;
      color: var(--text); cursor: pointer;
      text-align: left; font-family: inherit;
      line-height: 1.5; transition: color 0.2s;
    }
    .faq-question:hover { color: var(--accent); }
    .faq-chevron {
      flex-shrink: 0; transition: transform 0.3s ease;
      color: var(--text-tertiary);
    }
    .faq-item.open .faq-chevron {
      transform: rotate(180deg); color: var(--accent);
    }
    .faq-answer {
      max-height: 0; overflow: hidden;
      transition: max-height 0.4s ease, padding 0.3s ease;
    }
    .faq-item.open .faq-answer { max-height: 300px; padding-bottom: 22px; }
    .faq-answer p {
      font-size: 14.5px; color: var(--text-secondary);
      line-height: 1.7;
    }

    /* ─── Footer ─── */
    footer {
      background: var(--footer-bg);
      border-top: 1px solid var(--border);
      padding: 36px 32px;
    }
    .footer-inner {
      max-width: 1200px; margin: 0 auto;
      text-align: center;
    }
    .footer-brand {
      display: flex; align-items: center;
      justify-content: center; gap: 8px;
      margin-bottom: 10px; font-weight: 600;
      color: var(--text-secondary);
    }
    .footer-brand svg { color: var(--accent); }
    .footer-links {
      display: flex; justify-content: center; gap: 24px;
      margin-bottom: 14px; flex-wrap: wrap;
    }
    .footer-links a {
      font-size: 13px; color: var(--text-secondary);
      text-decoration: none; transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--accent); }
    footer p { font-size: 12.5px; color: var(--text-tertiary); }

    /* ─── Scroll Animations ─── */
    [data-animate] {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    [data-animate].visible { opacity: 1; transform: translateY(0); }
    .features-grid [data-animate] { transition-delay: calc(var(--i, 0) * 0.08s); }
    .pricing-grid [data-animate] { transition-delay: calc(var(--i, 0) * 0.1s); }
    .faq-list [data-animate] { transition-delay: calc(var(--i, 0) * 0.06s); }

    /* ─── Responsive ─── */
    @media (max-width: 900px) {
      .features-grid, .pricing-grid { grid-template-columns: 1fr; }
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center; gap: 36px;
      }
      .hero-sub { margin-left: auto; margin-right: auto; }
      .hero-actions { justify-content: center; }
      .hero-visual { order: -1; }
      .specs-container { grid-template-columns: 1fr; gap: 36px; }
      .specs-visual { order: -1; }
      .spec-item { grid-template-columns: 1fr; gap: 4px; }
      .nav-links { gap: 14px; }
      .nav-links a { font-size: 12.5px; }
    }
    @media (max-width: 480px) {
      section { padding: 72px 16px; }
      .nav-inner { padding: 0 16px; height: 52px; }
      .nav-links { display: none; }
      .hero-text h1 { font-size: 30px; }
      .hero-sub { font-size: 14.5px; }
      .btn { padding: 11px 22px; font-size: 13.5px; }
      .feature-card { padding: 22px; }
      .pricing-card { padding: 26px 18px; }
      .price { font-size: 38px; }
      #specs { padding-left: 16px; padding-right: 16px; }
      .section-header { margin-bottom: 36px; }
    }

    /* ─── Scrollbar ─── */
    ::-webkit-scrollbar { width: 7px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--text-tertiary); }

    /* ─── Focus ─── */
    :focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,document.head.appendChild(t);function n(){let e=document.getElementById(`product-visual`);e&&(e.innerHTML=`
      <div class="product-device">
        <div class="glow-ring"></div>
        <div class="device-body">
          <div class="device-texture"></div>
          <div class="device-top"></div>
        </div>
        <div class="device-base"></div>
      </div>
    `)}function r(){let e=document.getElementById(`specs-visual`);if(!e)return;let t=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);t.setAttribute(`viewBox`,`0 0 200 200`),t.setAttribute(`width`,`100%`),t.setAttribute(`height`,`100%`),t.setAttribute(`aria-hidden`,`true`);let n=document.createElementNS(`http://www.w3.org/2000/svg`,`defs`),r=document.createElementNS(`http://www.w3.org/2000/svg`,`filter`);r.setAttribute(`id`,`glow`);let i=document.createElementNS(`http://www.w3.org/2000/svg`,`feGaussianBlur`);i.setAttribute(`stdDeviation`,`6`),i.setAttribute(`result`,`blur`);let a=document.createElementNS(`http://www.w3.org/2000/svg`,`feMerge`);a.appendChild(document.createElementNS(`http://www.w3.org/2000/svg`,`feMergeNode`)).setAttribute(`in`,`blur`),a.appendChild(document.createElementNS(`http://www.w3.org/2000/svg`,`feMergeNode`)).setAttribute(`in`,`SourceGraphic`),r.appendChild(i),r.appendChild(a),n.appendChild(r),t.appendChild(n);let o=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);o.setAttribute(`cx`,`100`),o.setAttribute(`cy`,`100`),o.setAttribute(`r`,`82`),o.setAttribute(`fill`,`none`),o.setAttribute(`stroke`,`var(--accent)`),o.setAttribute(`stroke-width`,`0.4`),o.setAttribute(`opacity`,`0.15`),t.appendChild(o);let s=document.createElementNS(`http://www.w3.org/2000/svg`,`rect`);s.setAttribute(`x`,`55`),s.setAttribute(`y`,`55`),s.setAttribute(`width`,`90`),s.setAttribute(`height`,`90`),s.setAttribute(`rx`,`18`),s.setAttribute(`fill`,`var(--bg-card)`),s.setAttribute(`stroke`,`var(--border-strong)`),s.setAttribute(`stroke-width`,`0.8`),t.appendChild(s);let c=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);c.setAttribute(`cx`,`100`),c.setAttribute(`cy`,`100`),c.setAttribute(`r`,`26`),c.setAttribute(`fill`,`none`),c.setAttribute(`stroke`,`var(--accent)`),c.setAttribute(`stroke-width`,`1.8`),c.setAttribute(`filter`,`url(#glow)`),c.setAttribute(`opacity`,`0.55`),t.appendChild(c);let l=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);l.setAttribute(`cx`,`100`),l.setAttribute(`cy`,`100`),l.setAttribute(`r`,`5`),l.setAttribute(`fill`,`var(--accent)`),l.setAttribute(`opacity`,`0.75`),t.appendChild(l),[[100,55,100,28],[55,100,28,100],[145,100,172,100],[100,145,100,172]].forEach(([e,n,r,i])=>{let a=document.createElementNS(`http://www.w3.org/2000/svg`,`line`);a.setAttribute(`x1`,e),a.setAttribute(`y1`,n),a.setAttribute(`x2`,r),a.setAttribute(`y2`,i),a.setAttribute(`stroke`,`var(--border-strong)`),a.setAttribute(`stroke-width`,`0.4`),a.setAttribute(`stroke-dasharray`,`2,3`),t.appendChild(a)}),[[30,30],[170,30],[30,170],[170,170]].forEach(([e,n])=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);r.setAttribute(`cx`,e),r.setAttribute(`cy`,n),r.setAttribute(`r`,`3`),r.setAttribute(`fill`,`var(--accent)`),r.setAttribute(`opacity`,`0.25`),t.appendChild(r)}),e.appendChild(t)}function i(t){typeof t==`boolean`?e.dark=t:e.dark=!e.dark,document.documentElement.classList.toggle(`dark`,e.dark),localStorage.setItem(`hearth-dark`,e.dark?`1`:`0`)}function a(){let e=document.getElementById(`nav`);e&&window.addEventListener(`scroll`,()=>{e.classList.toggle(`scrolled`,window.scrollY>40)},{passive:!0})}function o(){document.querySelectorAll(`[data-test="faq-q"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.faq-item`),n=t.querySelector(`[data-test="faq-a"]`),r=t.classList.contains(`open`);document.querySelectorAll(`.faq-item.open`).forEach(e=>{e!==t&&(e.classList.remove(`open`),e.querySelector(`.faq-question`).setAttribute(`aria-expanded`,`false`),e.querySelector(`[data-test="faq-a"]`).hidden=!0)}),r?(t.classList.remove(`open`),e.setAttribute(`aria-expanded`,`false`),n.hidden=!0):(t.classList.add(`open`),e.setAttribute(`aria-expanded`,`true`),n.hidden=!1)})})}function s(){let e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`visible`),e.unobserve(t.target))})},{threshold:.08,rootMargin:`0px 0px -40px 0px`});document.querySelectorAll(`[data-animate]`).forEach(t=>e.observe(t))}function c(){document.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=document.querySelector(e.getAttribute(`href`));n&&n.scrollIntoView({behavior:`smooth`,block:`start`})})})}function l(){n(),r(),a(),o(),s(),c(),localStorage.getItem(`hearth-dark`)===`1`&&(e.dark=!0,document.documentElement.classList.add(`dark`));let t=document.getElementById(`dark-toggle`);t&&t.addEventListener(`click`,()=>i()),window.APP={setDark:function(e){i(e)},getDark:function(){return e.dark}}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,l):l()})();