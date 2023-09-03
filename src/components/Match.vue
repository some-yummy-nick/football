<template>
  <layout-default>
    <div class="match" v-if="match && Object.keys(match).length">
      <div class="inner-wrapper">
        <div class="match__teams">
          <div class="match__team">
            <img class="match__image" width="100" :src="match.team_home_badge" :alt="match.match_awayteam_name">
            <span>{{ match.match_awayteam_name }}</span>
          </div>
          <div class="match__vs">vs</div>
          <div class="match__team">
            <img class="match__image" width="100" :src="match.team_away_badge" :alt="match.match_hometeam_name">
            <span>{{ match.match_hometeam_name }}</span>
          </div>
        </div>
        <div class="row">
          <span class="row__prop">League name:</span>
          <span class="row__value">{{ match.league_name }}</span>
        </div>
        <div class="row" v-if="match.match_stadium">
          <span class="row__prop">Match stadium:</span>
          <span class="row__value">{{ match.match_stadium }}</span>
        </div>
        <div class="row">
          <span class="row__prop">Match score:</span>
          <span class="row__value">{{ match.match_hometeam_score }} - {{ match.match_awayteam_score }}</span>
        </div>
      </div>
    </div>
    <Overlay v-else/>
  </layout-default>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";

import {request} from "@/api/index.js";

const route = useRoute()
const id = computed(() => route.params.id)

const match = ref(null)

async function getMatch() {
  match.value = await (await request(`/?action=get_events&from=2023-01-01&to=2023-12-31&match_id=${id.value}`))[0]
}

onMounted(() => {
  getMatch()
})
</script>

<style scoped lang="scss">
.match {
  &__teams {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 700;
  }

  &__vs {
    font-size: 20px;
    margin: 0 20px;
  }

  &__image {
    margin-bottom: 10px;
  }
}
</style>