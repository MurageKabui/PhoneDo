/*!
 This file is part of DecSoft App Builder.
 Visit our website for license information.
 Copyright © DecSoft Utils - All rights reserved.
 Visit our website at: https://www.decsoftutils.com
 */

 const DabComponents = {
  "dab-http": DabHttp, "dab-html": DabHtml, "dab-timer": DabTimer, "dab-audio": DabAudio, "dab-video": DabVideo, "dab-frame": DabFrame, "dab-label": DabLabel, "dab-table": DabTable, "dab-image": DabImage, "dab-iframe": DabIFrame, "dab-figure": DabFigure, "dab-navbar": DabNavbar, "dab-sidebar": DabSidebar, "dab-carousel": DabCarousel, "dab-dropdown": Dabdropdown, "dab-progress": DabProgress, "dab-websocket": DabWebsocket, "dab-container": DabContainer, "dab-text-input": DabTextInput, "dab-image-push": DabImagePush, "dab-file-input": DabFileInput, "dab-push-button": DabPushButton, "dab-range-input": DabRangeInput, "dab-radio-input": DabRadioInput, "dab-number-input": DabNumberInput, "dab-select-input": DabSelectInput, "dab-switch-input": DabSwitchInput, "dab-checkbox-input": DabCheckboxInput, "dab-textarea-input": DabTextareaInput, "dab-multi-select-input": DabMultiSelectInput 
};




const dlgSettings = {
 components: DabComponents,
 created() {

 },
      data() {
        return {
          name: "dlgSettings",
          size: "md",
          fullscreen: "fullscreen",
          classes: "appdlg",
          event: null,
          app: this.$root,
          idHTMLSettingsCnt: {
            name: "idHTMLSettingsCnt",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},

            contextmenuHandler(event) {
              let
                view = app._getCurrentView(),
                views = app._getLoadedViews(),
                frames = app._getLoadedFrames(),
                dialogs = app._getLoadedDialogs(),
                self = dialogs["dlgSettings"].idHTMLSettingsCnt;
                self.event = event;

app.hideDialogs();
            }
          }
        };
      },
      mounted() {
        let
          self = this;
        $("#dlgSettings").on("show.bs.modal", function () {
          let
            view = self,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = null;
          app.activeDialog = self;
          app._setViewEvents(self);
app.store.showingdlg = true;
        });
        $("#dlgSettings").on("hidden.bs.modal", function () {
          let
            view = self,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = null;
          app.activeDialog = app._getActiveDialog();
app.store.showingdlg = false;

//let settings = [ ]
//app.showAlert();
        });
      },
      methods: {
        show() {
          $("#" + this.name).modal({backdrop: "static", keyboard: false});
        },
        hide() {
          $("#" + this.name).modal("hide");
        },
        clickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        dblclickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseupHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousedownHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousemoveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseenterHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseleaveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        contextmenuHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeRightHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeLeftHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        }
    },
      template: `<div id="dlgSettings" class="app-dialog modal fade" tabindex="-1" role="dialog"><div v-bind:class="['modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered', 'modal-' + size, 'modal-' + fullscreen]" role="document"><div class="modal-content"><div v-bind:class="[classes, 'modal-body']"><dab-html v-bind="idHTMLSettingsCnt"><div class="main-wrapper">
        <!--h1>PhoneDo CLI</h1-->

        <div class="toggle-container" v-for="setting in app.store.jqcsettings">
            <label :for="'toggle-' + setting.id" class="toggle-label">
                <span class="label-heading">{{ setting.label }}</span>
                <span class="label-desc">{{ setting.description }}</span>
            </label>
            <label :for="'toggle-' + setting.id" class="switch">
                <input type="checkbox" :id="'toggle-' + setting.id" :checked="setting.setstate" @change="app.toggleSetting(setting.id, $event.target.checked)">
                <span class="slider"></span>
            </label>
        </div>

  <hr>
  
  <div class="toggle-container text-center">
      <label class="toggle-label">
        <span class="label-heading">{{app.name}} {{app.version}}</span>
        <span class="label-desc">
        Script android the JS way.<br><a @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo')">Policy & Terms of Service</a>
        </span>
      </label>
  </div>
</div></dab-html></div></div></div></div>`
  };

const dlgTidyOptions = {
 components: DabComponents,
 created() {

 },
      data() {
        return {
          name: "dlgTidyOptions",
          size: "md",
          fullscreen: "fullscreen",
          classes: "appdlg",
          event: null,
          app: this.$root,
          htmlOptions: {
            name: "htmlOptions",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          }
        };
      },
      mounted() {
        let
          self = this;
        $("#dlgTidyOptions").on("show.bs.modal", function () {
          let
            view = self,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = null;
          app.activeDialog = self;
          app._setViewEvents(self);
app.store.showingdlg = true;
        });
        $("#dlgTidyOptions").on("hidden.bs.modal", function () {
          let
            view = self,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = null;
          app.activeDialog = app._getActiveDialog();
app.store.showingdlg = false;
// app.tidyPrompt(app.store.currentScriptName);
        });
      },
      methods: {
        show() {
          $("#" + this.name).modal({backdrop: "static", keyboard: false});
        },
        hide() {
          $("#" + this.name).modal("hide");
        },
        clickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        dblclickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseupHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousedownHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousemoveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseenterHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseleaveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        contextmenuHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeRightHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeLeftHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        }
    },
      template: `<div id="dlgTidyOptions" class="app-dialog modal fade" tabindex="-1" role="dialog"><div v-bind:class="['modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered', 'modal-' + size, 'modal-' + fullscreen]" role="document"><div class="modal-content"><div v-bind:class="[classes, 'modal-body']"><dab-html v-bind="htmlOptions"><div class="settings-container">
    <div class="settings-header">
        <h2>PhoneDo Settings</h2>
    </div>

    <div class="settings-tabs">
        <div class="tab active" data-tab="editor">Editor</div>
        <div class="tab" data-tab="formatting">Formatting</div>
        <div class="tab" data-tab="behavior">Behavior</div>
    </div>

    <form id="optionsForm">
        <!-- Editor Settings Tab -->
        <div class="tab-content active" id="editor-tab">
            <div class="settings-card">
                <div class="settings-card-header">
                    <span class="settings-icon">📝</span>
                    <h3>Editor Settings</h3>
                </div>

                <div class="settings-item">
                    <label for="indentSize">Indent Size</label>
                    <select id="indentSize" class="settings-select">
                        <option value="2">2 spaces</option>
                        <option value="4" selected>4 spaces</option>
                        <option value="8">8 spaces</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="indentWithTabs">Indent with Tabs</label>
                    <select id="indentWithTabs" class="settings-select">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="indentChar">Indent Character</label>
                    <select id="indentChar" class="settings-select">
                        <option value="\t">Tab</option>
                        <option value=" " selected>Space</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="theme">Editor Theme</label>
                    <select id="theme" class="settings-select">
                        <option value="dark" selected>Dark</option>
                        <option value="light">Light</option>
                        <option value="monokai">Monokai</option>
                        <option value="solarized">Solarized</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Formatting Settings Tab -->
        <div class="tab-content" id="formatting-tab">
            <div class="settings-card">
                <div class="settings-card-header">
                    <span class="settings-icon">🔧</span>
                    <h3>Code Formatting</h3>
                </div>

                <div class="settings-item">
                    <label for="lineLength">Wrap Line Length</label>
                    <select id="lineLength" class="settings-select">
                        <option value="80" selected>80 characters</option>
                        <option value="100">100 characters</option>
                        <option value="120">120 characters</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="preserveNewlines">Preserve Newlines</label>
                    <select id="preserveNewlines" class="settings-select">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="braceStyle">Brace Style</label>
                    <select id="braceStyle" class="settings-select">
                        <option value="collapse" selected>Collapse</option>
                        <option value="expand">Expand</option>
                        <option value="end-expand">End Expand</option>
                        <option value="none">None</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="keepArrayIndentation">Keep Array Indentation</label>
                    <select id="keepArrayIndentation" class="settings-select">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="keepFunctionIndentation">Keep Function Indentation</label>
                    <select id="keepFunctionIndentation" class="settings-select">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="spaceInParen">Space in Parentheses</label>
                    <select id="spaceInParen" class="settings-select">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="endWithNewline">End with Newline</label>
                    <select id="endWithNewline" class="settings-select">
                        <option value="true" selected>Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Behavior Settings Tab -->
        <div class="tab-content" id="behavior-tab">
            <div class="settings-card">
                <div class="settings-card-header">
                    <span class="settings-icon">⚙️</span>
                    <h3>App Behavior</h3>
                </div>

                <div class="settings-item">
                    <label for="confirmScriptStop">Confirm Before Stopping Scripts</label>
                    <select id="confirmScriptStop" class="settings-select">
                        <option value="true" selected>Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="confirmMinify">Confirm Before Minifying</label>
                    <select id="confirmMinify" class="settings-select">
                        <option value="true" selected>Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div class="settings-item">
                    <label for="autoSave">Auto-save Changes</label>
                    <select id="autoSave" class="settings-select">
                        <option value="true" selected>Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="settings-actions">
            <button type="button" id="saveSettings" class="settings-button">Save Settings</button>
        </div>
    </form>
</div></dab-html></div></div></div></div>`
  };

const dlgAskAI = {
 components: DabComponents,
 created() {

 },
      data() {
        return {
          name: "dlgAskAI",
          size: "xl",
          fullscreen: "fullscreen",
          classes: "",
          event: null,
          app: this.$root,
          btnClose: {
            name: "btnClose",
            classes: "",
            size: "sm",
            title: "",
            tabIndex: -1,
            text: "Close",
            kind: "danger",
            outline: false,
            active: false,
            leftIcon: "",
            rightIcon: "",
            leftBadge: "",
            leftBadgeKind: "light",
            leftBadgePilled: false,
            rightBadge: "",
            rightBadgeKind: "light",
            rightBadgePilled: false,
            hidden: false,
            disabled: false,
            event: null,
            blurHandler() {},
            focusHandler() {},

            clickHandler(event) {
              let
                view = app._getCurrentView(),
                views = app._getLoadedViews(),
                frames = app._getLoadedFrames(),
                dialogs = app._getLoadedDialogs(),
                self = dialogs["dlgAskAI"].btnClose;
                self.event = event;

app.hideDialog('dlgAskAI');
            },
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          },
          htmlLoader: {
            name: "htmlLoader",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          }
        };
      },
      mounted() {
        let
          self = this;
        $("#dlgAskAI").on("show.bs.modal", function () {
          let
            view = self,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = null;
          app.activeDialog = self;
          app._setViewEvents(self);
app.store.showingdlg = true;
        });
        $("#dlgAskAI").on("hidden.bs.modal", function () {
          let
            view = self,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = null;
          app.activeDialog = app._getActiveDialog();
app.store.showingdlg = false;
        });
      },
      methods: {
        show() {
          $("#" + this.name).modal({backdrop: "static", keyboard: false});
        },
        hide() {
          $("#" + this.name).modal("hide");
        },
        clickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        dblclickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseupHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousedownHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousemoveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseenterHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseleaveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        contextmenuHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeRightHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeLeftHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        }
    },
      template: `<div id="dlgAskAI" class="app-dialog modal fade" tabindex="-1" role="dialog"><div v-bind:class="['modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered', 'modal-' + size, 'modal-' + fullscreen]" role="document"><div class="modal-content"><div v-bind:class="[classes, 'modal-body']"><dab-push-button v-bind="btnClose"></dab-push-button><dab-html v-bind="htmlLoader"><div class="loader">
  <svg width="100" height="100" viewBox="0 0 100 100">
    <defs>
      <mask id="clipping">
        <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
        <polygon points="25,25 75,25 50,75" fill="white"></polygon>
        <polygon points="50,25 75,75 25,75" fill="white"></polygon>
        <polygon points="35,35 65,35 50,65" fill="white"></polygon>
        <polygon points="35,35 65,35 50,65" fill="white"></polygon>
        <polygon points="35,35 65,35 50,65" fill="white"></polygon>
        <polygon points="35,35 65,35 50,65" fill="white"></polygon>
      </mask>
    </defs>
  </svg>
  <div class="box"></div>
</div>
</dab-html></div></div></div></div>`
  };



const viewConsole = {
 components: DabComponents,
 created() {
   this.$root.views[this.name] = this;

 },
      data() {
        return {
          name: "viewConsole",
          classes: "",
          transitionName: "",
          transitionMode: "",
          inAnimation: "fadeIn",
          outAnimation: "",
          event: null,
          app: this.$root,
          console_wrapper: {
            name: "console_wrapper",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          },
          consolemenu: {
            name: "consolemenu",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          }
        };
      },
      activated() {
        let
          view = this,
          self = this,
          views = app._getLoadedViews(),
          frames = app._getLoadedFrames(),
          dialogs = app._getLoadedDialogs();
        view.event = null;
          app._setViewEvents(this);
//app.setViewReadyForDeviceKeyboard();
app.store.jqconsole.Focus();
app.store.jqconsole.ScrollWindowToPrompt();

app.cordova.statusbar.backgroundColorByName('#333');

if (app.store.wsr) {
    app.store.jqconsole.Write(app.serialize(app.store.wsr));
}
      },
      deactivated() {
        let
          view = this,
          self = this,
          views = app._getLoadedViews(),
          frames = app._getLoadedFrames(),
          dialogs = app._getLoadedDialogs();
        view.event = null;

      },
      methods: {
        clickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        dblclickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseupHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousedownHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousemoveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseenterHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseleaveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        contextmenuHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeRightHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeLeftHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        }
    },
      template: `<transition v-bind:[app.viewTransitionName]="transitionName" v-bind:[app.viewTransitionMode]="transitionMode" v-bind:[app.viewInAnimation]="'animate__animated ' + 'animate__' + inAnimation" v-bind:[app.viewOutAnimation]="'animate__animated ' + 'animate__' +  outAnimation"><div id="viewConsole" v-bind:class="['app-view', classes]"><dab-sidebar v-bind="app.sidebar"></dab-sidebar><dab-html v-bind="console_wrapper"></dab-html><dab-html v-bind="consolemenu"><div class="menubar">
  <div class="menu">
    <span class="menu_item">PhoneDo</span>
    <div class="content">
      <ul>
        <li @click="app.replaceView('viewEditScript');">
          <span><i class="fa-solid fa-code"></i> Script Editor (IDE)</span>
        </li>
        <li v-show="app.store.runningscript">
          <span class="danger">
            <i class="fa-regular fa-circle-stop"></i> Stop Run
          </span>
        </li>
        <li @click="app.showDialog('dlgTidyOptions');">
          <span><i class="fa-solid fa-terminal"></i> Terminal Settings</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="menu">
    <span class="menu_item">Edit</span>
    <div class="content">
      <ul>
        <li @click="app.store.jqconsole.SetPromptText('');">
          <span><i class="fa-solid fa-eraser"></i> Clear Input</span>
        </li>
        <li @click="app.ln();">
          <span><i class="fa-regular fa-copy"></i> Copy to Clipboard</span>
        </li>
        <li>
          <span><i class="fa-regular fa-paste"></i> Paste to Clipboard</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="menu">
    <span class="menu_item">Options</span>
    <div class="content">
      <ul>
        <li @click="app._CLI_restart();">
          <span><i class="fa-solid fa-rotate-right"></i> Restart Session</span>
        </li>
        <li @click="app.store.jqconsole.reset();">
          <span><i class="fa-solid fa-arrows-rotate"></i> Reset Terminal</span>
        </li>
        <li @click="app.store.jqconsole.Clear();">
          <span><i class="fa-solid fa-broom"></i> Clear Terminal</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="menu">
    <span class="menu_item">Help</span>
    <div class="content">
      <ul>
        <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo/tree/main/docs');">
          <span><i class="fa-brands fa-github"></i> Documentation</span>
        </li>
        <li @click="app.browserOpen('https://groups.google.com/u/1/g/n8vshell');">
          <span><i class="fa-brands fa-google-plus-g"></i> PhoneDo Group</span>
        </li>
        <li @click="app.feedback();">
          <span><i class="fa-solid fa-envelope-open-text"></i> Send Feedback</span>
        </li>
        <li @click="app.showAbout();">
          <span><i class="fa-regular fa-circle-question"></i> About</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</dab-html></div></transition>`
  };

