export const season = {
    state: () => ({season: String(new Date().getFullYear())}),
    mutations: {
        setSeason(state, payload) {
            state.season = payload
        }
    },
    actions: {
        setSeason({commit}, payload) {
            commit("setSeason", payload)
        }
    },
    getters: {
        season: state => {
            return state.season;
        }
    }
}