<template>
  <div class="flex flex-row">
    <Navbar/>
    <MissionList/>
  </div>
</template>

<script setup>
import MissionList from '@/components/MissionList.vue';
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';

const feature = ref();
</script>
