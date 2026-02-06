<template>
    <div>
        <div v-if="loading"
            class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">Loading...
            </span>
        </div>
        <p v-else-if="error">{{ error }}</p>

        <div class="flex flex-row flex-wrap justify-center">
            <router-link :to='{ name: "new-mission" }'
                class="flex flex-row items-center bg-missioncontrol-blue text-white text-xl mx-4 my-5 px-5 py-10 rounded-xl hover:bg-green-600">
                <Plus size="100" stroke-width="3" />
                <h2 class="font-bold">Créer une nouvelle mission</h2>
            </router-link>

            <div v-for="mission in missions" :key="mission.id"
                class="px-5 py-10 bg-missioncontrol-blue text-white rounded-xl mx-5 my-10 w-1/5 divide-x-2 flex flex-row items-center">
                <h3 class="pr-3">{{ mission.name }}</h3>
                <h3 class="pl-3">En attente de décollage</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import { useMissions } from '@/composables/useMissions';
import { Plus } from 'lucide-vue-next';

const { missions, error, loading, status, fetchMissions } = useMissions();

onMounted(async () => {
    fetchMissions();
});
</script>
