<template>
  <div>
    <div>{{ question.text }}</div>
    <v-slider
      v-model="response"
      :max="10"
      :min="1"
      :color="sliderColor"
      thumb-label="always"
      class="question-rating"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['question']);
const emit = defineEmits(['answer']);

const response = ref(5);

const sliderColor = computed(() => {
  if (response.value <= 3) {
    return 'red';
  } else if (response.value <= 5) {
    return 'orange';
  } else if (response.value <= 8) {
    return 'yellow';
  } else {
    return 'green';
  }
});

watch(response, (newVal) => {
  emit('answer', newVal);
});
</script>

<style scoped>
.question-rating {
  margin: 3rem 0;
}
</style>
