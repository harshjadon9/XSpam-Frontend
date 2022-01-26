import React, { useEffect } from 'react'
import { Text, StyleSheet, StatusBar, SafeAreaView, PermissionsAndroid } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";

// Global File
import colors from './src/base';

// Import Screens/components
import Home from './src/screens/Home';
import About from './src/screens/About';
import Scam from './src/screens/Scam';
import Safe from './src/screens/Safe';
import Header from './src/components/Header';

// Contexts
import { Provider } from "./src/contexts/sms"



const Tab = createMaterialTopTabNavigator();




const SMSPermision = async() => {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)
}


const App = () => {
  SMSPermision() // Request call

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.item}></Text>

      {/* StatusBar */}
      <StatusBar translucent backgroundColor={colors.white} barStyle={'dark-content'} /> 

      {/* Header Component */}
      <Header /> 
      <Provider>
        <NavigationContainer>

          {/* Tab Bar */}
          <Tab.Navigator
            sceneContainerStyle={styles.TabContainer}
            screenOptions={{
              tabBarLabelStyle: styles.TabLabel,
              tabBarActiveTintColor: colors.text,
              tabBarInactiveTintColor: `${colors.text}78`,
              tabBarPressColor: "transparent",
              tabBarItemStyle: { width: 70 },
              tabBarIndicatorStyle: {
                backgroundColor: colors.red,
                width: 40,
                left: (100 - 70) / 2,
              },
              tabBarStyle: styles.TabBar
            }}>

              {/* Tab - Screens  */}
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
    backgroundColor: colors.white,
  },
  item: {
    margin: 24,
    fontSize: 1,
    fontWeight: "bold",
    textAlign: "center"
  },
  TabContainer: {
    backgroundColor: colors.off_white,
    paddingHorizontal: 10,
    paddingTop: 15
  },
  TabBar: {
    height: 60,
    backgroundColor: colors.off_white,
    elevation: 0,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  TabLabel: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    textTransform: "none",
    marginTop: 20
  }
});

export default App;
