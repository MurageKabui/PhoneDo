/*
 * Script Name      : DumpDeviceInfo.js
 * Date             : Tue Nov 14 2023 22:57:12 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Show host device information to the standard output
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : 
// https://docs.phonedo.com/api/dialog
// https://docs.phonedo.com/api/clipboard
// https://docs.phonedo.com/api/device#vibration

const UUID = device.uuid;

// Show dialog with UUID and copy option
const ret =
    await dialog.alert(
        UUID,
        'UUID',
        'information',
        [{
                'text': 'Copy UUID to Clipboard',
                'kind': 'primary',
                'size': 'sm'
            },
            {
                'text': 'Ok',
                'kind': 'secondary',
                'size': 'sm'
            }
        ]
    );

device.vibrate(100);

switch (ret) {
    case 0: // Copy button clicked
        let res = await clipboard.setText(UUID);
        if (res == 'OK') {
            console.log(' Successfully copied UUID to clipboard.');
        }
        break;
    default: // Ok button clicked
        console.info(' Ok');
        break;
}

// Exit with a return code
exit(0);