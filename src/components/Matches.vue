<template>
  <div class="matches">
    <router-link v-for="match in matches" :key="match.match_id"
                 :to="{ name: 'match', params: {id: match.match_id} }"
                 class="matches__item">
      <span>{{ match.match_hometeam_name }} - {{ match.match_awayteam_name }} </span>
      <span v-if=" match.match_hometeam_score && match.match_awayteam_score">
        ({{ match.match_hometeam_score }} - {{ match.match_awayteam_score }})
      </span>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  matches: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped lang="scss">
.matches {
  &__item {
    display: block;
    padding: 5px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

</style>