const viewEditScript = {
 components: DabComponents,
 created() {
   this.$root.views[this.name] = this;

 },
      data() {
        return {
          name: "viewEditScript",
          classes: "",
          transitionName: "",
          transitionMode: "",
          inAnimation: "",
          outAnimation: "",
          event: null,
          app: this.$root,
          htmlAceEditor: {
            name: "htmlAceEditor",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          },

          acemenu: {
            name: "acemenu",
            classes: "",
            title: "",
            hidden: false,
            event: null,
            clickHandler() {},
            dblclickHandler() {},
            mouseupHandler() {},
            mousedownHandler() {},
            mousemoveHandler() {},
            mouseenterHandler() {},
            mouseleaveHandler() {},
            contextmenuHandler() {}
          },

        };
      },
      activated() {
        let
          view = this,
          self = this,
          views = app._getLoadedViews(),
          frames = app._getLoadedFrames(),
          dialogs = app._getLoadedDialogs();
        view.event = null;
          app._setViewEvents(this);
if (!app.store.bLoadedDb) {
    app.showAlert('An critical error occoured loading database.');
} else {
    app.populateUserScripts();
    if (!app.store.loadedace) {
      app.setReactiveVar('aceedit' , ace.edit('editor'));
      let savedTheme = app.getOption('userTheme','gruvbox');

      app.store.aceedit.setTheme('ace/theme/' + savedTheme);
      app.setReactiveVar('currentThemeName', savedTheme);

      ace.config.set('basePath', 'app/files/ace/');
      app.store.aceedit.getSession().setUseWorker(false);
      app.store.aceedit.setOption("wrap", false);
      app.store.aceedit.session.setMode('ace/mode/javascript');
      app.store.aceedit.setOption("enableSnippets", true);
      app.store.aceedit.setOption("enableBasicAutocompletion", true);
      app.store.aceedit.setOption("enableLiveAutocompletion", false);

      app.store.aceedit.setOption("highlightActiveLine", true);
      app.store.aceedit.setOption("readOnly", true);
      app.store.loadedace = true;
    }
    app.aceEditFocusLastLine();
}

app.setViewReadyForDeviceKeyboard();
app.setDialogReadyForDeviceKeyboard();
      },
      deactivated() {
        let
          view = this,
          self = this,
          views = app._getLoadedViews(),
          frames = app._getLoadedFrames(),
          dialogs = app._getLoadedDialogs();
        view.event = null;
let cs = app.store.currentScriptName;
if (cs) {
	app.getActualScriptContent(cs)
		.then(function(savedContent) {
			if (savedContent !== app.store.aceedit.getValue()) {
				SA.confirm({
					title: cs.toString(),
					body: 'You have unsaved changes.',
					okText: 'Save',
					cancelText: 'Discard'
				}).then(function(confirmed) {
					if (confirmed) {
						app.saveScript(cs);
					}
				});
			}
			savedContent = null;
		});
}
      },
      methods: {
        clickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        dblclickHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseupHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousedownHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mousemoveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseenterHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        mouseleaveHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        contextmenuHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeRightHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        },
        swipeLeftHandler(event) {
          let
            view = this,
            self = this,
            views = app._getLoadedViews(),
            frames = app._getLoadedFrames(),
            dialogs = app._getLoadedDialogs();
          view.event = event;

        }
    },
      template: `<transition v-bind:[app.viewTransitionName]="transitionName" v-bind:[app.viewTransitionMode]="transitionMode" v-bind:[app.viewInAnimation]="'animate__animated ' + 'animate__' + inAnimation" v-bind:[app.viewOutAnimation]="'animate__animated ' + 'animate__' +  outAnimation"><div id="viewEditScript" v-bind:class="['app-view', classes]"><dab-sidebar v-bind="app.sidebar"></dab-sidebar><dab-html v-bind="htmlAceEditor"><pre id="editor"></pre></dab-html><dab-html v-bind="acemenu"><div class="menubar">

    <div class="menu">
        <span class="menu_item">File</span>
        <div class="content">
            <ul>
                <li @click="app.newScript()"><span><i class="fa-solid fa-file-circle-plus"></i> New Script</span></li>
                <li @click="app.saveScript(app.store.currentScriptName)" v-show="app.store.currentScriptName"><span><i class="fas fa-save"></i> Save Script</span></li>
                <li @click="app.saveAs(app.store.currentScriptName)" v-show="app.store.currentScriptName"><span><i class="fas fa-download"></i> Export Script</span></li>
                <li @click="app.shareScript()" v-show="app.store.currentScriptName"><span><i class="fas fa-download"></i> Share Script Content</span></li>
                <li @click="app.renameScriptAs()" v-show="app.store.currentScriptName"><span><i class="fas fa-edit"></i> Rename Script</span></li>
                <li @click="app.deleteScript()" v-show="app.store.currentScriptName"><span class="danger"><i class="fas fa-trash-alt"></i> Delete Script</span></li>
                <li @click="app.closeFile()" v-show="app.store.currentScriptName"><span class="warn"><i class="fa-solid fa-xmark text-center"></i> Close File</span></li>

            </ul>
        </div>
    </div>


    <div class="menu" v-show="app.store.currentScriptName">
        <span class="menu_item">Edit</span>
        <div class="content">
            <ul>
                <li @click="app.store.aceedit.undo()"><span><i class="fas fa-undo"></i> Undo</span></li>
                <li @click="app.store.aceedit.redo()"><span><i class="fas fa-redo"></i> Redo</span></li>
                <li @click="app.store.aceedit.execCommand('cut')"><span><i class="fas fa-cut"></i> Cut</span></li>
                <li @click="app.store.aceedit.execCommand('copy')"><span><i class="fas fa-copy"></i> Copy</span></li>
                <li @click="app.store.aceedit.execCommand('paste')"><span><i class="fas fa-paste"></i> Paste</span></li>
                <li @click="app.store.aceedit.execCommand('find')"><span><i class="fas fa-search"></i> Find & Replace</span></li>
                <li @click="app.store.aceedit.execCommand('selectAll')"><span><i class="fas fa-check-square"></i> Select All</span></li>
                <li @click="app.store.aceedit.execCommand('gotoline')"><span><i class="fas fa-list-ol"></i> Go to Line</span></li>
                <li @click="app.store.aceedit.duplicateLines()"><span><i class="fas fa-clone"></i> Duplicate Selection</span></li>
                <li @click="app.store.aceedit.moveLinesUp()"><span><i class="fas fa-arrow-up"></i> Move Lines Up</span></li>
                <li @click="app.store.aceedit.moveLinesDown()"><span><i class="fas fa-arrow-down"></i> Move Lines Down</span></li>
                <li @click="app.store.aceedit.execCommand('transposeletters')"><span><i class="fas fa-right-left"></i> Transpose Characters</span></li>
                <li @click="app.store.aceedit.execCommand('togglecomment')"><span><i class="fas fa-code"></i> Toggle Comment</span></li>
                <li @click="app.store.aceedit.indent()"><span><i class="fas fa-indent"></i> Increase Indent</span></li>
                <li @click="app.store.aceedit.outdent()"><span><i class="fas fa-outdent"></i> Decrease Indent</span></li>
                <li @click="app.store.aceedit.toUpperCase()"><span><i class="fas fa-font"></i> Convert to Uppercase</span></li>
                <li @click="app.store.aceedit.toLowerCase()"><span><i class="fas fa-font"></i> Convert to Lowercase</span></li>
                <li @click="app.store.aceedit.execCommand('toggleoverwrite')"><span><i class="fas fa-pen-nib"></i> Toggle Overwrite</span></li>
                <li @click="app.store.aceedit.getSession().foldAll()"><span><i class="fas fa-minus-square"></i> Fold All Code</span></li>
                <li @click="app.store.aceedit.getSession().unfold()"><span><i class="fas fa-plus-square"></i> Unfold All Code</span></li>
                <li @click="app.store.aceedit.execCommand('gotostart')"><span><i class="fas fa-angle-double-up"></i> Jump to Start</span></li>
                <li @click="app.store.aceedit.execCommand('gobottom')"><span><i class="fas fa-angle-double-down"></i> Jump to End</span></li>
                <li @click="app.store.aceedit.execCommand('removewordleft')"><span><i class="fas fa-backspace"></i> Delete Word Left</span></li>
                <li @click="app.store.aceedit.execCommand('removewordright')"><span><i class="fas fa-eraser"></i> Delete Word Right</span></li>
                <li @click="app.resetEditorSettings()" class="warning-item">
                    <span><i class="fas fa-sync-alt"></i> Factory Reset Editor</span>
                </li>
            </ul>
        </div>
    </div>


    <div class="menu" v-show="app.store.currentScriptName">
        <span class="menu_item">Run</span>
        <div class="content">
            <ul>
                <li @click="app.runScript(1)">
                    <span><i class="fas fa-bug"></i> Run (Debug)</span>
                </li>
                <li class="spaced" @click="app.runScript(0)">
                    <span><i class="fas fa-play"></i> Run Script</span>
                </li>
                <li @click="app.tidyPrompt(app.store.currentScriptName)"><span><i class="fas fa-magic"></i> Tidy Script</span></li>
                <li @click="app.minifyScript(app.store.currentScriptName)"><span><i class="fas fa-magic"></i> Minify Script</span></li>
                <li @click="app.askAI();"><span><i class="fas fa-magic"></i> Ask AI</span></li>
            </ul>
        </div>
    </div>

    <div class="menu">
        <span class="menu_item">Scripts</span>
        <div class="content">
            <ul>
                <li :class="{active: app.store.currentScriptName == sn}" v-for="(sn, index) in app.store.scriptNames" @click="app.openScript(sn)">
                    <span><i class="fa-solid fa-file-code fa-1x"></i> {{index + 1}}. {{sn.slice(0, -4)}}</span>
                </li>
                <!-- li class="special sticky-bottom"><span><i class="fa-solid fa-magnifying-glass"></i><input></input></span></li -->
            </ul>
        </div>
    </div>

    <div class="menu" v-show="!app.store.currentScriptName">
        <span class="menu_item">Theme</span>
        <div class="content">
            <ul>
                <li :class="{ active: app.store.currentThemeName === theme.name }" v-for="theme in app.store.acetheme" :key="theme.name" @click="app.loadAceTheme(theme.name)">
                    <span><i class="fa-solid fa-palette"></i> {{theme.name.replace(/_/g, ' ')}}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="menu">
        <span class="menu_item">Help</span>
        <div class="content">
            <ul>
                <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo/blob/fa5481ea1ff14e474c60de9f8d33a3bc5225a471/docs/README.MD')"><span><i class="fa-solid fa-circle-info"></i> Documentation</span></li>
                <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo')"><span><i class="fa-solid fa-people-group"></i> Community</span></li>
                <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo/tree/main/Examples')"><span><i class="fa-solid fa-file-code"></i> Demo Scripts</span></li>
                <li @click="app.showAbout()"><span><i class="fa-regular fa-circle-question"></i> About</span></li>
            </ul>
        </div>
    </div>
</div></dab-html></div></transition>`
  };


