<template>
  <div class="default-layout">
    <header class="header" v-if="$route.name !== 'home'">
      <button class="link reset-btn back" @click="$router.go(-1)">Back</button>
      <router-link :to="{ name: 'home' }">
        Home
      </router-link>
    </header>
    <slot/>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

</style>