import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native'

// Global File
import colors from '../base'

// Contexts
import { Context } from '../contexts/sms'

// libs
import RBSheet from "react-native-raw-bottom-sheet";
import LinearGradient from 'react-native-linear-gradient'



const SmsList = ({ sms_arr, list_category }) => {
    // Contexts & refs
    const refRBSheet_pin = useRef();
    const { sms_time, sms_fetcher, results } = useContext(Context)

    // States
    const [scam_sms, setScam_sms] = useState()
    const [isFetching, setisFetching] = useState(false)

    // Score gradient colors
    const score_red = ['#FF8A00', '#FF4545']
    const score_yellow = ['#FFE86C', '#F5AF19']
    const score_green = ['#95FF93', '#00DC4E']

    // Store Fetched score : id of sms
    const [res, setRes] = useState({})

    // Handle Score Display Handling
    const Score_Scam = () => {
        return (
            <LinearGradient start={{ x: -0.35, y: 0.15 }} end={{ x: 0.5, y: 1.0 }} colors={score_red} style={styles.score}>
                <ActivityIndicator size="small" color="#fff" />
            </LinearGradient>
        )
    }
    const Score_Safe = (item, score) => {
        var color = score_yellow
        if (score <= 50) { color = score_green }
        else if (score >= 70) { color = score_red }
        else { color = score_yellow }
        return (
            <LinearGradient start={{ x: -0.35, y: 0.15 }} end={{ x: 0.5, y: 1.0 }} colors={color} style={styles.score}>
                <Text style={styles.score_text}>{res[item._id]}</Text>
                <Text style={styles.score_text_cent}>%</Text>
            </LinearGradient>
        )
    }

    // refetch SMSs on refresh
    const onRefresh = () => {
        sms_fetcher() // call context funtion
    }



    // Using useCallback hook to memo data and handle changes
    const res_update = useCallback(() => {
        results.forEach(element => {
            var scr = Math.trunc(element.score * 100)
            if (scr >= 70) {
                setRes({ ...res, [element.id]: scr })
                sms_arr.forEach(ele => {
                    if (ele["_id"] == element.id) {
                        ele["category"] = "scam"
                    }
                })
            } else if (scr <= 50) {
                setRes({ ...res, [element.id]: scr })
                sms_arr.forEach(ele => {
                    if (ele["_id"] == element.id) {
                        ele["category"] = "safe"
                    }
                })
            } else { setRes({ ...res, [element.id]: scr }) }
        });
    }, [results])

    // Fetch scores on component mount
    useEffect(() => {
        res_update()
    }, [results])

    return (
        <View>
            <FlatList
                style={styles.flatlist}
                onRefresh={() => onRefresh()}
                refreshing={isFetching}
                data={sms_arr}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    if (list_category == item.category || list_category == "all") {
                        return (
                            <TouchableOpacity delayPressIn={30}
                                delayLongPress={150} style={styles.item} activeOpacity={.7} onPress={() => {
                                    Linking.openURL("sms:" + item.address)
                                }}
                                onLongPress={() => {
                                    setScam_sms(item)
                                    refRBSheet_pin.current.open()
                                }}>

                                {/* Score display call */}
                                {res.hasOwnProperty(item._id) == true ? Score_Safe(item, res[item._id]) : Score_Scam()}

                                <View style={styles.main}>
                                    <Text style={styles.main_sms_head}>{item.address}</Text>

                                    {/* Trim SMS body length by 30 char */}
                                    <Text style={styles.main_sms}>{item.body.length < 30
                                        ? `${item.body}`
                                        : `${item.body.substring(0, 30)}...`}</Text>
                                </View>

                                {/* Time & Seen */}
                                <View style={styles.time_view}>
                                    <Text style={styles.time}>{sms_time(item.date)}</Text>
                                    {item.read == 1 ? null : <Text style={styles.seen}>✉️</Text>}
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    else { return true }
                }
                } />

            {/* Bottom Sheet popup - onLongPress Event */}
            <RBSheet
                ref={refRBSheet_pin}
                closeOnDragDown={true}
                height={250}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: colors.red,
                    },
                    container: styles.sheet_container
                }}>
                <Text style={styles.sheet_head}>Report ?</Text>
                <Text style={styles.sheet_body}>CERT-In is the national nodal agency for responding to computer security incidents as and when they occur.</Text>
                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                    <TouchableOpacity style={styles.report} onPress={() => {
                        // Report to CERT-in
                        Linking.openURL("mailto:incident@cert-in.org.in?subject=SMS - Scam %2F Phishing&body=Time:%0A" + Date(scam_sms.date) + "%0A%0AAuther:%0A" + scam_sms.address + "%0A%0ASMS:%0A%22" + scam_sms.body + "%22%0A%0A")
                    }}>
                        <Text style={[styles.report_button_text, { color: colors.red }]}>👮🏻‍♂️ REPORT</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View >
    )
}

const styles = StyleSheet.create({
    flatlist: {
        marginTop: 10
    },
    item: {
        borderRadius: 10,
        alignSelf: "center",
        width: '100%',
        height: 80,
        backgroundColor: colors.off_off_white,
        paddingHorizontal: 10,
        paddingVertical: 9,
        marginBottom: 7,
        flexDirection: "row",
    },
    score: {
        backgroundColor: "green",
        marginTop: 2,
        height: 56,
        width: 56,
        borderRadius: 10,
        justifyContent: "center",
        flexDirection: "row"
    },
    score_text: {
        fontFamily: "Montserrat-Bold",
        color: colors.white,
        textAlign: "center",
        fontSize: 20,
        textAlignVertical: "center",
    },
    score_text_cent: {
        fontFamily: "Montserrat-Bold",
        color: colors.white,
        paddingTop: 4,
        fontSize: 10,
        textAlignVertical: "center",
    },
    main: {
        width: 'auto',
        padding: 7,
        paddingHorizontal: 20
    },
    main_sms_head: {
        fontFamily: "Poppins-SemiBold",
        color: colors.text,
    },
    main_sms: {
        color: colors.text,
        opacity: 0.7
    },
    time_view: {
        position: "absolute",
        right: 0,
        paddingVertical: 8,
        paddingHorizontal: 13,
        opacity: 0.7,
        flexDirection: "column"
    },
    time: {
        fontSize: 12,
        color: colors.text,

    },
    seen: {
        marginTop: 18,
        alignSelf: "flex-end",
        color: colors.text,

    },
    sheet_container: {
        backgroundColor: colors.off_off_white,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    sheet_head: {
        color: colors.text,
        fontSize: 22,
        textAlign: "left",
        marginHorizontal: 7,
        marginVertical: 4,
        marginBottom: 1,
        fontFamily: "Poppins-SemiBold"
    },
    sheet_body: {
        color: colors.text,
        fontSize: 16,
        textAlign: "left",
        marginHorizontal: 7,
        marginVertical: 4,
        marginBottom: 1,
        fontFamily: "Poppins"
    },
    report: {
        flex: 2,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 3,
        margin: 5,
        borderColor: colors.red,


    },
    delete: {
        margin: 5,
        paddingVertical: 15,
        borderRadius: 10,
        flex: 2,
    },
    report_button_text: {
        textAlign: "center",
        fontSize: 20,
        color: colors.white,
        fontFamily: "Poppins-SemiBold",
    },
})

export default SmsList;