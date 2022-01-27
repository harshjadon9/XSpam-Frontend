# XSpam-Frontend

React-native front-end for XSpam App - 
[Video link](https://drive.google.com/file/d/1FPoRCECrZcSqU0Shb-bBs8sFwb-31hp5/view?usp=sharing),
[.apk link](https://github.com/harshjadon9/XSpam-Frontend/blob/main/android/app/release/XSpam.apk)

## Testing Release / Debug (.apk)

```bash
# Run on emulator / device (usb-debugging)
# debug
npx react-native run-android

# release
npx react-native run-android --variant=release

# Build Release
cd android && ./gradlew bundleRelease
```
## Sign the bundle

Use the official [doc](https://reactnative.dev/docs/signed-apk-android) to sign the .apk / .aab.


## License
[MIT](https://choosealicense.com/licenses/mit/)
