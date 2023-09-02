<template>
  <div class="leagues" v-if="leagues">
    <h1 class="title">Leagues</h1>
    <div class="leagues__select-seasons">
      <label class="leagues__season-label">Season</label>
      <select class="select" @change="changeLeagueSeason" v-model="leagueSeason">
        <option v-for="(item, index) in leagueSeasons"  :value="item" :key="'leagueSeason-' + index">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="item-wrapper">
      <router-link v-for="league in filteredLeagues" :to="{ name: 'league', params: {id: league.league_id} }"
                   class="item">
        {{ league.league_name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

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
  setValuesFromData(response)
}

if (!Object.keys(leagues.value).length) {
  getLeagues()
} else {
  setValuesFromData(leagues.value)
}

function setValuesFromData(data) {
  leagueSeasons.value = Array.from(new Set(data.map((item) => item.league_season))).sort();
  leagueSeason.value = '2023'
  filteredLeagues.value = filterBylLeagueSeason(data);
}

function changeLeagueSeason(event) {
  leagueSeason.value = event.target.value
  filteredLeagues.value = filterBylLeagueSeason(leagues.value);
}

</script>

<style scoped lang="scss">
.leagues {
  text-align: center;

  &__select-seasons {
    margin-bottom: 20px;
  }

  &__season-label {
    margin-right: 5px;
  }
}


</style>
