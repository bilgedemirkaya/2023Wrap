<template>
  <div>
    <p>{{ question.text }}</p>
    <div class="container">
      <v-text-field
        v-model="resolutionOne"
        label="Resolution 1"
        outlined
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="resolutionTwo"
        label="Resolution 2"
        outlined
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="resolutionThree"
        label="Resolution 3"
        outlined
      ></v-text-field>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["question"]);
const emit = defineEmits(["answer"]);

const resolutionOne = ref("");
const resolutionTwo = ref("");
const resolutionThree = ref("");

watch(
  [resolutionOne, resolutionTwo, resolutionThree],
  ([newResolutionOne, newResolutionTwo, newResolutionThree]) => {
    emit("answer", [newResolutionOne, newResolutionTwo, newResolutionThree].filter(Boolean));
  }
);
</script>

<style scoped>
.container {
  margin: 3rem 0;
}
</style>
