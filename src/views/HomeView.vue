<script setup>
import CountDown from "../components/CountDown.vue";
import SupportMeLink from "../components/SupportMeLink.vue";
import fireworksGif from "../assets/fireworks.gif";
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
  <v-app id="inspire">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="toolbar-title -override">2023: What the heck?!</v-toolbar-title>
    </v-toolbar>
    <v-content>
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
    </v-content>

    <v-footer app fixed>
      <a
        href="https://github.com/bilgedemirkaya"
        class="github-link"
        target="_blank"
      >
        <img
          src="../assets/github-mark-white.svg"
          alt="GitHub"
          class="github-icon"
          width="20px"
          height="20px"
        />
      </a>
      <span> Bilge Demirkaya &copy; 2023</span>
      <SupportMeLink />
    </v-footer>
  </v-app>
</template>

<style scoped>
.toolbar-title.-override {
  font-size: 1.85rem;
  margin-inline-start: 3rem;
}

.fireworks-gif {
  width: 50vw;
  margin: 2vw;
  max-width: 800px;
  height: auto;
}

@media (max-width: 480px) {
  .fireworks-gif {
    width: 80vw; /* Increased width percentage for smaller screens */
    margin: 2vw; /* Slightly smaller margin */
  }
}

.github-icon {
  margin-right: 8px;
}

.github-link {
  margin-top: 5px;
}

.home-view {
  margin-top: 3rem;
}
</style>
