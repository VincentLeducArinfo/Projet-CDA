<!-- src/views/LoginView.vue -->
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

// État local du formulaire
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

/**
 * Gère la soumission du formulaire
 *
 * En cas de succès, redirige vers la page souhaitée
 * (paramètre redirect de l'URL) ou vers l'accueil
 */
const handleSubmit = async () => {
  // Réinitialiser l'erreur
  error.value = '';
  isLoading.value = true;

  try {
    // Appeler la méthode login du composable
    await login(email.value, password.value);

    // Récupérer la destination de redirection
    const redirect = route.query.redirect || '/';

    // Rediriger vers la destination
    router.push(redirect);
  } catch (err) {
    // Afficher l'erreur à l'utilisateur
    console.error('Erreur de connexion:', err);
    error.value = err.response?.data?.message || 'Identifiants invalides';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-700 flex justify-center items-center">
    <div class="flex flex-col items-center justify-center bg-white w-fit p-12 rounded-3xl">
      <h1 class="text-2xl mb-5">Connectez vous</h1>

      <!-- Message d'erreur -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col items-center">
        <div class="flex flex-col items-center">
          <label for="email" class="">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            :disabled="isLoading"
            class="border-2 rounded-md px-2 py-1 ml-3"
          >
        </div>

        <div class="mt-5 flex flex-col items-center">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            :disabled="isLoading"
            class="border-2 rounded-md px-2 py-1 ml-3"
          >
        </div>

        <button type="submit" :disabled="isLoading" class="mt-5 p-3 bg-missioncontrol-blue rounded-xl text-white font-bold hover:cursor-pointer">
          {{ isLoading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>