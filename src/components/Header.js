import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import colors from "../base";
// import { FontAwesome } from '@expo/vector-icons';
// import { SafeAreaView } from "react-native-safe-area-context";
// import Devices from "./Devices";
// import RBSheet from "react-native-raw-bottom-sheet";


const Header = () => {
    // for Switch
    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // const refRBSheet = useRef();

    return (
        <View>
            {/* <SafeAreaView style={{ backgroundColor: colors.sub_white }}> */}
            <View style={styles.header_box}>
                <TouchableOpacity
                    style={{ flexDirection: "row" }}
                >
                    <Text style={styles.device}>XSpam</Text>
                    <Text>   </Text>

                    {/* <FontAwesome name="sort-down" size={24} color="black" /> */}
                </TouchableOpacity>
                {/* <Switch onValueChange={toggleSwitch} value={isEnabled}/> */}
            </View>

            {/* <RBSheet
                ref={refRBSheet}
                // height={200}
                customStyles={{
                    container: {
                        backgroundColor: colors.white,
                        padding: 20,
                        borderRadius: 20
                    }
                }}
            ><Devices ref={refRBSheet} /></RBSheet> */}
            {/* // </SafeAreaView> */}
        </View>
    )
}


const styles = StyleSheet.create({
    header_box: {
        // flex:1,
        // position:"absolute",
        width: '100%',
        // backgroundColor: 'blue',
        flexDirection: "row",
        margin: 0,
        padding: 20,
        backgroundColor: colors.white,
        height: 66,
        // borderRadius: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 0,
    },
    dropdown: {
        backgroundColor: colors.white,
        // shadowColor: 'black',
        // shadowOpacity: 1,
        elevation: 15,
        // height:100,
        width: '50%',
        marginLeft: 20,
        marginTop: 80,
        position: "absolute"
    },
    device: {
        marginTop:-20,
        fontFamily: "Poppins-SemiBold",
        // fontWeight: "800",
        color: colors.text,
        fontSize: 32,
    }
})


export default Header;