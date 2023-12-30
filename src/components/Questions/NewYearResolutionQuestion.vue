<template>
  <p>{{ question.text }}</p>
  <div class="question-container">
    <div v-for="(resolution, index) in resolutions" :key="index" class="select-container">
      <v-select v-model="resolution.selected" :items="resolutionOptions" label="Select your New Year's resolution" />
      <!-- Custom resolution input field -->
      <v-text-field v-if="resolution.isOtherSelected" v-model="resolution.custom" label="What's your resolution?"
        placeholder="Type your custom resolution"></v-text-field>
      <v-btn icon size="x-small" class="remove-btn" color="" v-if="resolutions.length > 1" @click="removeResolution(index)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <!-- Add button -->
    <v-btn @click="addResolution" size="small" color="green">Add another resolution</v-btn>
  </div>
</template>

<script setup>
import { reactive, watch} from 'vue';

const props = defineProps(["question"]);
const emit = defineEmits(["answer"]);

const resolutionOptions = [
  "Learn a new skill/language",
  "Travel abroad",
  "Build something cool",
  "Save/invest money",
  "Make myself happy",
  "Make mom proud",
  "Survive",
  "I want to type something else",
];

const resolutions = reactive([createResolution()]);

function createResolution() {
  return {
    selected: '',
    custom: '',
    isOtherSelected: false,
  };
}

function addResolution() {
  resolutions.push(createResolution());
}


function removeResolution(index) {
  resolutions.splice(index, 1);
}

watch(resolutions, () => {
  resolutions.forEach(resolution => {
    if (resolution.selected === "I want to type something else") {
      resolution.isOtherSelected = true;
    } else {
      resolution.isOtherSelected = false;
    }
  });
  handleResolutionChange();
}, { deep: true });


const handleResolutionChange = () => {
  const userResolutions = resolutions.map(resolution =>
    resolution.isOtherSelected ? resolution.custom : resolution.selected
  ).filter(Boolean); // Filter out empty strings

  emit("answer", userResolutions);
};

</script>

<style scoped>
.question-container {
  margin: 3rem 0;
}

.select-container {
  display: flex;
  gap: 15px;
  align-items: center;
}

@media (max-width: 480px) {
  .select-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .select-container .v-select,
  .select-container .v-text-field {
    flex-grow: 1;
    width: calc(100% - 30px); /* Adjust width to account for the gap */
  }

  .select-container .remove-btn {
    margin-left: auto;
    margin-right: 0;
    order: -1; /* Place the button before the v-select and v-text-field */
  }
}

</style>
