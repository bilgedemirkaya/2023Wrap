<template>
    <div>
    <div>{{ question.text }}</div>

      <v-textarea
        v-model="reflectionResponse"
        label="It is to give you more accurate prediction. Feel free to skip."
        rows="5"
        outlined
        class="question-lesson"
      ></v-textarea>
    </div>
  </template>

  <script setup>
  import { ref, watch } from 'vue';

  const props = defineProps(['question']);
  const emit = defineEmits(['answer']);

  const reflectionResponse = ref('');

  watch(reflectionResponse, (newVal) => {
  emit('answer', newVal);
});
  </script>

<style scoped>
.question-lesson {
  margin: 3rem 0;
}
</style>