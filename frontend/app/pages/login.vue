<template>
  <section class="page-intro">
    <div class="container">
      <Breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Login' }]" />
      <div class="row justify-content-between align-items-start gy-4">
        <div class="col-lg-6">
          <h1 class="display-3 mb-3">Accedi</h1>
          <p class="lead mb-4">Per accedere alla dashbaord inserisci le credenziali demo.</p>

          <div class="alert alert-info" role="alert">
            <h6 class="alert-heading fw-bold mb-1">Credenziali demo:</h6>
            <p class="mb-2 small">Email: <code>mario.rossi@gmail.com</code><br>Password: <code>MarioRossi2026</code></p>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="card shadow-sm border-0 p-4">
            <!-- Flash / Session error notice -->
            <div v-if="authError" class="alert alert-warning mb-3" role="alert">
              {{ authError }}
            </div>

            <!-- General error message from login failure -->
            <div v-if="generalError" class="alert alert-danger mb-3" role="alert">
              {{ generalError }}
            </div>

            <form @submit.prevent="handleSubmit" novalidate>
              <div class="form-group mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <Icon name="it-user" class="icon icon-sm" aria-hidden="true" />
                  </span>
                  <label for="email" :class="{ 'active': email.length > 0 }">Email</label>
                  <input id="email" v-model="email" type="email" class="form-control"
                    :class="{ 'is-invalid': fieldErrors.email?.length }" name="email" required autocomplete="email"
                    :disabled="isLoading" />
                </div>
                <div v-if="fieldErrors.email?.length" class="text-danger small mt-1">
                  {{ fieldErrors.email[0] }}
                </div>
              </div>

              <div class="form-group mb-4">
                <div class="input-group">
                  <span class="input-group-text">
                    <Icon name="it-key" class="icon icon-sm" aria-hidden="true" />
                  </span>
                  <label for="password" :class="{ 'active': password.length > 0 }">Password</label>
                  <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                    class="form-control input-password" :class="{ 'is-invalid': fieldErrors.password?.length }"
                    name="password" required autocomplete="current-password" :disabled="isLoading" />
                  <button type="button" class="password-icon btn" role="switch"
                    :aria-checked="showPassword ? 'true' : 'false'" aria-label="Mostra o nascondi password"
                    @click="showPassword = !showPassword">
                    <Icon :name="showPassword ? 'it-password-invisible' : 'it-password-visible'" class="icon-sm"
                      aria-hidden="true" />
                  </button>
                </div>
                <div v-if="fieldErrors.password?.length" class="text-danger small mt-1">
                  {{ fieldErrors.password[0] }}
                </div>
              </div>

              <div class="d-grid gap-2">
                <Button type="submit" block :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true" />
                  {{ isLoading ? 'Accesso in corso...' : 'Accedi' }}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ApiValidationError } from "~/types/auth";

definePageMeta({
  middleware: "guest",
});

useSeoMeta({
  title: "Login | Vivi Bugliano",
  description: "Accedi all'area riservata del comune di Bugliano.",
  ogTitle: "Login | Vivi Bugliano",
  ogDescription: "Accedi all'area riservata del comune di Bugliano.",
});

const route = useRoute();
const router = useRouter();
const { login, isLoading, authError } = useAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const fieldErrors = ref<Record<string, string[]>>({});
const generalError = ref<string | null>(null);


async function handleSubmit() {
  fieldErrors.value = {};
  generalError.value = null;

  if (!email.value.trim()) {
    fieldErrors.value.email = ["Inserisci un indirizzo email valido."];
    return;
  }

  if (!password.value) {
    fieldErrors.value.password = ["Inserisci la tua password."];
    return;
  }

  try {
    await login({
      email: email.value.trim(),
      password: password.value,
    });

    // Determine redirect destination
    const redirectUrl = (route.query.redirect as string) || "/admin";
    router.push(redirectUrl);
  } catch (err: any) {
    if (err?.status === 422 || err?.statusCode === 422) {
      // Laravel validation error
      const responseData = err?.data as ApiValidationError | undefined;
      if (responseData?.errors) {
        fieldErrors.value = responseData.errors;
      }
      generalError.value = responseData?.message || "Credenziali non valide. Riprova.";
    } else if (err?.status === 401 || err?.statusCode === 401) {
      generalError.value = "Accesso non autorizzato. Verifica le tue credenziali.";
    } else {
      generalError.value = "Si è verificato un errore durante l'accesso. Riprova più tardi.";
    }
  }
}
</script>

<style scoped>
.form-group {
  position: relative;
}

.password-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
}

.password-icon:focus {
  outline: none;
  box-shadow: none;
}
</style>