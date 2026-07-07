# Cordova Text-to-Speech Plugin Advanced
Updated Cordova Text-to-Speech plugin, with support for voice or locale on both iOS and Android.

## Breaking changes with VILIC VANE version
In this tts plugin you'll need to provide the 'cancel' argument if you want to cancel earlier TTS commands, new lines are added to the queue. 
To keep old behaviour add: `{cancel: true}` to every call.

If no identifier is provided, it will use locale for determining the voice.
If no locale is provided, it will use the OS default language. to keep old behaviour, add: `{locale: 'en-US'}` to every call.

Support for Windows Phone was removed, because it is no more..

## Platforms

iOS 7+  
Android 4.0.3+ (API Level 15+)

## Installation

```sh
cordova plugin add cordova-plugin-tts-advanced
```

## Usage

```javascript
// make sure your the code gets executed only after `deviceready`.
document.addEventListener('deviceready', function () {
  // basic usage
  TTS
      .speak('hello, world!').then(function () {
    alert('success');
  }, function (reason) {
    alert(reason);
  });

  // or with more options
  TTS
      .speak({
        text: 'Hi I\'m Siri!',
        identifier: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.75,
        pitch: 0.9,
        cancel: true
      }).then(function () {
    alert('success');
  }, function (reason) {
    alert(reason);
  });
  // or with more options
  TTS
      .getVoices().then(function (voices) {
        // Array of voices [{name:'', identifier: '', language: ''},..] see TS-declarations
  }, function (reason) {
    alert(reason);
  });
}, false);
```

**Tips:** `speak` an empty string to interrupt.

```typescript
declare namespace TTS {
    interface IOptions {
        /** text to speak */
        text: string;
        /** cancel, boolean: true/false */
        identifier: string;
        /** voice identifier (iOS / Android) from getVoices */
        locale?: string;
        /** speed rate, 0 ~ 1 */
        rate?: number;
        /** pitch, 0 ~ 1 */
        pitch?: number;
        /** cancel, boolean: true/false */
        cancel?: boolean;
        /** iOS ONLY: a voice URI (DEPRECATED, use identifier) **/
        voiceURI?: string;
    }
    interface TTSVoice {
        /** Voice name */
        name: string;
        /** Language **/
        language: string;
        /** identifier string */
        identifier: string;
    }

    function speak(options: IOptions): Promise<void>;
    function speak(text: string): Promise<void>;
    function stop(): Promise<void>;
    function checkLanguage(): Promise<string>;
    function openInstallTts(): Promise<void>;
    function getVoices(): Promise<TTSVoice[]>;
}
```
