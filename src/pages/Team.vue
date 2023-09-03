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
              <Players :players="team.players"/>
            </div>
            <div class="team__block" v-if="matches">
              <h2 class="team__title">Team matches:</h2>
              <Matches :matches="matches"/>
            </div>
            <div class="team__block" v-else>
              <h2 class="team__title">No matches</h2>
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

import Matches from "@/components/Matches.vue"
import Players from "@/components/Players.vue"

import {request} from "@/api/index.js";
import {adapterPlayers} from "@/utils/adapters";
import {getSeasons} from "@/utils";

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
  const seasons = getSeasons()
  try {
    const response = await request(`/?action=get_events&from=${seasons.firstDate}&to=${seasons.secondDate}&team_id=${id.value}`)
    if (response.error) {
      throw new Error(response.message)
    }
    matches.value = await (response)
  } catch (e) {
    console.error(e.message);
  }
}

onMounted(() => {
  getTeam()
  getMatches()
})
</script>

<style scoped lang="scss">
@import "@/styles/utils/variables";

.team {
  &__photo {
    width: 30px;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__title {
    margin-top: 0;
    text-align: center;
  }

  @media screen and (max-width: $mobile-width) {
    &__wrapper {
      grid-template-columns: 1fr;
    }
  }
}
</style>