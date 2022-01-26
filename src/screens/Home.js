import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../base'
import SmsList from '../components/SmsList'
import { Context } from '../contexts/sms'

const Home = () => {
    const {sms_arr} = useContext(Context)
    return (
        <View>
            {/* <Text style={{color:colors.text}}></Text> */}
            <SmsList sms_list={sms_arr} type={"all"}/>
        </View>
    )
}

const styles = StyleSheet.create({
})
export default Home