import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../base";

const Header = () => {
    return (
        <View>
            <View style={styles.header_box}>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Text style={styles.head}>XSpam</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header_box: {
        width: '100%',
        flexDirection: "row",
        margin: 0,
        padding: 20,
        backgroundColor: colors.white,
        height: 76,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 0,
    },
    head: {
        marginTop: -10,
        fontFamily: "Poppins-SemiBold",
        color: colors.text,
        fontSize: 32,
    }
})


export default Header;