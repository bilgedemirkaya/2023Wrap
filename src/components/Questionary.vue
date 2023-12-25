<template>
  <v-container>
    <p class="text-h5 bold"> Hi {{ username }}! </p>
    <v-progress-linear
      :model-value="progress"
      bg-color="blue-grey"
      color="lime"
    ></v-progress-linear>
    <br />

    <div v-if="currentQuestionIndex < questions.length">
      <div v-if="currentQuestionIndex === 0">
        <div>{{ questions[0].text }}</div>
        <v-text-field v-model="questions[0].response" />
      </div>
      <div v-else>
        <div>{{ questions[currentQuestionIndex].text }}</div>
        <v-slider
          v-if="questions[currentQuestionIndex].type === 'rating'"
          v-model="questions[currentQuestionIndex].response"
          :max="10"
          :min="1"
          thumb-label="always"
        />
        <!-- Add other types of questions here as needed -->
      </div>
      <div class="d-flex flex-wrap">
      <v-btn v-if="currentQuestionIndex === 0" class="ma-2 pa-2" color="" @click="emit('exit')">Exit</v-btn>
      <v-btn v-else @click="previousQuestion" class="ma-2 pa-2" color="">Previous</v-btn>
      <v-btn @click="nextQuestion" class="ma-2 pa-2">Next</v-btn>
      </div>
    </div>
    <div v-else>
      <!-- Quiz completed -->
      <div>Thank you for completing the quiz, {{ questions[0].response }}!</div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps(['username'])
const emit = defineEmits(["exitQuiz"]);

const currentQuestionIndex = ref(0);
const questions = ref([
  {
    text: "On a scale from 1 to 10, how would you rate your overall experience this year?",
    response: 5,
    type: "rating",
  },
  // ... more questions
]);

const progress = computed(() => {
  return (currentQuestionIndex.value / questions.value.length) * 100;
});

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
};
function previousQuestion() {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
    }
};

</script>