const DabApp = {

  components: {
    "dab-alert": DabAlert,
    "dab-toast": DabToast,
    viewConsole,viewEditScript,
    dlgSettings,dlgTidyOptions,dlgAskAI
  },

  created() {

    window.app = this;
    window.store = {};
    this._setupAppHtml();
    this._setupAppEvents();
    this._setupAppVariables();
    this._setupAppPlugins();
    this._setupCordovaPlugins();
    
  },

  mounted() {
    
  },

  data() {

    return {
      store: {},
      views: [],
      event: null,
      error: null,
      
      id: "com.phonedopro.muragekabui",
      version: "1.4.0",
      name: "PhoneDo (PRO)",
      shortName: "PhoneDo",
      description: "Script Android the JS Way",
      authorName: "Dennis Kabui",
      authorEmail: "Dennis Kabui",
      authorUrl: "https://github.com/MurageKabui/PhoneDo",
      language: "en",
      languageName: "English",
      textDirection: "ltr",
      style: "scaled",
      buildNumber: 1112,
      lastSound: null,
      activeDialog: null,
      defaultLanguage: "en",
      theme: "darkly",
      themes: ["darkly"],
      sidebar: {
        item: {
          index: -1,
          subindex: -1
        },
        header: "",
        direction: "left",
        headerKind: "none",
        headerAlign: "left",
        imageUrl: "",
        items: [],
        itemClickHandler: this._appEventOnSidebarItemClick,
        headerClickHandler: this._appEventOnSidebarHeaderClick
      },
    };
  },

  computed: {

    viewTransitionName() {

      return this._getCurrentView().transitionName !== '' ? 'name' : null;
    },

    viewTransitionMode() {

      return this._getCurrentView().transitionMode !== '' ? 'mode' : null;
    },

    viewInAnimation() {

      return this._getCurrentView().inAnimation !== '' ? 'enter-active-class' : null;
    },

    viewOutAnimation() {

      return this._getCurrentView().outAnimation !== '' ? 'leave-active-class' : null;
    }
  },

  methods: {

    // Public app variables related methods

    // Replaced by setReactiveVar()
    setVar(name, value) {

      this.store[name] = value;
    },

    setReactiveVar(name, value) {

      this.store[name] = value;
    },

    getReactiveVar(name, defaultValue) {

      if (typeof this.store[name] !== 'undefined') {

        return this.store[name];
      }

      return defaultValue;
    },

    unsetReactiveVar(name) {

      if (typeof this.store[name] !== 'undefined') {

        delete this.store[name];
      }
    },

    setNonReactiveVar(name, value) {

      window.store[name] = value;
    },

    getNonReactiveVar(name, defaultValue) {

      if (typeof window.store[name] !== 'undefined') {

        return window.store[name];
      }

      return defaultValue;
    },

    unsetNonReactiveVar(name) {

      if (typeof window.store[name] !== 'undefined') {

        delete window.store[name];
      }
    },

    // Public app views related methods

    showView(viewName) {

      this.$router.push(viewName);
    },

    replaceView(viewName) {

      this.$router.replace(viewName);
    },

    // Public app dialogs related methods

    showDialog(dialogName, shownCallback, hiddenCallback) {

      let modalEl = document.getElementById(dialogName);
      let modal = new bootstrap.Modal(modalEl, { keyboard: false, backdrop: 'static' });
      modal.show();

      if (typeof shownCallback === 'function') {
        modalEl.addEventListener('shown.bs.modal', shownCallback, { once: true });
      }
      if (typeof hiddenCallback === 'function') {
        modalEl.addEventListener('hidden.bs.modal', hiddenCallback, { once: true });
      }
    },

    hideDialog(dialogName) {

      let elem = window.document.querySelector(`#${dialogName}.app-dialog.modal.show`);
      if (elem !== null) {
        let dialog = bootstrap.Modal.getInstance(elem);
        if (dialog !== null) {
          dialog.hide();
        }
      }
    },

    hideDialogs() {

      let dialogs = window.document.querySelectorAll('.app-dialog.modal.show');
      for (let i = 0; i < dialogs.length; i++) {
        let dialog = bootstrap.Modal.getInstance(dialogs[i]);
        if (dialog !== null) {
          dialog.hide();
        }
      }
    },

    getVisibleDialogs() {

      let dialogs = [];
      window.document.querySelectorAll('.app-dialog.modal.show').forEach(function (el) {
        dialogs.push(el.id);
      });
      return dialogs;
    },

    isDialogVisible(dialogName) {

      return window.document.querySelector(`#${dialogName}.app-dialog.modal.show`) !== null;
    },

    // Public app alert related methods

    showAlert(body = '', title = '', kind = '', buttons = [], closeCallback = () => {}) {

      let alert = this.$refs.DabAlert;

      alert.body = body;
      alert.title = title;
      alert.kind = kind;
      alert.buttons = buttons;
      alert.closeCallback = closeCallback;

      let modal = new bootstrap.Modal(window.document.getElementById('dab-alert-modal'), { keyboard: false, backdrop: 'static' });
      let elem = window.document.getElementById('dab-alert-modal');

      elem.addEventListener('hidePrevented.bs.modal', () => {
        if (!alert.buttons || alert.buttons.length === 0) {
          modal.hide();
        }
      }, { once: true });

      modal.show();
    },

    hideAlert() {

      let elem = window.document.querySelector('#dab-alert-modal.modal.show');
      if (elem !== null) {
        let modal = bootstrap.Modal.getInstance(elem);
        if (modal !== null) {
          modal.hide();
        }
      }
    },

    // Public app sidebar related methods

    showSidebar() {

      $('#dab-sidebar').addClass('active');
      $('#dab-sidebar-overlay').addClass('active');
    },

    hideSidebar() {

      $('#dab-sidebar').removeClass('active');
      $('#dab-sidebar-overlay').removeClass('active');
    },

    sidebarIsVisible() {

      return $('#dab-sidebar').hasClass('active');
    },

    sidebarSetDirection(direction) {

      if (this.sidebar.direction === direction) {
        return this.sidebar.direction;
      }
      this.sidebar.direction = direction;
      if (direction === 'right') {
        let
          css = '#dab-sidebar { left: initial; right: -280px; } #dab-sidebar.active { left: initial; right: 0; }',
          style = document.createElement('style');
        document.head.appendChild(style);
        style.id = 'sidebar-stylesheet';
        style.appendChild(document.createTextNode(css));
      } else {
        if ($('#sidebar-stylesheet').length > 0) {
          $('#sidebar-stylesheet').remove();
        }
      }
      return this.sidebar.direction;
    },

    // Public app toasts related methods

    showToast(text = '', hideMsecs = false, kind = 'light', title = '', subtitle = '', clickCallback = () => {}, dismissCallback = () => {}, payload = null) {

      let
        toastId = this.randomStr(),
        toasts = this._getToastsComponent();

      toasts.toasts.push({
        "text": text,
        "id": toastId,
        "title": title,
        "kind": kind,
        "payload": payload,
        "subtitle": subtitle,
        "clickCallback": clickCallback,
        "dismissCallback": dismissCallback
      });

      if (hideMsecs) {
        window.setTimeout(() => {
          for (let i in toasts.toasts) {
            if (toasts.toasts[i].id === toastId) {
              toasts.toasts.splice(i, 1);
            }
          }
        }, hideMsecs);
      }
      return toastId;
    },

    hideToast(toastId) {

      let toasts = this._getToastsComponent();
      for (let i in toasts.toasts) {
        if (toasts.toasts[i].id === toastId) {
          toasts.toasts.splice(i, 1);
        }
      }
    },

    hideToasts() {

      let toasts = this._getToastsComponent();
      toasts.toasts = [];
    },

    getToast(toastId) {

      let toasts = this._getToastsComponent();
      for (let i in toasts.toasts) {
        if (toasts.toasts[i].id === toastId) {
          return toasts.toasts[i];
        }
      }
      return null;
    },

    getToasts() {

      let toasts = this._getToastsComponent();
      return toasts.toasts;
    },

    // Public app local storage related methods

    setOption(key, value) {

      return localStorage.setItem(key, value);
    },

    getOption(key, defaultValue) {

      return localStorage.getItem(key) !== null ?
        localStorage.getItem(key) : defaultValue;
    },

    removeOption(key) {

      return localStorage.removeItem(key);
    },

    clearOptions() {

      return localStorage.clear();
    },

    // Public app controls related methods

    focusControl(controlName) {

      $('#' + controlName).focus();
    },

    // Public app themes related methods

    setAppTheme(themeName) {

      let lowerThemeName = themeName.toLowerCase();

      if (this.themes.indexOf(lowerThemeName) === -1) {
        return false;
      }

      $('body').removeClass(this.theme);
      this.theme = lowerThemeName;

      let dirSuffix = this.textDirection.toLowerCase() === 'rtl' ? '.rtl' : '';
      $('#app-theme').attr('href', `app/styles/${lowerThemeName}${dirSuffix}.css`);

      $('body').addClass(this.theme);
      return this.theme;
    },

	  getAppThemeColor() {

      return $('html').attr('data-bs-theme');
	  },

	  setAppThemeColor(colorMode) {

      if (colorMode === 'light' || colorMode === 'dark') {
        $('html').attr('data-bs-theme', colorMode);
      }
	  },

    setAppFixedStyle() {

      this.style = 'fixed';
      $('#app-style').attr('href', 'app/styles/fixed.css');
    },

    setAppScaledStyle() {

      this.style = 'scaled';
      $('#app-style').attr('href', 'app/styles/scaled.css');
    },

    setAppTextDirection(textDirection) {

      let html = document.getElementsByTagName('html')[0];
      this.textDirection = textDirection;
      html.setAttribute('dir', textDirection);
      this.setAppTheme(this.theme);
    },

    getAppColorScheme() {

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    // Public app device related methods

    setViewReadyForDeviceKeyboard() {

      let self = this;

      document.addEventListener('deviceready', () => {
        $('#' + self._getCurrentView().name).css({
          "margin-top": '0px',
          "height": window.innerHeight + 'px'
        });
      });
    },

    setDialogReadyForDeviceKeyboard() {

      let self = this;

      document.addEventListener('deviceready', () => {
        $('#' + self._getCurrentView().name + ' .modal-dialog').css({
          "margin-top": '0px',
          "height": window.innerHeight + 'px'
        });
      });
    },

    // Public app strings related methods

    strLen(text) {

      return text.length;
    },

    trimStr(text) {

      return text.trim();
    },

    lowerCase(text) {

      return text.toLowerCase();
    },

    upperCase(text) {

      return text.toUpperCase();
    },

    strSearch(text, query) {

      return text.search(query);
    },

    subStr(text, start, count) {

      return text.substr(start, count);
    },

    strReplace(text, from, to) {

      return text.replace(from, to);
    },

    strReplaceAll(text, from, to) {

      return text.split(from).join(to);
    },

    splitStr(text, separator, limit) {

      return text.split(separator, limit);
    },

    strToBase64(text) {

      return window.Base64.encode(text);
    },

    base64ToStr(text) {

      return window.Base64.decode(text);
    },

    serialize(value) {

      return JSON.stringify(value);
    },

    unserialize(text) {

      return JSON.parse(text);
    },

    randomStr(length = 10) {

      let
        result = '',
        charsMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        mapLength = charsMap.length;

      for (let i = 0; i < length; i++) {
        result += charsMap.charAt(Math.floor(Math.random() * mapLength));
      }

      return result;
    },

    formatStr (str) {

      let args = Array.prototype.slice.call(arguments, 1);

      return str.replace(/{(\d+)}/g, function(match, number) {

        return typeof args[number] !== 'undefined'
          ? args[number]
          : match
        ;
      });
    },

    // Public app numbers related methods

    randomNum(maxNum) {

      maxNum = maxNum || 100;
      return Math.floor(Math.random() * maxNum);
    },


    // Public app sound related methods

    beep() {

      this.playSound(
        'app/audios/beep/beep.mp3',
        'app/audios/beep/beep.ogg'
      );
    },

    playSound(mp3Url, oggUrl) {

      if (this.lastSound === null) {
        this.lastSound = new Audio();
      }

      if (this.lastSound.canPlayType('audio/ogg') !== '') {
        this.lastSound.src = oggUrl;
        this.lastSound.type = 'audio/ogg';
      } else {
        this.lastSound.src = mp3Url;
        this.lastSound.type = 'audio/mpeg';
      }

      this.lastSound.play();
      return this.lastSound;
    },

    stopSound() {

      this.lastSound.pause();
      this.lastSound.currentTime = 0;
    },

    // Public app resources related methods

    resource(name) {

      if (!appLangs[this.language]) {
        return appLangs[this.defaultLanguage].resources[name];
      } else {
        return appLangs[this.language]['resources'][name] !== undefined ?
          appLangs[this.language]['resources'][name] :
          appLangs[this.defaultLanguage].resources[name];
      }
    },

    // Public app languages related methods

    translateView() {

      return this._translateView();
    },

    getLanguages() {

      let result = [];
      for (let i in appLangs) {
        result.push({ code: i, name: appLangs[i].language.name });
      }
      return result;
    },

    getLanguagesNames() {

      let result = [];
      for (let i in appLangs) {
        result.push(appLangs[i].language.name);
      }
      return result;
    },

    getLanguagesCodes() {

      let result = [];
      for (let i in appLangs) {
        result.push(i);
      }
      return result;
    },

    getLanguageCodeFromName(name) {

      let result = '';
      for (var i in appLangs) {
        if (appLangs[i].language.name === name) {
          result = i;
          break;
        }
      }
      return result;
    },

    getLanguageNameFromCode(code) {

      let result = '';
      for (let i in appLangs) {
        if (i === code) {
          result = appLangs[i].language.name;
          break;
        }
      }
      return result;
    },

    
    showAbout() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let sHtml, sBody;
app.store.showingdlg = true;

const commonStyle = `
    .about-container {
        padding: 5px 0;
        color: var(--body-color, #212121);
        text-align: center;
    }
    .brand {
        margin-bottom: 20px;
    }
    .brand-name {
        font-size: 1.85rem;
        font-weight: 800;
        letter-spacing: -0.8px;
        margin: 0;
        line-height:1;
    }
    .brand-version {
        font-size: 0.65rem;
        font-weight: 700;
        color: #9e9e9e;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 6px;
        display: block;
    }
    .about-text {
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 15px 0;
        color: #444;
    }
    .highlights {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        margin: 15px 0;
    }
    .tag {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 4px 10px;
        background: rgba(0,0,0,0.04);
        color: #666;
        border-radius: 4px;
        white-space: nowrap;
    }
    .footer {
        margin-top: 25px;
        font-size: 0.8rem;
        color: #9e9e9e;
        letter-spacing: 0.2px;
    }
    .heart {
        color: #ff4757;
        display: inline-block;
        animation: heartPulse 3s infinite ease-in-out;
    }
    @keyframes heartPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
    }
`;

switch (app.store.ucv) {
    case 'viewConsole':
        sHtml = `
            <style>${commonStyle}</style>
            <div class="about-container">
                <div class="brand">
                    <h1 class="brand-name">PhoneDo</h1>
                    <span class="brand-version">Version ${app.version}</span>
                </div>
                <div class="about-text">
                    Control your Android device using the full power of JavaScript.
                </div>
                <div class="footer">
                    Made with <span class="heart">❤</span> by Dennisk • © 2024
                </div>
            </div>`;
        break;

    case 'viewEditScript':
        sHtml = `
            <style>${commonStyle}</style>
            <div class="about-container">
                <div class="brand">
                    <h1 class="brand-name">PhoneDo</h1>
                    <span class="brand-version">Version ${app.version}</span>
                </div>
                <div class="about-text">
                    A developer-first automation tool to control device features and bridge APIs seamlessly.
                </div>
                <div class="highlights">
                    <span class="tag">System API Access</span>
                    <span class="tag">JS Engine</span>
                    <span class="tag">Code Editor</span>
                    <span class="tag">Automation</span>
                </div>
                <div class="footer">
                    Made with <span class="heart">❤</span> by Dennisk • © 2024
                </div>
            </div>`;
        break;
}

return SA.alert({
    title: 'About',
    html: sHtml
}).then(() => {
    app.store.showingdlg = false;
});

    },

    toastMsg(msg, duration) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return window.plugins.toast.showWithOptions({
    message: msg,
    duration: duration, // 2000 ms
    position: "bottom",
    styling: {
      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#1E1E2A', // make sure you use #RRGGBB. Default #333333
      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
      textSize: 20.5, // Default is approx. 13.
      cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      horizontalPadding: 20, // iOS default 16, Android default 50
      verticalPadding: 16 // iOS default 12, Android default 30
    }
  });

    },

    populateUserScripts() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.phoneDoDB.executeSql('SELECT scriptName AS scrnme FROM userScripts;', [], function(rs) {

      let rows = rs.rows;
      let rowCount = rows.length;
      
      if (rowCount > 0) {
        
        let sns = [];
        let row, sn;
        for (let i = 0; i < rowCount; i++) {
          row = rows.item(i);
          sn = row.scrnme;
          sns.push(sn);
        }
        app.store.scriptNames = sns;
        // app.toastMsg('found ' + app.store.scriptNames.length + ' scripts.');
      } else {
        app.showAlert(`You have ${rowCount} script(s) in your library.<br>navigate to File > New Script to create one.`);
      }
    }, function(error) {
      app.showAlert('SQLite Error: ' + error.message);
});
    },

    saveScript(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
if (!scriptName) return app.toastMsg('Save Error: Invalid parameters!', 'short');

app.store.phoneDoDB.transaction(function (tx) {
  let scriptContent = app.store.aceedit.getValue();

  let size = app.getScriptFileSize(scriptContent)
  tx.executeSql('UPDATE userScripts SET scriptContent = ? WHERE scriptName = ?', [scriptContent, scriptName], function (tx, rs) {
    if (rs.rowsAffected > 0) {
      app.toastMsg('Saved ' + ' : ' + size, 'short');
    } else {
      app.toastMsg(scriptName + ' could not be saved.', 'short');
    }
  }, function (tx, error) {
    app.toastMsg('❌ SQLite Error: ' + error.message , 'long');
  });
});

    },

    deleteScript() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let sn = app.store.currentScriptName;

app.cordova.vibration.vibrate(100);

if (!sn) {
    app.toastMsg('Delete Error: csn = null;', 'short');
    return;
}

SA.confirm({
    title: 'Delete Script',
    body: 'Permanently delete "' + sn + '" ?'
}).then(function(confirmed) {

    if (!confirmed) {
        return;
    }

    app.store.phoneDoDB.transaction(function(tx) {

        tx.executeSql(
            "DELETE FROM userScripts WHERE scriptName = ?",
            [sn],

            function(tx, rs) {

                if (rs.rowsAffected > 0) {

                    app.store.aceedit.setValue('');
                    app.store.currentScriptName = '';

                    app.toastMsg('"' + sn + '" deleted', 'short');

                    app.populateUserScripts();

                } else {

                    app.toastMsg(sn + ' not found!', 'short');

                }

            },

            function(tx, error) {

                app.toastMsg(
                    "❌ SQLite Error: " + error.message,
                    'long'
                );

            }
        );

    });

});
    },

    runScript(debug) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.jqconsole.ClearPromptText();
app.store.bDebugMode = (debug == 1 ? true : false);

app.store.jqconsole.SetPromptText('run -i "' + app.store.currentScriptName + '"' + (debug == 1 ? ' /debug' : ''));
return app.replaceView('viewConsole');
    },

    aceEditFocusLastLine() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let lastLineNumber, lastLine, lastLineLength;
