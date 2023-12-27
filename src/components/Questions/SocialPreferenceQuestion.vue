<template>
  <div class="question">
    <p>{{ question.text }}</p>
    <div class="container">
      <v-slider
        v-model="socialPreference"
        :max="10"
        :min="0"
        thumb-label="always"
        class="social-slider"
      >
        <template v-slot:thumb-label>
          <div class="label-container">
            {{ socialLabel }}
          </div>
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps(["question"]);
const emit = defineEmits(["answer"]);

const socialPreference = ref(5);

const socialLabel = computed(() => {
  if (socialPreference.value <= 2) {
    return "Highly Introverted";
  } else if (socialPreference.value <= 4) {
    return "More Introverted";
  } else if (socialPreference.value <= 6) {
    return "Depends on my mood";
  } else if (socialPreference.value <= 8) {
    return "More Extroverted";
  } else {
    return "Highly Extroverted";
  }
});

watch(socialPreference, (newVal) => {
  emit("answer", socialLabel.value);
});
</script>

<style scoped>
.container {
  margin: 3rem 0;
}

.label-container {
  width: 120px;
  text-align: center;
}
.social-slider {
  margin-top: 1rem;
}
</style>
