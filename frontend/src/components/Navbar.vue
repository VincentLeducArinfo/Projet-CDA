<template>
    <div class="flex flex-col bg-missioncontrol-blue w-1/2 min-h-screen text-white items-center">
        <h1 class="mt-5 text-2xl font-bold">Mission Control</h1>
        <router-link :to='{ name: "missions" }' class="flex flex-row mt-20 items-center hover:font-bold">
            <SatelliteDish size="40" stroke-width="2.5" />
            <h2 class="ml-4 text-xl">Missions</h2>
        </router-link>
        <div class="flex flex-row items-center mt-auto hover:cursor-pointer hover:text-red-600 hover:font-bold mb-5"  @click="logout">
            <LogOut size="30" stroke-width="2.5" />
            <h2 class="ml-4 text-l">Se déconnecter</h2>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SatelliteDish } from 'lucide-vue-next';
import { LogOut } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';

// Solution temporaire
function logout() {
    console.log("destruction des cookies");
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

</script>
