import React, { useContext } from 'react'
import { View,Text } from 'react-native'
import SmsList from '../components/SmsList'
import { Context } from '../contexts/sms'

const Scam =()=> {
    const {sms_arr} = useContext(Context)
    return (
        <View>
            {/* <Text style={{color:colors.text}}></Text> */}
            <SmsList sms_list={sms_arr} type={"scam"} />
        </View>
    )
}

export  default Scam