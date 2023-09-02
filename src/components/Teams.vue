<template>
  <div v-if="teams">
    <button class="link reset-btn back" @click="$router.go(-1)">Back</button>
    <div class="teams" >
      <h1 class="title">Teams</h1>
      <div class="item-wrapper">
        <router-link v-for="team in teams" :to="{ name: 'team', params: {id: team.team_key} }"
                     class="item">
          {{ team.team_name }}
        </router-link>
      </div>
    </div>
  </div>
  <Overlay v-else/>
</template>

<script setup>
import {computed, ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'

import {request} from "@/api/index.js";

const route = useRoute()

const teams = ref(null)
const league_id = computed(() => route.params.league_id)

async function getTeams() {
  teams.value = await request(`/?action=get_teams&league_id=${league_id.value}`);
}

onMounted(() => {
  getTeams()
})

</script>

<style scoped lang="scss">

</style>