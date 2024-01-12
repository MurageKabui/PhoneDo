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
      useTransparency: false,
      onOk: function () { },
      onCancel: function () { },
      onInput: function () { },
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
      background-color:${wrapper_bg};
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      
      user-select:none;
      -webkit-user-select:none;
      -moz-user-select:none;
      transition:background-color 2s ease;
      opacity:1;

  }
  .SA *{
      font-family: "Poppins";
      font-weight:400;
      caret-color: ${themer.blue};
  }
  
  .SA-wrapper .SA{
      min-width:10rem;
      max-width:20rem;
      width:calc(100vw - 5rem);
      height:auto;
      background-color:${themer.background};
      border-radius: 15px;
      padding:1rem 1rem .5rem 1rem;
      margin:2rem;
      box-shadow: 0 19px 38px ${themer.shadowLightGrey}, 0 15px 12px ${themer.shadowLightGrey};
      
      animation-name: flipInX;
      animation-duration: 0.6s;
  }
  .SA-wrapper .SA h3{
      margin:0;
      margin-bottom:.7rem;
      padding:.5rem .5rem 0 .5rem;
      font-weight:500;
      font-size:1.25rem;
      word-wrap:break-word;
      color:${themer.color};
  }
  .SA-wrapper .SA .SA-content{
      min-height:2rem;
      margin-bottom:1rem;
      padding:0 .5rem;
      word-wrap:break-word;
      color:${themer.color};
      max-heignt:calc(70vh - 7rem);
      overflow-y: scroll;
  }
  .SA-wrapper .SA .SA-content .SA-body-text{
      font-size:.999rem;
  }
  .SA-wrapper .SA .SA-content .SA-other-content{
      width:100%;
      max-height:calc(70vh - 9rem);
      display:flex;
      align-items:center;
      justify-content:flex-start;
      flex-direction:column;
      overflow:auto;
  }
  .SA-wrapper .SA .SA-content .SA-icon{
      width:100%;
      display:flex;
      align-items:center;
      justify-content:center;
  }
  .SA-wrapper .SA .SA-content .SA-other-content>*{
      width:100%;
      margin-bottom:.5rem;
      border:none;
      color:${themer.color};
      background-color:${themer.background};
      border-radius:2px;
  }
  .SA-wrapper .SA .SA-content .SA-other-content iframe{
      background-color:white;
  }
  .SA-wrapper .SA .SA-actions{
      display:flex;
      align-items:center;
      justify-content:flex-end;
  }
  .SA-wrapper .SA .SA-actions .SA-action-button{
      min-width:3.5rem;
      min-height:2.7rem;
      outline:0;
      padding:.5rem .5rem;
      margin-left:.5rem;
      color:${themer.blue};
      font-size:.9rem;
      font-weight:500;
      border:0;
      border-radius:2px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      background-color:transparent;
      transition:background-color .2s ease-out;
      text-transform:uppercase;
      cursor:pointer;
  }
  .SA-wrapper .SA .SA-actions .SA-action-button:active{
      background-color:${themer.shadowLightGrey};
  } 
  .SA-wrapper .SA .SA-content .SA-prompt-input-heading{
      color:${themer.textGrey};
      font-size:.9rem;
      word-wrap:break-word;
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper{
      display:inline-flex;
      flex-direction:column;
      align-items:flex-start;
      justify-content:flex-start;
      padding:.2rem;
      min-height:4.7rem;
      width:100%;
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper>div>label{
      color:${themer.blue};
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper>div{
      padding:.3rem 0;
      font-size:.7rem;
      width:100%;
      height:.9rem;
      display:block;
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper>span{
      font-size:.75rem;
      display:block;
      text-align:right;
      width:100%;
      color:${themer.textGrey};
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper>input{
      border:0;
      outline:0;
      border-bottom:1px solid ${themer.borderGrey};
      background-color:transparent;
      font-size:1.1rem;
      padding:2px;
      margin:.3rem 0 .5rem 0;
      width:98%;
      color:${themer.color};
  }
  .SA-wrapper .SA .SA-content .SA-prompt-input-wrapper>input:focus{
      border-bottom:2px solid ${themer.blue};
  }
  @keyframes SA_fade_out{
      0%{
          opacity:1;
      }
      100%{
          opacity:0;
          background-color:rgba(0,0,0);
          filter:brightness(0%);
      }
  }
  .do-not-flow{
    overflow: hidden;
  }`},
    themes: ["light", "dark"],
    data_icons: {
      success: `
  <div class="SA-svg-box">
                  <svg class="SA-circular SA-green-stroke">
                      <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                  </svg>
                  <svg class="SA-checkmark SA-green-stroke">
                      <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                          <path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53"/>
                      </g>
                  </svg>
              </div>
  `,
      error: `
  <div class="SA-svg-box">
                  <svg class="SA-circular SA-red-stroke">
                      <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                  </svg>
                  <svg class="SA-cross SA-red-stroke">
                      <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                          <path class="SA-first-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                      </g>
                      <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                          <path class="SA-second-line" d="M634.087,300.805L673.361,261.53"/>
                      </g>
                  </svg>
              </div>
  `,
      warning: `
  <div class="SA-svg-box">
                  <svg class="SA-circular SA-yellow-stroke">
                      <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                  </svg>
                  <svg class="SA-alert-sign SA-yellow-stroke">
                      <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                          <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                              <path class="SA-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                          </g>
                          <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                              <circle class="SA-dot" cx="621.52" cy="316.126" r="1.318" />
                          </g>
                      </g>
                  </svg>
              </div>
  `
    },
    data_theme: {
      light: {
        color: "#212121",
        background: "#ffffff",
        blue: "#3f51b5",
        wrapperBg: "#cccccc",
        transparentWrapperBg: "rgba(0, 0, 0, 0.5)",
        textGrey: "#757575",
        darkGrey: "#9e9e9e",
        borderGrey: "#757575",
        shadowGrey: "rgba(0,0,0,0.24)",
        shadowLightGrey: "rgba(0,0,0,0.12)"
      },
      dark: {
        color: "var(--body-color)",
        background: "var(--menu-bgcolor)",
        blue: "var(--jqc-info)",
        wrapperBg: "#cccccc",
        transparentWrapperBg: "rgba(0, 0, 0, 0.5)",
        textGrey: "#c5c8ca",
        darkGrey: "#9e9e9e",
        borderGrey: "#888888",
        shadowGrey: "rgba(0,0,0,0.24)",
        shadowLightGrey: "rgba(0,0,0,0.12)"
      }
    },
    _characterCounter: (q, m, l) => {
      var max = parseInt(l);
      var input = q
      var counter = m;
      if (input.value.length > max) {
        input.value = input.value.substring(0, max);
        return false;
      } else { counter.textContent = `${input.value.length} / ${max}`; }
    },
    changeTheme: (n) => {
      SA.currentTheme = n;
    },
    currentTheme: "light",
    alert: (options) => {
      if (typeof (options) !== "object" || Array.isArray(options)) {
        throw new TypeError("SA Alert: provided argument must be an Object!")
      }
      var inp_title = (/string|number/).test(typeof (options.title)) ? options.title : SA.defaults.title || "Title";
      var inp_body = (/string|number/).test(typeof (options.body)) ? options.body : SA.defaults.body || "";
      var inp_icon = typeof (options.icon) === "string" && Object.keys(SA.data_icons).includes(options.icon) ? options.icon : SA.defaults.icon || "";
      var inp_html = typeof (options.html) === "string" ? options.html : SA.defaults.html || "";
      var inp_theme = (/dark|light|auto/).test(options.theme) ? options.theme : SA.defaults.theme || "auto";
      var inp_onOk = typeof (options.onOk) === "function" ? options.onOk : SA.defaults.onOk || function () { };
      var inp_useTransparency = typeof (options.useTransparency) === "boolean" ? options.useTransparency : SA.defaults.useTransparency || false;
      if (inp_theme === "auto") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          SA.currentTheme = "light";
        }
        else { SA.currentTheme = "dark"; }
      } else {
        SA.changeTheme(inp_theme);
      }
      const themer = SA.data_theme[SA.currentTheme];
      var wrapper_bg = inp_useTransparency ? themer.transparentWrapperBg : themer.wrapperBg;
      var bWrapper = document.createElement("div");
      var style = document.createElement("style");
      style.textContent = SA.styles(themer, wrapper_bg);
      var wrapper = document.createElement("div");
      wrapper.classList.add("SA-wrapper");
      var s_a = document.createElement("div");
      s_a.classList.add("SA");
      var title = document.createElement("h3");
      title.textContent = inp_title;
      var content = document.createElement("div");
      content.classList.add("SA-content");
      var otherContent = document.createElement("div");
      var icon = document.createElement("div");
      if (inp_icon !== null) {
        icon.classList.add("SA-icon");
        otherContent.style.maxHeight = "calc(70vh - 18rem)";
        icon.innerHTML = SA.data_icons[inp_icon];
      }
      otherContent.classList.add("SA-other-content");
      otherContent.innerHTML += inp_html;
      if (inp_html !== "" || inp_icon !== "") {
        otherContent.style.marginTop = ".5rem";
      }
      var alertBody = document.createElement("p");
      alertBody.classList.add("SA-body-text");
      alertBody.textContent = inp_body;
      //alertBody.classList.add("SA-prompt-input-heading");
      var actions = document.createElement("div");
      actions.classList.add("SA-actions");
      var okBtn = document.createElement("button");
      okBtn.classList.add("SA-action-button");
      okBtn.textContent = "OK";
      okBtn.addEventListener("click", inp_onOk);


      bWrapper.appendChild(style);
      bWrapper.appendChild(wrapper)
      wrapper.appendChild(s_a);
      s_a.appendChild(title);
      s_a.appendChild(content);
      content.appendChild(alertBody);
      if (inp_icon !== "") {
        content.appendChild(icon);
      }
      content.appendChild(otherContent);
      actions.appendChild(okBtn);
      s_a.appendChild(actions);
      document.body.appendChild(bWrapper);
      document.body.classList.add("do-not-flow");


      return new Promise((resolve, reject) => {

        okBtn.addEventListener("click", () => {
          wrapper.style.animation = "SA_fade_out .1s ease-out";
          setTimeout(() => {

            document.body.removeChild(bWrapper);
            document.body.classList.remove("do-not-flow");

          }, 90);
          resolve(true);
        });

        bWrapper.addEventListener("click", (event) => {
          if (event.target.className == "SA-wrapper") {
            wrapper.style.animation = "SA_fade_out .1s ease-out";
            setTimeout(() => {

              document.body.removeChild(bWrapper);
              document.body.classList.remove("do-not-flow");

            }, 90);
            resolve(false);
          }
        });
      });
    },
    prompt: (options) => {
      if (typeof (options) !== "object" || Array.isArray(options)) {
        throw new TypeError("SA Prompt: provided argument must be an Object!")
      }
      var inp_title = (/string|number/).test(typeof (options.title)) ? options.title : SA.defaults.title || "Title";
      var inp_body = (/string|number/).test(typeof (options.body)) ? options.body : SA.defaults.body || "";
      var inp_textLimit = typeof (options.textLimit) === "number" ? Math.round(parseInt(options.textLimit)) : SA.defaults.textLimit || 100;
      var inp_theme = (/dark|light|auto/).test(options.theme) ? options.theme : SA.defaults.theme || "auto";
      var inp_type = typeof (options.type) == "string" ? options.type : SA.defaults.type || "text";
      var inp_attributes = typeof (options.attributes) == "object" && !Array.isArray(options.attributes) ? options.attributes : SA.defaults.attributes || {};
      var inp_onOk = typeof (options.onOk) === "function" ? options.onOk : SA.defaults.onOk || function () { };
      var inp_onCancel = typeof (options.onCancel) === "function" ? options.onCancel : SA.defaults.onCancel || function () { };
      var inp_onInput = typeof (options.onInput) === "function" ? options.onInput : SA.defaults.onInput || function () { };
      var inp_useTransparency = typeof (options.useTransparency) === "boolean" ? options.useTransparency : SA.defaults.useTransparency || false;

      if (inp_theme === "auto") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          SA.currentTheme = "light";
        }
        else { SA.currentTheme = "dark"; }
      } else {
        SA.changeTheme(inp_theme);
      }
      const themer = SA.data_theme[SA.currentTheme];
      var wrapper_bg = inp_useTransparency ? themer.transparentWrapperBg : themer.wrapperBg;
      var bWrapper = document.createElement("div");
      var style = document.createElement("style");
      style.textContent = SA.styles(themer, wrapper_bg);
      var wrapper = document.createElement("div");
      wrapper.classList.add("SA-wrapper");
      var s_a = document.createElement("div");
      s_a.classList.add("SA");
      var title = document.createElement("h3");
      title.textContent = inp_title;
      var content = document.createElement("div");
      content.classList.add("SA-content");
      var promptHeading = document.createElement("p");
      promptHeading.textContent = inp_body;
      promptHeading.classList.add("SA-prompt-input-heading");
      var promptInputWrapper = document.createElement("div");
      promptInputWrapper.classList.add("SA-prompt-input-wrapper");
      var promptLabelWrapper = document.createElement("div");
      var promptLabel = document.createElement("label");
      promptLabel.setAttribute("for", "SA-prompt-input");
      promptLabel.textContent = "Input";
      var promptInput = document.createElement("input");
      promptInput.type = inp_type;
      for (attr in inp_attributes) {
        if (attr == "class" || attr == "className") {
          promptInput.className += inp_attributes[attr];
        }
        else {
          promptInput.setAttribute(attr, inp_attributes[attr]);
        }
      }
      promptInput.classList.add("SA-prompt-input");
      promptInput.setAttribute("max-limit", inp_textLimit)
      var promptCharacterCounter = document.createElement("span");
      promptCharacterCounter.textContent = `0 / ${inp_textLimit}`;
      promptInput.addEventListener("keydown", () => { SA._characterCounter(promptInput, promptCharacterCounter, inp_textLimit) });
      promptInput.addEventListener("input", inp_onInput);
      var actions = document.createElement("div");
      actions.classList.add("SA-actions");
      var cancelBtn = document.createElement("button");
      cancelBtn.classList.add("SA-action-button");
      cancelBtn.textContent = "CANCEL";
      cancelBtn.addEventListener("click", inp_onCancel);
      var okBtn = document.createElement("button");
      okBtn.classList.add("SA-action-button");
      okBtn.textContent = "OK";
      okBtn.addEventListener("click", inp_onOk);


      bWrapper.appendChild(style);
      bWrapper.appendChild(wrapper)
      wrapper.appendChild(s_a);
      s_a.appendChild(title);
      s_a.appendChild(content);
      content.appendChild(promptHeading);
      content.appendChild(promptInputWrapper);
      promptInputWrapper.appendChild(promptLabelWrapper);
      promptLabelWrapper.appendChild(promptLabel);
      promptInputWrapper.appendChild(promptInput);
      promptInputWrapper.appendChild(promptCharacterCounter);
      actions.appendChild(cancelBtn);
      actions.appendChild(okBtn);
      s_a.appendChild(actions);
      document.body.appendChild(bWrapper);
      document.body.classList.add("do-not-flow");


      return new Promise((resolve, reject) => {


        okBtn.addEventListener("click", () => {
          wrapper.style.animation = "SA_fade_out .1s ease-out";
          setTimeout(() => {

            document.body.removeChild(bWrapper);
            document.body.classList.remove("do-not-flow");

          }, 90);
          resolve(promptInput.value);
        });

        cancelBtn.addEventListener("click", () => {
          wrapper.style.animation = "SA_fade_out .1s ease-out";
          setTimeout(() => {

            document.body.removeChild(bWrapper);
            document.body.classList.remove("do-not-flow");

          }, 90);
          resolve(null);
        });

        bWrapper.addEventListener("click", (event) => {
          if (event.target.className == "SA-wrapper") {
            wrapper.style.animation = "SA_fade_out .1s ease-out";
            setTimeout(() => {

              document.body.removeChild(bWrapper);
              document.body.classList.remove("do-not-flow");

            }, 90);
            resolve(null);
          }
        });

      });
    },
    confirm: (options) => {
      if (typeof (options) !== "object" || Array.isArray(options)) {
        throw new TypeError("SA Confirm: provided argument must be an Object!")
      }
      var inp_title = (/string|number/).test(typeof (options.title)) ? options.title : SA.defaults.title || "Title";
      var inp_body = (/string|number/).test(typeof (options.body)) ? options.body : SA.defaults.body || "";
      var inp_theme = (/dark|light|auto/).test(options.theme) ? options.theme : SA.defaults.theme || "auto";
      var inp_onOk = typeof (options.onOk) === "function" ? options.onOk : SA.defaults.onOk || function () { };
      var inp_onCancel = typeof (options.onCancel) === "function" ? options.onCancel : SA.defaults.onCancel || function () { };
      var inp_useTransparency = typeof (options.useTransparency) === "boolean" ? options.useTransparency : SA.defaults.useTransparency || false;

      if (inp_theme === "auto") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          SA.currentTheme = "light";
        }
        else { SA.currentTheme = "dark"; }
      } else {
        SA.changeTheme(inp_theme);
      }
      const themer = SA.data_theme[SA.currentTheme];
      var wrapper_bg = inp_useTransparency ? themer.transparentWrapperBg : themer.wrapperBg;
      var bWrapper = document.createElement("div");
      var style = document.createElement("style");
      style.textContent = SA.styles(themer, wrapper_bg);
      var wrapper = document.createElement("div");
      wrapper.classList.add("SA-wrapper");
      var s_a = document.createElement("div");
      s_a.classList.add("SA");
      var title = document.createElement("h3");
      title.textContent = inp_title;
      var content = document.createElement("div");
      content.classList.add("SA-content");
      var alertBody = document.createElement("p");
      alertBody.classList.add("SA-body-text");
      alertBody.textContent = inp_body;
      //alertBody.classList.add("SA-prompt-input-heading");
      var actions = document.createElement("div");
      actions.classList.add("SA-actions");
      var cancelBtn = document.createElement("button");
      cancelBtn.classList.add("SA-action-button");
      cancelBtn.textContent = "CANCEL";
      cancelBtn.addEventListener("click", inp_onCancel);
      var okBtn = document.createElement("button");
      okBtn.classList.add("SA-action-button");
      okBtn.textContent = "OK";
      okBtn.addEventListener("click", inp_onOk);


      bWrapper.appendChild(style);
      bWrapper.appendChild(wrapper)
      wrapper.appendChild(s_a);
      s_a.appendChild(title);
      s_a.appendChild(content);
      content.appendChild(alertBody);
      actions.appendChild(cancelBtn);
      actions.appendChild(okBtn);
      s_a.appendChild(actions);
      document.body.appendChild(bWrapper);
      document.body.classList.add("do-not-flow");


      return new Promise((resolve, reject) => {
        okBtn.addEventListener("click", () => {
          wrapper.style.animation = "SA_fade_out .1s ease-out";
          setTimeout(() => {

            document.body.removeChild(bWrapper);
            document.body.classList.remove("do-not-flow");

          }, 90);
          resolve(true);
        });

        cancelBtn.addEventListener("click", () => {
          wrapper.style.animation = "SA_fade_out .1s ease-out";
          setTimeout(() => {

            document.body.removeChild(bWrapper);
            document.body.classList.remove("do-not-flow");

          }, 90);
          resolve(false);
        });

        bWrapper.addEventListener("click", (event) => {
          if (event.target.className == "SA-wrapper") {
            wrapper.style.animation = "SA_fade_out .1s ease-out";
            setTimeout(() => {

              document.body.removeChild(bWrapper);
              document.body.classList.remove("do-not-flow");

            }, 90);
            resolve(false);
          }
        });

      });
    },
    backup: {
      alert: window.alert,
      prompt: window.prompt,
      confirm: window.confirm
    },
    prettyAlert: {
      alert(text, options = {}) {
        return SA.alert({ body: text, ...options });
      },
      prompt(text, options = {}) {
        return SA.prompt({ body: text, ...options });
      },
      confirm(text, options = {}) {
        return SA.confirm({ body: text, ...options });
      }
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