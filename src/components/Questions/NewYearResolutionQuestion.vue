<template>
  <p>{{ question.text }}</p>
  <div class="question-container">
    <!-- First resolution dropdown -->
    <v-select v-model="selectedResolution1" :items="resolutionOptions" label="Select your New Year's resolution" />
    <v-text-field v-if="isOtherSelected1" v-model="customResolution1" label="What's your resolution?"
      placeholder="Type your custom resolution"></v-text-field>

    <!-- Second resolution dropdown -->
    <v-select v-model="selectedResolution2" :items="resolutionOptions" label="Select your second New Year's resolution"/>
    <v-text-field v-if="isOtherSelected2" v-model="customResolution2" label="What's your resolution?"
      placeholder="Type your custom resolution"></v-text-field>
  </div>
</template>

<script setup>
import { ref, watch} from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps(["question"]);
const emit = defineEmits(["answer"]);

const resolutionOptions = [
  "Learn a new skill/language",
  "Travel abroad",
  "Build something cool",
  "Save/invest money",
  "Make myself happy",
  "Make mom proud",
  "Survive",
  "I want to type something else",
];

const selectedResolution1 = ref('');
const customResolution1 = ref('');
const isOtherSelected1 = ref(false);

const selectedResolution2 = ref('');
const customResolution2 = ref('');
const isOtherSelected2 = ref(false);

watch(selectedResolution1, () => {
  if (selectedResolution1.value === "I want to type something else") {
    isOtherSelected1.value = true;
    customResolution1.value = ''; // Reset custom resolution input
  }
  handleResolutionChange();
})

watch(selectedResolution2, () => {
  if (selectedResolution2.value === "I want to type something else") {
    isOtherSelected2.value = true;
    customResolution2.value = ''; // Reset custom resolution input
  }
  handleResolutionChange();
})

const handleResolutionChange = () => {

  // Emit the selected or custom resolutions as an answer
  const resolutions = [
    isOtherSelected1.value ? customResolution1.value : selectedResolution1.value,
    isOtherSelected2.value ? customResolution2.value : selectedResolution2.value
  ].filter(Boolean); // Filter out empty strings

  emit("answer", resolutions);
};
</script>

<style scoped>
.question-container {
  margin: 3rem 0;
}
</style>
