<script setup>
import CountDown from '../components/CountDown.vue'
import SupportMeLink from '../components/SupportMeLink.vue'
import fireworksGif from '../assets/fireworks.gif';

</script>

<template>
  <v-app id="inspire">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="toolbar-title">2023 Wrap</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <img :src="fireworksGif" alt="Fireworks" class="fireworks-gif"/>
            <CountDown />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <a href="https://github.com/bilgedemirkaya" class="github-link" target="_blank">
      <img src="../assets/github-mark-white.svg" alt="GitHub" class="github-icon" width="20px" height="20px"/>
      </a>
      <span> Bilge Demirkaya &copy; 2023</span>
      <SupportMeLink />
    </v-footer>
  </v-app>
</template>

<style scoped>
.toolbar-title {
  font-size: 1.85rem;
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
</style>