$('#htmlAceEditor #editor').focus();
lastLineNumber = app.store.aceedit.session.getLength() - 1;
lastLine = app.store.aceedit.session.getLine(lastLineNumber);
lastLineLength = lastLine.length;
return app.store.aceedit.gotoLine(lastLineNumber + 1, lastLineLength);

    },

    openScript(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.phoneDoDB.executeSql("SELECT scriptContent FROM userScripts WHERE scriptName = ?", [scriptName], function (rs)
{
    let rows = rs.rows;
    if (rows.length > 0)
    {
        let row = rows.item(0);
        let scriptContent = row.scriptContent;

        app.store.aceedit.setValue(scriptContent);
        app.store.aceedit.clearSelection();
        app.store.aceedit.getSession().getUndoManager().reset();
        app.store.aceedit.setOption("readOnly", false);

        app.store.currentScriptName = scriptName;
        app.setViewReadyForDeviceKeyboard();

        if (app.store.sseConnection && app.store.sseConnection.isConnected) {
          app.store.sseConnection.send(`${app.store.serverUrl}/update_activescript`, {
            sessionId: app.store.sessionId,
            filename: scriptName,
            content: scriptContent,
            clientId: app.store.clientId
          })
          .then((response) => {
            console.log('Active script updated successfully');
          })
          .catch((error) => {
            console.error('Failed to update active script:', error);
          });
        }

        app.toastMsg(scriptName, 'short');
        app.populateUserScripts();
    }
    else
    {
        app.showAlert('❌ ' + scriptName + ' not found!');
    }
}, function (error)
{
    app.showAlert('❌ SQLite Error: ' + error.message);
});
    },

    newScript() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const promptConfig = {
    title: "Create script",
    body: "Scripts are saved with .nts extension",
    textLimit: 25,
    useTransparency: true,
    attributes: {
        type: "text",
        id: "inpscrnm",
        placeholder: "script_name.nts",
    }
};

const validateScriptName = (name) => {
    const trimmedName = app.trimStr(name);
    return trimmedName &&
        trimmedName.length <= 30 &&
        trimmedName.endsWith('.nts');
};

const createScriptHeader = (scriptName) => {
    const newDate = new Date();
    return `\n/*
  Script Name      : ${scriptName}
  Date             : ${newDate}
  PhoneDo Version  : ${app.version}
  Description      :
  Author           :
  License          :
*/\n\n`;
};

const saveScript = (scriptName, header) => {
    return new Promise((resolve, reject) => {
        app.store.phoneDoDB.transaction(tx => {
            tx.executeSql(
                "INSERT INTO userScripts (scriptName, scriptContent) VALUES (?, ?)",
                [scriptName, header],
                (_, result) => {
                    app.toastMsg(`Saved "${scriptName}"`, 'short');
                    resolve(scriptName);
                },
                (_, error) => {
                    app.toastMsg(`Save error: ${error.message}`, 'long');
                    reject(error);
                }
            );
        });
    });
};

SA.prompt(promptConfig)
    .then(newScriptName => {
        if (!newScriptName) return; // Handle cancel case

        const trimmedName = app.trimStr(newScriptName);

        if (!validateScriptName(trimmedName)) {
            app.errorFileCriteria();
            return;
        }

        const header = createScriptHeader(trimmedName);

        saveScript(trimmedName, header)
            .then(scriptName => {
                app.openScript(scriptName);
                app.populateUserScripts();
            })
            .catch(() => {
                // Error already handled by toast message
            });
    })
    .catch(error => {
        console.error('Script creation error:', error);
        app.toastMsg('Failed to create script', 'short');
    });

// Focus input after prompt is shown
setTimeout(() => $('#inpscrnm').focus(), 100);
    },

    loadScriptToAce(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let content = app.getScriptContent(scriptName);
app.store.aceedit.setValue(content);

$('#htmlAceEditor #editor').focus();

return app.toastMsg(scriptName, 'short');
    },

    getScriptFileSize(scriptContent) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
// Create a Blob object from the scriptContent
  const blob = new Blob([scriptContent], { type: 'text/plain' });

  // Get the size of the Blob in bytes
  const fileSizeInBytes = blob.size;

  // Define the units and their respective thresholds
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  const threshold = 1024;

  // Calculate the appropriate unit and size
  let size = fileSizeInBytes;
  let unitIndex = 0;

  while (size >= threshold && unitIndex < units.length - 1) {
    size /= threshold;
    unitIndex++;
  }

  // Round the size to two decimal places
  size = Math.round(size * 100) / 100;

  // Construct the formatted file size string
  const fileSizeString = size + ' ' + units[unitIndex];

  // Return the formatted file size string
  return fileSizeString;
    },

    getActualScriptContent(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return new Promise((resolve, reject) => {
    app.store.phoneDoDB.executeSql("SELECT scriptContent FROM userScripts WHERE scriptName = ?", [scriptName], function(rs) {
      let rows = rs.rows;
      if (rows.length > 0) {
        let row = rows.item(0);
        let scriptContent = row.scriptContent;
        resolve(scriptContent);
      } else {
        //app.toastMsg('❌ ' + scriptName + ' not found!' , 'short');
        reject('Script not found');
      }
    }, function(error) {
      app.showAlert('❌ SQLite Error: ' + error.message);
      reject(error.message);
    });
});
    },

    renameScriptAs() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let scriptName = app.store.currentScriptName;

if (!scriptName) return app.toastMsg('Rename Error: Invalid parameters!', 'short');

SA.prompt(
{
	title: 'Rename Script',
	body: "Rename '" + scriptName + "' by typing a new unique name.",
	type: 'text',
    textLimit: 25,
    useTransparency: true,
    "aria-label": "New Script Name",
    attributes: {
        id: "inputrnm",
        placeholder: scriptName,
        value: scriptName
    }
}).then(newScriptName =>
{
  newScriptName = app.trimStr(newScriptName);

	if (newScriptName && newScriptName.length <= 30 && newScriptName.endsWith('.nts'))
	{
		let query = 'UPDATE userScripts SET scriptName = ? WHERE scriptName = ?';

		app.store.phoneDoDB.transaction(function (tx)
		{
			tx.executeSql(query, [newScriptName, scriptName], function (tx, rs)
			{
				if (rs.rowsAffected > 0) {
					app.store.currentScriptName = newScriptName;
					app.toastMsg('Renamed "' + scriptName + '" to "' + newScriptName + '"' , 'long');
				}
				else
				{
					app.toastMsg(scriptName + ' not found!', 'short');
				}
        app.populateUserScripts();
			}, function (error)
			{
				app.toastMsg('❌ SQLite Error: ' + error.message , 'long');
			});
		});
	} else {
    return app.errorFileCriteria();
  }
});

$('#inputrnm').focus();
    },

    loadAceTheme(themeName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.aceedit.setTheme('ace/theme/' + themeName);
app.setOption('userTheme', themeName);
app.store.currentThemeName = themeName;

// Wait for Ace to apply the theme, then sync the color reactively
// Note: Ace often applies styles to .ace_editor
setTimeout(() => {
    const editorBg = window.getComputedStyle(document.querySelector('.ace_editor')).backgroundColor;
    app.store.themeBgColor = editorBg;
}, 50);
    },

    processCommand() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
                                                                                                                                                                                                                                                                 const store = app.store;
    const jq = store.jqconsole;
    const commandString = store.commandstring || '';

    /*
    =========================================================
    TOKENIZER
    =========================================================
    */

    const tokens = [];
    let token = '';
    let quote = null;

    for (let i = 0, len = commandString.length; i < len; i++) {

        const ch = commandString[i];

        // Handle quotes
        if ((ch === '"' || ch === "'") && commandString[i - 1] !== '\\') {

            if (quote === null) {
                quote = ch;
            }
            else if (quote === ch) {
                quote = null;
            }
            else {
                token += ch;
            }

            continue;
        }

        // Split by spaces outside quotes
        if (ch === ' ' && quote === null) {

            if (token.length) {
                tokens.push(token);
                token = '';
            }

            continue;
        }

        token += ch;
    }

    if (token.length) {
        tokens.push(token);
    }

    /*
    =========================================================
    COMMAND + ARGUMENTS
    =========================================================
    */

    const command = tokens[0]?.toLowerCase() || '';

    const args = Object.create(null);
    args._ = [];

    for (let i = 1, len = tokens.length; i < len; i++) {

        const t = tokens[i];

        // OPTIONS
        if (t[0] === '-') {

            // LONG OPTION (--option=value)
            if (t[1] === '-') {

                const eq = t.indexOf('=');

                // --key=value
                if (eq !== -1) {

                    const key = t.slice(2, eq);
                    const value = stripQuotes(t.slice(eq + 1));

                    args[key] = value;
                    continue;
                }

                // --key value
                const key = t.slice(2);
                const next = tokens[i + 1];

                if (next && next[0] !== '-') {
                    args[key] = stripQuotes(next);
                    i++;
                }
                else {
                    args[key] = true;
                }

                continue;
            }

            // SHORT OPTIONS
            const flags = t.slice(1);

            /*
            SINGLE FLAG
            Example:
            -w 3
            */
            if (flags.length === 1) {

                const next = tokens[i + 1];

                if (next && next[0] !== '-') {
                    args[flags] = stripQuotes(next);
                    i++;
                }
                else {
                    args[flags] = true;
                }

                continue;
            }

            /*
            MULTIPLE FLAGS
            Example:
            -abc
            */
            for (let j = 0; j < flags.length; j++) {
                args[flags[j]] = true;
            }

            continue;
        }

        // POSITIONAL ARGUMENT
        args._.push(stripQuotes(t));
    }

    /*
    =========================================================
    HELPERS
    =========================================================
    */

    function stripQuotes(str) {

        const first = str[0];
        const last = str[str.length - 1];

        if (
            (first === '"' && last === '"') ||
            (first === "'" && last === "'")
        ) {
            return str.slice(1, -1);
        }

        return str;
    }

    const getOption = (key, fallback) => args[key] ?? fallback;
    const getArg = (index, fallback) => args._[index] ?? fallback;

    /*
    =========================================================
    COMMAND REGISTRY
    =========================================================
    */

    const commands = Object.create(null);

    /*
    =========================================================
    SYSINFO
    =========================================================

    Usage:
    sysinfo
    */

    commands.sysinfo = function () {
        app.sysinfo();
    };

    /*
    =========================================================
    CLEAR
    =========================================================

    Usage:
    clear
    cls
    */

    commands.clear =
    commands.cls = function () {
        jq.Clear();
    };

/*
=========================================================
SCRIPT LIST
=========================================================

Usage:
slist
*/

commands.slist = function () {

    store.phoneDoDB.executeSql(

        "SELECT scriptName AS scrnme FROM userScripts;",

        [],

        function (rs) {

            const rows = rs.rows;
            const count = rows.length;

            if (!count) {

                jq.Write(
                    ' No scripts found!\n',
                    'warningStyle'
                );

                return;
            }

            let output = '';

            for (let i = 0; i < count; i++) {

                output +=
                    ` \x1b[33m${i + 1}\x1b[0m. ` +
                    rows.item(i).scrnme +
                    '\n';
            }

            output += '\n';

            jq.Write(
                output,
                'successStyle'
            );
        },

        function (error) {

            app.errorPrint(
                'SQLite Error: ' +
                error.message +
                '\n'
            );
        }
    );
};

    /*
    =========================================================
    DATE
    =========================================================

    Usage:
    date
    */

    commands.date = function () {

        jq.Write(
            ` ${new Date().toLocaleString()}\n\n`,
            'successStyle'
        );
    };
    /*
                      =========================================================
                      SCRIPT LIST
                      =========================================================

                      Usage:
                      slist
                      */

                      commands.slist = function () {

                          store.phoneDoDB.executeSql(

                              "SELECT scriptName AS scrnme FROM userScripts;",

                            [],

                            function (rs) {

                                const rows = rs.rows;
                                const count = rows.length;

                                if (!count) {

                                    jq.Write(
                                        ' No scripts found!\n',
                                        'warningStyle'
                                    );

                                    return;
                                }

                                let output = '';

                                for (let i = 0; i < count; i++) {

                                    output +=
                                        ` \x1b[33m${i + 1}\x1b[0m. ` +
                                        rows.item(i).scrnme +
                                        '\n';
                                }

                                output += '\n';

                                jq.Write(
                                    output,
                                    'successStyle'
                                );
                            },

                            function (error) {

                                app.errorPrint(
                                    'SQLite Error: ' +
                                    error.message +
                                    '\n'
                                );
                            }
                        );
                    };

    /*
    =========================================================
    IPCONFIG
    =========================================================

    Usage:
    ipconfig
    ifconfig
    */

    commands.ipconfig =
    commands.ifconfig = function () {
        app.ipconfig();
    };

    /*
    =========================================================
    BEEP
    =========================================================

    Usage:
    beep
    beep -n 3
    beep --n=5
    */

    commands.beep = function () {

        const count = Number(getOption('n', 1));

        app.cordova.dialogs.beep(count);
    };

    /*
    =========================================================
    ECHO
    =========================================================

    Usage:
    echo hello world
    echo "hello world"
    */

    commands.echo = function () {

        jq.Write(
            args._.join(' ') + '\n',
            'successStyle'
        );
    };

    /*
    =========================================================
    HELP
    =========================================================

    Usage:
    help
    help ping
    */

    commands.help = function () {

        const cmd = getArg(0, 'help');

        jq.Write(
            app.store.commands.helpCommand(cmd) + '\n',
            'successStyle'
        );
    };

    /*
    =========================================================
    RUN SCRIPT
    =========================================================

    Usage:
    run test.nts
    run -i test.nts
    run --i=test.nts
    */

    commands.run = function () {

        const script = getOption('i', getArg(0, ''));

        if (!script) {

            jq.Write(
                ' Error: Script name is required.\n',
                'errorStyle'
            );

            return;
        }

        if (store.bDebugMode) {
            app.debugPrint(`Running script: "${script}"`);
        }

        jq.Disable();

        app.getActualScriptContent(script)

            .then(scriptContent => {

                if (scriptContent) {

                    /*
                    WARNING:
                    eval/evaluate can deoptimize JS engines.
                    */

                    evaluate(scriptContent);
                }
            })

            .catch(error => {

                jq.Write(
                    ' warn: ' + error + '\n',
                    'warningStyle'
                );
            })

            .finally(() => {
                jq.Enable();
            });
    };

    /*
    =========================================================
    PING
    =========================================================

    Usage:
    ping google.com
    ping 8.8.8.8

    ping google.com -w 3
    ping google.com -r 2
    ping google.com -v v6

    ping google.com -w 3 -r 2 -v v4

    IMPORTANT:
    Supported syntax:
    -w 3

    NOT:
    -w3
    */

    commands.ping = function () {

        const target = getOption('ip', getArg(0, null));

        if (!target) {

            jq.Write(
                ' Ping request could not find host.\n',
                'warningStyle'
            );

            return;
        }

        jq.Disable();

        const pinger = new Ping();

        const timeout = Number(getOption('w', 1));
        const retries = Number(getOption('r', 1));

        const version =
            getOption('v', 'v4') === 'v6'
                ? 'v6'
                : 'v4';

        pinger.ping(

            [{
                query: target,
                timeout,
                retry: retries,
                version
            }],

            function (results) {

                if (!results || !results.length) {

                    jq.Enable();

                    jq.Write(
                        ' Ping failed: No response.\n',
                        'errorStyle'
                    );

                    return;
                }

                const res = results[0];
                const r = res.response.result;

                jq.Write(
`Ping statistics for ${r.target}:

Status: ${res.response.status}

Approximate round trip times:
Minimum = ${r.minRtt}ms
Maximum = ${r.maxRtt}ms
Average = ${r.avgRtt}ms

Packets:
Sent = ${r.pctTransmitted}
Received = ${r.pctReceived}
Lost = ${r.pctLoss}

`,
                    'infoStyle'
                );

                jq.Enable();
            },

            function (e) {

                jq.Enable();

                jq.Write(
                    e + '\n',
                    'errorStyle'
                );
            }
        );
    };

    /*
    =========================================================
    BLUETOOTH SCAN
    =========================================================

    Usage:
    startbtscan
    stopbtscan
    */

    commands.startbtscan = function () {

        if (store.scanning) {

            jq.Write(
                '> Scan already in progress.\n',
                'warnStyle'
            );

            return;
        }

        jq.Write(
            '> Starting Bluetooth scan...\n',
            'successStyle'
        );

        store.devices = Object.create(null);
        store.scanning = true;

        let lastUIUpdate = 0;

        evothings.ble.startScan(

            function (device) {

                device.timeStamp = Date.now();

                store.devices[device.address] = device;

                /*
                Throttle UI updates
                */

                const now = Date.now();

                if (now - lastUIUpdate < 250) {
                    return;
                }

                lastUIUpdate = now;

                const adv = device.advertisementData || {};

                let advInfo = '';

                if (adv.kCBAdvDataLocalName) {
                    advInfo +=
                        ' LocalName: ' +
                        adv.kCBAdvDataLocalName;
                }

                if (adv.kCBAdvDataManufacturerData) {
                    advInfo +=
                        ' ManufacturerData: ' +
                        evothings.util.typedArrayToHexString(
                            adv.kCBAdvDataManufacturerData
                        );
                }

                if (adv.kCBAdvDataServiceUUIDs) {
                    advInfo +=
                        ' Services: ' +
                        adv.kCBAdvDataServiceUUIDs.join(', ');
                }

                jq.Write(
`\n[Device Found]
Name: ${device.name || 'no name'}
Address: ${device.address}
RSSI: ${device.rssi}
Advertisement: ${advInfo || 'N/A'}

`,
                    'successStyle'
                );
            },

            function (error) {

                jq.Write(
                    '> BLE scan error: ' + error + '\n',
                    'errorStyle'
                );

                store.scanning = false;
            }
        );
    };

    commands.stopbtscan = function () {

        if (!store.scanning) {

            jq.Write(
                '> No active scan.\n',
                'warnStyle'
            );

            return;
        }

        evothings.ble.stopScan();

        store.scanning = false;

        jq.Write(
            '> Scan stopped.\n',
            'successStyle'
        );
    };

    /*
    =========================================================
    EXECUTE COMMAND
    =========================================================
    */

    const handler = commands[command];

    if (handler) {
        handler();
        return;
    }

    /*
    =========================================================
    UNKNOWN COMMAND
    =========================================================
    */

    if (store.bDebugMode) {

        app.debugPrint(
            `Process Error: Invalid command "${command}"`
        );
    }

    jq.Write(
        `  \x1b[31mERROR:\x1b[0m command "\x1b[1;37m${command}\x1b[0m" is not recognized.\n`,
        'errorStyle'
    );
    },

    sysinfo() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const info =
    ' Device' +
    '\n  Platform     : ' + app.cordova.device.platform() +
    '\n  Version      : ' + app.cordova.device.version() +
    '\n  Manufacturer : ' + app.cordova.device.manufacturer() +
    '\n  Model        : ' + app.cordova.device.model() +
    '\n  UUID         : ' + app.cordova.device.uuid() +
    '\n  Serial       : ' + app.cordova.device.serial() +
    '\n  Is virtual   : ' + app.cordova.device.isVirtual() +
    '\n  Network' +
    '\n  Connection   : ' + app.cordova.network.getConnectionType() +
    '\n  Battery' +
    '\n  Level        : ' + app.cordova.battery.level +
    '\n  Is Plugged   : ' + app.cordova.battery.isPlugged + '\n';

  return app.store.jqconsole.Write(info, 'successStyle');
    },

    ipconfig() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const { connectionTypes } = app.cordova.network;

