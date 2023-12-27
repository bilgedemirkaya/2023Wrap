<template>
  <v-container>
    <p class="text-h5 bold">Hi {{ username?.charAt(0).toUpperCase()+ username.slice(1) }}!</p>
    <v-progress-linear :model-value="progress" bg-color="blue-grey" color="lime"
      class="progress-linear"></v-progress-linear>
    <div v-if="currentQuestionIndex < questions.length">
      <div>
        <component :is="currentQuestionComponent" :key="currentQuestionIndex" :question="questions[currentQuestionIndex]"
          @answer="handleAnswer"></component>
      </div>
      <div class="d-flex flex-wrap action-buttons">
        <v-btn v-if="currentQuestionIndex === 0" class="ma-2 pa-2" color="" @click="emit('exit')">Exit</v-btn>
        <v-btn v-else @click="previousQuestion" class="ma-2 pa-2" color="">Previous</v-btn>
        <v-btn v-if="currentQuestionIndex !== 10" @click="nextQuestion" class="ma-2 pa-2">Next</v-btn>
        <v-btn v-else @click="finishTest" class="ma-2 pa-2">Finish Test</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import RatingQuestion from "./Questions/RatingQuestion.vue";
import EmotionSelectQuestion from "./Questions/EmotionSelectQuestion.vue";
import WordGameQuestion from "./Questions/WordGameQuestion.vue";
import NewYearResolutionQuestion from "./Questions/NewYearResolutionQuestion.vue";
import ReactToChangeQuestion from "./Questions/ReactToChangeQuestion.vue";
import SocialPreferenceQuestion from "./Questions/SocialPreferenceQuestion.vue";
import SelectOptionQuestion from "./Questions/SelectOptionQuestion.vue";

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
const props = defineProps(["username"]);
const emit = defineEmits(["exitQuiz"]);
const router = useRouter();

const getFeelingTextBasedOnResponse = () => {
  const response = questions.value[0].response;

  if (response <= 3) {
    return "Oh shit...";
  } else if (response <= 6) {
    return "Quite the rollercoaster, huh?";
  } else if (response <= 8) {
    return "Looks like things were pretty alright for you!";
  } else {
    return "Whoa, you’re on fire!";
  }
};

const getLifeChangingPreText = () => {
  const response = questions.value.find(question => question.id === 'LifeChangingEventQuestion').response;

  if (response.length > 3) {
    return "What. The. Heck. – That's quite a rollercoaster of a year!";
  } else if (response.length > 2) {
    return "What. A. Year. – You've really been through a lot!";
  }

  return "";
};


const currentQuestionIndex = ref(0);
const questions = ref([
  {
    id: "RatingQuestion",
    text: "How would you rate your year overall?",
    response: 0,
    type: "rating",
    preText: "",
  },
  {
    id: "EmotionSelectQuestion",
    text: "Can you pick the emotions you felt deeply this year?",
    response: [],
    type: "select",
    preText: "",
  },
  {
    id: "WordGameQuestion",
    text: "",
    response: "",
    type: "game",
    preText: "",
  },
  {
    id: "LifeChangingEventQuestion",
    text: "Did you experience any life-changing events in 2023? Select all that apply, or add your own.",
    response: [],
    options: [
      "Divorce or Relationship Breakup",
      "Moving to a New Country/City",
      "Loss of a relative",
      "Change in Job or Career",
      "Starting a New Relationship or Marriage",
      "Significant Health Changes",
      "Achieving a Major Personal Goal",
      "Significant Financial Change",
      "Other",
    ],
    type: "selectbox",
    preText: "",
  },
  {
    id: "ReactToChangeQuestion",
    text: "How do you typically react to significant changes in your life?",
    response: "",
    type: "select",
    preText: "",
  },
  {
    id: "StressManagementQuestion",
    text: "How do you usually manage stress or challenges?",
    response: [],
    type: "selectbox",
    options: [
      "Actually trying to tackle the root problem",
      "Exercising/Meditating",
      "Talk to friends/family",
      "Traveling",
      "Splurging on things I don't really need",
      "Distracting myself with hobbies or work",
      "Not managing it at all",
    ],
  },
  {
    id: "SocialPreferenceQuestion",
    text: "Would you describe yourself as more of an introvert or an extrovert?",
    response: "",
    type: "select",
    preText: "",
  },  {
    id: "PersonalTraitQuestion",
    text: "Which of the following statements do you feel resonates most with you?",
    response: [],
    type: "selectbox",
    options: [
    "I strive for perfection and sometimes put pressure on myself.",
    "I value trust but I find it hard to build. I expect important relationships of mine to end.",
    "I'm passionate in relationships and working on balancing my emotions.",
    "I enjoy my independence and making my own decisions.",
    "I'm a natural caregiver but often forget about myself.",
    "No matter how hard I try, I doubt my ability to make a change in my life."
    ],
    preText: "",
  },

  {
    id: "GrowthFocusQuestion",
    text: "Which area of personal growth do you want to focus on most next year?",
    response: "",
    type: "select",
    options: [
      "Career",
      "Health and Fitness",
      "Relationships/Family",
      "Education and Skills",
      "Hobbies and Interests",
      "Financial Wellness",
      "Mental Health",
      "Other",
    ],
    preText: "",
  },
  {
    id: "NewYearResolutionQuestion",
    text: "Let's mentally start preparing for the new year. What are three resolutions you'd like to set for yourself?",
    response: "",
    type: "input",
    preText: "",
  },
  {
    id: "HopeQuestion",
    text: "It's only a milestone if you make it one.. How hopeful are you about the upcoming year?",
    response: "",
    type: "rating",
    preText: "",
  },
]);

const currentQuestionComponent = computed(() => {
  const currentQuestionId = questions.value[currentQuestionIndex.value].id;
  return questionComponents[currentQuestionId] || null;
});

function handleAnswer(answer) {
  questions.value[currentQuestionIndex.value].response = answer;
}

const progress = computed(() => (currentQuestionIndex.value / questions.value.length) * 100);


function nextQuestion() {
  if (currentQuestionIndex.id === 'RatingQuestion') {
    questions.value[currentQuestionIndex++].preText = getFeelingTextBasedOnResponse();
  }
  if (currentQuestionIndex.id === 'LifeChangingEventQuestion') {
    questions.value[currentQuestionIndex++].preText = getFeelingTextBasedOnResponse();
  }

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}
function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function finishTest() {
  router.push('/result');
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
