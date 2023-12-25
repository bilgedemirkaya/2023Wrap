<template>
  <v-container>
    <div class="intro-text">
      <p>
        <span class="text-h5 bold">What a year it has been!</span> Let's take a
        moment to celebrate ourselves for making it where we are - yay!
      </p>
      <p>
        Here are some questions. Let's see if I can make some
        some exciting predictions about what 2024 has in store for you.
      </p>
    </div>
    <v-text-field
      label="Enter your name"
      v-model="userName"
      class="input-text"
    />
    <v-btn :disabled="!userName" @click="emitStartTest" class="start-button"
      >Let's Start</v-btn
    >

    <p class="font-italic">
      The predictions are powered by advanced generative AI technology,
      specifically GPT-4, ensuring that each forecast is unique and tailored
      just for you.
    </p>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["startTest"]);

const userName = ref("");

const emitStartTest = () => {
  if (userName.value.trim()) {
    emit("startTest", userName.value.trim());
  } else {
    showError.value = true;
  }
};
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
</style>
