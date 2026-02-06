<template>
    <div v-if="!loading">
            <div class="bg-white flex flex-col justify-center items-center text-center p-12 h-screen">
                <h1 class="text-3xl mb-6">{{ h1 }}</h1>
                <form @submit.prevent="validate">
                    <div class="flex flex-col mb-6">
                        <label for="">Nom de la mission</label>
                        <input id="" type="text" v-model="name"
                            class="border-3 border-gray-700 rounded-md p-2 text-center">
                    </div>
                    <div class="flex flex-col mb-6">
                        <label for="">Description</label>
                        <textarea id="" v-model="description"
                            class="border-3 border-gray-700 rounded-md p-2 text-center"></textarea>
                    </div>
                    <div class="flex flex-col mb-12">
                        <label for="">Date de lancement</label>
                        <input id="" type="date" v-model="launchDate"
                            class="border-3 border-gray-700 rounded-md p-2 text-center">
                    </div>

                    <input type="submit" :value="submit" class="bg-missioncontrol-blue p-3 rounded-md text-white font-bold hover:cursor-pointer">

                    <p v-for="violation in error?.violations" class="text-red-600">{{ violation.message }}</p>
                </form>
            </div>
    </div>
    <div v-else
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
            class="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">Loading...
        </span>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMissions } from '@/composables/useMissions';

const name = ref("");
const description = ref("");
const launchDate = ref();

const h1 = ref("");
const submit = ref("");

const h1Ajout = "Création d'une mission";
const h1Modif = "Modification d'une mission";

const id = useRoute().params.id;

const mode = ref("");

const {
    mission,
    error,
    loading,
    fetchMission,
    updateMission,
    createMission
} = useMissions();

let data = {
    name: "",
    launchDate: 0,
    description: "",
}

onMounted(async () => {

    if (id) {
        mode.value = "edit";

        h1.value = h1Modif;
        submit.value = "Modifier la mission";

        await fetchMission(id);

        name.value = mission.value.name;
        description.value = mission.value.description;
        launchDate.value = mission.value.launchDate.slice(0, 10);
    } else {
        mode.value = "add";

        h1.value = h1Ajout;
        submit.value = "Créer la mission";
    }
})

function validate() {
    data = {
        name: name.value,
        description: description.value,
        launchDate: launchDate.value,
    }
    switch (mode.value) {
        case "edit":
            updateMission(id, data);
            break;

        case "add":
            createMission(data);
            break;
    }
}

</script>
