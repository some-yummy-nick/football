import { createStore } from 'vuex'
import {leagues} from "./leagues";
import {season} from "./season";

export const store = createStore({
    modules: {
        leagues,
        season,
    }
})