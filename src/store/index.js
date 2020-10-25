import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import storeCheckRoom from './checkroom'
import storeForum from './forum'

export default new Vuex.Store({
    modules: {
        storeCheckRoom,
        storeForum
    }
})