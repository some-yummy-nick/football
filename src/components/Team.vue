<template>
  <layout-default>
    <div v-if="team && Object.keys(team).length">
      <div class="team">
        <div class="inner-wrapper">
          <img class="inner-wrapper__image" v-if="team.team_badge" :src="team.team_badge" :alt="team.team_name">
          <h1 class="title">{{ team.team_name }}</h1>
          <div class="row">
            <span class="row__prop">{{ team.coaches.length > 1 ? 'Team coaches' : 'Team coach' }}:</span>
            <span class="row__value">{{ team.coaches.map(item => item.coach_name).join(",") }}</span>
          </div>
          <div class="team__wrapper">
            <div class="team__block">
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
            <div class="team__block">
              <h2 class="team__title">Team matches:</h2>
              <div class="team__matches">
                <router-link v-for="match in matches" :key="match.match_id"
                             :to="{ name: 'match', params: {id: match.match_id} }"
                             class="team__match">
                  {{ match.match_hometeam_name }} - {{ match.match_awayteam_name }} ({{ match.match_hometeam_score }} -
                  {{ match.match_awayteam_score }})
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Overlay v-else/>
  </layout-default>
</template>

<script setup>
import {computed, ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'

import {request} from "@/api/index.js";
import {adapterPlayers} from "@/utils/adapters";

const route = useRoute()

const team = ref(null)
const matches = ref(null)
const id = computed(() => route.params.id)

async function getTeam() {
  const response = await (await request(`/?action=get_teams&team_id=${id.value}`))[0]
  const players = response.players.map(item => adapterPlayers(item));
  team.value = {...response, players};
}

async function getMatches() {
  matches.value = await (await request(`/?action=get_events&from=2023-01-01&to=2023-12-31&team_id=${id.value}`))
}

onMounted(() => {
  getTeam()
  getMatches()
})
</script>

<style scoped lang="scss">
.team {
  &__photo {
    width: 30px;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__match {
    display: block;
  }
}
</style>