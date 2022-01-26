import React, { useContext } from 'react'
import { View,Text } from 'react-native'
import SmsList from '../components/SmsList'
import { Context } from '../contexts/sms'

const Safe =()=> {
    const {sms_arr} = useContext(Context)
    console.log(sms_arr," --😱")
    return (
        <View>
            {/* <Text style={{color:colors.text}}></Text> */}
            <SmsList sms_list={sms_arr} type={"safe"}/>
        </View>
    )
}

export  default Safe