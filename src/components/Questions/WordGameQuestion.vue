<template>
  <div>
    <p>{{ question.text }}</p>
    <div class="word-game">
      <img src="@/assets/wordgame.png" alt="Word Cloud" class="word-image" id="word-image">
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
import { ref, computed, watch, onMounted } from 'vue';

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

onMounted(() => {
  const wordImage = document.getElementById('word-image');
  wordImage.addEventListener('click', function() {
    this.classList.toggle('enlarged');
  });
});
</script>

<style scoped>
.word-game {
  text-align: center;
}
.input-text {
  margin-top: 1rem;
}

.word-image {
  width: 90vh;
  height: auto;
  transition: transform 0.3s ease; /* Smooth transition for the transformation */
  cursor: pointer; /* Change cursor to indicate the image is clickable */
}



@media (max-width: 600px) {
  .word-image {
    max-width: 40vh;
  }

  .enlarged {
  transform: scale(1.5); /* Enlarge the image to 150% of its original size */
}
}


</style>
