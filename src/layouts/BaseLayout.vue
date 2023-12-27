<template>
    <v-app id="inspire">
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
            <v-toolbar-title class="toolbar-title -override">
                <slot name="toolbar-title">2023: What the heck?!</slot>
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <slot></slot>
        </v-content>
        <v-footer app fixed>
            <a href="https://github.com/bilgedemirkaya" class="github-link" target="_blank">
                <img src="../assets/github-mark-white.svg" alt="GitHub" class="github-icon" width="20px" height="20px" />
            </a>
            <span> Bilge Demirkaya &copy; 2023</span>
            <SupportMeLink />
        </v-footer>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';
import SupportMeLink from "@/components/SupportMeLink.vue";

const drawer = ref(false);

const toggleDrawer = () => {
    drawer.value = !drawer.value;
};
</script>

<style scoped>
.toolbar-title.-override {
    font-size: 1.85rem;
    margin-inline-start: 3rem;
}

.github-icon {
    margin-right: 8px;
}

.github-link {
    margin-top: 5px;
}
</style>
