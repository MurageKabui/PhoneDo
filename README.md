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
> PhoneDo allows a headless interaction with android by providing a scripting interface that combines JS with native Android actions.

<!--<p align="center">-->
<!--  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo_icon.png?raw=true" alt="Stack" width="128" height="103">-->
<!--</p>-->
<br>


<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC 
- [About](#Tech-Stack)
- [Introduction](#introduction)
- [Installation](#Installation)
- [Interfaces](#Interfaces)
- [License](#License)
- [Contributing](#Contributing)


####

<br/>

</details>

## About



## Interfaces

| Status| Interface  | Implimentation|
|-|------------|---------------|
|🔧 | [bluetooth](link%20here) |  |
|✔️| [wifi](https://app.gitbook.com/o/zerbp4UP4JRfrC37Dcay/s/GGEXXP1PjxGAHb7hakkp/methods/wifi) | [community-cordova-plugin-wifi-wizard](https://github.com/EYALIN/community-cordova-plugin-wifi-wizard/blob/master/src/android/wifiwizard2/WifiWizard2.java) |
|✔️| [utter](https://app.gitbook.com/o/zerbp4UP4JRfrC37Dcay/s/GGEXXP1PjxGAHb7hakkp/methods/utter) | [cordova-plugin-speechrecognition](https://github.com/pbakondy/cordova-plugin-speechrecognition/tree/master/src/android/com/pbakondy) ,<br> [cordova-plugin-tts-advanced](https://github.com/spasma/cordova-plugin-tts-advanced/blob/master/src/android/TTS.java)|
|✔️| [network](link%20here) | [cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http/tree/master/src/android/com/silkimen/cordovahttp) ,<br>[cordova-plugin-network-information](linkhere) ,<br>[cordova-plugin-networkinterface](https://github.com/salbahra/cordova-plugin-networkinterface/blob/master/src/android/networkinterface.java) ,<br>|
|✔️| [device](link%20here) | [cordova-plugin-device](https://github.com/apache/cordova-plugin-device/blob/master/src/android/Device.java) |
|✔️| [flashlight](link%20here) | [community-cordova-plugin-flashlight](https://github.com/EYALIN/community-cordova-plugin-flashlight) |
|✔️| [sim](lhttps://app.gitbook.com/o/zerbp4UP4JRfrC37Dcay/s/GGEXXP1PjxGAHb7hakkp/methods/sim) | [community-cordova-plugin-sim](https://github.com/EYALIN/community-cordova-plugin-sim/blob/master/src/android/com/pbakondy/Sim.java) |
|✔️| [fs](https://github.com/apache/cordova-plugin-file/tree/master/src/android) (file system) | [cordova-plugin-file](https://github.com/apache/cordova-plugin-file/tree/master/src/android) |
|✔️|️️️browser|[coe)|

## Installation

You may need to permit installations from unknown sources.<br>To do this, navigate ``Settings > Security (or Settings > Apps > Security)`` and activate the "Unknown Sources" option. 

Download the latest release, locate and unzip the file on your device.

```batch
:: Install the apk
adb install -r "releaseRootPath/PhoneDo.apk"

:: Consider loading sampled demo scripts from a bundled .ab backup file. 
adb restore "releaseRootPath/PhoneDoExamples.ab"
```
> The second command will restore a prepared backup file to make the sampled scripts available for you to experiment with.

## Contributing
Your help is more than welcome, I would be very honored to have you on my side.

## License

<div style="text-align: center; font-family: Arial;">
  Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong>
</div>
