import React from 'react'
import axios from 'axios'

const server = "https://xxspam.herokuapp.com"
export default axios.create({
    baseURL: server,
})