const connectionType = app.cordova.network.getConnectionType();

const printIP = (label) => ({ ip, subnet }) => {
    app.successPrint(
        `${label} IP     : ${ip}\n${label} subnet : ${subnet}`
    );
};

const printError = (label) => (error) => {
    app.errorPrint(`${label} IP Error : ${error}`);
};

const handlers = {
    [connectionTypes.WIFI]: () =>
        networkinterface.getWiFiIPAddress(
            printIP('WIFI'),
            printError('WIFI')
        ),

    [connectionTypes.CELL_2G]: handleCarrier,
    [connectionTypes.CELL_3G]: handleCarrier,
    [connectionTypes.CELL_4G]: handleCarrier,
    [connectionTypes.CELL]: handleCarrier,
};

function handleCarrier() {
    return networkinterface.getCarrierIPAddress(
        printIP('Carrier'),
        printError('Carrier')
    );
}

if (handlers[connectionType]) {
    return handlers[connectionType]();
}

if (connectionType === connectionTypes.NONE) {
    app.errorPrint('err : No configurable connections detected.');
}
    },

    friendlyTime() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const now = new Date();
  /*const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);*/
  const hour = ("0" + now.getHours()).slice(-2);
  const minute = ("0" + now.getMinutes()).slice(-2);
  const second = ("0" + now.getSeconds()).slice(-2);
  //const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hour}:${minute}:${second}`;
  //${formattedDate}
return `${formattedTime}`;
    },

    debugPrint(msg) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return app.store.jqconsole.Write(' DEBUG : ' + msg  + '\n', 'debugStyle');
    },

    tidyPrompt(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let options = {
    // Basic Formatting
    indent_size: app.getOption('indentsize', 2),        // Smaller indent for better readability
    indent_char: app.getOption('indentchar', ' '),      // Space instead of tab for better consistency
    indent_with_tabs: app.getOption('tabindent', false), // Spaces are more consistent across editors

    // Line Handling
    wrap_line_length: app.getOption('wrapllen', 100),    // Modern screens can handle longer lines
    max_preserve_newlines: app.getOption('maxnl', 2),    // Limit consecutive empty lines
    preserve_newlines: app.getOption('presnl', true),
    end_with_newline: app.getOption('nle', true),

    // Braces and Spacing
    brace_style: app.getOption('brcstyl', 'collapse-preserve-inline'), // Better for modern JS
    space_in_paren: app.getOption('spacepar', false),   // Cleaner look without spaces
    space_in_empty_paren: false,                        // Consistent with space_in_paren
    space_after_anon_function: true,                    // Better readability for functions
    space_after_named_function: true,                   // Consistency with anonymous functions

    // Indentation Control
    keep_array_indentation: app.getOption('arrindent', true),     // Better array readability
    keep_function_indentation: app.getOption('funcindent', true), // Preserve intentional function formatting

    // Object Formatting
    object_curly_spacing: true,                         // Spaces in object literals: { a: 1 }
    computed_property_spacing: true,                    // Spaces in computed properties: obj[ key ]

    // Special Cases
    unescape_strings: false,                           // Don't decode escapes
    jslint_happy: app.getOption('jslint', true),       // Stricter formatting
    break_chained_methods: app.getOption('breakchain', true), // Better readability for long chains
};

SA.confirm({
    title: 'Tidy "' + scriptName + '" ?',
    body: 'Tidying a script enhances readability and maintainability.',
    okText: 'Tidy',
    cancelText: 'Options'
}).then(function(result) {

    if (result === true) {
        app.tidyScript(options);
    }
    else if (result === false) {
        app.showDialog('dlgTidyOptions');
    }
    // null => dismissed, do nothing

});
    },

    tidyScript(oOptions) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let scriptContent = app.store.aceedit.getValue();

let bcontnet = js_beautify(scriptContent, oOptions);
app.store.aceedit.setValue(bcontnet);
app.store.aceedit.clearSelection();

scriptContent = null, bcontnet = null;
//cordova.plugins.notification.local.schedule({
//    title: 'Tidy',
//    text: 'Tidied script successfully'
//});

app.toastMsg('Tidy success', 'long');

    },

    closeFile() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.replaceView('viewConsole');
app.store.aceedit.setValue('');
app.store.currentScriptName = '';
app.populateUserScripts();
    },

    browserOpen(url) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let target = '_blank'; // '_self';
let features = 'zoom=no,navigationbuttoncolor=#ffffff,hardwareback=yes,footer=no,location=no,hideurlbar=no,toolbarcolor=#4a4968,closebuttoncolor=#1E1E2A,navigationbuttoncolor=#1E1E2A';

let winRef = cordova.InAppBrowser.open(url, target, features);

// Handle back button click to return to the app
winRef.addEventListener('loaderror', function(err) {
    app.toastMsg(err.message, 'long');
});


//winRef.addEventListener('loadstop', function(event) {
    
//});



    },

    errorFileCriteria() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
// Tactile feedback for error
app.cordova.vibration.vibrate(50);

return SA.alert({
    title: "Invalid File Name",
    html: `
        <div style="font-size: 0.95rem; line-height: 1.6; text-align: center; color: inherit; opacity: 0.8;">
            Please check your script name:
            <div style="margin-top: 12px; font-weight: 600; color: #3f51b5; font-size: 1rem;">
                • Needs .nts extension<br>
                • Max 25 characters<br>
                • Cannot be empty
            </div>
        </div>`
});
    },

    minifyScript(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const scriptContent = app.store.aceedit.getValue();

// Validate input
if (!scriptContent || scriptContent.trim() === '') {
    app.toastMsg('No content to Minify', 'long');
    return;
}

app.cordova.dialogs.confirm(
  'Are you sure you want to minify this script? This will remove comments and whitespace.',
  'Minify "' + scriptName + '" ?', function(id)
{
  switch (id) {
    case 1:
       app.saveScript(scriptName);
       app.getActualScriptContent(scriptName)
           .then(code => {
               if (!code) {
                   throw new Error("Failed to retrieve script content");
               }

               // Minify the code
               const minifiedCode = minifyJS(code);

               // Update the editor with minified code
               app.store.aceedit.setValue(minifiedCode);
               app.store.aceedit.clearSelection();

               // Show success message
               app.toastMsg("Minified Successfully");
           })
           .catch(error => {
               // Handle errors
               console.error("Minification error:", error);
               app.toastMsg("Minification failed: " + error.message, "long");
           })
           .finally(() => {
               // Clean up references to help garbage collection
               minifiedCode = null;
           });
      break;
    case 2:
      app.showDialog('dlgTidyOptions');
      break;
  }
},
['Minify', 'Options', 'Cancel']
);


// Clean up references to help garbage collection
scriptContent = null;
return;

function minifyJS(code, options = {}) {
  // Default configuration
  const config = {
    removeComments: true,
    removeWhitespace: true,
    shortenVariables: false,
    preserveNewlines: false,
    preserveStrings: true,
    preserveRegex: true,
    removeConsole: false,
    removeDebugger: true,
    beautify: false,
    ...options
  };

  // Store string literals to prevent modifying their contents
  const strings = [];
  const regexes = [];

  // Helper function to preserve strings and regex
  function preserveContent(code) {
    if (config.preserveStrings) {
      // Save string literals
      code = code.replace(/'([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`/g, match => {
        strings.push(match);
        return `__STRING${strings.length - 1}__`;
      });
    }

    if (config.preserveRegex) {
      // Save regex literals (basic cases)
      code = code.replace(/\/(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+\/[gimuy]*/g, match => {
        regexes.push(match);
        return `__REGEX${regexes.length - 1}__`;
      });
    }

    return code;
  }

  // Helper function to restore preserved content
  function restoreContent(code) {
    // Restore strings
    strings.forEach((str, i) => {
      code = code.replace(`__STRING${i}__`, str);
    });

    // Restore regexes
    regexes.forEach((regex, i) => {
      code = code.replace(`__REGEX${i}__`, regex);
    });

    return code;
  }

  try {
    // Save special content before processing
    code = preserveContent(code);

    // Remove comments
    if (config.removeComments) {
      code = code
        .replace(/\/\/[^\n]*/g, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
    }

    // Remove console.* statements
    if (config.removeConsole) {
      code = code.replace(/console\.[^(;|\n)]*\([^;]*\);?/g, '');
    }

    // Remove debugger statements
    if (config.removeDebugger) {
      code = code.replace(/debugger;/g, '');
    }

    // Handle whitespace
    if (config.removeWhitespace) {
      code = code
        // Replace multiple spaces with a single space
        .replace(/\s+/g, ' ')
        // Remove spaces around operators and punctuation
        .replace(/\s*([\{\}\(\)\[\]\;\,\:\+\-\*\/\%\=\>\<\!\&\|\?\~])\s*/g, '$1')
        // Add space after keywords
        .replace(/(var|let|const|function|return|if|for|while|do|switch|case|try|catch|finally)\b/g, '$1 ')
        // Clean up any double spaces that might have been created
        .replace(/\s{2,}/g, ' ')
        .trim();
    }

    // Handle newlines
    if (!config.preserveNewlines) {
      code = code.replace(/[\r\n]+/g, '');
    }

    // Basic variable shortening (for demonstration - a real implementation would be more sophisticated)
    if (config.shortenVariables) {
      const variableMap = new Map();
      let varCounter = 0;

      // Find declared variables (basic implementation)
      const varPattern = /\b(?:var|let|const)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
      code = code.replace(varPattern, (match, varName) => {
        if (!variableMap.has(varName)) {
          variableMap.set(varName, `_${varCounter++}`);
        }
        return match.replace(varName, variableMap.get(varName));
      });

      // Replace variable usage
      variableMap.forEach((shortName, originalName) => {
        const regex = new RegExp(`\\b${originalName}\\b`, 'g');
        code = code.replace(regex, shortName);
      });
    }

    // Restore preserved content
    code = restoreContent(code);

    // Basic beautification if requested
    if (config.beautify) {
      let indent = 0;
      let result = '';

      for (let i = 0; i < code.length; i++) {
        const char = code[i];

        if (char === '{') {
          result += char + '\n' + '  '.repeat(++indent);
        } else if (char === '}') {
          result += '\n' + '  '.repeat(--indent) + char;
        } else if (char === ';') {
          result += char + '\n' + '  '.repeat(indent);
        } else {
          result += char;
        }
      }

      code = result;
    }

    return code;
  } catch (error) {
    console.error("Error in minifyJS:", error);
    throw new Error("Minification failed: " + error.message);
  } finally {
    // Clean up references to help garbage collection
    strings.length = 0;
    regexes.length = 0;
  }
}
    },

    isValidIP(ip) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
//app.debugPrint(' validip: testing..\n');
const ipPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
return ipPattern.test(ip);
    },

    getWIFIIP() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return networkinterface.getWiFiIPAddress(function(inf) {
    app.successPrint(" WIFI IP     : " + inf.ip + "\n WIFI subnet : " + inf.subnet);
}, function(e) {
    app.errorPrint(' WIFI IP Error : ' + e);
});
    },

    successPrint(msg) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return app.store.jqconsole.Write(msg + '\n', 'successStyle');

    },

    errorPrint(msg) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return app.store.jqconsole.Write(msg + '\n', 'errorStyle');
    },

    actionUP() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
switch (app.store.ucv) {
    case 'viewConsole':
        if (!app.store.loading){
            app.store.jqconsole.ClearPromptText();
            // Volume up key (navigate to previous command)
            if (app.store.currentPosition > 0)
            {
                app.store.currentPosition--;
            }
            else
            {
                app.store.currentPosition = app.store.commandHistory.length - 1;
            }

            app.store.jqconsole.SetPromptText(app.store.commandHistory[app.store.currentPosition]);
        }
        else {
            app.toastMsg('Busy.. Please wait.', 'short');
        }
        break;
    case 'viewEditScript':
          // Get the current font size from the Ace editor
          let currentFontSize = app.store.aceedit.getFontSize();
          if (currentFontSize === 20) return app.toastMsg(' Reached Maximum font size.' , 'short');
          // Increase the font size
          let newFontSize = currentFontSize + 1;
          //app.toastMsg(newFontSize, 'short');

          // Set the new font size in the Ace editor
          app.store.aceedit.setFontSize(newFontSize);
        break;
    default:
        break;
}
    },

    actionDown() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
