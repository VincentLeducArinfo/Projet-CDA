import api from "@/api/axios";
import { ref } from "vue";

export function useMissions() {
    const missions = ref([]);

    const mission = ref({});

    const loading = ref(false);

    const error = ref(null);

    const status = ref(null);

    async function fetchMissions() {
        loading.value = true;

        try {
            const response = await api.get("/missions");
            missions.value = response.data.member;
            status.value = response.status;
        } catch (e) {
            error.value = e.response?.data;
        } finally {
            loading.value = false;
        }
    }

    async function fetchMission(id) {
        loading.value = true;

        try {
            const response = await api.get("/missions/" + id);
            mission.value = response.data;
            status.value = response.status;
        } catch (e) {
            error.value = e.response.data;
        } finally {
            loading.value = false;
        }
    }

    async function createMission(data) {
        try {
            const response = await api.post("/missions", data);
            status.value = response.status;
        } catch (e) {
            error.value = e.response.data;
            console.log(error.value)
        }
    }

    async function updateMission(id, data) {
        try {
            const response = await api.patch("/missions/" + id, data, {
                headers: {
                    "Content-Type": "application/merge-patch+json"
                }
            });
            status.value = response.status;
        } catch (e) {
            error.value = e.response.data;
        }
    }

    async function deleteMission(id) {
        try {
            const response = await api.delete("/missions/" + id);
            status.value = response.status;
        } catch (e) {
            error.value = e.response.data;
        }
    }

    return {
        missions,
        mission,
        loading,
        error,
        status,
        fetchMissions,
        fetchMission,
        createMission,
        updateMission,
        deleteMission
    }
}