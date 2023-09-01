<template>
  <div>
    <router-link :to="{ name: 'home' }">
      На главную
    </router-link>
    <div>
      <div class="leagues" v-if="leagues">
        <select class="leagues__select-seasons" name="leagueSeasons" id="leagueSeasons" @change="changeLeagueSeason">
          <option v-for="(leagueSeason, index) in leagueSeasons" :value="leagueSeason" :key="'leagueSeason-' + index">
            {{ leagueSeason }}
          </option>
        </select>
        <div class="leagues__wrapper">
          <router-link v-for="area in filteredLeagues" :to="{ name: 'league', params: {id: area.league_id} }"
                       class="item">
            {{ area.league_name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

import {request} from "@/api/index.js";
import {store} from "@/store";

const leagues = ref(store.getters.leagues)
const filteredLeagues = ref(null)
const leagueSeasons = ref(null)
const leagueSeason = ref(null)

function filterBylLeagueSeason(items) {
  return items.filter((item) => item.league_season === leagueSeason.value);
}

async function getLeagues() {
  const response = await request('/?action=get_leagues');
  leagues.value = response;
  store.commit('setLeagues', response)
  leagueSeasons.value = Array.from(new Set(response.map((item) => item.league_season)));
  leagueSeason.value = leagueSeasons.value[0]
  filteredLeagues.value = filterBylLeagueSeason(response);
}

if (!Object.keys(leagues.value).length) {
  getLeagues()
} else {
  leagueSeasons.value = Array.from(new Set(leagues.value.map((item) => item.league_season)));
  leagueSeason.value = leagueSeasons.value[0]
  filteredLeagues.value = filterBylLeagueSeason(leagues.value);
}

function changeLeagueSeason(event) {
  leagueSeason.value = event.target.value
  filteredLeagues.value = filterBylLeagueSeason(leagues.value);
}

onMounted(() => {
  getLeagues();
});
</script>


<style scoped lang="scss">
.leagues {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    grid-gap: 20px;
  }

  &__select-seasons {
    margin-bottom: 20px;
  }
}


</style>
