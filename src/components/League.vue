<template>
  <router-link :to="{ name: 'leagues' }">
    Назад
  </router-link>
  <div v-if="league" class="league">
    <img class="league__image" v-if="league.league_logo" :src="league.league_logo" :alt="league.league_name">
    <div class="league__row">
      <span class="league__prop">Name:</span>
      <span class="league__value">{{ league.league_name }}</span>
    </div>
    <div class="league__row">
      <span class="league__prop">Season:</span>
      <span class="league__value">{{ league.league_season }}</span>
    </div>
    <div class="league__row">
      <span class="league__prop">Country:</span>
      <span class="league__value">{{ league.country_name }}
        <img class="league__county-flag" :src="league.country_logo" alt="">
      </span>
    </div>
  </div>
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

  &__image {
    width: 100px;
    margin-bottom: 20px;
  }

  &__prop {
    font-weight: 700;
    margin-right: 10px;
  }

  &__value {
    display: inline-flex;
    align-items: center;
    gap:5px;
  }

  &__county-flag {
    width: 20px;
  }
}
</style>