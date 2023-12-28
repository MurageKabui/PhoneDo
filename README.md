<!--
> [!NOTE]  
This project is a work in progress and not yet production-level quality.  
See : https://github.com/MurageKabui?tab=projects
PhoneDo has been my personal scripting wizard for Android. Imagine being able to whip up your own custom scripts effortlessly using JavaScript. It's not just scripting; it's an art form. PhoneDo seamlessly blends JavaScript magic with native Android actions, giving you the power to script your Android interactions with ease. It's your ticket to a world of personalized, headless wizardry.

🚀 Introducing PhoneDo, my latest project for Android scripting. It lets you use JS with methods tailored with native Android actions. It's all about headless interactions made easy. 

Meet PhoneDo , its an app that lets you script andorid with JS. 

Let's think of it like a scripting enviroment that integrates a programming api 
<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo1.gif?raw=true" alt="PhoneDo Logo" width="440" height="77">
 </p>

<!--<hr>-->

### TL;DR 
> PhoneDo is an application for <b><i>Android</i></b> that provides a JavaScript based scripting environment along with  methods that control native Android actions in a headless way.

<!--<p align="center">-->
<!--  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo_icon.png?raw=true" alt="Stack" width="128" height="103">-->
<!--</p>-->
<br>


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
About information here..

## Installation

You may need to permit installations from unknown sources. To do this, navigate to your device's settings:

```
Settings > Security (or Settings > Apps > Security)
```

and activate the "<b><i>Unknown Sources</i></b>" option.


1. **Download:**
   - Download and Extract the latest release to your desired path.

2. **Install the APK:**
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
|runwait|Runs a script and pauses script execution until the program finishes.|
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

Contribute to the stability of PhoneDo by:

- **Testing:** Try out new features and report any issues you encounter.
  
- **Bug Reports:** Provide detailed bug reports, including steps to reproduce and information about your environment.

#### 5. **Community Support**

Contribute to the PhoneDo community by:

- **Answering Questions:** Help fellow users by answering questions on forums or other community channels.


Check out our [Contribution Guidelines](link-to-guidelines) for detailed information on how to contribute in each of the areas mentioned above.

Before making substantial contributions, we recommend joining our [Community Forum](link-to-forum) to connect with other contributors and get a sense of ongoing discussions.

---

<div style="text-align: center; font-family: Arial;">
  Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong>
</div>
