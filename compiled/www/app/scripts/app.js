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
        <span class="label-heading">PhoneDo Version</span>
        <span class="label-desc">
        Script android the JS way.<br><a @click="app.browserOpen('https://groups.google.com/u/1/g/n8vshell')">Policy & Terms of Service</a>
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
      template: `<div id="dlgTidyOptions" class="app-dialog modal fade" tabindex="-1" role="dialog"><div v-bind:class="['modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered', 'modal-' + size, 'modal-' + fullscreen]" role="document"><div class="modal-content"><div v-bind:class="[classes, 'modal-body']"><dab-html v-bind="htmlOptions"><div class="container">
    <form id="optionsForm">
        <div class="form-group">
            <label for="indentSize">Indent Size:</label>
            <div class="select-wrapper">

                <select class="form-control" id="indentSize">
                    <option value="2">2</option>
                    <option value="4" selected>4</option>
                    <option value="8">8</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="indentWithTabs">Indent with Tabs:</label>
            <div class="select-wrapper">
                <select class="form-control" id="indentWithTabs">
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="lineLength">Wrap Line Length:</label>
            <div class="select-wrapper">
                <select class="form-control" id="lineLength">
                    <option value="80" selected>80</option>
                    <option value="100">100</option>
                    <option value="120">120</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="indentChar">Indent Character:</label>
            <div class="select-wrapper">
                <select class="form-control" id="indentChar">
                    <option value="\t">Tab</option>
                    <option value=" ">Space</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="preserveNewlines">Preserve Newlines:</label>
            <div class="select-wrapper">
                <select class="form-control" id="preserveNewlines">
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="braceStyle">Brace Style:</label>
            <div class="select-wrapper">
                <select class="form-control" id="braceStyle">
                    <option value="collapse" selected>Collapse</option>
                    <option value="expand">Expand</option>
                    <option value="end-expand">End Expand</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="keepArrayIndentation">Keep Array Indentation:</label>
            <div class="select-wrapper">
                <select class="form-control" id="keepArrayIndentation">
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="keepFunctionIndentation">Keep Function Indentation:</label>
            <div class="select-wrapper">
                <select class="form-control" id="keepFunctionIndentation">
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="spaceInParen">Space in Parentheses:</label>
            <div class="select-wrapper">
                <select class="form-control" id="spaceInParen">
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="endWithNewline">End with Newline:</label>
            <div class="select-wrapper">
                <select class="form-control" id="endWithNewline">
                    <option value="true" selected>Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
    </form>
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
//app.setViewReadyForDeviceKeyboard();
app.store.jqconsole.Focus();
app.store.jqconsole.ScrollWindowToPrompt();

//views.viewConsole.idAudio.setSource("file:\\")
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
    <span class="menu_item"></span>
  </div>

  <div class="menu">
    <span class="menu_item">PhoneDo</span>
    <div class="content">
      <ul>
        <li class="text-center" @click="app.replaceView('viewEditScript');"><span><i class="fa-solid fa-code"></i> Script Editor (IDE)</span></li>
        <li @click="app.showDialog('dlgSettings');"><span><i class="fa-solid fa-terminal"></i> Terminal Settings</span></li>
      </ul>
    </div>
  </div>

  <div class="menu">
    <span class="menu_item">Edit</span>
    <div class="content">
      <ul>
        <li class="text-center" @click="app.store.jqconsole.SetPromptText('');"><span>Clear Input</span></li>
        <li><span>Copy to Clipboard</span></li>
        <li><span>Paste to Clipboard</span></li>
      </ul>

    </div>
  </div>


  <div class="menu">
    <span class="menu_item">Options</span>
    <div class="content">
      <ul>
        <li @click="app._CLI_restart();"><span>Restart Session</span></li>
        <li @click="app.store.jqconsole.reset();"><span>Reset Terminal</span></li>
        <li @click="app.store.jqconsole.Clear();"><span>Clear Terminal</span></li>
        
      </ul>
    </div>
  </div>


  <div class="menu">
    <span class="menu_item">Help</span>
    <div class="content">
      <ul>
        <li @click="app.browserOpen('https://github.com/MurageKabui/N8VShell/blob/main/README.md#n8vshell');"><span><i class="fa-brands fa-github"></i> Documentation</span></li>
        <li @click="app.browserOpen('https://groups.google.com/u/1/g/n8vshell');"><span><i class="fa-brands fa-google-plus-g"></i> PhoneDo Group</span></li>
        <li @click="app.feedback();"><span><i class="fa-solid fa-envelope-open-text"></i> Send Feedback</span></li>
        <li class="text-center" @click="app.showAbout();"><span><i class="fa-regular fa-circle-question"></i> About</span></li>
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
      app.store.aceedit.setOption("enableSnippets", false);
      app.store.aceedit.setOption("enableBasicAutocompletion", false);
      app.store.aceedit.setOption("highlightActiveLine", true);
      app.store.aceedit.setOption("readOnly", true); // Set the editor as read-only
      app.store.loadedace = true;
    }
    //app.aceEditFocusLastLine();
}

app.setViewReadyForDeviceKeyboard();
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
        .then((savedContent) => {

            if (savedContent !== app.store.aceedit.getValue()) {
                app.cordova.dialogs.confirm(
                    'You have unsaved changes.',
                    cs.toString(),
                    function(btn) {
                        if (btn === 1) app.saveScript(cs);
                    }, ['Save', 'Ignore']
                );
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
        <span class="menu_item"></span>
    </div>
    <div class="menu">
      <span class="menu_item">File</span>
      <div class="content">
        <ul>
          <li @click="app.newScript()"><span><i class="fa-solid fa-file-circle-plus"></i> New Script</span></li>
          <li @click="app.saveScript(app.store.currentScriptName)" v-show="app.store.currentScriptName"><span><i class="fas fa-save"></i> Save Script</span></li>
          <li @click="app.saveAs(app.store.currentScriptName)" v-show="app.store.currentScriptName"><span><i class="fas fa-save"></i> Save to Path</span></li>
          <li @click="app.exportScript()" v-show="app.store.currentScriptName"><span><i class="fas fa-download"></i> Export Script</span></li>
          <li @click="app.renameScriptAs()" v-show="app.store.currentScriptName"><span><i class="fas fa-edit"></i> Rename Script</span></li>
          <li @click="app.deleteScript()" v-show="app.store.currentScriptName"><span class="danger"><i class="fas fa-trash-alt"></i> Delete Script</span></li>
          <li @click="app.closeFile()" v-show="app.store.currentScriptName"><span class="warn"><i class="fa-solid fa-xmark text-center"></i> Close Script</span></li>

        </ul>
      </div>
    </div>

    <div class="menu" v-show="app.store.currentScriptName">
      <span class="menu_item">Edit</span>
      <div class="content">
        <ul>
          <li @click="app.store.aceedit.execCommand('cut')"><span> <i class="fas fa-cut"></i> Cut</span></li>
          <li @click="app.store.aceedit.execCommand('copy')"><span><i class="fas fa-copy"></i> Copy</span></li>
          <li @click="app.store.aceedit.execCommand('paste')"><span><i class="fas fa-paste"></i> Paste</span></li>
          <li @click="app.store.aceedit.getSession().getUndoManager().undo()"><span><i class="fas fa-undo"></i> Undo</span></li>
          <li @click="app.store.aceedit.getSession().getUndoManager().redo()"><span><i class="fas fa-redo"></i> Redo</span></li>
          <li @click="app.store.aceedit.execCommand('find')"><span><i class="fas fa-search"></i> Find...</span></li>
          <li @click="app.store.aceedit.execCommand('replace')"><span><i class="fas fa-exchange-alt"></i> Replace...</span></li>
          <li @click="app.store.aceedit.execCommand('selectAll')"><span><i class="fas fa-check-square"></i> Select All</span></li>
          <li @click="app.store.aceedit.execCommand('gotoline')"><span><i class="fas fa-level-down-alt"></i> Go to Line...</span></li>
          <li @click="app.store.aceedit.execCommand('gobottom')"><span><i class="fas fa-angle-double-down"></i> Go to Bottom</span></li>
          <li @click="app.store.aceedit.execCommand('gotostart')"><span><i class="fas fa-angle-double-up"></i> Go to Start</span></li>
          <li @click="app.store.aceedit.execCommand('togglecomment')"><span><i class="fas fa-comment"></i> Toggle Comment</span></li>
          <li @click="app.store.aceedit.execCommand('indent')"><span><i class="fas fa-indent"></i> Indent</span></li>
          <li @click="app.store.aceedit.execCommand('outdent')"><span><i class="fas fa-outdent"></i> Outdent</span></li>
        </ul>
      </div>
    </div>


    <div class="menu" v-show="app.store.currentScriptName">
      <span class="menu_item">Run</span>
      <div class="content">
        <ul>
          <li @click="app.runScript(1)">
            <span><i class="fas fa-bug"></i> Debug Run</span>
          </li>
          <li class="spaced" @click="app.runScript(0)">
            <span><i class="fas fa-play"></i> Run Script</span>
          </li>
          <li @click="app.tidyPrompt(app.store.currentScriptName)">
            <span><i class="fas fa-magic"></i> Tidy Script</span>
          </li>
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
                <li class="special sticky-bottom"><span><i class="fa-solid fa-magnifying-glass"></i></span></li>
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
                <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo')"><span><i class="fa-solid fa-circle-info"></i> Program help</span></li>
                <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo')"><span><i class="fa-solid fa-people-group"></i> Support Forum</span></li>
                <li @click="app.browserOpen('https://github.com/MurageKabui/PhoneDo/tree/main/Examples')"><span><i class="fa-solid fa-file-code"></i> Demo Scripts</span></li>
                <li @click="app.showAbout()"><span><i class="fa-regular fa-circle-question"></i> About Editor</span></li>
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
    dlgSettings,dlgTidyOptions
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
      version: "1.3.2",
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
      buildNumber: 804,
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
      $('#app-theme').attr('href', 'app/styles/' + lowerThemeName + '.css');
      $('body').addClass(this.theme);
      return lowerThemeName;
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
        $('#' + self._getCurrentView().name + ' .modal-content').css({
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

    
    _CLI_FlagExists() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
/**
 * Checks if a specific flag exists in the command-line arguments.
 * @param {string} sKey - The flag to search for (e.g., "/verbose").
 * @returns {boolean} True if the flag exists, false otherwise.
*/

let cmdLine = app.store.commandstring.match(/"[^"]*"|\S+/g);
cmdLine = app.trimStr(cmdLine);
for (let i = 0; i < cmdLine.length; i++) {
	const arg = cmdLine[i];
	if (arg.startsWith('/') || arg.startsWith('-')) {
		const flag = arg.replace(/\/|-/g, '');
		if (flag === sKey) return true;
	}
}
return false;
    },

    _CLI_changePrompLabel() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
SA.prompt(
{
    title: "Set a Prompt Label",
    body: 'Personalize your console prompt by typing a new prompt label, and clicking \'OK\' to save changes.',
    textLimit: 12,
    useTransparency: true,
    attributes:
    {
        type: "text",
        id: "inputpl",
    }
}).then(npl =>
{
  //app.setOption('jqcptl', npl);
  app.store.jqconsole.SetPromptLabel(npl);
  app.store.jqconsole.UpdatePromptLabel();
});

$('#inputpl').focus();


    },

    showAbout() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let sHtml, sBody;
app.store.showingdlg = true;

switch(app.store.ucv){
   case 'viewConsole':
        sHtml = `<div style="text-align: center; font-size: 12px;">Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong></div>`;
        sBody = 'Script Android™ the JS way.';
        break;
   case 'viewEditScript':
        sHtml = `<div style="text-align: center; font-size: 12px;">Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong></div>`;
        sBody = 'PhoneDo is a cool scripting application for Android™PhoneDo is a cool scripting application for Android™ PhoneDo is a cool scripting application for Android™ PhoneDo is a cool scripting application for Android™ PhoneDo is a cool scripting application for Android™ PhoneDo is a cool scripting application for Android™ PhoneDo is a cool scripting application for Android™';
        break;
}

return SA.alert({
    title: 'PhoneDo v' + app.version,
    body: sBody,
    class: 'text-center',
    html: sHtml,
    useTransparency: true
}).then(value => {
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
        app.showAlert(rowCount + ' Script(s) present in your library!<br>Go to \nNew > New Script');
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
  } else {
      app.cordova.dialogs.confirm(
          'Permanently delete "' + sn + '" ?',
          'Delete Script',
          function (id) {
              switch (id) {
                  case 2:
                      app.store.phoneDoDB.transaction(function (tx)
                      {
                          tx.executeSql("DELETE FROM userScripts WHERE scriptName = ?", [sn], function (tx, rs)
                          {
                              if (rs.rowsAffected > 0)
                              {
                                  app.store.aceedit.setValue('');
                                  //app.setReactiveVar('currentScriptName', null);
                                  app.store.currentScriptName = '';
                                  app.toastMsg('"' + sn + '" deleted', 'short');
                                  app.populateUserScripts();
                              }
                              else
                              {
                                  app.toastMsg(sn + ' not found!', 'short');
                              }
                          }, function (error)
                          {
                              app.toastMsg("❌ SQLite Error: " + error.message, 'long');
                          });
                      });
                      break;
                  default:
                      return false;
              }
          },
          ['Cancel', 'Yes; Delete']
      );
  }
    },

    runScript(debug) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.jqconsole.ClearPromptText();
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
        //app.setVar('currentScriptName', scriptName);
        app.store.currentScriptName = scriptName;
        //app.showAlert('currentScriptName updated to : ' + scriptName);
        app.toastMsg(scriptName, 'short'); // .slice(0, -4)
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
SA.prompt(
{
	title: "New Script",
	body: "Enter a name for your new script.\nEnsure it's 25 characters or less and it ends with .nts:",
	textLimit: 25,
	useTransparency: true,
	attributes:
	{
		type: "",
		id: "inpscrnm",
		placeholder: "HelloWorld.nts",
	}
}).then(newScriptName =>
{
	newScriptName = app.trimStr(newScriptName);
	if (newScriptName && newScriptName.length <= 30 && newScriptName.endsWith('.nts'))
	{
		let newDate = new Date();
		let sHeader = `\n/*\n * Script Name      : ${newScriptName}\n * Date             : ${newDate}\n * PhoneDo Version  : ${app.version}\n * Description      :\n * Author           :\n * License          :\n*/\n\n`;

		app.store.phoneDoDB.transaction(function(tx)
		{
			tx.executeSql("INSERT INTO userScripts (scriptName, scriptContent) VALUES (?, ?)", [newScriptName, sHeader], function(tx, result)
			{
				app.toastMsg('Saved "' + newScriptName + '"', 'short');
				app.openScript(newScriptName);
        app.populateUserScripts();
			}, function(tx, error)
			{
				app.toastMsg('Save error: ' + error.message, 'long');
			});
		});
	}
	else
	{
		return app.errorFileCriteria();
	}
});

$('#inpscrnm').focus();
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
        placeholder: scriptName
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
$('#viewEditScript').css('background', $('#editor').css('background'));
return;
    },

    _CLI_GetCommandName() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const commandRegex = /^([^\s]+)/;
let matches = app.store.commandstring.match(commandRegex);
let trimmedMatch = matches ? app.trimStr(matches[1]) : '';
return trimmedMatch;

    },

    processCommand() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();

let command = app._CLI_GetCommandName().toLowerCase();

switch (command) {
    case 'sysinfo':
        app.sysinfo();
        break;
    case 'ipconfig':
    case 'ifconfig':
        app.ipconfig();
        break;
    case 'time':
        app.store.jqconsole.Write(app.friendlyTime() + '\n');
        break;
    case 'date':
        app.store.jqconsole.Write(' ' + new Date().toLocaleString() + '\n\n', 'successStyle');
        break;
    case 'beep':
        let num = app._CLI_Get('n', 1);
        app.cordova.dialogs.beep(num);
        break;
    case 'slist':
        app.store.phoneDoDB.executeSql("SELECT scriptName AS scrnme FROM userScripts;", [], function(rs) {
            let rows = rs.rows;
            let rowCount = rows.length;
            if (rowCount > 0) {
                let row , sn;
                for (let i = 0; i < rowCount; i++) {
                    row = rows.item(i);
                    app.store.jqconsole.Write(' \x1b[33m' + (i + 1) + '\x1b[0m. ' + row.scrnme + '\n', 'successStyle');
                }
                app.store.jqconsole.Write('\n', 'successStyle');
            } else {
                app.store.jqconsole.Write(' No scripts found!\n', 'warningStyle');
            }
        }, function(error) {
            app.errorPrint('SQLite Error: ' + error.message + '\n');
        });
        break;
    case 'update':
        app.toastMsg('checking for updates..', 'short');
        app.infoPrint(` Current version : ${app.version}\n`);
        //app.store.n8vshell.Disable();
        SpinnerDialog.show('Update', "Updating local scripts & libraries! Please wait..", true);
        setTimeout(function() {
            SpinnerDialog.hide();
            //app.store.n8vshell.Enable();
            app.store.jqconsole.Write(` Latest  version : ${app.version}\n\n`);
            app.toastMsg('You are using the latest version.', 'short');
        }, 5000);
        break;
    case 'cls':
    case 'clear':
        app.store.jqconsole.Clear();
        break;
    case 'run':
        let script = app._CLI_Get('i', '');
        if (script !== '') {
            app.getActualScriptContent(script)
                .then(scriptContent => {
                    if (scriptContent) {
                        app.store.jqconsole.Disable();
                        evaluate(scriptContent);
                    }
                }).catch(error => {
                    app.store.jqconsole.Write(' error: ' + error + '\n', 'warningStyle');
                    app.store.jqconsole.Enable();
                });
        }

        break;
    case 'ping':
        let target, timeout, retries, iptype;
        target = app._CLI_Get('ip', null);
        if (!target) {
            target = app._CLI_GetValByIndex(1, null);
            app.debugPrint(' -ip optiion skipped, using index of 1:' + target);
        }
        if (target) {
            app.store.jqconsole.Disable();
            let pinger = new Ping();

            timeout = app._CLI_Get('w', 1);
            ret = app._CLI_Get('r', 1);
            iptype = ((app._CLI_Get('v', 'v4')) === 'v4' ? 'v4' : 'v6');

            pinger.ping([{
                query: target,
                timeout: timeout,
                retry: retries,
                version: iptype
            }], function (res) {
                app.store.jqconsole.Write(`Ping statistics for ${res.response.result.target}:
            Status: ${res.response.status},
        Approximate round trip times in milli-seconds:
            Minimum = ${res.response.result.minRtt}ms, Maximum = ${res.response.result.maxRtt}ms, Average = ${res.response.result.avgRtt}ms\n`, 'infoStyle');
            }, function (e) {
                app.store.jqconsole.Enable();
                app.store.jqconsole.Write(e + '\n', 'errorStyle');
            });

        } else {
            app.store.jqconsole.Enable();
            return app.store.jqconsole.Write(` Ping request could not find host ${target}. Please check the name and try again.`, 'warningStyle');
        }
        break;
    case 'help':
        app.store.jqconsole.Write(app.store.commands.helpCommand(app._CLI_GetValByIndex(1, 'help')) + '\n', 'successStyle');
        break;
    default:
        if (app.store.bDebugMode) app.debugPrint(` Process Error: Invalid command. ${command}`);
        break;
}
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

switch (app.cordova.network.getConnectionType()) {
  case app.cordova.network.connectionTypes.WIFI:
       return networkinterface.getWiFiIPAddress(ws, we);
       break;
  case app.cordova.network.connectionTypes.CELL_2G:
  case app.cordova.network.connectionTypes.CELL_3G:
  case app.cordova.network.connectionTypes.CELL_4G:
  case app.cordova.network.connectionTypes.CELL:
       return networkinterface.getCarrierIPAddress(cs, ce);
       break;
  case app.cordova.network.connectionTypes.NONE:
       app.errorPrint(' err : No configurable connections detected.');
       break;
}

function cs( _ip ) {
  app.successPrint(" Carrier IP     : " + _ip.ip + "\n Carrier subnet : " + _ip.subnet);
};

function ce( e ) {
  app.errorPrint(" Carrier IP Error : " + e);
};

function ws( _ip ) {
  app.successPrint(" WIFI IP     : " + _ip.ip + "\n WIFI subnet : " + _ip.subnet);
};

function we( e ) {
  app.errorPrint(' WIFI IP Error : ' + e);
};

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

    _CLI_Get(sKey, mDefault) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const cmdLine = app.store.commandstring.match(/"[^"]*"|\S+/g) || [];
let arg;

for (let i = 0; i < cmdLine.length - 1; i++) {
    arg = cmdLine[i];
    if (!arg.startsWith('/') && !arg.startsWith('-') && !arg.startsWith('--')) {
        continue;
    }
    const key = arg.replace(/^[/-]+/, '');
    if (key === sKey) {
        const value = cmdLine[i + 1].replace(/["']/g, '');
        return value;
    }
}
return mDefault;
    },

    debugPrint(msg) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return app.store.jqconsole.Write(' DEBUG : ' + msg  + '\n', 'debugStyle');
    },

    _CLI_GetValByIndex(iIndex, mDefault) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
//var cmdLine = app.store.commandstring.match(/"[^"]*"|\S+/g);
//cmdLine = app.trimStr(cmdLine);
let cmdLine = app.store.commandstring.match(/"[^"]*"|\S+/g).map(item => app.trimStr(item));

if (cmdLine.length > iIndex) {
	const value = cmdLine[iIndex].replace(/["']/g, '');
	return value;
}
return mDefault;
    },

    tidyPrompt(scriptName) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let options = {
	indent_size: app.getOption('indentsize', 4),
	indent_with_tabs: app.getOption('tabindent', true),
	wrap_line_length: app.getOption('wrapllen', 80 ),
	indent_char: app.getOption('indentchar', '\t'),
	preserve_newlines: app.getOption('presnl' ,true),
	brace_style: app.getOption('brcstyl', 'collapse'),
	keep_array_indentation: app.getOption('arrindent', false),
	keep_function_indentation: app.getOption('funcindent', false),
	space_in_paren: app.getOption('spacepar', false),
	end_with_newline: app.getOption('nle', true)
};

app.cordova.dialogs.confirm(
    'Tidying a script enhances readability and maintainability.',
    'Tidy "' + scriptName + '" ?', function(id)
	{
		switch (id) {
			case 1:
				app.tidyScript(options);
				break;
			case 2:
        app.showDialog('dlgTidyOptions');
				break;
		}
	},
	['Tidy', 'Options', 'Cancel']
);
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


winRef.addEventListener('loadstop', function(event) {
    //app.store.jqconsole.Write(event.url + '\n');

    if (event.url.startsWith('https://github.com/MurageKabui/PhoneDo/blob/main/') && event.url.endsWith('.nts')) {
        
        // Show a confirmation dialog to the user
        app.cordova.dialogs.confirm(
            'Attempt opening this script in PhoneDo\'s Script Editor?',
            'Open in PhoneDo',
            function(buttonIndex) {
                if (buttonIndex === 1) {
                    winRef.close();
                    SpinnerDialog.show('Getting Content', "Getting Script Content! Please wait..", true);
                    let url = app.convertToRawGitHubURL(event.url);
                    //app.toastMsg('You pressed the "Open" button.', 'short');
                    let hdrs = {
                        "Access-Control-Allow-Origin": "*"
                    }
                    cordova.plugin.http.sendRequest(url, {
                        method: 'GET',
                        headers: hdrs
                    }, function(response) {
                        SpinnerDialog.hide();
                        SA.prompt({
                            title: "Save Script",
                            body: "Enter a name for your new script.\nEnsure it's 25 characters or less and it ends with .nts:",
                            textLimit: 25,
                            useTransparency: true,
                            attributes: {
                                type: "",
                                id: "inpscrnm",
                                placeholder: "",
                            }
                        }).then(newScriptName => {
                            newScriptName = app.trimStr(newScriptName);
                            if (newScriptName && newScriptName.length <= 26 && newScriptName.endsWith('.nts')) {
                                let scriptCntnt = response.data;
                                app.store.aceedit.setValue(scriptCntnt);

                                app.store.phoneDoDB.transaction(function(tx) {
                                    tx.executeSql("INSERT INTO userScripts (scriptName, scriptContent) VALUES (?, ?)", [newScriptName, scriptCntnt], function(tx, result) {
                                        app.toastMsg('Saved "' + newScriptName + '"', 'short');
                                        app.store.currentScriptName = newScriptName;
                                        app.populateUserScripts();
                                        app.getScriptContent(newScriptName);
                                    }, function(tx, error) {
                                        app.toastMsg('Save error: ' + error.message, 'long');
                                    });
                                });
                            } else {
                                return app.errorFileCriteria();
                            }
                        });
                        $('#inpscrnm').focus();
                    }, function(response) {
                        SpinnerDialog.hide();
                        app.toastMsg(response.data, 'long');
                    });
                }
            },
            ['Open', 'Cancel']
        );
    }
});



    },
    convertToRawGitHubURL(url) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
const parts = url.split("/");
const username = parts[3];
const repository = parts[4];
const branch = parts[6];
const path = parts.slice(7).join("/").replace("/blob", "");

return `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${path}`;

    },

    errorFileCriteria() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.cordova.vibration.vibrate(100);
return SA.alert(
		{
			title: "Error",
            useTransparency: true,
			html: `Please make sure to provide a valid input. The input should meet the following conditions:
        <br>
        <ul><li>It should not be empty.</li><li>It should be not longer than 25 characters.</li><li>It should end with the '.nts' extension.</li></ul>Double-check your input to ensure it meets these requirements.`
});
    },

    minifyScript() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
let sc = app.store.aceedit.getValue();

if (sc == '') return app.toastMsg('No Content to Minify', 'long');

sc = sc
    .replace(/\/\/[^\n]*/g, '')        // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove multi-line comments
    .replace(/\s+/g, ' ')             // Replace multiple spaces with a single space
    .replace(/\s*([\{\}\(\)\[\]\;\+\-\*\/\%\=\>\<\,\!&\|\?\:\n])\s*/g, '$1');  // Remove extra whitespace around specific characters

app.store.aceedit.setValue(sc);
app.store.aceedit.clearSelection();
sc = null;
return;
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

    checkPerms() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();

    },

    toggleSetting(id, state) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.showAlert(id + ' : ' + state);
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

    focusSearchScript() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
app.store.bSearchingScript = true;

$('inpsrch').focus();
    },

    notify() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();

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


let blob = new Blob([scriptContent], {type: "text/plain"});

cordova.plugins.saveDialog.saveFile(blob, scriptName + '.txt').then(uri => {
    app.showAlert("The file has been successfully saved to : " +  uri);
}).catch(reason => {
    app.showAlert(reason);
});
    },

    playAudio() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return views.viewConsole.idAudio.playAudio();
    },

    pauseAudio() {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return views.viewConsole.idAudio.pauseAudio();
    },

    setSource(sSource) {
      let
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
return views.viewConsole.idAudio.setSource(sSource, 'audio/mp3');
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


app.setReactiveVar('hdr', ' _______________\n< Welcome to PhoneDo! >\n ---------------\n\\   ^__^\n         \\  (oo)\\_______\n                 (__)\\        )\\/\\\n                ||----w |\n                ||     ||\n');
app.setReactiveVar('jqconsole', $('#console_wrapper').jqconsole(app.store.hdr + '\n'));

$('.debugStyle span, .infoStyle span, .warningStyle span, .successStyle span, .errorStyle span').addClass('selectabletxt');

app.setReactiveVar('commands', {
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

    app.setReactiveVar('commandstring', app.trimStr(input));

    //app.debugPrint('processing :' + input + '\n');
    let commandName = app._CLI_GetCommandName(app.store.commandstring);

    if (commandName && app.store.commands.hasOwnProperty(commandName)) {

        // If Entered command is not the same as the last command pushed to history add it.
        if (app.store.commandstring !== app.store.commandHistory[app.store.commandHistory.length - 1]) {
            if (app.store.bDebugMode) app.debugPrint('stacking "' + app.store.commandstring + '" to command history array.\n');
            app.store.commandHistory.push(app.store.commandstring);
            // Reset current position to the last command in history. Used to navigate command history using a device's volume buttons.
            app.store.currentPosition = app.store.commandHistory.length - 1;
        }

        // process it
        app.processCommand();
    } else {
        if (commandName) {
            // app.cordova.vibration.vibrate(120);
            app.cordova.vibration.vibratePattern([50, 50, 50, 100]);
            app.store.jqconsole.Write(`  \x1b[31mERROR:\x1b[0m command "\x1b[1;37m${commandName}\x1b[0m" is not recognized.\n`);
        }
    }

    // app.store.jqconsole.Focus();
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
      app.store.ucv = 'viewConsole';
app.store.showingdlg = false;
app.store.loadedace = false;
app.store.scriptNames = [];
app.store.verbose = true;
app.store.runningscript = false;


//SpinnerDialog.show('Initializing ', " Setting up.. ! Please wait..", true);
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
        //SpinnerDialog.hide();
    }, function (error) {
        app.setReactiveVar('bLoadedDb', false);
        //SpinnerDialog.hide();
        app.showAlert('Error creating Database Table \nSQLite Error: ' + error.message);
    });
});

let lvd = app.getOption('lvd', '');

// Calculate the difference in days
let diff = app.getLastVaccumedDiff(lvd, new Date().toISOString().split('T')[0]);


// Check if optimization is needed (either lastVaccumed date is empty or it was more than 3 days ago)
if (!lvd || diff >= 3) {
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

    _appEventOnPause(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnResume(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      
    },

    _appEventOnBackButton(event) {

      let
        self = this,
        view = this._getCurrentView(),
        views = this._getLoadedViews(),
        frames = this._getLoadedFrames(),
        dialogs = this._getLoadedDialogs();
      self.event = event;
      // Close any opened Dialog
if (app.store.showingdlg) return app.hideDialogs();

if (app.store.menuopened) return;



if (app.store.ucv == 'viewConsole'){
  app.cordova.dialogs.confirm(
        'Are you sure you want to Exit?',
        'Confirm',
        function (buttonIndex) {
          switch(buttonIndex){
              case 1:
                   navigator.app.exitApp();
                  break;
              case 2:
                  //return app.replaceView(app.store.upv);
                  break;
          }
        },
        ['Exit', 'Cancel']
    );
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

// Check if the clicked element is not a '.menu_item' or a '.content' element
if (!target.hasClass('menu_item') && !target.hasClass('content')) {
    $('.content').css('visibility', 'hidden');
    $('.menu_item').removeClass('active');
} else if (target.hasClass('menu_item')) {
    let content = target.next('.content');
    let isActive = content.css('visibility') === 'visible';

    // Hide all content elements
    $('.content').css('visibility', 'hidden');

    // Show the content associated with the clicked menu item
    content.css('visibility', isActive ? 'hidden' : 'visible');

    // Toggle active class for menu items
    $('.menu_item').removeClass('active');
    target.toggleClass('active', !isActive);
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
