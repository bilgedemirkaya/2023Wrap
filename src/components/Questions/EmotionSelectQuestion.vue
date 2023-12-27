<template>
  <div>
    <p>{{ question.preText }} {{ question.text }}</p>
    <v-chip-group v-model="selectedEmotions" multiple column class="chips">
      <v-chip
        v-for="emotion in emotionOptions"
        :key="emotion"
        class="ma-4"
        :value="emotion"
        :color="getChipColor(emotion)"
        text-color="white"
      >
        {{ emotion }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps(["question"]);
const emit = defineEmits(["answer"]);

const selectedEmotions = ref([]);
const emotionOptions = [
  "Happy",
  "Proud",
  "Peaceful",
  "Hopeful",
  "Brave",
  "In Love",
  "Challenged",
  "Anxious",
  "Inspired",
  "Overwhelmed",
  "Alone",
  "Tired",
  "Active",
  "Confident",
  "Relieved",
  "Nostalgic",
  "Disappointed",
  "Bored",
  "Overthinking",
  "Confused"
];

const getChipColor = (emotion) => {
  switch (emotion) {
    case "Happy":
    case "Proud":
    case "Peaceful":
      return "green";
    case "Hopeful":
    case "Brave":
    case "Active":
      return "blue";
    case "Overwhelmed":
    case "Anxious":
    case "In Love":
    case "Challenged":
    case "Overthinking":
      return "red";
    case "Tired":
    case "Alone":
    case "Disappointed":
    case "Bored":
      return "orange";
    case "Nostalgic":
    case "Reflective":
    case "Inspired":
      return "indigo";
    default:
      return "yellow";
  }
};

watch(selectedEmotions, (newVal) => {
  emit("answer", newVal);
});
</script>

<style scoped>
.question-select-text{
  margin-bottom: 3rem;
}

.chips {
    margin: 3rem 0;
}


</style>
