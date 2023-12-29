<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Give Feedback" class="feedback-button"> </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-rating v-model="rating" dense color="yellow" large></v-rating>
          <v-textarea
            label="Your feedback"
            hint="Optional"
            v-model="feedbackText"
            rows="2"
            auto-grow
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="isActive.value = false" color="">Cancel</v-btn>
          <v-btn @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useQuestionnaireStore } from "@/store/questionnaire";

const store = useQuestionnaireStore();
const isActive = ref(false);
const rating = ref(0);
const feedbackText = ref("");

const submit = async () => {
  isActive.value = false;
  rating.value = 0;
  feedbackText.value = "";
  await store.submitFeedback(rating.value, feedbackText.value);
};
</script>

<style scoped>
.feedback-button {
  color: #000000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto; /* Center button */
}
</style>
