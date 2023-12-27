<script setup>
import CountDown from "@/components/CountDown.vue";
import fireworksGif from "@/assets/fireworks.gif";
import Questionary from "@/components/Questionary.vue";
import Introduction from "@/components/Introduction.vue";
import { ref } from 'vue';

const username = ref(null);

function startTest(_username) {
  username.value = _username;
}

function exitTest() {
  username.value = '';
}
</script>

<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" md="6" class="justify-center">
        <img :src="fireworksGif" alt="Fireworks" class="fireworks-gif" />
        <CountDown />
      </v-col>
      <v-col cols="12" md="6" class="justify-center home-view">
        <Introduction v-if="!username" @startTest="startTest" />
        <Questionary v-else :username="username" @exit="exitTest" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fireworks-gif {
  width: 50vw;
  margin: 2vw;
  max-width: 800px;
  height: auto;
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