switch (app.store.ucv) {
case 'viewConsole':

	if (!app.store.loading) {
		// Volume down key (navigate to next command)
		app.store.jqconsole.ClearPromptText();
		//app.prntInfo(' volume down\n');
		if (app.store.currentPosition < app.store.commandHistory.length - 1) {
			app.store.currentPosition++;
		} else {
			app.store.currentPosition = 0;
		}

		app.store.jqconsole.SetPromptText(app.store.commandHistory[app.store.currentPosition]);
	} else {
		app.toastMsg('Busy.. Please wait.', 'short');
	}
	break;
case 'viewEditScript':
	// Get the current font size from the Ace editor
	let currentFontSize = app.store.aceedit.getFontSize();
  if (currentFontSize === 8) return app.toastMsg(' Reached least font size.', 'short');
	// Decrease the font size
	let newFontSize = currentFontSize - 1;
  //app.toastMsg(newFontSize);
	// Set the new font size in the Ace editor
	app.store.aceedit.setFontSize(newFontSize);
	break;
default:
	break;
}

    },

    warningPrint(msg) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return app.store.jqconsole.Write(msg + '\n', 'errorStyle');

    },

    _CLI_restart() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.jqconsole.Clear();
app.store.jqconsole.Write(app.store.hdr, 'jqconsole-header');
app.store.commandHistory = null;
app.store.commandHistory = [''];
app.toastMsg('New session', 'short');
return;
    },

    exportScript() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let sn = app.store.currentScriptName;
if (!sn) return app.showAlert(' no script opened!');

app.cordova.dialogs.confirm(
    'Saved to (/storage/emulated/0/Documents/)',
    'Export "' + sn + '" ?', function(id)
	{
		switch (id) {
			case 1:
				exprt('.txt');
				break;
			case 2:
        exprt('.nts');
				break;
      default:
          break;
		}
	},
	['.txt', '.nts', 'Cancel']
);

function exprt(fileType = '.nts'){
   let fileContent = app.store.aceedit.getValue();
   let fileName = ((fileType == '.nts') ? sn : sn + '.txt');
   SpinnerDialog.show('Exporting ' + fileName, "Exporting : " + fileName + " to (" + cordova.file.externalRootDirectory + "Documents/" + fileName + ") ! Please wait..", true);


   app.cordova.file.writeTextFile(
      cordova.file.externalRootDirectory + 'Documents/',
      fileName.toString(),
      fileContent.toString(),
      function () {
        setTimeout(function() {
            SpinnerDialog.hide();
            app.toastMsg('Exported to /Documents/' + fileName, 'long');
            if (fileType == '.txt') {
               window.plugins.socialsharing.share('Here is your PhoneDo Script.', 'PhoneDo Script', cordova.file.externalRootDirectory + 'Documents/' + fileName);
            }
        }, 2000);
      },
      function (error) {
        SpinnerDialog.hide();
        app.showAlert('An error occur: ' + app.serialize(error));
      }
    );
}

    },

    toggleSetting(id, state) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.toastMsg(id + ' : ' + state);
app.setOption(id, state);
    },

    feedback() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
cordova.plugins.email.open({
    to:      'dennisk@zainahtech.com',
    cc:      'kabuemurage@gmail.com',
    subject: 'PhoneDo v' + app.version + ' feedback.',
    body:    '',
    app: 'gmail'
});
    },

    getLastVaccumedDiff(dateVaccumed, dateToday) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

// Parse the date strings into Date objects
const lastVaccumedDate = new Date(dateVaccumed);
const todayDate = new Date(dateToday);

// Calculate the difference in days
const diffInDays = Math.round(Math.abs((lastVaccumedDate - todayDate) / MILLISECONDS_IN_DAY));

// app.showAlert(dateVaccumed + ' , ' + dateToday + ' Diff:' + diffInDays);
return diffInDays;
    },

    saveAs(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
if (!scriptName) return app.toastMsg('Save Error: Invalid parameters!', 'short');

let scriptContent = app.store.aceedit.getValue();

let blob = new Blob([scriptContent], { type: "text/plain" });

cordova.plugins.saveDialog.saveFile(blob, scriptName + '.txt').then(uri => {
    app.showAlert(scriptName + " saved to '" + uri + '"',
        'Information',
        app.kind.none,
        [
            { text: 'Share', kind: app.kind.primary, size: app.size.sm },
            { text: 'Ok', kind: app.kind.danger, size: app.size.sm }
        ],
        function(index) {
            //app.showAlert('You close the alert pressing the button with index: ' + index);
            if (index == 0) {
                app.getActualScriptContent(scriptName).then(content => {
                    window.plugins.socialsharing.share(content, scriptName, uri);
                });
            }
        }
    );

}).catch(reason => {
    app.showAlert(reason);
});
    },

    ln() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
// Request permissions first
    cordova.plugins.notification.local.requestPermission(function(granted) {
        if (granted) {
            app.toastMsg("Notification permission granted");

            // For Android 13+, trigger the permission request
            cordova.plugins.notification.local.setDummyNotifications();

            // Set defaults
            cordova.plugins.notification.local.setDefaults({
                led: { color: '#FF00FF', on: 500, off: 500 },
                vibrate: false
            });

            // Create the notification
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: 'PhoneDo Running',
                text: 'Your script is running in the background',
                icon: 'res://icon',
                smallIcon: 'res://icon',
                silent: false, // Changed to false to test if sound helps
                ongoing: true,
                priority: 2,
                color: '4A90E2',
                lockscreen: true,
                foreground: true,
                channel: 'phonedo-background' // Add a specific channel for Android 8+
            }, function(success) {
                console.log("Notification scheduled successfully", success);
            }, function(error) {
                console.error("Failed to schedule notification", error);
            });
        } else {
            app.toastMsg("Notification permission denied");
        }
    });

cordova.plugins.notification.local.schedule({
    title: 'Simple Test',
    text: 'Testing notification system'
});
    },

    shareScript() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const scriptName = app.store.currentScriptName;
if (!scriptName) return app.toastMsg('Save Error: Invalid parameters!', 'short');

app.saveScript(scriptName);
app.getActualScriptContent(scriptName).then(content => {
    window.plugins.socialsharing.share(content, scriptName, cordova.file.externalDataDirectory);
});
    },

    resetEditorSettings() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const editor = app.store.aceedit;
const session = editor.getSession();

// Reset to default settings
session.setUseWorker(true);
session.setUseWrapMode(false);
editor.setShowInvisibles(false);
editor.renderer.setShowGutter(true);
editor.setHighlightActiveLine(true);
editor.setShowPrintMargin(true);
session.setTabSize(4);
session.setUseSoftTabs(true);
editor.setFontSize(14);
editor.setBehavioursEnabled(true);
editor.setOption('scrollPastEnd', false);

app.toastMsg("Editor settings have been reset to defaults", "short");
    },

    backgroundM() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.toastMsg("Running in background");
cordova.plugins.backgroundMode.enable();
cordova.plugins.backgroundMode.setDefaults({
    title: 'PhoneDo Running',
    text: 'Your script is running in the background.',
    icon: 'icon',
    color: '4A90E2'
});
cordova.plugins.backgroundMode.moveToBackground();

    },

    optimizeDB(iDays) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let lvd = app.getOption('lvd', '');
// Calculate the difference in days
let diff = app.getLastVaccumedDiff(lvd, new Date().toISOString().split('T')[0]);

