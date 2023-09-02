<template>
  <div v-if="league && Object.keys(league).length">
    <router-link :to="{ name: 'home' }" class="back">
      Back
    </router-link>
    <div class="league">
      <div class="inner-wrapper">
        <img class="inner-wrapper__image" v-if="league.league_logo" :src="league.league_logo" :alt="league.league_name">
        <div class="row">
          <span class="row__prop">Name:</span>
          <span class="row__value">{{ league.league_name }}</span>
        </div>
        <div class="row">
          <span class="row__prop">Season:</span>
          <span class="row__value">{{ league.league_season }}</span>
        </div>
        <div class="row">
          <span class="row__prop">Country:</span>
          <span class="row__value">{{ league.country_name }}
        <img class="league__county-flag" :src="league.country_logo" alt="">
      </span>
        </div>
      </div>
      <router-link :to="{ name: 'teams', params:{league_id:league.league_id} }" class="item league__item">
        Teams
      </router-link>
    </div>
  </div>
  <Overlay v-else/>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

import {request} from "@/api/index.js";

const store = useStore()
const route = useRoute()

const leagues = ref(store.getters.leagues)
const league = ref(null)

const id = computed(() => route.params.id)

async function getLeagues() {
  const response = await request('/?action=get_leagues');
  leagues.value = response
  store.commit('setLeagues', response)
  league.value = response.find(item => item.league_id === id.value)
}

if (!Object.keys(leagues.value).length) {
  getLeagues()
} else {
  league.value = leagues.value.find(item => item.league_id === id.value)
}
</script>

<style scoped lang="scss">
.league {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__county-flag {
    width: 20px;
  }

  &__item{
    align-self: initial;
  }
}
</style>