import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid from 'react-native-get-sms-android';


const Context = React.createContext();

const requestSmsPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
                title: "App require SMS Permission",
                message:
                    "SMS access required to function the App",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the SMS API");
        } else {
            console.log("SMS permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};







// 

//     removePeople(item._id)
//     console.info(item._id, "done")
//     console.trace(loadings)
// }
// const removePeople = (e) => {
//     var array = [...loadings]; // make a separate copy of the array
//     var index = array.indexOf(e)
//     if (index !== -1) {
//         array.splice(index, 1);
//         setLoadings(array);
//     }
// }
// const car = async () => { await arr.forEach(async item => await fetch(item, loadings)) }
// console.info(arr)
// car()


const Provider = ({ children }) => {

    const [loadings, setLoadings] = useState([])
    const [sms_arr, setArr] = useState()
    const filter = {
        box: 'inbox',
        maxCount: 10,
    }
    const loading_check = (arr) => {
        const fetch = async (item) => {
            // console.log("loadings")
            // setLoadings([...loadings, item._id])
            const { id, score } = await axios.post(
                'https://xxspam.herokuapp.com/api',
                { "message": item.body },
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            ).then(res => {
                var id = item._id
                var score = res.data.score[0]
                console.log(id, " - ", score);
                return { id, score }
                // return loadings
                // return item["score"] = res.data.score[0]
            })
            return { id, score }
        }
        // console.log(arr);
        const arrr = arr
        arrr.forEach(async (item) => {
            const { id, score } = await fetch(item).then(({ id, score }) => {
                setLoadings(loadings => [...loadings, { id, score }])
                return { id, score }
            })
            console.log("ji", id, score, loadings);
        });
    }
    const sms_deleter = (_id) => {
        console.log(_id)
        SmsAndroid.delete(
            _id,
            (fail) => {
                console.log('Failed with this error: ' + fail);
                ToastAndroid.show("Delete failed !", ToastAndroid.SHORT)
            },
            (success) => {
                console.log('SMS deleted successfully');
                ToastAndroid.show("Deleted successfully !", ToastAndroid.SHORT)
            },
        );
    }
    const sms_fetcher = useCallback(() => {


        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                //   console.log('Failed with this error: ' + fail);
            },
            async (count, smsList) => {
                //   console.log('Count: ', count);
                //   console.log('List: ', smsList);
                var arr = JSON.parse(smsList);

                console.log(loadings, " <-- ")
                arr.forEach(function (object) {
                    object["type"] = "all"
                });
                setArr(arr)
                // const [loadings, setLoadings] = useState([])
                loading_check(arr)
            },
        );
        return true
    })
    useEffect(() => {
        requestSmsPermission()
        const subscribe = SmsListener.addListener(message => {
            sms_fetcher()

            console.log("new -->  ", message.body)

        })
        return () => subscribe.remove()
    }, [])
    useEffect(() => {


        sms_fetcher()
        return () => { }
    }, [])
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

    // console.log(sms_arr)
    console.info(sms_time(1371393538000))
    return <Context.Provider value={{ sms_arr, sms_time, sms_fetcher, sms_deleter, results: loadings }} >
        {children}
    </Context.Provider>
}




export { Context, Provider }


