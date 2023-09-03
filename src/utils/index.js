import {ref} from "vue";
import {store} from "@/store";

export function getSeasons() {
    const season = ref(store.getters.season)
    const seasons = season.value.split("/");
    let firstDate = `${seasons[0]}-01-01`
    let secondDate = `${seasons[0]}-12-31`
    if (seasons.length > 1) {
        secondDate = `${seasons[1]}-12-31`
    }
    return {firstDate, secondDate}
}