<template>
  <v-container class="introduction-container">
    <div class="intro-text">
      <p class="text-headline mb-4">
        What a year it has been! Let's take a moment to celebrate how far we have come—yay!
      </p>
      <p class="text-subtitle-1">
        Here are some questions about year. Let's see if I can make some exciting
        predictions about what 2024 based on this.
      </p>
    </div>
    <v-text-field
      label="Enter your name"
      hide-details
      v-model="username"
      class="input-text mt-6 mb-4"
    />
    <v-text-field
      label="Enter your email to receive your results and updates on new products."
      v-model="userEmail"
      hide-details
      class="input-text mb-4"
    />
    <v-row align="center" no-gutters>
      <v-col cols="auto" class="privacy-checkbox">
        <v-checkbox v-model="hasAgreedToPrivacy" />
      </v-col>
      <v-col class="agree-text">
        <span class="agree-text" @click="hasAgreedToPrivacy = !hasAgreedToPrivacy">I agree with</span>
        <router-link to="/privacy-policy" class="privacy-link">Data Privacy Agreement</router-link>
      </v-col>
    </v-row>
    <v-btn
      :disabled="!username || !userEmail || !hasAgreedToPrivacy"
      @click="startTest"
      class="start-button yellow darken-2"
      >Let's Start</v-btn
    >
    <p class="font-italic helper-text mt-4">
      The predictions are powered by generative AI, GPT-4, ensuring that each prediction is unique.
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

const startTest = () => {
  if (username.value && userEmail.value && hasAgreedToPrivacy.value) {
    emit("startTest", userEmail.value);
  }
};
</script>

<style scoped>
.introduction-container {
  text-align: center;
}

.intro-text .text-headline {
  font-size: 1.5rem;
  color: #ffffff;
}

.intro-text .text-subtitle-1 {
  font-size: 1.2rem;
  color: #ffffff;
}

.input-text {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.start-button {
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  padding: 0.5rem 2.5rem;
}

.privacy-section {
  margin-top: 1rem;
  justify-content: center;
}

.privacy-checkbox {
  flex-grow: 0;
  height: 56px;
}

.agree-text {
  text-align: left;
  margin-right: 0.5rem;
  color: #ffffff;
  cursor: pointer;
}

.privacy-link {
  color: #ffd700;
}

.helper-text {
  font-size: 0.9rem; /* Slightly smaller for a subtler effect */
  color: #ffffff; /* For better contrast */
}

@media (max-width: 480px) {
  .helper-text {
    margin-bottom: 1rem;
  }
}
</style>
