import React, { useContext } from 'react'
import { View } from 'react-native'
import SmsList from '../components/SmsList'
import { Context } from '../contexts/sms'

const Home = () => {
    const { sms_arr } = useContext(Context)
    return (
        <View>
            <SmsList sms_arr={sms_arr} list_category={"all"} />
        </View>
    )
}
export default Home