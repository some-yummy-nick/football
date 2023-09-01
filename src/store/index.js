import { createStore } from 'vuex'
import {leagues} from "./leagues";

export const store = createStore({
    modules: {
        leagues,
    }
})