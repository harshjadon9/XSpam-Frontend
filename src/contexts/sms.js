import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = React.createContext();


// Function - Unix to Human
const sms_time = (time_unix) => {
    var timestemp = new Date(time_unix);
    var today = new Date()
    if (timestemp.getDate() == today.getDate() && timestemp.getFullYear() == today.getFullYear()) {
        if (timestemp.getHours() >= 12) {
            return (timestemp.getHours() - 12 + ":" + timestemp.getMinutes() + " PM")
        } else {
            return (timestemp.getHours() + ":" + timestemp.getMinutes() + " AM")
        }
    } else {
        if (timestemp.getMonth() <= 10) {
            var month = "0" + (timestemp.getMonth() + 1)
        } else {
            var month = (timestemp.getMonth() + 1)
        }
        return (timestemp.getDate() + "/" + month + "/" + (timestemp.getFullYear() - 2000))
    }
}

const share_data = async () => {
    try {
        const value = await AsyncStorage.getItem('share')
        if (value !== null) {
            return value;
        } else {
            Alert.alert("User Experience Program",
                "You consent to participate in our User Experience Program will allow us to make our service better for you.", [
                {
                    text: "Disagree",
                    onPress: async () => {
                        await AsyncStorage.setItem('share', "false")
                        return "false"
                    },
                },
                {
                    text: "Agree",
                    onPress: async () => {
                        await AsyncStorage.setItem('share', "true")
                        return "true"
                    },
                }
            ],
                { cancelable: false, })
        }
    } catch (e) {
        return "false"
    }
}

const Provider = ({ children }) => {

    const [share, setShare] = useState(null)
    const [loadings, setLoadings] = useState([])
    const [sms_arr, setArr] = useState()
    const filter = {
        box: 'inbox',
        maxCount: 10,
    }
    const loading_check = (arr) => {
        // AsyncStorage.clear()
        const fetch = async (item) => {
            var id = item._id
            var score = await AsyncStorage.getItem(`${id}`) // skip request if score already exist
            if (score == null) {
                id, score = await axios.post(
                    'https://xxspam.herokuapp.com/api',
                    { "message": item.body, "store": share },
                    {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
                ).then(res => {
                    score = res.data.score[0][0]
                }).then(async () => {
                    await AsyncStorage.setItem(`${id}`, `${score}`)
                    return score
                })
            }
            else { }
            return { id, score }
        }
        // console.log(arr);
        const arrr = arr
        arrr.forEach(async (item) => {
            const { id, score } = await fetch(item).then(({ id, score }) => {
                setLoadings(loadings => [...loadings, { id, score }])
                return { id, score }
            })
        });
    }

    const sms_fetcher = useCallback(() => {
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => { },
            async (count, smsList) => {
                var arr = JSON.parse(smsList);
                arr.forEach(function (object) {
                    object["category"] = "all"
                });
                setArr(arr)
                loading_check(arr)
            },
        );
        return true
    })

    // Send API request on mount
    useEffect(() => {

        // Check For user consent
        share_data().then(value => {
            setShare(value)
        })
        sms_fetcher()

    }, [])



    return <Context.Provider value={{ sms_arr, sms_time, sms_fetcher, results: loadings }} >
        {children}
    </Context.Provider>
}




export { Context, Provider }


