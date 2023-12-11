<!--
> [!NOTE]  
This project is a work in progress and not yet production-level quality.  
See : https://github.com/MurageKabui?tab=projects


## PhoneDo
-->


 
<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo_icon.png?raw=true" alt="PhoneDo Logo" width="128" height="103">
</p>

<p align="center">
<i>PhoneDo<i><br>
<b>Script Android the JS way.<b>

</p>

<hr>

### TL;DR 
> This project is an attempt to revolutionize the way we interact with a devices native APIs, by offering a scripting interface that easily integrates JavaScript with Android's core functions.

<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo_icon.png?raw=true" alt="Stack" width="128" height="103">
</p>

## Table of Contents 
- [About](#Tech-Stack)
- [Introduction](#introduction)
- [Installation](#installation)
- [License](#license)

## About

## Installation
Follow these steps to install PhoneDo and Sample scripts:

> [!NOTE] : 
You may need to permit installations from unknown sources.<br>To do this, navigate ``Settings > Security (or Settings > Apps > Security)`` and activate the "Unknown Sources" option. 

At the Releases page of this repository, identify the .apk file associated with the latest release version. Once downloaded, locate the file on your device and follow the on-screen instructions to install. 

Consider loading sampled demo scripts from a bundled .ab backup file.<br>To do this, locate the associated .ab file within the release, and restore it using adb.

```batch
adb install -r "releaseRootPath/PhoneDo.apk" && adb restore "releaseRootPath/PhoneDoExamples.ab"
```
> This process will restore the backup file and make the demo scripts available for you to experiment with. These scripts serve as valuable examples to help you get started.




<div style="text-align: center; font-family: Arial;">
  Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong>
</div>
