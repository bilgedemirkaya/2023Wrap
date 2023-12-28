<template>
  <v-container>
    <div class="intro-text">
      <p class="text-body-2">
        <span class="text-h6 bold">What a year it has been!</span> Let's take a
        moment to celebrate how far we have come - yay!
      </p>
      <br />
      <p class="text-body-2">
        I want to ask you some questions. Let's see if I can make some exciting
        predictions about what 2024 has in store for you.
      </p>
    </div>
    <v-text-field
      label="Enter your name"
      hide-details
      v-model="username"
      class="input-text"
    />
    <v-text-field
      label="Enter your email to receive your results and updates on new products."
      v-model="userEmail"
      hide-details
      class="input-text"
    />
    <div class="privacy-section">
      <div class="privacy-section">
        <div class="privacy-checkbox">
          <input type="checkbox" v-model="hasAgreedToPrivacy" />
          <span
            class="agree-text"
            @click="hasAgreedToPrivacy = !hasAgreedToPrivacy"
            >I agree to the</span
          >
        </div>
        <router-link to="/privacy-policy" class="privacy-link"
          >Data Privacy Agreement</router-link
        >
      </div>
    </div>
    <v-btn
      :disabled="!username || !userEmail || !hasAgreedToPrivacy"
      @click="emit('startTest')"
      class="start-button"
      >Let's Start</v-btn
    >
    <p class="font-italic helper-text">
      The predictions are powered by generative AI, GPT-4 ensuring that each
      prediction is unique.
    </p>
  </v-container>
</template>

<script setup>
import { useQuestionnaireStore } from "@/store/questionnaire";
import { ref, computed } from "vue";

const emit = defineEmits(["startTest"]);

const store = useQuestionnaireStore();
const userEmail = computed({
  get: () => store.userEmail,
  set: (val) => store.updateUserEmail(val),
});

const username = computed({
  get: () => store.username,
  set: (val) => store.updateUsername(val),
});
const hasAgreedToPrivacy = ref(false);
</script>

<style scoped>
.intro-text p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.input-text {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.start-button {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.privacy-section {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.agree-text {
  margin-left: 5px;
  cursor: pointer;
}

.privacy-checkbox {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

@media (max-width: 480px) {
  .helper-text {
    margin-bottom: 4rem;
  }
}
</style>
