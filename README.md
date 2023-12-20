<!--
> [!NOTE]  
This project is a work in progress and not yet production-level quality.  
See : https://github.com/MurageKabui?tab=projects


## PhoneDo
-->

<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo1.gif?raw=true" alt="PhoneDo Logo" width="440" height="77">
 </p>

<!--<hr>-->

### TL;DR 
> PhoneDo is a scripting application for <b><i>Android</i></b> that provides JavaScript methods with native Android actions to enable a headless interaction.

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
About info here..

## Installation

You may need to permit installations from unknown sources. To do this, navigate to your device's settings:

```
Settings > Security (or Settings > Apps > Security)
```

and activate the "<b><i>Unknown Sources</i></b>" option.


1. **Download:**
   - Download and Extract the latest release to your desired path.

3. **Install the APK:**
   - Open a terminal or command prompt and run the following commands:

     ```batch
     :: Install the APK file
     adb install -r "path/PhoneDo.apk"
     ```

4. **Restore Sampled Demo Scripts (Optional)**

To make the sampled scripts available for experimentation Run the following command to restore the prepared backup file:
```batch
adb restore "path/PhoneDoExamples.ab"
```

## PhoneDo Terminal
PhoneDo features an interactive terminal user interface with commands designed to help you script your way easily.

<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo_icon.png?raw=true" alt="Terminal Preview" width="320" height="480">
</p>




> Typing a command with no parameters dumps its help information.


| Command | Description |
|---------|-------------|
|slist| Script management utility.|
|run|Runs a script.|
|runwait|Runs a script and pauses script execution until the program finishes.|
|beep| Plays a beep sound for an audible audio feedback.|
|ipconfig| Retrieves the IP address information for the active connection. |
|ifconfig| Retrieves the IP address information for the active connection.|
|cls|Clears the terminal screen.|
|clear|Clears the terminal screen.|
|exit|Quits the current terminal instance.|
|time|Prints the system time information to the standard output.|
|sysinfo|Displays information about a device software configurations.|
|ping|Sends ICMP ECHO_REQUEST to network hosts.|

--- 

## Scriptable Interfaces

| | Interface  | Implementation|
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
Your help is more than welcome.



<div style="text-align: center; font-family: Arial;">
  Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong>
</div>
