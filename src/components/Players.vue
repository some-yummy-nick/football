<template>
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
    <tr v-for="player in players" :key="player.player_id">
      <td class="table__col">{{ player.player_name }}</td>
      <td class="table__col">{{ player.player_age }}</td>
      <td class="table__col">{{ player.player_type }}</td>
      <td class="table__col">{{ player.player_goals }}</td>
      <td class="table__col">{{ player.player_goals_conceded }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  players: {
    type: Array,
    default: () => [],
  },
})
</script>