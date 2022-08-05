

<p align="center">
<img width="200" src="https://user-images.githubusercontent.com/62889318/183087391-bc222967-288d-4e03-a63a-aa9a9ed993d7.png">

# XSpam-Frontend
</p>

## Problem Statement
We aim to develop a mobile app which can automatically scan through SMS texts and detect possible fraud and phishing attacks and suggest the user not to click on such a link. 
Additionally it must have a "Report This" option which submits the incident to local Cyber Security Department (CERT-In). Hence we can protect citizens from such fraudulent attempts.

## Solution
 - XSpam brings state-of-art Deep Learning and Artificial Intelligence application to the market. Spam Detection could never have been more accurate and secure.
 - Instead of identifying from a pre-stored database, XSpam can easily detect spam from unwanted parties by analyzing messages through our pretrained ML Model.
 - Users can block spam from the app. Incidents can be reported directly to the Indian Computer Emergency Response Team (CERT-In) ,who can take immediate actions.


## Architecture Diagram

<img width="612" alt="image" src="https://user-images.githubusercontent.com/62889318/183088117-036d962f-a2a0-4571-850a-5e5878399410.png">


## Model Training Graphs

<img width="668" alt="image" src="https://user-images.githubusercontent.com/62889318/183088245-2ca70982-fa46-4405-a0f1-38f62fbcb9c4.png">




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
