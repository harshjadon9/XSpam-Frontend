import React, { useContext } from 'react'
import { View } from 'react-native'
import SmsList from '../components/SmsList'
import { Context } from '../contexts/sms'

const Scam = () => {
    const { sms_arr } = useContext(Context)
    return (
        <View>
            <SmsList sms_arr={sms_arr} list_category={"scam"} />
        </View>
    )
}

export default Scam