if (!lvd || diff >= iDays) {
    SpinnerDialog.show('Optimizer', app.name + " is being optimized. Please wait..", true);
    app.store.phoneDoDB.executeSql('VACUUM', [],
        function () {
            // Update the lastVaccumed date after successful VACUUM
            setTimeout(function() {
                SpinnerDialog.hide();
                app.setOption('lvd', new Date().toISOString().split('T')[0]);
                app.toastMsg('Optimized successfully', 'short');
            }, 3000);
        },
        function (e) {
            app.showAlert('Error vacuuming database: ' + e.message);
            SpinnerDialog.hide();
        }
    );
}
    },

    askAI() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.showDialog('dlgAskAI');
    },


    // Internal / Private app methods

    _appEventOnResize(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnMessage(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnContextMenu(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnColorSchemeChange(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;

      
    },

    _appEventOnOnline(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnOffline(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnDomReady() {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = null;
      app.setReactiveVar('bDebugMode', false);
app.setReactiveVar('commandHistory', []);
app.setReactiveVar('currentPosition', -1);
app.setReactiveVar('currentScriptName', '');
app.setReactiveVar('bSearchingScript', false);


app.setReactiveVar('hdr', `PhoneDo [Version ${app.version}]\n`);
app.setReactiveVar('jqconsole', $('#console_wrapper').jqconsole(app.store.hdr + '\n'));

$('.debugStyle span, .infoStyle span, .warningStyle span, .successStyle span, .errorStyle span').addClass('selectabletxt');

app.setReactiveVar('commands', {
    startbtscan: 'Starts bluetooth scanning.',
    stopbtscan: 'Stops bluetooth scanning',
    beep: 'Plays a beep sound to provide an audible notification or alert.',
    cls : 'Clears the screen by removing all text and resetting the terminal display.',
    clear: 'Clears the screen by removing all text and resetting the terminal display.',
    date: 'Displays or sets the current date, providing information about the calendar day.',
    echo : 'Prints messages or text to the terminal, allowing you to display custom output.',
    exit: 'Quits the current terminal instance, closing the session and returning to the previous context.',
    help: 'Displays comprehensive help information for available commands, providing guidance and usage examples.',
    ifconfig: 'Retrieves a device\'s IP address information.',
    ipconfig: 'Retrieves a device\'s IP address information.',
    prompt: 'Changes the command prompt, modifying the text or symbols displayed before user input.',
    time: 'Displays the current system time, providing information about the current hour, minute, and second.',
    update: 'Updates local libraries or dependencies, ensuring you have the latest versions and features.',
    sysinfo: 'Displays information about a device, including hardware specifications and software configuration.',
    slist: 'Script management utility to view a script information.',
    ping: 'Send ICMP ECHO_REQUEST to network hosts.',
    run: 'Runs a script and pauses script execution until the program finishes.',
    helpCommand: function (key) { // For more information on a specific command.
        // if (app.trimStr(key).length === 0) return '';
        let ret = '';
        if (app.store.commands.hasOwnProperty(key)) {
            ret = ' ' + app.store.commands[key] + '\n';
        } else {
            for (const command in app.store.commands) {
                if (typeof app.store.commands[command] === 'string') ret += ` ${command}: ${app.store.commands[command]}\n`;
            }
        }
        return ret;
    }

});

let handleInput = async function (input) {
    // Trim input and store in reactive variable
    app.setReactiveVar('commandstring', app.trimStr(input));

    // Skip processing if input is empty
    if (app.store.commandstring.length === 0) {
        app.store.jqconsole.Prompt(false, handleInput);
        return;
    }

    // Parse the command string into components
    const tokens = app.store.commandstring.trim().split(/\s+/);
    const commandName = tokens[0].toLowerCase();

    // Check if command exists in the commands registry
    if (commandName && app.store.commands.hasOwnProperty(commandName)) {
        // If entered command is not the same as the last command pushed to history, add it
        if (app.store.commandstring !== app.store.commandHistory[app.store.commandHistory.length - 1]) {
            if (app.store.bDebugMode) app.debugPrint('stacking "' + app.store.commandstring + '" to command history array.\n');
            app.store.commandHistory.push(app.store.commandstring);
            // Reset current position to the last command in history
            app.store.currentPosition = app.store.commandHistory.length - 1;
        }

        app.processCommand();
    } else {
        if (commandName) {
            // Vibrate and show error for unrecognized command
            app.cordova.vibration.vibratePattern([50, 50, 50, 100]);
            app.store.jqconsole.Write(`  \x1b[31mERROR:\x1b[0m command "\x1b[1;37m${commandName}\x1b[0m" is not recognized.\n`);
        }
    }

    // Setup the next prompt
    app.store.jqconsole.ScrollWindowToPrompt();
    app.store.jqconsole.Prompt(false, handleInput);
};

app.setReactiveVar('jqcsettings', [{
        "id": "debugModeSetting",
        "label": "Debug Mode",
        "description": "Enables detailed error logging to the console for effective debugging. This setting provides extensive error information to aid in debugging your application.",
        "setstate": true
    },
    {
        "id": "verboseModeSetting",
        "label": "STDOUT Verbosity",
        "description": "Adjusts the level of detail in standard output logging. This setting controls the amount of information displayed in standard output for better control over verbosity.",
        "setstate": true
    },
    {
        "id": "historyNavigationSetting",
        "label": "Command History Navigation",
        "description": "Navigate past commands using device volume buttons for quick access. This setting allows for easy navigation through your command history using device-specific controls.",
        "setstate": false
    },
    {
        "id": "nativeAPIIntegrationSetting",
        "label": "Allow Native API Integrations",
        "description": "Execute commands from native APIs, enhancing app functionality. Enabling this setting allows for seamless integration with native APIs, expanding the capabilities of your application.",
        "setstate": true
    },
    {
        "id": "superUserModeSetting",
        "label": "SuperUser Mode (godMode)",
        "description": "Toggle elevated privilege commands for advanced control. This setting provides access to advanced, elevated privilege commands for experienced users.",
        "setstate": false
    },
    {
        "id": "sessionLockSetting",
        "label": "Session Lock/Unlock",
        "description": "Lock or unlock the active session for enhanced security and flexibility. This setting allows you to secure your active session and unlock it when needed for added security and flexibility.",
        "setstate": true
    }
]);


app.setReactiveVar('acetheme', [
    { "name": 'ambiance' },
    { "name": 'chaos' },
    { "name": 'chrome' },
    { "name": 'clouds' },
    { "name": 'clouds_midnight' },
    { "name": 'cobalt' },
    { "name": 'crimson_editor' },
    { "name": 'dawn' },
    { "name": 'dracula' },
    { "name": 'dreamweaver' },
    { "name": 'eclipse' },
    { "name": 'github' },
    { "name": 'gob' },
    { "name": 'gruvbox' },
    { "name": 'idle_fingers' },
    { "name": 'iplastic' },
    { "name": 'katzenmilch' },
    { "name": 'kr_theme' },
    { "name": 'kuroir' },
    { "name": 'merbivore' },
    { "name": 'merbivore_soft' },
    { "name": 'monokai' },
    { "name": 'mono_industrial' },
    { "name": 'nord_dark' },
    { "name": 'pastel_on_dark' },
    { "name": 'solarized_dark' },
    { "name": 'solarized_light' },
    { "name": 'sqlserver' },
    { "name": 'terminal' },
    { "name": 'textmate' },
    { "name": 'tomorrow' },
    { "name": 'tomorrow_night' },
    { "name": 'tomorrow_night_blue' },
    { "name": 'tomorrow_night_bright' },
    { "name": 'tomorrow_night_eighties' },
    { "name": 'twilight' },
    { "name": 'vibrant_ink' },
    { "name": 'xcode' }
]);


// Call handleInput function for the first time
// app.store.jqconsole.Focus();
app.store.jqconsole.ScrollWindowToPrompt();
app.store.jqconsole.Prompt(false, handleInput);


// Keep references to the original console methods
const originalLog = console.log;
const originalError = console.error;
const originalDebug = console.debug;
const originalInfo = console.info;

// Helper to write to jqconsole
function writeToJQConsole(messages, style, fallback) {
    if (window.app && app.store && app.store.jqconsole) {
        try {
            const formatted = messages.map(msg => {
                if (typeof msg === "object") {
                    try {
                        return JSON.stringify(msg, null, 2); // pretty print JSON
                    } catch (e) {
                        return String(msg);
                    }
                }
                return String(msg);
            });

            app.store.jqconsole.Write(formatted.join(" ") + "\n", style);
            app.store.jqconsole.ScrollWindowToPrompt();
        } catch (e) {
            fallback("jqconsole error:", e, ...messages);
        }
    } else {
        fallback(...messages);
    }
}

// Override console.log
console.log = function (...messages) {
    writeToJQConsole(messages, "infoStyle", originalLog);
};

// Override console.error
console.error = function (...messages) {
    writeToJQConsole(messages, "errorStyle", originalError);
};

// Override console.debug
console.debug = function (...messages) {
    writeToJQConsole(messages, "debugStyle", originalDebug);
};

// Override console.info
console.info = function (...messages) {
    writeToJQConsole(messages, "infoStyle", originalInfo);
};

    },

    _appEventOnBatteryStatus(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = null;
      self.cordova.battery.level = event.level;
      self.cordova.battery.isPlugged = event.isPlugged;
      
    },

    _appEventOnBatteryLow(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = null;
      self.cordova.battery.level = event.level;
      self.cordova.battery.isPlugged = event.isPlugged;
      
    },

    _appEventOnBatteryCritical(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = null;
      self.cordova.battery.level = event.level;
      self.cordova.battery.isPlugged = event.isPlugged;
      
    },

    _appEventOnDeviceReady(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;

      window.addEventListener('online', self._appEventOnOnline);
      window.addEventListener('offline', self._appEventOnOffline);
      window.addEventListener('batterylow', self._appEventOnBatteryLow);
      window.addEventListener('batterystatus', self._appEventOnBatteryStatus);
      window.addEventListener('batterycritical', self._appEventOnBatteryCritical);
      window.addEventListener('orientationchange', self._appEventOnOrientationChange);
      document.addEventListener('pause', self._appEventOnPause);
      document.addEventListener('resume', self._appEventOnResume);
      document.addEventListener('volumeupbutton', self._appEventOnVolumeUpButton);
      document.addEventListener('volumedownbutton', self._appEventOnVolumeDownButton);
      document.addEventListener('backbutton', self._appEventOnBackButton);
      app.cordova.statusbar.backgroundColorByHexString("#333333");
NavigationBar.backgroundColorByHexString("#191919", true);
app.store.ucv = 'viewConsole';
app.store.showingdlg = false;
app.store.loadedace = false;
app.store.scriptNames = [];
app.store.verbose = false;
app.store.runningscript = false;
app.store.webServerRunning = false;

SpinnerDialog.show('Initializing', "Setting up database.. Please wait", true);
app.store.phoneDoDB = openDatabase('PhoneDo.db', '1.0', 'PhoneDo Database', 2 * 1024 * 1024);

function openDatabase(name, version, displayName, estimatedSize) {
    if (window.sqlitePlugin) {
        return window.sqlitePlugin.openDatabase({
            name: name,
            location: 'default',
            androidDatabaseProvider: 'system'
        });
    } else {
        return window.openDatabase(name, version, displayName, estimatedSize);
    }
}

app.store.phoneDoDB.transaction(function (tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS userScripts (id INTEGER PRIMARY KEY AUTOINCREMENT, scriptName TEXT UNIQUE, scriptContent TEXT)`, [], function () {
        app.setReactiveVar('bLoadedDb', true);
        SpinnerDialog.hide();
    }, function (error) {
        app.setReactiveVar('bLoadedDb', false);
        SpinnerDialog.hide();
        app.showAlert('Error creating Database Table \nSQLite Error: ' + error.message);
    });
});

app.optimizeDB(3); // vaccum the db if lastVaccumed date is empty or it was more than 3 days ago.

// Make the notification persistent (cannot be dismissed by swiping)
cordova.plugins.backgroundMode.on('activate', function() {
    cordova.plugins.backgroundMode.disableWebViewOptimizations();
    cordova.plugins.backgroundMode.disableBatteryOptimizations();
});

    },

    _appEventOnPause(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      app.toastMsg('Running in background', 2000);

    },

    _appEventOnResume(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      cordova.plugins.backgroundMode.disable();
app.toastMsg('Resuming', 2000);
    },

    _appEventOnBackButton(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      // Close any opened SoloAlert Dialog
if (SA.isOpened()) {
    SA.closeAll();
    return;
}

// Close any legacy opened Dialog
if (app.store.showingdlg) {
    app.hideDialogs();
    return;
}

// Check if any menu is opened and close it instead of exiting
if ($('.content.show').length > 0) {
    $('.content').removeClass('show');
    $('.menu_item').removeClass('active');
    return;
}

if (app.store.menuopened) return;

if (app.store.ucv == 'viewConsole') {

    SA.confirm({
        title: 'Confirm',
        body: 'Are you sure you want to Exit?',
        okText: 'Exit',
        cancelText: 'Cancel',
        html: `
            <div style="margin-top:10px;">
                <button id="sa-background-btn"
                    style="
                        width:100%;
                        padding:12px;
                        margin-top:10px;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                    ">
                    Run in Background
                </button>
            </div>
        `,
        onOk: function () {
            navigator.app.exitApp();
        }
    }).then(function (confirmed) {

        if (!confirmed) return;

    });

    setTimeout(function () {
        const bgBtn = document.getElementById('sa-background-btn');

        if (bgBtn) {
            bgBtn.onclick = function () {
                SA.closeAll();
                app.backgroundM();
            };
        }
    }, 0);

} else {

    app.replaceView(app.store.upv);

}

self.preventDefault();
    },

    _appEventOnOrientationChange(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnVolumeUpButton(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      app.actionUP();
    },

    _appEventOnVolumeDownButton(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      app.actionDown();
    },

    _appEventOnClick(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      let target = $(event.target);

// Check if the clicked element is a menu item (not a dropdown item)
if (target.hasClass('menu_item')) {
    // Find the content div that's inside the same menu div as the clicked menu_item
    let menuDiv = target.closest('.menu');
    let content = menuDiv.find('.content');

    let isVisible = content.hasClass('show');

    // Hide all content elements instantly
    $('.content').removeClass('show');

    // Show the content associated with the clicked menu item instantly
    if (!isVisible) {
        content.addClass('show');
    } else {
        content.removeClass('show');
    }

    // Toggle active class for menu items
    $('.menu_item').removeClass('active');
    target.toggleClass('active', !isVisible);

    // Prevent event from bubbling up
    event.stopPropagation();
} else if (target.closest('.content').length > 0) {
    // Click is on a dropdown item - close the menu
    $('.content').removeClass('show');
    $('.menu_item').removeClass('active');
} else {
    // Click is outside both menu items and content areas
    $('.content').removeClass('show');
    $('.menu_item').removeClass('active');
}
    },

    _appEventOnDblClick(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventSwipeRight(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventSwipeLeft(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnKeyUp(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnKeyDown(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnMouseUp(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnMouseDown(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnMouseMove(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnRenderError(error, instance, info) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = null;
      self.error = { "error": error, "instance": instance, "info": info };

      console.error(error, instance, info);
      
      self.error = null;
    },

    _appEventOnJavascriptError(errorMsg, url, lineNumber) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = null;
      self.error = { "message": errorMsg, "url": url, "lineNumber": lineNumber };

      console.error(errorMsg, url, lineNumber);
      
      self.error = null;
    },

    _appEventViewChange(to, from) {

      if (to.name === from.name) {
        return;
      }

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();

      self.event = {
        "nextViewName": to.name,
        "prevViewName": from.name
      };

      app.store.upv = app.event.prevViewName;
app.store.ucv = app.event.nextViewName;
    },

    _appEventOnSidebarItemClick(event, item, index, subindex) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      self.sidebar.item = item;
      self.sidebar.item.index = index;
      self.sidebar.item.subindex = subindex;
      
    },

    _appEventOnSidebarHeaderClick(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _setupAppEvents() {

      this._setupAppErrorsEvents();
      this._setupAppWindowEvents();
      this._setupAppDocumentEvents();
      this._setupAppHammerEvents();
      this._setupAppDeviceEvents();
      this._setupAppRouterEvents();
    },

    _setupAppErrorsEvents() {

      appInstance.config.errorHandler = this._appEventOnRenderError;
      window.addEventListener('error', this._appEventOnJavascriptError);
    },

    _setupAppWindowEvents() {

      window.addEventListener('resize', this._appEventOnResize);
      window.addEventListener('message', this._appEventOnMessage);
      window.addEventListener('contextmenu', this._appEventOnContextMenu);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this._appEventOnColorSchemeChange);
    },

    _setupAppDocumentEvents() {

      let self = this;
      $(self._appEventOnDomReady);
      document.addEventListener('click', this._appEventOnClick);
      document.addEventListener('dblclick', this._appEventOnDblClick);
      document.addEventListener('keyup', this._appEventOnKeyUp);
      document.addEventListener('keydown', this._appEventOnKeyDown);
      document.addEventListener('mouseup', this._appEventOnMouseUp);
      document.addEventListener('mousedown', this._appEventOnMouseDown);
      document.addEventListener('mousemove', this._appEventOnMouseMove);
    },

    _setupAppHammerEvents() {

      let ha = new Hammer(document.body);
      ha.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
      ha.on('swiperight', this._appEventSwipeRight);
      ha.on('swipeleft', this._appEventSwipeLeft);
    },

    _setupAppDeviceEvents() {

      document.addEventListener('deviceready', this._appEventOnDeviceReady);
    },

    _setupAppRouterEvents() {

      this.$router.beforeEach((to, from) => {
        if (from.name === undefined) {
          // The first time the app is running
          return true;
        }
        return this._appEventViewChange(to, from);
      });
    },

    _getCurrentView() {

      if (this.activeDialog !== null) {
        return this.activeDialog;
      }

      for (let view in this.views) {
        if (this.$router.currentRoute.value.name === view) {
          return this.views[view];
        }
      }
      return null;
    },

    _getLoadedViews() {

      return this.views;
    },

    _getLoadedFrames() {

      return {
        
      };
    },

    _getLoadedDialogs() {

      return this.$refs;
    },

    _getActiveDialog() {

      this.activeDialog = null;

      let
        activeModals = $($('.modal.show').get().reverse());

      if (activeModals.length > 0) {

        for (let i = 0; i < this.$refs.length; i++) {
          if (this.$ref[i].$el.id === $($('.modal.show').get().reverse())[0].id) {
            this.activeDialog = this.$refs[i];
            break;
          }
        }
      }

      return this.activeDialog;
    },

    _getToastsComponent() {

      for (let i in this.$refs) {
        if (this.$refs[i].$el.id === 'dab-toasts-wrapper') {
          return this.$refs[i];
        }
      }
      return null;
    },

    _transformHttpRequest(http) {

      if (http.contentType === 'application/json') {

        return JSON.stringify(http.data);

      } else if (http.contentType === 'application/x-www-form-urlencoded') {

        let result = [];
        for (let key in http.data) {
          result.push(encodeURIComponent(key) + '=' + encodeURIComponent(http.data[key]));
        }

        return result.join('&');

      } else if (http.contentType === false || http.contentType === 'multipart/form-data') {

        let result = new FormData();
        for (let key in http.data) {
          result.append(key, http.data[key]);
        }

        return result;

      } else {

        return http.data;
      }
    },

    _translateFrames() {

      let frames = this._getLoadedFrames();
      for (let frame in frames) {
        for (let control in frames[frame]) {
          for (let property in frames[frame][control]) {
            let origProp = property + '_default';
            if (this.language === this.defaultLanguage) {
              if (frames[frame][control][origProp] !== undefined) {
                frames[frame][control][property] = frames[frame][control][origProp];
              }
              continue;
            }
            if (appLangs[this.language] && appLangs[this.language]['frames'] &&
              appLangs[this.language]['frames'][frame] && appLangs[this.language]['frames'][frame][control] &&
              appLangs[this.language]['frames'][frame][control][property]) {
               if (frames[frame][control][origProp] === undefined) {
                 frames[frame][control][origProp] = frames[frame][control][property];
               }
               frames[frame][control][property] = appLangs[this.language]['frames'][frame][control][property];
            }
          }
        }
      }
    },

    _translateSidebar() {

      if (appLangs[this.language] && appLangs[this.language].sidebar) {
        if (appLangs[this.language].sidebar['header'] !== undefined) {
          this.sidebar.header = appLangs[this.language].sidebar.header;
        }
        if (appLangs[this.language].sidebar['imageUrl'] !== undefined) {
          this.sidebar.imageUrl = appLangs[this.language].sidebar.imageUrl;
        }
        if (appLangs[this.language].sidebar['items'] !== undefined) {
          this.sidebar.items = appLangs[this.language].sidebar.items;
        }
      }
    },

    _translateView() {

      $('html').attr('lang', this.language);

      let view = this._getCurrentView();

      this._translateFrames();
      this._translateSidebar();

      for (let control in view.$data) {

        for (let property in view[control]) {
          let
            origProp = property + '_default';
          if (this.language === this.defaultLanguage) {
            if (view[control][origProp] !== undefined) {
              view[control][property] = view[control][origProp];
            }
            continue;
          }
          if (appLangs[this.language] && appLangs[this.language]['views'] &&
            appLangs[this.language]['views'][view.name] && appLangs[this.language]['views'][view.name][control] &&
            appLangs[this.language]['views'][view.name][control][property]) {
            if (view[control][origProp] === undefined) {
              view[control][origProp] = view[control][property];
            }
            view[control][property] = appLangs[this.language]['views'][view.name][control][property];
          }
        }
      }
    },

    _setViewEvents(view) {

      if (view._with_event_listeners) {
        return true;
      }

      let
        el = document.getElementById(view.name),
        ha = new Hammer(el);
      el.addEventListener('click', view.clickHandler);
      el.addEventListener('dblclick', view.dblclickHandler);
      el.addEventListener('mouseup', view.mouseupHandler);
      el.addEventListener('mousedown', view.mousedownHandler);
      el.addEventListener('mousemove', view.mousemoveHandler);
      el.addEventListener('mouseenter', view.mouseenterHandler);
      el.addEventListener('mouseleave', view.mouseleaveHandler);
      el.addEventListener('contextmenu', view.contextmenuHandler);
      ha.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
      ha.on('swiperight', view.swipeRightHandler);
      ha.on('swipeleft', view.swipeLeftHandler);
      view._with_event_listeners = true;
    },

    _setupAppHtml() {

      let
        html = document.getElementsByTagName('html')[0],
        body = document.getElementsByTagName('body')[0],
        title = document.getElementsByTagName('title')[0];
      title.innerText = this.name;
      body.classList.add(this.theme);
      html.setAttribute('dir', this.textDirection);
      html.setAttribute('lang', this.language);
    },

    _setupAppVariables() {

      this.query = false;
      this.navbarStyle = { dark: 'dark', light: 'light' };
      this.size = { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' };
      this.align = { left: "left", center: "center", right: "right" };
      this.themeColor = { dark: 'dark', light: 'light' };
      this.dropdownItem = { item: 'item', header: 'header', divider: 'divider' };
      this.dropdownDir = { up: 'dropup', down: 'dropdown', right: 'dropright' };
      this.dropdownAutoClose = {"true": 'true', inside: 'inside', outside: 'outside', "false": 'false'};
      this.httpMethod = { get: 'GET', post: 'POST', put: 'PUT', head: 'HEAD', "delete": 'DELETE' };
      this.navbarPos = { fixedTop: 'fixed-top', fixedBottom: 'fixed-bottom', stickyTop: 'sticky-top' };
      this.imageFit = { fill: 'fill', none: 'none', cover: 'cover', contain: 'contain', scale: 'scale' };
      this.kind = { link: 'link', dark: 'dark', info: 'info', light: 'light', danger: 'danger', primary: 'primary', warning: 'warning', success: 'success', secondary: 'secondary' };
      this.dialogFullscreen = { all: 'fullscreen', none: 'none', sm: 'fullscreen-sm-down', md: 'fullscreen-md-down', lg: 'fullscreen-lg-down', xl: 'fullscreen-xl-down', xxl: 'fullscreen-xxl-down' };
      this.inAnimation = { bounceIn: 'bounceIn', bounceInDown: 'bounceInDown', bounceInLeft: 'bounceInLeft', bounceInRight: 'bounceInRight', bounceInUp: 'bounceInUp', fadeIn: 'fadeIn', fadeInDown: 'fadeInDown', fadeInDownBig: 'fadeInDownBig', fadeInLeft: 'fadeInLeft', fadeInLeftBig: 'fadeInLeftBig', fadeInRight: 'fadeInRight', fadeInRightBig: 'fadeInRightBig', fadeInUp: 'fadeInUp', fadeInUpBig: 'fadeInUpBig', fadeInTopLeft: 'fadeInTopLeft', fadeInTopRight: 'fadeInTopRight', fadeInBottomLeft: 'fadeInBottomLeft', fadeInBottomRight: 'fadeInBottomRight', flipInX: 'flipInX', flipInY: 'flipInY', lightSpeedIn: 'lightSpeedIn', lightSpeedInRight: 'lightSpeedInRight', lightSpeedInLeft: 'lightSpeedInLeft', rollIn: 'rollIn', rotateIn: 'rotateIn', rotateInDownLeft: 'rotateInDownLeft', rotateInDownRight: 'rotateInDownRight', rotateInUpLeft: 'rotateInUpLeft', rotateInUpRight: 'rotateInUpRight', zoomIn: 'zoomIn', zoomInDown: 'zoomInDown', zoomInLeft: 'zoomInLeft', zoomInRight: 'zoomInRight', zoomInUp: 'zoomInUp', bounce: 'bounce', flash: 'flash', pulse: 'pulse', rubberBand: 'rubberBand', shake: 'shake', swing: 'swing', tada: 'tada', wobble: 'wobble', jello: 'jello' };
      this.outAnimation = { bounceOut: 'bounceOut', bounceOutDown: 'bounceOutDown', bounceOutLeft: 'bounceOutLeft', bounceOutRight: 'bounceOutRight', bounceOutUp: 'bounceOutUp', fadeOut: 'fadeOut', fadeOutDown: 'fadeOutDown', fadeOutDownBig: 'fadeOutDownBig', fadeOutLeft: 'fadeOutLeft', fadeOutLeftBig: 'fadeOutLeftBig', fadeOutRight: 'fadeOutRight', fadeOutRightBig: 'fadeOutRightBig', fadeOutUp: 'fadeOutUp', fadeOutUpBig: 'fadeOutUpBig', fadeOutTopLeft: 'fadeOutTopLeft', fadeOutTopRight: 'fadeOutTopRight', fadeOutBottomRight: 'fadeOutBottomRight', fadeOutBottomLeft: 'fadeOutBottomLeft', flipOutX: 'flipOutX', flipOutY: 'flipOutY', lightSpeedOut: 'lightSpeedOut', lightSpeedOutRight: 'lightSpeedOutRight', lightSpeedOutLeft: 'lightSpeedOutLeft', rollOut: 'rollOut', rotateOut: 'rotateOut', rotateOutDownLeft: 'rotateOutDownLeft', rotateOutDownRight: 'rotateOutDownRight', rotateOutUpLeft: 'rotateOutUpLeft', rotateOutUpRight: 'rotateOutUpRight', slideOutUp: 'slideOutUp', slideOutDown: 'slideOutDown', slideOutLeft: 'slideOutLeft', slideOutRight: 'slideOutRight', zoomOut: 'zoomOut', zoomOutDown: 'zoomOutDown', zoomOutLeft: 'zoomOutLeft', zoomOutRight: 'zoomOutRight', zoomOutUp: 'zoomOutUp', backOutDown: 'backOutDown', backOutLeft: 'backOutLeft', backOutRight: 'backOutRight', backOutUp: 'backOutUp', bounce: 'bounce', flash: 'flash', pulse: 'pulse', rubberBand: 'rubberBand', shake: 'shake', swing: 'swing', tada: 'tada', wobble: 'wobble', jello: 'jello', hinge: 'hinge' };
    },

    _setupAppPlugins() {

      this.plugins = {};
      app.plugins.decsoft =
  app.plugins.decsoft ?
  app.plugins.decsoft : {};

app.plugins.decsoft.clipboard = {

  clipboardInstance: null,

  isSupported () {
    return ClipboardJS.isSupported();
  },

  setText (text, successCallback, errorCallback) {
    app.plugins.decsoft.clipboard.clipboardInstance = new ClipboardJS('*', {
      text (trigger) {
        return text;
      }
    });

	this.clipboardInstance.on('error', (error) => {
	  if (errorCallback) {
	    errorCallback(error);
	  }
	  app.plugins.decsoft.clipboard.clipboardInstance.destroy();
	});

	this.clipboardInstance.on('success', () => {
	  if (successCallback) {
	    successCallback();
	  }
	  app.plugins.decsoft.clipboard.clipboardInstance.destroy();
	});
  }
};


    },

    _setupCordovaPlugins() {

      this.cordova = {};
      
    this.cordova.file = {

      createDir: function (rootDir, dirName, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(
          rootDir,
          function (dirEntry) {
            dirEntry.getDirectory(
              dirName, { create: true },
              successCallback,
              errorCallback
            );
          },
          errorCallback
        );		  
	  },	  

	  dirExists: function (dirPath, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(
          dirPath,
          function (dirEntry) {
            successCallback(dirEntry.isDirectory)			  
		  },
          errorCallback
        );		  
	  },
	  	  
	  removeDir: function (dirPath, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(
          dirPath,
          function (dirEntry) {
	        dirEntry.removeRecursively(
			  successCallback,
			  errorCallback
			);		  
		  },
          errorCallback
        );			  
	  },

      createFile: function (dirPath, fileName, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(
		  dirPath, 
		  function (dirEntry) {
            dirEntry.getFile(
			  fileName, { create: true }, 
			  function (fileEntry) {
                successCallback(fileEntry.toURL());  
              },
			  errorCallback
			);
          },
          errorCallback
		);
      },
	  
      fileExists: function (filePath, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(
          filePath,
          function (fileEntry) {
            successCallback(fileEntry.isFile)			  
		  },
          errorCallback
        );		
      },
	  
	  removeFile: function (dirPath, fileName, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(
		  dirPath, 
		  function (dirEntry) {
	        dirEntry.getFile(
		      fileName, 
			  { create: false }, 
			  function (fileEntry) {
                fileEntry.remove(
			      successCallback,
			      errorCallback
			    );
	          },
		      errorCallback
			);
          },
		  errorCallback
        );		
	  },
	  
      writeFile: function (dirPath, fileName, fileType, contents,
       successCallback, errorCallback) {
         window.resolveLocalFileSystemURL(dirPath, function (dirEntry) {
           dirEntry.getFile(fileName, {create: true}, function (fileEntry) {
             fileEntry.createWriter(function (fileWriter) {
               fileWriter.onerror = errorCallback;
               fileWriter.onwriteend = successCallback;
			   var blob = new Blob([contents], { type: fileType });
               fileWriter.write(blob);
             },
			 errorCallback);
           },
		   errorCallback);
         },
         errorCallback);
      },
	  	
      writeTextFile: function (dirPath, fileName, contents,
       successCallback, errorCallback) {
         window.resolveLocalFileSystemURL(dirPath, function (dirEntry) {
           dirEntry.getFile(fileName, {create: true}, function (fileEntry) {
             fileEntry.createWriter(function (fileWriter) {
               fileWriter.onerror = errorCallback;
               fileWriter.onwriteend = function () {
                 if (fileWriter.length === 0) {
                   fileWriter.write(new Blob([contents], {type: 'plain/text'}));
                 } else if ($.isFunction(successCallback)) {
                   successCallback();
                 }
               };
               fileWriter.truncate(0);
             },
			 errorCallback);
           },
		   errorCallback);
         },
         errorCallback);
      },

      appendTextFile: function (dirPath, fileName, contents,
       successCallback, errorCallback) {
         window.resolveLocalFileSystemURL(dirPath, function (dirEntry) {
           dirEntry.getFile(fileName, {create: true}, function (fileEntry) {
             fileEntry.createWriter(function (fileWriter) {
               fileWriter.seek(fileWriter.length);
               fileWriter.onwriteend = successCallback;
               fileWriter.write(new Blob([contents], {type: "plain/text"}));
             },
			 errorCallback);
           },
		   errorCallback);
         }, 
		 errorCallback);
      },
	  
      readTextFile: function (dirPath, fileName,
       successCallback, errorCallback) {
         window.resolveLocalFileSystemURL(dirPath, function (dirEntry) {
           dirEntry.getFile(fileName, {create: false}, function (fileEntry) {
             fileEntry.file(function (file) {
               var
                 reader = new FileReader();
               reader.onerror = errorCallback;
               reader.onloadend = function () {
                 if ($.isFunction(successCallback)) {
                   successCallback(this.result);
                 }
               };
               reader.readAsText(file);
             },
			 errorCallback);
           },
		   errorCallback);
         }, 
		 errorCallback);		   
      },

      getFileBlobFromFileUrl: function (fileUrl, successCallback, errorCallback) {
        window.resolveLocalFileSystemURL(fileUrl, function (fileEntry) {
          fileEntry.file(function (file) {
            var
              reader = new FileReader();
            reader.onerror = errorCallback;
            reader.onloadend = function () {
              if ($.isFunction(successCallback)) {
                successCallback(new Blob([new Uint8Array(this.result)]));
              }
            };	
            reader.readAsArrayBuffer(file);		  
          }, 
		  errorCallback);
        }, 
		errorCallback);		
	  },
	  
	  wkWebViewConvertFilePath: function (fileUrl) {
	    return window.WkWebView.convertFilePath(fileUrl);	  
	  }
    };

	

    this.cordova.device = {

      model: function () {
        return device.model;
      },
		
      platform: function () {
        return device.platform;
      },
		
      uuid: function () {
        return device.uuid;
      },
		
      version: function () {
        return device.version;
      },
		
      manufacturer: function () {
        return device.manufacturer;
      },
		
      isVirtual: function () {
        return device.isVirtual;
      },
		
      serial: function () {
        return device.serial;
      }
    };	

    this.cordova.dialogs = {

      alert: function (message, title, dismissCallback, butonName) {
		if (navigator.notification) {
          return navigator.notification.alert(message, dismissCallback, title, butonName);
		} else {
		  window.alert(message);	
		}
      },
	  
	  confirm: function (message, title, confirmCallback, buttonLabels) {
		if (navigator.notification) {		  
          return navigator.notification.confirm(message, confirmCallback, title, buttonLabels);		  
		} else {
          if (window.confirm(message)) {
		    if (confirmCallback) {
			  confirmCallback(1);  	
			}    	  
		  } else {
		    if (confirmCallback) {
			  confirmCallback(0);  	
			}    	  			  
		  }		  
		}
	  },
	  
	  prompt: function (message, title, promptCallback, buttonLabels, defaultText) {
		if (navigator.notification) {
		  return navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);	
		} else {
          var 
            input = window.prompt(message, defaultText);			
	      if (input !== null) {
		    if (promptCallback) {
		      promptCallback({buttonIndex: 1, input1: input});		
			}	  
		  } else {
		    if (promptCallback) {
		      promptCallback({buttonIndex: 0, input1: null});		
			}	  			  
		  }		
		}
	  },
	  
	  beep: function (times) {
		if (navigator.notification) {
	      return navigator.notification.beep(times);	  
		} else {
          app.beep();			
		}
	  }
    };	

    this.cordova.vibration = {

      vibrate: function (milliseconds) {
        return navigator.vibrate(milliseconds);
      },
	  
      vibratePattern: function (pattern) {
        return navigator.vibrate(pattern);
      },	  
	  
      cancel: function (milliseconds) {
        return navigator.vibrate(0);
      },	  

    };	
	

    this.cordova.inAppBrowser = {

      open: function (url, target, options) {
        return cordova.InAppBrowser.open(url, target, options);
      }
    };	

    this.cordova.screenOrientation = {

      orientation: {
        "portraitPrimary": "portrait-primary",
        "portraitSecondary": "portrait-secondary",
        "landscapePrimary": "landscape-primary",
        "landscapeSecondary": "landscape-secondary",
        "portrait": "portrait",
        "landscape": "landscape",
        "any": "any",  
	  },

      lock: function (orientation) {
        return screen.orientation.lock(orientation);
      },

      unlock: function (orientation) {
        return screen.orientation.unlock();
      },	  
	  
      type: function () {
        return screen.orientation.type;
      }	  	  
    };	





    this.cordova.geolocation = {

      config: {
        timeout: 5000,
	    maximumAge: 3000,
        enableHighAccuracy: true	  
	  },
	  
      getCurrentPosition: function (successCallback, errorCallback, config) {
        return navigator.geolocation.getCurrentPosition(successCallback, errorCallback, config);
      },
	  
      watchPosition: function (successCallback, errorCallback, config) {
        return navigator.geolocation.watchPosition(successCallback, errorCallback, config);
      },
	  
      clearWatch: function (watchID) {
        return navigator.geolocation.clearWatch(watchID);
      }	  	  
	};

    this.cordova.network = {
		
	  connectionTypes: {
        "UNKNOWN": "UNKNOWN",	  
        "ETHERNET": "ETHERNET",	  
        "WIFI": "WIFI",	  
        "CELL_2G": "CELL_2G",	  
        "CELL_3G": "CELL_3G",	  
        "CELL_4G": "CELL_4G",	  
        "CELL": "CELL",	  
        "NONE": "NONE"
	  },

      getConnectionType: function () {
		switch (navigator.connection.type) {
		  case Connection.UNKNOWN: return "UNKNOWN";	
		  case Connection.ETHERNET: return "ETHERNET";	
		  case Connection.WIFI: return "WIFI";	
		  case Connection.CELL_2G: return "CELL_2G";	
		  case Connection.CELL_3G: return "CELL_3G";	
		  case Connection.CELL_4G: return "CELL_4G";	
		  case Connection.CELL: return "CELL";	
		  case Connection.NONE: return "NONE";	
		}
      }	  

    };	

    this.cordova.statusbar = {

      hide: function () {
        return StatusBar.hide();
      },
	  
      show: function () {
        return StatusBar.show();
      },
	  
      isVisible: function () {
        return StatusBar.isVisible;
      },	  
	  
      overlaysWebView: function (overlays) {
        return StatusBar.overlaysWebView(overlays);
      },	  	  
	  
      styleDefault: function () {
        return StatusBar.styleDefault();
      },	  	  	  
	  
      styleLightContent: function () {
        return StatusBar.styleLightContent();
      },	

      backgroundColorByName: function (colorName) {
        return StatusBar.backgroundColorByName(colorName);
      },		  
	  
      backgroundColorByHexString: function (colorHexStr) {
        return StatusBar.backgroundColorByHexString(colorHexStr);
      }
    };	


    this.cordova.battery = {
      "level": -1,
      "isPlugged": false	  
	};

    }
  }
};

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    
    { path: '/', redirect: '/viewConsole' },
    { path: '/:pathMatch(.*)*', redirect: '/viewConsole' },
    { path: '/viewConsole', component: viewConsole, name: 'viewConsole', viewConsole, props(route) { app.query = $.isEmptyObject(route.query) ? false : route.query; } },
    { path: '/viewEditScript', component: viewEditScript, name: 'viewEditScript', viewEditScript, props(route) { app.query = $.isEmptyObject(route.query) ? false : route.query; } }
  ]
});

const pinia = Pinia.createPinia();

const appInstance = Vue.createApp(DabApp).use(pinia).use(router);

appInstance.mount('#app');
