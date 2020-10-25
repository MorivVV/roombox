import axios from './axios/checkroom';
export default {
    state: {
        boxes: [],
        locs: [],
        curLoc: 1
    },
    mutations: {
        setLoc(state, data) {
            state.curLoc = data
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
                .post('/ajax/getData.php', "loc=" + state.curLoc)
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