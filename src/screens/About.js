import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../base'

const About = () => {
    return (
        <View style={styles.main}>
            <Text style={styles.head}>Team 1337x</Text>
            <Text style={styles.text}>Confidence in an online world, Our lives have been subjected to digital attacks more than ever before. We indend to keep you safe from fraud and spam SMSs. </Text>
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