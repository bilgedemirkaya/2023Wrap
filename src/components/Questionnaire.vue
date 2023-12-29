<template>
  <v-container>
    <p v-if="store.username" class="text-h5 bold">Hi {{ store.username.charAt(0).toUpperCase()+ store.username.slice(1) }}!</p>
    <v-progress-linear :model-value="progress" bg-color="blue-grey" color="lime"
      class="progress-linear"></v-progress-linear>
    <div v-if="store.currentIndex < QUESTION_LENGTH">
      <div>
        <component :is="currentQuestionComponent" :key="store.currentIndex" :question="store.questions[store.currentIndex]"
          @answer="(_answer) => answer = _answer"></component>
      </div>
      <div class="d-flex flex-wrap action-buttons">
        <v-btn v-if="store.currentIndex === 0" class="ma-2 pa-2" color="" @click="emit('exit')">Exit</v-btn>
        <v-btn v-else @click="previousQuestion" class="ma-2 pa-2" color="">Previous</v-btn>
        <v-btn v-if="store.currentIndex !== QUESTION_LENGTH - 1" @click="nextQuestion" class="ma-2 pa-2">Next</v-btn>
        <v-btn v-else @click="finishTest" class="ma-2 pa-2">Finish Test</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
const QUESTION_LENGTH = 11;

</script>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from 'vue-router'
import RatingQuestion from "./Questions/RatingQuestion.vue";
import EmotionSelectQuestion from "./Questions/EmotionSelectQuestion.vue";
import WordGameQuestion from "./Questions/WordGameQuestion.vue";
import NewYearResolutionQuestion from "./Questions/NewYearResolutionQuestion.vue";
import ReactToChangeQuestion from "./Questions/ReactToChangeQuestion.vue";
import SocialPreferenceQuestion from "./Questions/SocialPreferenceQuestion.vue";
import SelectOptionQuestion from "./Questions/SelectOptionQuestion.vue";
import { useQuestionnaireStore } from '@/store/questionnaire';

const store = useQuestionnaireStore();

const questionComponents = {
  RatingQuestion,
  EmotionSelectQuestion,
  WordGameQuestion,
  NewYearResolutionQuestion,
  ReactToChangeQuestion,
  SocialPreferenceQuestion,
  LifeChangingEventQuestion: SelectOptionQuestion,
  StressManagementQuestion: SelectOptionQuestion,
  PersonalTraitQuestion: SelectOptionQuestion,
  GrowthFocusQuestion: SelectOptionQuestion,
  HopeQuestion: RatingQuestion,
};
const emit = defineEmits(["exitQuiz"]);
const router = useRouter();
const answer = ref();
const getFeelingTextBasedOnResponse = () => {
  const response = store.questions[0].response;

  if (response <= 3) {
    return "Oh shit...";
  } else if (response <= 6) {
    return "Quite the rollercoaster, huh?";
  } else if (response <= 8) {
    return "Looks like things were pretty alright for you!";
  }

  return "Whoa, you’re on fire!";
};

const getLifeChangingPreText = () => {
  const response = store.questions.find(question => question.id === 'LifeChangingEventQuestion').response;

  if (response.length > 3) {
    return "What. The. Heck. – That's quite a rollercoaster of a year!";
  } else if (response.length > 2) {
    return "What. A. Year. – You've really been through a lot!";
  }

  return "";
};

const currentQuestionComponent = computed(() => {
  const currentQuestionId = store.questions[store.currentIndex].id;
  return questionComponents[currentQuestionId] || null;
});


const progress = computed(() => (store.currentIndex / QUESTION_LENGTH) * 100);


function nextQuestion() {
  const index = store.currentIndex;
  const question = store. questions[index];
  let preText = '';

  if (question.id === 'RatingQuestion') {
    preText = getFeelingTextBasedOnResponse();
  }
  if (question.id === 'LifeChangingEventQuestion') {
    preText = getLifeChangingPreText();
  }

  store.updatePreText(question.id, preText);

  if (store.currentIndex < QUESTION_LENGTH - 1) {
    store.nextQuestion(answer.value);
  }
}

function previousQuestion() {
  if (store.currentIndex > 0) {
    store.previousQuestion();
  }
}

async function finishTest() {
  const lastQuestion = store.questions[QUESTION_LENGTH - 1];
  await store.updateResponse(lastQuestion.id, lastQuestion.response);
  router.push('/result');
  store.clearState();
}
</script>
<style scoped>
.rate-slider.-override {
  margin: 30px 0;
}

.progress-linear {
  margin: 3rem 0;
}

.action-buttons {
  margin-bottom: 5rem;
}
</style>
