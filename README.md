
<!--
PhoneDo has been my personal scripting wizard for Android.
https://www.reddit.com/r/lisp/comments/10jlj6b/lisp_scripting_on_android/
---
-->

<br>
<p align="center">
  <img src="https://github.com/MurageKabui/PhoneDo/blob/main/Previews/PhoneDo.gif?raw=true" title="PhoneDo Logo" alt="PhoneDo Logo" width="440" height="77">
</p>
 

### TL;DR 
> PhoneDo is an <b><i>Android</i></b> automation application that provides a scripting environment based on JavaScript with methods for handling native Android actions in a headless way.

<p align="center">
  <img src="https://github.com/MurageKabui/PhoneDo/blob/main/Previews/HelloWorldDemo.gif?raw=true" title="Hello world Demo" alt="Hello World Preview" width="360" height="640">
</p>


<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC 
- [About](#Tech+Stack)
- [Installation](#Installation)
- [PhoneDo Terminal](#PhoneDo+Terminal)
<!--- [Scriptable Interfaces](#Interfaces)-->
- [Contributing](#Contributing)
- [Credits](#Credits)


<br/>

</details>

## About

The tech stack for this application :


| Technology |Usage |
|------------|---------|
|<a href="https://github.com/vuejs/core">Vue</a>| Front end |
|[SQLite](https://github.com/sqlite/sqlite) | For script storage CRUD operations.|
|[Bootstrap](https://github.com/twbs/bootstrap)| For styling (in the context of script evaluation) | 
|[JQConsole](https://github.com/replit-archive/jq-console/tree/master) | For a terminal UI. | 
|<a href="https://github.com/jquery/jquery">JQuery</a> | For manipulation of the DOM, also serving as a dependency for JQConsole.|
|<a href="https://github.com/ajaxorg/ace">ACE.js</a> | For an integrated scripting development environment (Users' reading and writing code inside of the app).|


I aimed to provide a straightforward way to script tasks, using scripts labeled with the <b><i>.nts</i></b> extension. Users can create these scripts and execute at their convenience. These scripts are stored on their device in a SQLite database and can contain JavaScript code that integrates with Android's native functionalities like file handling, text-to-speech, speech recognition, texting (SMS), Bluetooth connections, Wi-Fi, NFC, infrared, networking, SIM card operations, flashlight control, and battery management, among other things. I documented these methods <a href="docs" target="_blank">here</a>.
<!-- ## Why ?
This project was inspired by <a href="https://www.reddit.com/r/lisp/comments/10jlj6b/lisp_scripting_on_android/" target="_blank">this question on reddit</a> Quoted from OP : 

> Is there a Lisp environment for Android that would let me make simple programs to e.g. hit a web API, parse JSON and display the results as text? I'd really like to open an app which shows me a list of all the little scripts I've made, I tap "Weather San Francisco" and see the text output of my program, done. I swear I saw something like this about a decade ago...
## Let's Help OP
-->
## Let's Try it.
Navigate to `Script Editor` > `File` > `New Script`, then name the script, for instance, `WeatherSanFrancisco.nts`.
> Paste the below script inside the IDE and click `Run` > `Run Script` and press Enter.
> 
```JavaScript
/*
  Script Name      : WeatherSanFrancisco.nts
  Date             : Mon Feb 03 2025 12:45:44 GMT+0300 (East Africa Time)
  PhoneDo Version  : 1.3.2
  Description      : Get weather conditions in San Francisco
  Author           : PhoneDo
  License          : none
*/

// Configuration object to store API-related constants
const CONFIG = {
  WEATHER_API_ENDPOINT: "https://api.open-meteo.com/v1/forecast",
  DEFAULT_LAT: 37.7749,   // Latitude for San Francisco
  DEFAULT_LON: -122.4194, // Longitude for San Francisco
  CURRENT_WEATHER: true
};

// Create API request options
function createWeatherRequestOptions (latitude, longitude) {
  return {
    method: "GET",
    url: `${CONFIG.WEATHER_API_ENDPOINT}?latitude=${latitude}&longitude=${longitude}&current_weather=${CONFIG.CURRENT_WEATHER}`,
    headers: {
      "Content-Type": "application/json"
    },
    serializer: "json"
  };
}

// Fetch weather data using http.sendRequest
async function fetchWeather (latitude = CONFIG.DEFAULT_LAT, longitude = CONFIG.DEFAULT_LON) {
  try {
    const options = createWeatherRequestOptions(latitude, longitude);
    const response = await http.sendRequest(options.url, options);
    const weatherData = JSON.parse(response.data);

    if (!weatherData || !weatherData.current_weather) {
      throw new Error("Failed to fetch weather data");
    }

    // Extract and display weather information
    const { temperature, windspeed, winddirection } = weatherData.current_weather;
    console.log("Weather in San Francisco, CA:");
    console.log(`  Temperature: ${temperature}°C`);
    console.log(`  Windspeed: ${windspeed} km/h`);
    console.log(`  Wind Direction: ${winddirection}°`);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

// Main execution function
async function main () {
  console.log("Fetching weather data...");
  await fetchWeather();
  console.log("Done!");
}

// Execute the main function
await main();

```
<br>

PhoneDo can also access native android APIs.
An example of how a user can control a device's flashlight would be to navigate to `Script Editor` > `File` > `New Script`, then name the script, for instance, `FlashControl.nts`


> On clicking OK, the script is created inside an ACE integrated development environment and a header is automatically generated, to allow you to provide additional details for the script.
```
/*
 * Script Name     : FlashControl.nts
 * Date            : Mon Aug 07 2023 04:49:00 GMT+0300 (East Africa Time)
 * PhoneDo Version : 1.3.2
 * Description     : 
 * Author          : 
 * License         : 
 */
```
<br>

Then, we can use a provided <a href="https://github.com/MurageKabui/PhoneDo/tree/main/docs#flashlight-control" target="_blank">flashlight method</a> to programmatically control it:

```Javascript
if (await flashlight.switchOn()) {
    console.log(' Flashlight successfully turned on.');
} else {
    console.warn(' Failed to turn on the flashlight.');
}
exit();
```

<br>

<details>
<summary><kbd>Expand the full script</kbd></summary>

```JavaScript
/*
 * Script Name     : FlashControl.nts
 * Date            : Mon Aug 07 2023 04:49:00 GMT+0300 (East Africa Time)
 * PhoneDo Version : 1.3.2
 * Description     : Turns on the flashlight.
 * Author          : PhoneDo
 * License         : None
 */
 
if (await flashlight.switchOn()) {
    console.log(' Flashlight successfully turned on.');
} else {
    console.warn(' Failed to turn on the flashlight.');
}
exit();
```

---

</details>
<br>

Congrats! You just made your first PhoneDo Script! Now let's figure out how to execute it. 

To simply execute ``FlashControl.nts`` , we navigate `Run` > `Run Script` and press Enter , or we can also manually navigate back at the PhoneDo terminal view and type in the following command line and press Enter : 
```bash
run -i "Flashlight.nts"
```

**OutPut on success** :
```
 Flashlight successfully turned on.
```



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
     adb install -r "basePath/PhoneDo.apk"
     ```

3. **Restore Sampled Demo Scripts (<b><i>Optional</i></b>)**

    - To make the sampled scripts available for experimenting with, run the following command to restore a prepared adb backup file:
        ```batch
        adb restore "basePath/PhoneDoExamples.ab"
        ```
4. **Allow All App Permissions (<b><i>Optional</i></b>)**

   If you want an uninterrupted experience, you can pregrant all of the wanted permissions, even though a script can  request any of them at runtime.

   - At your device's Settings,
     navigate to "Apps" or "Application Manager," depending on your device.
     
   - Find and select <b><i>PhoneDo</i></b> from the list of installed apps.
   - Look for the <b><i>Permissions</i></b> or <b><i>App Permissions</i></b> section.
   - Enable or grant all the permissions listed under PhoneDo.
   
## PhoneDo Terminal (In Progress)
PhoneDo features an interactive Terminal User Interface with purpose-built commands designed to help you script easily.

<p align="center">
  <img src="https://github.com/MurageKabui/PhoneDo/blob/main/Previews/TUI-Preview.jpg?raw=true" alt="PhoneDo Terminal Preview" width="270" height="600">
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
## Credits

PhoneDo Logo : https://linktr.ee/namishkashyap

<div style="text-align: center;">
  Made with <span style="color: red;">❤</span> by <strong>MurageKabui</strong>
</div>
