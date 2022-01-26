import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../base'
import { Context } from '../contexts/sms'
import RBSheet from "react-native-raw-bottom-sheet";
import axios from '../api/axios'
// import FormData from 'form-data'

// import axios from 'axios'


const SmsList = ({ sms_list, type }) => {
    const refRBSheet_pin = useRef();
    const gradient = useRef();
    const [scam_sms, setScam_sms] = useState()

    const { sms_time, sms_fetcher, sms_deleter, results } = useContext(Context)
    const [isFetching, setisFetching] = useState(false)
    const onRefresh = () => {
        sms_fetcher()
    }
    const red = () => {

        return (
            <LinearGradient ref={gradient} start={{ x: -0.35, y: 0.15 }} end={{ x: 0.5, y: 1.0 }} colors={score_red} style={styles.score}>
                <ActivityIndicator size="small" color="#fff" />
            </LinearGradient>
        )
    }
    const green = (item, score) => {
        var color = score_yellow
        if (score <= 50) {
            color = score_green
        } else if (score >= 70) {
            color = score_red
        } else {
            color = score_yellow
        }

        return (
            <LinearGradient ref={gradient} start={{ x: -0.35, y: 0.15 }} end={{ x: 0.5, y: 1.0 }} colors={color} style={styles.score}>
                <Text style={styles.score_text}>{res[item._id]}</Text>
                <Text style={styles.score_text_cent}>%</Text>
            </LinearGradient>
        )
    }

    const sms_arr = sms_list
    const list_type = type
    const score_red = ['#FF8A00', '#FF4545']
    const score_yellow = ['#FFE86C', '#F5AF19']
    const score_green = ['#95FF93', '#00DC4E']

    const [res, setRes] = useState({})

    // const [loadings, setLoadings] = useState([])
    // // const res = results.map(o => o.results)
    // // console.log(res);
    // results.forEach(element => {
    //     if (element.score < 0.0) {
    //         setRes({...res, [element.id] : 0})
    //     } else {
    //         setRes({...res, [element.id] : Math.round(element.score * 100)})
    //     }
    // });
    // useEffect(() => {
    //     console.log(results," -- list");
    // }, [results])
    // console.log(res, " -- res")
    const res_update = useCallback(() => {
        results.forEach(element => {
            var scr = Math.trunc(element.score * 100)
            if (scr >= 70) {
                setRes({ ...res, [element.id]: scr})
                sms_arr.forEach(ele =>{
                    if (ele["_id"] == element.id) {
                    ele["type"] = "scam"
                    }
                })
            } else if (scr <= 50) {
                setRes({ ...res, [element.id]: scr})
                sms_arr.forEach(ele =>{
                    if (ele["_id"] == element.id) {
                    ele["type"] = "safe"
                    }
                })
            } else {
                setRes({ ...res, [element.id]: scr})
            }
        });
        console.info(res)
    }, [results])
    useEffect(() => {
        res_update()
    }, [results])

    console.log(sms_arr, " -- asd")

    return (
        <View>
            <FlatList
                style={styles.flatlist}
                onRefresh={() => onRefresh()}
                refreshing={isFetching}
                data={sms_arr}
                // inverted={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    // useEffect(()=>{
                    //     return ()=>{}
                    // },[])
                    // console.log(item._id)
                    // console.log(item)

                    if (list_type == item.type || list_type == "all") {
                        return (
                            <TouchableOpacity delayPressIn={30}
                                delayLongPress={150} style={styles.item} activeOpacity={.7} onPress={() => {
                                    Linking.openURL("sms:" + item.address)
                                }}
                                onLongPress={() => {
                                    // alert('Long Press')
                                    setScam_sms(item)
                                    refRBSheet_pin.current.open()
                                }}
                            >
                                {res.hasOwnProperty(item._id) == true ?
                                    green(item, res[item._id])
                                    :
                                    red()
                                    // <View style={{ width: 100, height: 100, backgroundColor: 'red' }}></View>
                                }
    
                                <View style={styles.main}>
                                    <Text style={styles.main_sms_head}>{item.address}</Text>
                                    <Text style={styles.main_sms}>{item.body.length < 30
                                        ? `${item.body}`
                                        : `${item.body.substring(0, 30)}...`}</Text>
                                </View>
                                <View style={styles.time_view}>
                                    <Text style={styles.time}>{sms_time(item.date)}</Text>
                                    {item.read == 1 ? null : <Text style={styles.seen}>✉️</Text>}
                                </View>
                            </TouchableOpacity>
                        )
                        
                    }
                    else{
                        return true
                    }


                    
                }
                } />
            <RBSheet
                ref={refRBSheet_pin}
                closeOnDragDown={true}
                // animationType={"fade"} 
                height={150}
                // openDuration={200}

                customStyles={{
                    draggableIcon: {
                        backgroundColor: colors.red,
                    },

                    container: {
                        backgroundColor: colors.off_off_white,
                        // justifyContent: "space-around",
                        // alignItems: "center"
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }
                }}
            >
                {/* <Text style={styles.sheet_head}>Report or Delete?</Text> */}
                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                    <TouchableOpacity style={styles.report} onPress={() => {
                        Linking.openURL("mailto:incident@cert-in.org.in?subject=SMS - Scam %2F Phishing&body=Time:%0A" + Date(scam_sms.date) + "%0A%0AAuther:%0A" + scam_sms.address + "%0A%0ASMS:%0A%22" + scam_sms.body + "%22%0A%0A")
                    }}>
                        <Text style={[styles.report_button_text, { color: colors.red }]}>👮🏻‍♂️ REPORT</Text>
                    </TouchableOpacity>
                    <LinearGradient style={styles.delete} start={{ x: -0.35, y: 0.15 }} end={{ x: 0.5, y: 1.0 }} colors={score_red}>

                        <TouchableOpacity onPress={() => {
                            sms_deleter(scam_sms._id)
                        }}>
                            <Text style={styles.report_button_text}>🗑 Delete</Text>
                        </TouchableOpacity>

                    </LinearGradient>

                </View>
                {/* <PinPop clipText={pinText} popRef={refRBSheet_pin} /> */}
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
    sheet_head: {
        color: colors.text,
        fontSize: 24,
        textAlign: "center",
        marginVertical: 4,
        marginBottom: 12,
        fontFamily: "Poppins-SemiBold"
    },
    report: {
        flex: 2,
        // paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 3,
        margin: 5,
        borderColor: colors.red,


    },
    delete: {
        margin: 5,
        // paddingHorizontal: 30,
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