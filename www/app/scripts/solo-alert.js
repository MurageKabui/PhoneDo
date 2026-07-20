((root, factory) => {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof exports === 'object') {
    exports["SA"] = factory();
  }
  else {
    root["SA"] = factory();
  }

})(this, () => {
  const SA = {
    defaults: {
      title: "Title",
      body: "",
      icon: "",
      theme: "auto",
      html: "",
      type: "text",
      textLimit: 100,
      useTransparency: true,

      okText: "OK",
      cancelText: "CANCEL",

      onOk: function () {},
      onCancel: function () {},
      onInput: function () {},
    },
    styles: (themer, wrapper_bg) => {
      return `
  .SA-wrapper{
      width:100vw;
      height:100vh;
      z-index:99999999999;
      margin:0;
      padding:0;
      position:fixed;
      top:0;
      left:0;
      /*background-color:${wrapper_bg};*/
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      user-select:none;
      -webkit-user-select:none;
      -moz-user-select:none;
      transition: opacity 0.3s ease;
      opacity:1;
  }
  .SA * {
       font-family: "kanitr";
      font-weight:400;
      caret-color: ${themer.blue};
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
  }
  .SA-wrapper .SA {
      width: 82%;
      max-width: 320px;
      min-width: 260px;
      height:auto;
      background-color:${themer.background};
      border-radius: 14px;
      padding: 1.25rem;
      box-shadow: 0 15px 35px ${themer.shadowGrey};
      position: relative;
      animation-name: "flipInX";
      animation-duration: 0.8s;
  }
  .SA-wrapper .SA h3{
      margin: 0 0 0.5rem 0;
      font-weight:600;
      font-size:1.15rem;
      letter-spacing:-0.01em;
      line-height:1.3;
      word-wrap:break-word;
      color:${themer.color};
      text-align: center;
  }
  .SA-wrapper .SA .SA-content{
      min-height:1rem;
      margin-bottom:1.35rem;
      word-wrap:break-word;
      color:${themer.color};
      max-height: calc(var(--vh, 1vh) * 60 - 5rem);
      overflow-y: auto;
      text-align: center;
  }
  .SA-wrapper .SA .SA-content .SA-body-text{
      font-size:0.925rem;
      line-height: 1.5;
      margin: 0 auto;
      max-width: 42ch;
      color:${themer.textGrey};
  }
  .SA-wrapper .SA .SA-content .SA-icon{
      width:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-bottom: 0.75rem;
      transform: scale(0.85);
  }
  .SA-wrapper .SA .SA-actions{
      display:flex;
      align-items:stretch;
      justify-content: center;
      gap: 0;
      border-top: 1px solid ${themer.borderGrey};
      margin: 0 -1.25rem -1.25rem -1.25rem;
  }
  .SA-wrapper .SA .SA-actions .SA-action-button{
      flex: 1 1 0;
      min-width: 0;
      height: 3.1rem; /* Compact but tap-friendly */
      outline: none;
      padding: 0 0.85rem;
      color:${themer.blue};
      font-size:0.9rem;
      font-weight:600;
      letter-spacing:0.02em;
      border:0;
      border-radius: 0;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      background-color:transparent;
      transition: background-color 0.15s;
      text-transform: uppercase;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  /* Inline layout (1-2 buttons): thin vertical divider between */
  .SA-wrapper .SA .SA-actions:not(.SA-stacked) .SA-action-button + .SA-action-button{
      border-left: 1px solid ${themer.borderGrey};
  }
  /* Stacked layout (3+ buttons): full-width rows with horizontal dividers */
  .SA-wrapper .SA .SA-actions.SA-stacked{
      flex-direction: column;
  }
  .SA-wrapper .SA .SA-actions.SA-stacked .SA-action-button{
      flex: none;
      width: 100%;
      height: 3rem;
  }
  .SA-wrapper .SA .SA-actions.SA-stacked .SA-action-button + .SA-action-button{
      border-top: 1px solid ${themer.borderGrey};
  }
  /* Emphasis variants (subtle, no filled blocks) */
  .SA-wrapper .SA .SA-actions .SA-action-button.SA-primary{ font-weight:700; }
  .SA-wrapper .SA .SA-actions .SA-action-button.SA-danger{ color:${themer.red}; }
  .SA-wrapper .SA .SA-actions .SA-action-button.SA-muted{ color:${themer.textGrey}; }
  .SA-wrapper .SA .SA-actions .SA-action-button:focus{
      background-color:${themer.shadowLightGrey};
  }
  .SA-wrapper .SA .SA-actions .SA-action-button:active{
      background-color:${themer.shadowGrey};
  }
  .SA-wrapper .SA .SA-actions .SA-action-button[disabled]{ opacity:0.5; cursor:default; }
  .SA-wrapper .SA .SA-content .SA-prompt-input-heading{
      color:${themer.textGrey};
      font-size:.9rem;
      margin-bottom: 0.5rem;
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper{
      width:100%;
      margin-top: 1rem;
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper input{
      border:0;
      outline:0;
      border-bottom:2px solid ${themer.borderGrey};
      background-color: ${themer.shadowLightGrey};
      border-radius: 8px 8px 0 0;
      font-size:1.05rem;
      padding: 10px;
      width:100%;
      color:${themer.color};
      transition: all 0.2s;
      background: transparent;
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper input:focus{
      border-bottom-color: ${themer.blue};
      // background-color: ${themer.shadowGrey};
  }
  .SA-wrapper .SA .SA-content .SA-character-counter{
      font-size:.75rem;
      display:block;
      text-align:right;
      margin-top: 4px;
      color:${themer.textGrey};
  }
  /* SVG Icon Styles */
  .SA-svg-box {
      width: 80px;
      height: 80px;
      position: relative;
      margin: 0 auto;
  }
  .SA-circular {
      width: 80px;
      height: 80px;
  }
  .path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
      animation: SA_dash 1.5s ease-in-out;
  }
  .SA-green-stroke { stroke: #2ed573; }
  .SA-red-stroke { stroke: #ff4757; }
  .SA-yellow-stroke { stroke: #ffa502; }

  .SA-checkmark, .SA-cross, .SA-alert-sign {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 0;
      left: 0;
  }
  .SA-checkmark path, .SA-cross path, .SA-line {
      stroke-width: 5;
      stroke-linecap: round;
      fill: none;
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      animation: SA_draw 0.5s ease-out forwards;
      animation-delay: 0.2s;
  }
  .SA-dot {
      fill: #ffa502;
  }
  @keyframes SA_dash {
      0% { stroke-dashoffset: 1000; }
      100% { stroke-dashoffset: 0; }
  }
  @keyframes SA_draw {
      to { stroke-dashoffset: 0; }
  }
  .do-not-flow{ overflow: hidden; }

  /* ---- Ask AI dialog (uniform with SoloAlert; opens/dismisses from the bottom) ---- */
  .SA-wrapper.SA-bottom{ justify-content:flex-end; }
  .SA-wrapper.SA-bottom .SA{ margin-bottom: max(20px, env(safe-area-inset-bottom, 0px)); }
  .SA-wrapper .SA .SA-content .SA-askai-input{
      width:100%; min-height:120px; max-height:180px; resize:none; display:block;
      border:0; outline:0; border-bottom:2px solid ${themer.borderGrey}; border-radius:8px 8px 0 0;
      font-size:1rem; padding:11px; color:${themer.color}; transition:all .2s;
      font-family:"kanitr"; line-height:1.5; text-align:left; margin-top:.35rem;
        background: transparent;
  }
  .SA-wrapper .SA .SA-content .SA-askai-input:focus{ border-bottom-color:${themer.blue}; background-color:${themer.shadowGrey}; }
  .SA-wrapper .SA .SA-content .SA-askai-input::placeholder{ color:${themer.textGrey}; }
  .SA-wrapper .SA .SA-content .SA-askai-result{ display:none; margin-top:14px; border:1px solid ${themer.borderGrey}; border-radius:10px; overflow:hidden; text-align:left; }
  .SA-wrapper .SA .SA-content .SA-askai-result.SA-on{ display:block; }
  .SA-wrapper .SA .SA-content .SA-askai-rhead{ display:flex; align-items:center; justify-content:space-between; padding:7px 10px; font-size:.7rem; text-transform:uppercase; letter-spacing:.06em; color:${themer.textGrey}; border-bottom:1px solid ${themer.borderGrey}; }
  .SA-wrapper .SA .SA-content .SA-askai-copy{ border:0; background:transparent; color:${themer.blue}; cursor:pointer; font-size:.75rem; font-family:"kanitr"; font-weight:600; }
  .SA-wrapper .SA .SA-content .SA-askai-code{ margin:0; padding:10px 12px; max-height:170px; overflow:auto; font-family:"Consolas","Courier New",monospace; font-size:.8rem; line-height:1.5; color:${themer.color}; white-space:pre; text-align:left; }
  .SA-wrapper .SA .SA-content .SA-askai-caret{ display:inline-block; width:6px; height:12px; background:${themer.blue}; vertical-align:text-bottom; animation:SA_blink 1s step-end infinite; }
  @keyframes SA_blink{ 50%{ opacity:0; } }
  .SA-wrapper .SA .SA-actions .SA-action-button .SA-spin{ width:14px; height:14px; border:2px solid ${themer.borderGrey}; border-top-color:${themer.blue}; border-radius:50%; display:inline-block; animation:SA_spin .7s linear infinite; vertical-align:middle; margin-right:6px; }
  @keyframes SA_spin{ to{ transform:rotate(360deg); } }
  `;
    },
    themes: ["light", "dark"],
    data_icons: {
      success: `<div class="SA-svg-box"><svg class="SA-circular SA-green-stroke"><circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/></svg><svg class="SA-checkmark SA-green-stroke"><g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)"><path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53"/></g></svg></div>`,
      error: `<div class="SA-svg-box"><svg class="SA-circular SA-red-stroke"><circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/></svg><svg class="SA-cross SA-red-stroke"><g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)"><path class="SA-first-line" d="M634.087,300.805L673.361,261.53" fill="none"/></g><g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)"><path class="SA-second-line" d="M634.087,300.805L673.361,261.53"/></g></svg></div>`,
      warning: `<div class="SA-svg-box"><svg class="SA-circular SA-yellow-stroke"><circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/></svg><svg class="SA-alert-sign SA-yellow-stroke"><g transform="matrix(1,0,0,1,-615.516,-257.346)"><g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)"><path class="SA-line" d="M634.087,300.805L673.361,261.53" fill="none"/></g><g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)"><circle class="SA-dot" cx="621.52" cy="316.126" r="1.318" /></g></g></svg></div>`
    },
    data_theme: {
      light: {
        color: "#212121",
        background: "#ffffff",
        blue: "#3f51b5",
        wrapperBg: "rgba(0, 0, 0, 0.2)",
        transparentWrapperBg: "rgba(0, 0, 0, 0.35)",
        textGrey: "#757575",
        darkGrey: "#9e9e9e",
        borderGrey: "#e0e0e0",
        shadowGrey: "rgba(0,0,0,0.15)",
        shadowLightGrey: "rgba(0,0,0,0.05)",
        red: "#e5484d",
        onAccent: "#ffffff"
      },
      dark: {
        color: "#cfcfcf",
        background: "#2a2a2a",
        blue: "#9eb99eff",
        wrapperBg: "rgba(0, 0, 0, 0.4)",
        transparentWrapperBg: "rgba(0, 0, 0, 0.55)",
        textGrey: "#bbbbbb",
        darkGrey: "#9e9e9e",
        borderGrey: "#3d3d3d",
        shadowGrey: "rgba(0,0,0,0.5)",
        shadowLightGrey: "rgba(255,255,255,0.05)",
        red: "#ff6b6b",
        onAccent: "#1a1a1a"
      }
    },
    currentTheme: "light",

    _createModal: (options, type) => {
      const {
        title = SA.defaults.title,
        body = SA.defaults.body,
        icon = "",
        html = "",
        theme = SA.defaults.theme,
        useTransparency = SA.defaults.useTransparency,
        textLimit = SA.defaults.textLimit,
        attributes = {},
        onOk = SA.defaults.onOk,
        onCancel = SA.defaults.onCancel,
        onInput = SA.defaults.onInput,
        okText = SA.defaults.okText,
        cancelText = SA.defaults.cancelText,
        buttons = null
      } = options;

      // Theme detection
      SA.currentTheme = theme === "auto"
        ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark")
        : (SA.data_theme[theme] ? theme : "light");

      const themer = SA.data_theme[SA.currentTheme];
      const wrapperBg = useTransparency ? themer.transparentWrapperBg : themer.wrapperBg;

      // Viewport height fix for mobile
      const setVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      setVh();

      // Base IDs for accessibility
      const modalId = `SA-modal-${Math.random().toString(36).substr(2, 9)}`;
      const titleId = `${modalId}-title`;
      const bodyId = `${modalId}-body`;

      const bWrapper = document.createElement("div");
      bWrapper.id = modalId;

      const style = document.createElement("style");
      style.textContent = SA.styles(themer, wrapperBg);
      bWrapper.appendChild(style);

      const wrapper = document.createElement("div");
      wrapper.classList.add("SA-wrapper", "animate__animated", "animate__fadeIn");
      wrapper.style.setProperty('--animate-duration', '350ms');
      bWrapper.appendChild(wrapper);

      const s_a = document.createElement("div");
      s_a.classList.add("SA", "animate__animated", "animate__flipInX");
      s_a.style.setProperty('--animate-duration', '350ms');
      s_a.setAttribute("role", "dialog");
      s_a.setAttribute("aria-modal", "true");
      wrapper.appendChild(s_a);

      if (title) {
        const titleElem = document.createElement("h3");
        titleElem.id = titleId;
        titleElem.textContent = title;
        s_a.appendChild(titleElem);
        s_a.setAttribute("aria-labelledby", titleId);
      }

      const content = document.createElement("div");
      content.classList.add("SA-content");
      s_a.appendChild(content);

      if (icon && SA.data_icons[icon]) {
        const iconDiv = document.createElement("div");
        iconDiv.classList.add("SA-icon");
        iconDiv.innerHTML = SA.data_icons[icon];
        content.appendChild(iconDiv);
      }

      if (body) {
        const bodyElem = document.createElement("p");
        bodyElem.id = bodyId;
        bodyElem.classList.add("SA-body-text");
        bodyElem.textContent = body;
        content.appendChild(bodyElem);
        s_a.setAttribute("aria-describedby", bodyId);
      }

      let promptInput = null;
      if (type === "prompt") {
        const inputWrapper = document.createElement("div");
        inputWrapper.classList.add("SA-prompt-input-wrapper");

        promptInput = document.createElement("input");
        Object.keys(attributes).forEach(attr => promptInput.setAttribute(attr, attributes[attr]));
        promptInput.type = options.type || "text";
        promptInput.setAttribute("autocomplete", "off");
        if (options["aria-label"]) promptInput.setAttribute("aria-label", options["aria-label"]);

        inputWrapper.appendChild(promptInput);

        const counter = document.createElement("span");
        counter.classList.add("SA-character-counter");
        const limit = typeof textLimit === "number" ? textLimit : 100;
        counter.textContent = `${promptInput.value.length} / ${limit}`;

        promptInput.addEventListener("input", (e) => {
          if (promptInput.value.length > limit) {
            promptInput.value = promptInput.value.substring(0, limit);
          }
          counter.textContent = `${promptInput.value.length} / ${limit}`;
          if (typeof onInput === "function") onInput(e);
        });

        inputWrapper.appendChild(counter);
        content.appendChild(inputWrapper);
      }

      if (html) {
        const otherContent = document.createElement("div");
        const htmlId = `${modalId}-html`;
        otherContent.id = htmlId;
        otherContent.innerHTML = html;
        content.appendChild(otherContent);
        if (!body) s_a.setAttribute("aria-describedby", htmlId);
      }

      const actions = document.createElement("div");
      actions.classList.add("SA-actions");
      s_a.appendChild(actions);

      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("SA-action-button");
      cancelBtn.textContent = cancelText;

      const okBtn = document.createElement("button");
      okBtn.classList.add("SA-action-button");
      okBtn.textContent = okText;

      // Custom buttons: an array of { text, value, primary, danger, muted, onClick }.
      // 1-2 buttons stay inline; 3+ auto-stack into full-width rows.
      const customButtons = Array.isArray(buttons) && buttons.length ? buttons : null;
      let primaryAction = okBtn; // what Enter triggers

      if (customButtons) {
        if (customButtons.length > 2) actions.classList.add("SA-stacked");
        customButtons.forEach((b) => {
          const btn = document.createElement("button");
          btn.classList.add("SA-action-button");
          if (b.primary) btn.classList.add("SA-primary");
          if (b.danger) btn.classList.add("SA-danger");
          if (b.muted) btn.classList.add("SA-muted");
          btn.textContent = (b.text != null) ? b.text : "OK";
          btn.onclick = () => {
            const inputVal = promptInput ? promptInput.value : undefined;
            const resolveVal = ("value" in b) ? b.value : (type === "prompt" ? inputVal : true);
            if (typeof b.onClick === "function") b.onClick(resolveVal, inputVal);
            closeModal(resolveVal);
            if (typeof bWrapper._resolve === "function") bWrapper._resolve(resolveVal);
          };
          actions.appendChild(btn);
          if (b.primary) primaryAction = btn;
        });
        // If no button was flagged primary, Enter triggers the last one.
        if (!customButtons.some(b => b.primary)) primaryAction = actions.lastElementChild;
      } else {
        if (type === "confirm" || type === "prompt") {
          actions.appendChild(cancelBtn);
        }
        actions.appendChild(okBtn);
      }

      const lastFocused = document.activeElement;
      bWrapper._lastFocused = lastFocused;
      document.body.appendChild(bWrapper);
      document.body.classList.add("do-not-flow");

      // Focus management
      if (promptInput) {
        promptInput.focus();
      } else {
        const firstAction = actions.querySelector(".SA-action-button");
        if (firstAction) firstAction.focus();
      }

      const closeModal = (resolvedValue) => {
        wrapper.classList.remove("animate__fadeIn");
        wrapper.classList.add("animate__fadeOut");
        s_a.classList.remove("animate__flipInX");
        s_a.classList.add("animate__flipOutX");

        setTimeout(() => {
          if (bWrapper.parentNode) {
            document.body.removeChild(bWrapper);
            document.body.classList.remove("do-not-flow");
            if (lastFocused && typeof lastFocused.focus === "function") {
              lastFocused.focus();
            }
          }
        }, 300);
      };

      // Tab trapping
      const focusableElements = bWrapper.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      bWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        } else if (e.key === 'Escape') {
          closeModal(null);
          bWrapper._resolve(customButtons ? null : (type === "prompt" ? null : false));
        } else if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
          if (primaryAction) primaryAction.click();
        }
      });

      wrapper.addEventListener("click", (e) => {
        if (e.target === wrapper) {
          closeModal(null);
          bWrapper._resolve(customButtons ? null : (type === "prompt" ? null : false));
        }
      });

      return new Promise((resolve) => {
        bWrapper._resolve = resolve;
        okBtn.onclick = () => {
          const val = type === "prompt" ? promptInput.value : true;
          if (typeof onOk === "function") onOk(val);
          closeModal(val);
          resolve(val);
        };
        cancelBtn.onclick = () => {
          if (typeof onCancel === "function") onCancel();
          closeModal(null);
          resolve(null);
        };
      });
    },

    alert: (options) => {
      return SA._createModal(options, "alert");
    },
    prompt: (options) => {
      return SA._createModal(options, "prompt");
    },
    confirm: (options) => {
      return SA._createModal(options, "confirm");
    },

    // Ask AI - themed exactly like the other SoloAlert dialogs, but it opens
    // and dismisses from the BOTTOM of the screen (animate.css fadeInUp / fadeOutDown).
    // options: { title, body, placeholder, theme, useTransparency,
    //            okText, cancelText, insertText, regenerateText,
    //            onGenerate(prompt, api)  // Promise<string> OR api.append()/api.done()/api.error()
    //            onInsert(code) }
    // resolves with the inserted code, or null if cancelled.
    askAI: (options = {}) => {
      const {
        title = "Ask AI",
        body = "Describe the script you want to create and PhoneDo will generate it.",
        placeholder = "Describe the script you want to create…",
        theme = SA.defaults.theme,
        useTransparency = SA.defaults.useTransparency,
        okText = "Generate",
        cancelText = "Cancel",
        insertText = "Insert",
        regenerateText = "Regenerate",
        onGenerate = null,
        onInsert = null
      } = options;

      SA.currentTheme = theme === "auto"
        ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark")
        : (SA.data_theme[theme] ? theme : "light");
      const themer = SA.data_theme[SA.currentTheme];
      const wrapperBg = useTransparency ? themer.transparentWrapperBg : themer.wrapperBg;
      const setVh = () => { let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); };
      setVh();

      const modalId = `SA-modal-${Math.random().toString(36).substr(2, 9)}`;
      const bWrapper = document.createElement("div"); bWrapper.id = modalId;
      const style = document.createElement("style"); style.textContent = SA.styles(themer, wrapperBg); bWrapper.appendChild(style);

      const wrapper = document.createElement("div");
      wrapper.classList.add("SA-wrapper", "SA-bottom", "animate__animated", "animate__fadeIn");
      wrapper.style.setProperty('--animate-duration', '350ms'); bWrapper.appendChild(wrapper);
      const s_a = document.createElement("div");
      s_a.classList.add("SA", "SA-askai", "animate__animated", "animate__fadeInUp");
      s_a.style.setProperty('--animate-duration', '400ms');
      s_a.setAttribute("role", "dialog"); s_a.setAttribute("aria-modal", "true"); wrapper.appendChild(s_a);

      const titleElem = document.createElement("h3"); titleElem.textContent = title; s_a.appendChild(titleElem);
      const content = document.createElement("div"); content.classList.add("SA-content"); s_a.appendChild(content);

      if (body) { const b = document.createElement("p"); b.classList.add("SA-body-text"); b.textContent = body; content.appendChild(b); }

      const input = document.createElement("textarea");
      input.classList.add("SA-askai-input"); input.setAttribute("placeholder", placeholder); input.setAttribute("aria-label", "AI prompt");
      content.appendChild(input);

      const result = document.createElement("div"); result.classList.add("SA-askai-result");
      const rhead = document.createElement("div"); rhead.classList.add("SA-askai-rhead");
      const rlabel = document.createElement("span"); rlabel.textContent = "Generated"; rhead.appendChild(rlabel);
      const copyBtn = document.createElement("button"); copyBtn.type = "button"; copyBtn.classList.add("SA-askai-copy"); copyBtn.textContent = "Copy"; rhead.appendChild(copyBtn);
      const codeEl = document.createElement("pre"); codeEl.classList.add("SA-askai-code");
      result.appendChild(rhead); result.appendChild(codeEl); content.appendChild(result);

      const actions = document.createElement("div"); actions.classList.add("SA-actions"); s_a.appendChild(actions);
      const cancelBtn = document.createElement("button"); cancelBtn.classList.add("SA-action-button"); cancelBtn.textContent = cancelText;
      const okBtn = document.createElement("button"); okBtn.classList.add("SA-action-button"); okBtn.textContent = okText;
      actions.appendChild(cancelBtn); actions.appendChild(okBtn);

      const lastFocused = document.activeElement; bWrapper._lastFocused = lastFocused;
      document.body.appendChild(bWrapper); document.body.classList.add("do-not-flow");
      input.focus();

      let streaming = "", finalCode = "", busy = false, phase = "prompt";
      const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const closeModal = () => {
        wrapper.classList.remove("animate__fadeIn"); wrapper.classList.add("animate__fadeOut");
        s_a.classList.remove("animate__fadeInUp"); s_a.classList.add("animate__fadeOutDown");
        setTimeout(() => {
          if (bWrapper.parentNode) {
            document.body.removeChild(bWrapper); document.body.classList.remove("do-not-flow");
            if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
          }
        }, 350);
      };

      copyBtn.onclick = () => { if (navigator.clipboard) navigator.clipboard.writeText(finalCode); copyBtn.textContent = "Copied"; setTimeout(() => { copyBtn.textContent = "Copy"; }, 1200); };

      const setBusy = (b) => {
        busy = b; okBtn.disabled = b;
        if (b) okBtn.innerHTML = '<span class="SA-spin"></span>GENERATING';
        else okBtn.textContent = (phase === "done") ? insertText : okText;
      };
      const showResult = () => result.classList.add("SA-on");
      const appendStream = (text) => { streaming += text; codeEl.innerHTML = esc(streaming) + '<span class="SA-askai-caret"></span>'; showResult(); codeEl.scrollTop = codeEl.scrollHeight; };
      const finish = (code) => {
        finalCode = (code != null) ? code : streaming; streaming = "";
        codeEl.textContent = finalCode; showResult();
        phase = "done"; setBusy(false); cancelBtn.textContent = regenerateText;
      };
      const failGen = (err) => { setBusy(false); showResult(); codeEl.textContent = "⚠ " + (err && err.message ? err.message : (err || "Generation failed")); };

      const doGenerate = () => {
        const prompt = input.value.trim();
        if (!prompt || busy) return;
        streaming = ""; finalCode = ""; codeEl.textContent = ""; result.classList.remove("SA-on");
        phase = "generating"; setBusy(true); cancelBtn.textContent = cancelText;
        const api = { append: appendStream, token: appendStream, done: finish, error: failGen };
        let ret;
        try { ret = onGenerate ? onGenerate(prompt, api) : null; } catch (e) { failGen(e); return; }
        if (ret && typeof ret.then === "function") { ret.then(finish, failGen); }
        else if (!onGenerate) { finish("// (no onGenerate provided)\n// prompt: " + prompt); }
      };

      return new Promise((resolve) => {
        bWrapper._resolve = resolve;
        okBtn.onclick = () => {
          if (busy) return;
          if (phase === "done") {
            if (typeof onInsert === "function") onInsert(finalCode);
            closeModal(); resolve(finalCode);
          } else { doGenerate(); }
        };
        cancelBtn.onclick = () => {
          if (busy) { closeModal(); resolve(null); return; }
          if (phase === "done") { doGenerate(); }
          else { closeModal(); resolve(null); }
        };
        bWrapper.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') { if (!busy) { closeModal(); resolve(null); } }
          else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (phase === "done") okBtn.click(); else doGenerate(); }
        });
        wrapper.addEventListener("click", (e) => { if (e.target === wrapper && !busy) { closeModal(); resolve(null); } });
      });
    },

    closeAll: () => {
      const wrappers = document.querySelectorAll('.SA-wrapper');
      wrappers.forEach(wrapper => {
        const bWrapper = wrapper.parentElement;
        if (bWrapper && bWrapper.id && bWrapper.id.startsWith('SA-modal-')) {
          const s_a = wrapper.querySelector('.SA');
          if (s_a) {
            wrapper.classList.remove("animate__fadeIn");
            wrapper.classList.add("animate__fadeOut");
            s_a.classList.remove("animate__flipInX");
            s_a.classList.add("animate__flipOutX");

            setTimeout(() => {
              if (bWrapper.parentNode) {
                document.body.removeChild(bWrapper);
                document.body.classList.remove("do-not-flow");
                if (bWrapper._lastFocused && typeof bWrapper._lastFocused.focus === "function") {
                  bWrapper._lastFocused.focus();
                }
              }
            }, 300);
            if (typeof bWrapper._resolve === 'function') {
              bWrapper._resolve(null);
            }
          }
        }
      });
    },
    isOpened: () => {
      return document.querySelectorAll('.SA-wrapper').length > 0;
    },
    backup: {
      alert: window.alert,
      prompt: window.prompt,
      confirm: window.confirm
    },
    prettyAlert: {
      alert(text, options = {}) { return SA.alert({ body: text, ...options }); },
      prompt(text, options = {}) { return SA.prompt({ body: text, ...options }); },
      confirm(text, options = {}) { return SA.confirm({ body: text, ...options }); }
    },
    setAsDefault() {
      window.alert = SA.prettyAlert.alert;
      window.prompt = SA.prettyAlert.prompt;
      window.confirm = SA.prettyAlert.confirm;
    },
    resetDefaults() {
      window.alert = SA.backup.alert;
      window.prompt = SA.backup.prompt;
      window.confirm = SA.backup.confirm;
    }
  };
  return SA;
});
