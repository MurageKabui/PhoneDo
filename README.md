> [!NOTE]  
This project is a work in progress and not yet production-level quality.  
See : https://github.com/MurageKabui?tab=projects

<!--
## PhoneDo

<p align="center">
  <img src="https://github.com/MurageKabui/N8VShell/blob/main/Preview/PhoneDo.png?raw=true" alt="PhoneDo Logo" width="128" height="103">
</p>

<p align="center">
<i>PhoneDo<i><br>
<b>Script Android the JS way.<b>

</p>

-->
<hr>

### TL;DR 
> This project is an attempt to revolutionize the way we interact with a devices native APIs, by offering a scripting interface that seamlessly integrates JavaScript with Android's core functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [License](#license)


## Installation
Follow the steps to install PhoneDo in your device.
> Make sure that your device allows installations from unknown sources. If not, go to **Settings > Security** (or **Settings > Apps > Security**) and enable the "Unknown Sources" option.
> 
 > You might receive a warning about the installation of apps from unknown sources. Make sure to download the APK file only from a trusted repository to ensure its authenticity.


1.  Navigate the [Releases](https://github.com/MurageKabui/PhoneDo/releases) page of this repository.
2.  On the latest release version,  locate the  `.apk` file associated with the release.
3.  Click on the APK file to start the download,  once the file is downloaded, navigate to the location where it was saved on your device.
 4.  Tap on the downloaded APK file to initiate the installation process & follow the on-screen instructions.

To explore the features , you have the option to load pre-prepared demo scripts included in a .ab backup file. Simply locate the `.ab` file associated with the release, then, load the examples to N8VShell using `adb` 
```batch script
adb restore "path/to/PhoneDo-(version number)-demo.ab"
```
#### Note :
This process will restore the backup file and make the demo scripts available for you to experiment with. These scripts serve as valuable examples to help you get started with the app and explore its capabilities.


## License
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


<div style="text-align: center; font-family: Arial;">
  Made with <span style="color: red;">❤</span> by <strong>Dennisk</strong>
</div>
