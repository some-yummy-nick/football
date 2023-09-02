<template>
  <main>
    <div class="home">
      <div class="home__wrapper">
        <router-link :to="{ name: 'leagues' }" class="item home__item">
          Leagues
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView"
}
</script>
<style scoped lang="scss">
.home {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  &__item {
    padding: 20px;
  }
}
</style>