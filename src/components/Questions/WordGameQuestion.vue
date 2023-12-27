<template>
  <div>
    <p>{{ question.text }}</p>
    <div class="word-cloud">
      <img src="@/assets/wordcloud.png" alt="Word Cloud" >
    </div>
    <v-text-field
      v-model="selectedWords"
      label="Enter the first three words you see (separated by commas)"
      class="input-text"
      placeholder="Word 1, Word 2, Word 3"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['question']);
const emit = defineEmits(['answer']);

const selectedWords = ref('');

// Computed property to process the entered words
const processedWords = computed(() => {
  return selectedWords.value.split(',').map(word => word.trim()).filter(word => word);
});

watch(processedWords, (newVal) => {
  emit('answer', newVal);
});
</script>

<style scoped>
.word-cloud {
  text-align: center;
}
.word-cloud img {
  max-width: 67%;
  max-height: 40rem;
}
.input-text {
  margin-top: 1rem;
}
</style>
