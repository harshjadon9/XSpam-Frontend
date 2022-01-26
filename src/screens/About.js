import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../base'

const About = () => {
    return (
        <View style={styles.main}>
            <Text style={styles.head}>Team 1337x</Text>
            <Text style={styles.text}>This app does blah blah blah...hence App description goes here...this is to extend the size of this element lol.. some more goes here.</Text>
            <Text style={styles.verbose}>Version 0.0.1</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:-140
    },
    head:{
        fontFamily: "Montserrat-Bold",
        color: colors.text,
        fontSize:22,
        textAlign:"center",
        marginBottom:10
    },
    text:{
        color: colors.text,
        fontSize:14,
        textAlign:"center",
        width:'65%',
        opacity:0.5
    },
    verbose:{
        opacity:0.3,
        fontFamily: "Poppins-SemiBold",
        position:"absolute",
        bottom:30,
        color: colors.text,
    }
})
export default About