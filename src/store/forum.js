import axios from './axios/morivvvforum';
export default {
    state: {
        posts: [],
        forums: [],
        forum: 0,
        page: 1,
        onPage: 15
    },
    mutations: {
        setForum(state, data) {
            state.forum = data
        }
    },
    actions: {
        forumData({ state }) {
            axios
                .get('/getForum/' + state.forum + '-0-15-0-0$')
                .then(response => {
                    state.posts = response.data
                    console.log(response.data)
                });
            axios
                .get('/getForumList/' + state.forum + '-0$')
                .then(response => {
                    state.forums = response.data
                    console.log(response.data)
                });
        }
    },
    getters: {
        postList(state) {
            return state.posts
        },
        forumList(state) {
            return state.forums
        },
    }
}