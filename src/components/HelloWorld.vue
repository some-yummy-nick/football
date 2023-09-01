<script setup>
import {ref, onMounted} from 'vue'
import {request} from "@/api/index.js";

const areas = ref(null)

async function getAreas() {
  const response = await request('/areas');
  areas.value = response.areas;
}

onMounted(() => {
  getAreas();
});
</script>

<template>
  <div>
    <div v-for="area in areas">{{ area.name }}</div>
  </div>
</template>
