<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Give Feedback" class="feedback-button"> </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <div class="stars">
            <v-rating v-model="rating" dense color="yellow" large ></v-rating>
          </div>
          <v-text-field hide-details v-model="name" label="Your name" required></v-text-field>
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
          <v-btn @click="() => {
            isActive.value = false;
            submit();
            }">Submit</v-btn>
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
const name = ref('');
const feedbackText = ref("");

const submit = async () => {
  isActive.value = false;
  await store.submitFeedback(name.value, rating.value, feedbackText.value);
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

.stars {
  margin: auto;
  width: max-content;
}
</style>
