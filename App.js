import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, StatusBar, SafeAreaView, PermissionsAndroid } from 'react-native'
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

// intro
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createMaterialTopTabNavigator();


const SMSPermision = async () => {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)
}


const App = () => {

  // Showcase features - only first time
  const [showcase, setShowcase] = useState(false)
  const check_show = async () => {
    const showcase_check = async () => await AsyncStorage.getItem("showcase").then(res => {
      return res
    })
    const res = await showcase_check()
    if (res == null) {
      setShowcase(true)
      const setasync = async () => {
        await AsyncStorage.setItem("showcase", "false")
      }
      setasync()
    }
  }
  check_show()
  const slides = [
    {
      key: 1,
      title: 'AI Based Detection',
      text: 'AI based Spam Filtering Application. Smart Scoring based mechanism on severity.',
      image: require('./assets/img/1.png'),
      text_color: "#fff",
      backgroundColor: '#A4CFF1',
    },
    {
      key: 2,
      title: 'Safe, Secure and lite',
      text: 'Check scores and block senders. No personal data is stored or utilised. Encrypted-Data.',
      image: require('./assets/img/2.png'),
      text_color: "#4887FA",
      backgroundColor: '#F6F4FB',
    },
    {
      key: 3,
      title: 'Easy reporting',
      text: 'The constituency of CERT-In is the Indian Cyber Community. Report incidents immediately to the official cyber-security cell.',
      image: require('./assets/img/3.png'),
      text_color: "#3169B2",
      backgroundColor: '#fff',
    }
  ];
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide} backgroundColor={item.backgroundColor}>
        <Text style={[styles.slide_title, { color: item.text_color }]}>{item.title}</Text>
        <Image style={styles.slide_image} source={item.image} />
        <Text style={[styles.slide_body, { color: item.text_color }]}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowcase(false)
  }
  SMSPermision() // Request call

  if (showcase == true) {
    return (
      <View style={styles.slider}>
        <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>
        <AppIntroSlider showNextButton={false} renderItem={_renderItem} data={slides} onDone={_onDone} />
      </View>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.item}></Text>
        {/* StatusBar */}
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />

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
                tabBarItemStyle: { width: 77 },
                tabBarIndicatorStyle: {
                  backgroundColor: colors.red,
                  width: 40,
                  left: (100 - 63) / 2,
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
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingTop: 100,
    height: "100%"
  },
  slider: {
    flex: 1
  },
  slide_title: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
  },
  slide_image: {
    marginTop: 50,
    alignSelf: "center"
  },
  slide_body: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    width: '100%',
    paddingHorizontal: 50,
    paddingTop: 40
  },
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
