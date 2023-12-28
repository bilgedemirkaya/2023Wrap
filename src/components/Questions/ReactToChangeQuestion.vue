<template>
  <div class="question">
    <p>{{ question.preText }} {{ question.text }}</p>
    <div class="container">
      <v-radio-group v-model="reactionToChange">
        <v-radio
          label="Embrace enthusiastically"
          value="embrace-enthusiastically"
        ></v-radio>
        <v-radio label="Adapt gradually" value="adapt-gradually"></v-radio>
        <v-radio label="Resist initially" value="resist-initially"></v-radio>
        <v-radio label="Feel overwhelmed" value="Feel-overwhelmed"></v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["question"]);
const emit = defineEmits(["answer"]);

const reactionToChange = ref("");

watch(reactionToChange, (newVal) => {
  emit("answer", newVal);
});
</script>

<style scoped>
.container {
  margin: 3rem 0;
}
</style>
