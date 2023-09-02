<template>
  <div v-if="team && Object.keys(team).length">
    <button class="link reset-btn back" @click="$router.go(-1)">Back</button>
    <div class="team">
      <div class="inner-wrapper">
        <img class="inner-wrapper__image" v-if="team.team_badge" :src="team.team_badge" :alt="team.team_name">
        <h1 class="title">{{ team.team_name }}</h1>
        <div class="row">
          <span class="row__prop">{{ team.coaches.length > 1 ? 'Team coaches' : 'Team coach' }}:</span>
          <span class="row__value">{{ team.coaches.map(item => item.coach_name).join(",") }}</span>
        </div>
        <h2 class="team__title">Team players:</h2>
        <table class="team__players table">
          <thead>
          <tr>
            <td class="table__head">Name</td>
            <td class="table__head">Age</td>
            <td class="table__head">Player type</td>
            <td class="table__head">Goals</td>
            <td class="table__head">Goals Conceded</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="player in team.players" :key="player.player_id">
            <td class="table__col">{{ player.player_name }}</td>
            <td class="table__col">{{ player.player_age }}</td>
            <td class="table__col">{{ player.player_type }}</td>
            <td class="table__col">{{ player.player_goals }}</td>
            <td class="table__col">{{ player.player_goals_conceded }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Overlay v-else/>
</template>

<script setup>
import {computed, ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'

import {request} from "@/api/index.js";
import {adapterPlayers} from "@/utils/adapters";

const route = useRoute()

const team = ref(null)
const id = computed(() => route.params.id)

async function getTeam() {
  const response = await (await request(`/?action=get_teams&team_id=${id.value}`))[0]
  const players = response.players.map(item => adapterPlayers(item));
  team.value = {...response, players};
}

onMounted(() => {
  getTeam()
})
</script>

<style scoped lang="scss">
.team {
  &__photo {
    width: 30px;
  }
}
</style>