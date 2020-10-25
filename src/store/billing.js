const axios = require('axios')
axios.create({
    baseURL: 'http://morivvv.com:8080'
        // baseURL: 'http://checkroom.22web.org'
})
export default {
    state: {
        bill: []
    },
    mutations: {
        setBill(state, data) {
            state.bill = data
        }
    },
    actions: {
        fetchData({ state }) {
            axios
                .post('/ajax/getLoc.php')
                .then(response => {
                    state.locs = response.data
                });
            axios
                .get('/getForum/45-0-15-0-0$')
                .then(response => {
                    state.boxes = response.data
                });
        }
    },
    getters: {
        locationList(state) {
            return state.locs
        },
        boxList(state) {
            return state.boxes
        }
    }
}