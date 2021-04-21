import axios from 'axios'

// 'http://203.161.24.225:3000'

const instance = axios.create({
    baseURL: 'http://192.168.0.103:3000'
})

export default instance
