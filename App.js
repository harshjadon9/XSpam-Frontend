import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Button, PermissionsAndroid, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";
import colors from './src/base';
import Home from './src/screens/Home';
import About from './src/screens/About';
import Scam from './src/screens/Scam';
import Safe from './src/screens/Safe';
import Header from './src/components/Header';

import { Provider } from "./src/contexts/sms"



const Tab = createMaterialTopTabNavigator();

// const requestSmsPermission = () => {
//   try {
//     const granted = PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_SMS,
//       {
//         title: "App require SMS Permission",
//         message:
//           "SMS access required to function the App",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK"
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the SMS API");
//     } else {
//       console.log("SMS permission denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const permision = async() => {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)
}


const App = () => {

  permision()


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.item}></Text>
      <StatusBar translucent backgroundColor={colors.white} barStyle={'dark-content'} />
      <Header />
      <Provider>
        <NavigationContainer>
          <Tab.Navigator
            // style={{width:10}}
            sceneContainerStyle={{ backgroundColor: colors.off_white, paddingHorizontal: 10, paddingTop: 15 }}
            screenOptions={{
              tabBarLabelStyle: { fontSize: 13, fontFamily: "Poppins-SemiBold", textTransform: "none", marginTop: 20 }, // style for the Tab Label
              // tabBarLabel:{},
              tabBarActiveTintColor: colors.text,
              // tabBarAllowFontScaling: true,
              tabBarInactiveTintColor: `${colors.text}78`,
              // tabBarBounces:true,
              tabBarPressColor: "transparent",
              // tabBarPressOpacity: 0,
              tabBarItemStyle: { width: 70 },
              tabBarIndicatorStyle: {
                backgroundColor: colors.red,
                width: 40,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                // width: w,
                left: (100 - 70) / 2,
              },
              // tabBarBounces:true,
              tabBarStyle: { height: 60, backgroundColor: colors.off_white, elevation: 0, borderRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }, // style for pura TabBar
            }}
          >
            <Tab.Screen name="All" component={Home} />
            <Tab.Screen name="Scam" component={Scam} />
            <Tab.Screen name="Safe" component={Safe} />
            <Tab.Screen name="About" component={About} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white,
    // padding: 8
  },
  item: {
    margin: 24,
    fontSize: 1,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App;
