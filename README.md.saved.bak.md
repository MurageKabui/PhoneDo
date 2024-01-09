
> [!WARNING]  
This project is a work in progress and not yet production-level quality. See in [Projects](https://github.com/users/MurageKabui/projects/13).

<!--
PhoneDo has been my personal scripting wizard for Android.
https://www.reddit.com/r/lisp/comments/10jlj6b/lisp_scripting_on_android/
-->

---

<br>

<p align="center">
  <img src="https://github.com/MurageKabui/PhoneDo/blob/main/Previews/PhoneDo.gif?raw=true" title="PhoneDo Logo" alt="PhoneDo Logo" width="440" height="77">
</p>
 

### TL;DR 
> PhoneDo is an <b><i>Android</i></b> automation tool that provides a scripting environment based on JavaScript with methods for handling native device actions in a headless way..

<p align="center">
  <img src="https://github.com/MurageKabui/PhoneDo/blob/main/Previews/HelloWorldDemo.gif?raw=true" title="Hello world Demo" alt="Hello World Preview" width="360" height="640">
</p>


<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC 
- [About](#Tech+Stack)
- [Installation](#Installation)
- [PhoneDo Terminal](#PhoneDo+Terminal)
- [Scriptable Interfaces](#Interfaces)
- [Contributing](#Contributing)


<br/>

</details>

## About

PhoneDo is an idea  to provide an env area in a SQLite database for simple code composition and  storage. Scripts, denoted by the extensions <b><i>.nts</i></b> and <b><i>.pds</i></b>, are stored by users and can be run whenever they'd want.

where users can create scripts, which are identified by the `.nts` and `.pds` extensions, and run them whenever it is convenient for them.

This project delivers a comprehensive solution for users to effortlessly manage and execute JavaScript code in a user-friendly environment, supported by powerful tools and integrated features.


**TechStack** :

| Technology |Use Case |License |
|----------|----------------------------|-|
| [SQLite](https://github.com/sqlite/sqlite) | For local storage CRUD OPs. | None|
|[Bootstrap](https://github.com/twbs/bootstrap)| For styling in the context of script evaluation. | MIT |
|[JQConsole](https://github.com/replit-archive/jq-console/tree/master) | For a terminal-like UI. | MIT | 
|JQuery | For manipulation of the DOM, also serving as a dependency for JQConsole.| MIT |
|ACE.js | For an integrated scripting development environment (Users' reading and writing code inside of the app).| [License](https://github.com/ajaxorg/ace?tab=License-1-ov-file)|

## Installation

You may need to permit installations from unknown sources.
To do this, navigate to your device's settings :

```
Settings > Security (or Settings > Apps > Security)
```

and activate the "<b><i>Unknown Sources</i></b>" option.


1. **Download:**
   - Download and Extract the latest release to your desired path.

2. **Install the <b><i>APK</i></b>:**
   - Open a terminal or command prompt and run the following commands:

     ```batch
     :: Install the APK file
     adb install -r "path/PhoneDo.apk"
     ```

3. **Restore Sampled Demo Scripts (<b><i>Optional</i></b>)**

    - To make the sampled scripts available for experimenting with, run the following command to restore a prepared adb backup file:
        ```batch
        adb restore "path/PhoneDoExamples.ab"
        ```
4. **Allow All App Permissions (<b><i>Optional</i></b>)**

   If you want an uninterrupted experience, you can pregrant all of the wanted permissions, even though a script can  request any of them at runtime.

   - At your device's Settings,
     navigate to "Apps" or "Application Manager," depending on your device.
     
   - Find and select <b><i>PhoneDo</i></b> from the list of installed apps.
   - Look for the <b><i>Permissions</i></b> or <b><i>App Permissions</i></b> section.
   - Enable or grant all the permissions listed under PhoneDo.
   
## PhoneDo Terminal
PhoneDo features an interactive Terminal User Interface with purpose-built commands designed to help you script easily.

<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/TUI-Preview.jpg?raw=true" alt="Terminal Preview" width="270" height="600">
</p>


> Typing a command with no parameters dumps its help information.

| Command | Description |
|---------|-------------|
|slist| Script management utility.|
|run|Runs a script.|
|~~runwait~~|~~Runs a script and pauses script execution until the program finishes.~~|
|beep| Plays a beep sound for an audible audio feedback.|
|ipconfig| Retrieves the IP address information for the active connection.|
|ifconfig| Retrieves the IP address information for the active connection.|
|cls|Clears the terminal screen.|
|clear|Clears the terminal screen.|
|exit|Quits the current terminal instance.|
|time|Prints the system time information to the standard output.|
|sysinfo|Displays information about a device software configurations.|
|ping|Sends ICMP ECHO_REQUEST to network hosts.|

--- 

## Scriptable Interfaces

| | API  | Implementation|
|-|------------|---------------|
|| [bluetooth](link%20here) | In Progress.. |
|>1.3.2| [wifi](https://app.gitbook.com/o/zerbp4UP4JRfrC37Dcay/s/GGEXXP1PjxGAHb7hakkp/methods/wifi)| [community-cordova-plugin-wifi-wizard](https://github.com/EYALIN/community-cordova-plugin-wifi-wizard/blob/master/src/android/wifiwizard2/WifiWizard2.java) |
|>1.3.2|sim|[community-cordova-plugin-wifi-wizard](linkhere)|
|>1.3.2| [utter](https://app.gitbook.com/o/zerbp4UP4JRfrC37Dcay/s/GGEXXP1PjxGAHb7hakkp/methods/utter)<br>(Speech synthesis : TTS/STT) | [cordova-plugin-speechrecognition](https://github.com/pbakondy/cordova-plugin-speechrecognition/tree/master/src/android/com/pbakondy) ,<br> [cordova-plugin-tts-advanced](https://github.com/spasma/cordova-plugin-tts-advanced/blob/master/src/android/TTS.java)|
|>1.3.2| [network](link%20here) | [cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http/tree/master/src/android/com/silkimen/cordovahttp) ,<br>[cordova-plugin-network-information](linkhere) ,<br>[cordova-plugin-networkinterface](https://github.com/salbahra/cordova-plugin-networkinterface/blob/master/src/android/networkinterface.java) <br>|
|>1.3.2| [device](link%20here) | [cordova-plugin-device](https://github.com/apache/cordova-plugin-device/blob/master/src/android/Device.java) |
|>1.3.2| [flashlight](link%20here) | [community-cordova-plugin-flashlight](https://github.com/EYALIN/community-cordova-plugin-flashlight) |
|>1.3.2| [sim](lhttps://app.gitbook.com/o/zerbp4UP4JRfrC37Dcay/s/GGEXXP1PjxGAHb7hakkp/methods/sim) | [community-cordova-plugin-sim](https://github.com/EYALIN/community-cordova-plugin-sim/blob/master/src/android/com/pbakondy/Sim.java) |
|>1.3.2| [fs](https://github.com/apache/cordova-plugin-file/tree/master/src/android) (file system) | [cordova-plugin-file](https://github.com/apache/cordova-plugin-file/tree/master/src/android) |
|>1.3.2|️️️browser||

---

## Contributing
Your assistance is much appreciated. There are various ways you can help make the project better :

#### 1. **Code Contributions**

If you're a dev, you can contribute by:

- **Filing Issues:** Report bugs or suggest new features by opening an issue.
  
- **Pull Requests:** Implement new features or fix existing issues by submitting a pull request.

#### 2. **Documentation Improvements**

Contribute by:
- **Updating Docs:** If you notice any gaps or errors in the documentation, feel free to submit a pull request with your improvements.

#### 3. **User Experience (UX) Enhancements**

Help improve the overall user experience by:

- **Design Contributions:** If you have design skills, propose UI/UX enhancements to make PhoneDo more user-friendly.

#### 4. **Testing and Bug Reporting**

Contribute to the stability of thia app by:

- **Testing:** Try out new features and report any issues you encounter.
  
- **Bug Reports:** Provide detailed bug reports, including steps to reproduce and information about your environment.

#### 5. **Community Support**

Contribute to the PhoneDo community by:

- **Answering Questions:** Help fellow users by answering questions on forums.

> Checkout our [Community Group](https://groups.google.com/g/phonedo) before making substantial contributions to connect with other contributors and get a sense of ongoing discussions.

---

<div style="text-align: center;">
  Made with <span style="color: red;">❤</span> by <strong>MurageKabui</strong>
</div>
