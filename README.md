

<p align="center">
<img width="100" src="https://user-images.githubusercontent.com/62889318/183087391-bc222967-288d-4e03-a63a-aa9a9ed993d7.png">
 
# XSpam-Frontend (Hackathon)
 [Main Repo](https://github.com/Team-1337x/XSpam)
</p>




React-native front-end for XSpam App - 
[Video link](https://drive.google.com/file/d/1FPoRCECrZcSqU0Shb-bBs8sFwb-31hp5/view?usp=sharing),
[.apk link](https://github.com/harshjadon9/XSpam-Frontend/blob/main/android/app/release/XSpam.apk)

# Demo Video 

<a href="https://www.youtube.com/watch?v=Xu2gmxSVKfA">
<img width="254" alt="Screenshot 2022-08-05 at 7 09 18 PM" src="https://user-images.githubusercontent.com/62889318/183089274-2839a4dc-24dd-4409-b0b4-951fe5f05ef4.png">
</a>



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


## Hackathon Team
 - [Harsh Jadon](https://github.com/harshjadon9)
 - [Karnik Kanojia](https://github.com/karnikkanojia)
 - [Eshaan Agarwal]()
