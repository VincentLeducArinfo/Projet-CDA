<template>
    <div class="flex flex-col bg-missioncontrol-blue w-1/2 min-h-screen text-white items-center">
        <h1 class="mt-5 text-2xl font-bold">Mission Control</h1>
        <router-link :to='{ name: "missions" }' class="flex flex-row mt-20 items-center">
            <SatelliteDish size="40" stroke-width="2.5" />
            <h2 class="ml-4 text-xl">Missions</h2>
        </router-link>
        <button class="mt-100 hover:cursor-pointer" @click="logout">Se déconnecter</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SatelliteDish } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();

</script>
