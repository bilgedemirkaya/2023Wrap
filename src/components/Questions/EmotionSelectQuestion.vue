<template>
  <div>
    <p>{{ question.preText }} {{ question.text }}</p>
    <v-chip-group
      v-model="selectedEmotions"
      multiple
      column
      class="chip-container"
    >
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
<script>
const EMOTION_COLORMAP = {
  Happy: "green",
  Proud: "green",
  Peaceful: "green",
  Hopeful: "blue",
  Brave: "blue",
  "In Love": "red",
  Challenged: "red",
  Anxious: "red",
  Inspired: "indigo",
  Overwhelmed: "red",
  Alone: "orange",
  Tired: "orange",
  Active: "green",
  Confident: "blue",
  Relieved: "green",
  Nostalgic: "indigo",
  Disappointed: "orange",
  Bored: "orange",
  Overthinking: "red",
  Confused: "indigo",
};
</script>

<script setup>
import { ref, watch } from "vue";

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
  return EMOTION_COLORMAP[emotion] || "yellow";
};

watch(selectedEmotions, (newVal) => {
  emit("answer", newVal);
});
</script>

<style scoped>
.question-select-text {
  margin-bottom: 3rem;
}

.chip-container {
  margin: 3rem 0;
  display: flex;
  flex-wrap: wrap;
}
</style>
