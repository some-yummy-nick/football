export const leagues = {
    state: () => ({leagues: []}),
    mutations: {
        setLeagues(state, payload) {
            state.leagues = payload
        }
    },
    actions: {
        setLeagues({commit}, payload) {
            commit("setLeagues", payload)
        }
    },
    getters: {
        leagues: state => {
            return state.leagues;
        }
    }
}