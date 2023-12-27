<template>
    <div class="question">
      <p>{{ question.text }}</p>
      <div class="container">
        <v-checkbox
          v-for="(option, index) in question.options"
          :key="index"
          v-model="selectedOptions"
          :label="option"
          :value="option"
          hide-details
        ></v-checkbox>
        <v-text-field
          v-if="selectedOptions.includes('Other')"
          v-model="otherOption"
          label="Other (please specify)"
          class="input-text"
        />
      </div>
    </div>
  </template>

  <script setup>
  import { ref, watch } from "vue";

  const props = defineProps(["question"]);
  const emit = defineEmits(["answer"]);

  const selectedOptions = ref([]);
  const otherOption = ref("");


  watch([selectedOptions, otherOption], () => {
    let answer = selectedOptions.value.slice();
    if (otherOption.value) {
      answer.push(otherOption.value);
    }
    emit("answer", answer);
  });
  </script>

  <style scoped>
  .input-text {
    margin-top: 1rem;
  }
  .v-selection-control__wrapper {
    border: 1px solid white;
  }
  .container {
    margin: 3rem 0;
  }
  </style>
