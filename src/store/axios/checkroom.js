const axios = require('axios')
export default axios.create({
    baseURL: 'http://checkroom.wp:8080'
        // baseURL: 'http://checkroom.22web.org'
})