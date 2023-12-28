<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" md="6" class="justify-center intro">
        <img :src="fireworksGif" alt="Fireworks" class="fireworks-gif" />
        <CountDown />
      </v-col>
      <v-col cols="12" md="6" class="justify-center home-view">
        <Introduction v-if="!isTestStarted" @startTest="startTest" />
        <Questionnaire v-else @exit="exitTest" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CountDown from "@/components/CountDown.vue";
import fireworksGif from "@/assets/fireworks.gif";
import Questionnaire from "@/components/Questionnaire.vue";
import Introduction from "@/components/Introduction.vue";
import { useQuestionnaireStore } from '@/store/questionnaire';
import { ref, onBeforeMount } from 'vue';

const store = useQuestionnaireStore();
const isTestStarted = ref(false);

onBeforeMount(() => {
  store.loadStateFromLocalStorage();
  isTestStarted.value = !!store.username;
})

function startTest() {
  isTestStarted.value = true;
}

function exitTest() {
  store.clearState();
  isTestStarted.value = false;
}
</script>

<style scoped>
.fireworks-gif {
  width: 40vw;
  margin: 2vw;
  max-width: 800px;
  height: auto;
}

.intro {
  text-align: center !important;
}

@media (max-width: 480px) {
  .fireworks-gif {
    width: 80vw;
    margin: 2vw;
  }
}

.home-view {
    margin-top: 3rem;
}
</style>