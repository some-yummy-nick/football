<template>
  <div class="error">{{ text }}</div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
  },
})
</script>

<style scoped lang="scss">
.error {
  border: 1px solid red;
  padding: 10px;
  color: red;
  text-align: center;
  border-radius: 5px;
}
</style>