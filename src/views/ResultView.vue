<template>
  <div class="result-page">
    <v-container class="content-container">
      <div v-if="isLoading">
        <h4 class="text-h4 center loading-text"> Your future card is being prepared... </h4>
        <v-skeleton-loader
          boilerplate
          class="mx-auto"
          elevation="12"
          max-width="360"
          height="70vh"
          type="card"
          :loading="isLoading"
        >
      </v-skeleton-loader>
      </div>
      <div v-else class="tarot-card-container">
        <div
          class="tarot-card"
          :class="{ flipped: isFlipped }"
          @click="toggleFlip"
        >
          <!-- Front of the Tarot Card -->
          <div class="card-front">
            <img :src="imageUrl" alt="AI Generated Image" class="tarot-image" />
          </div>
          <!-- Back of the Tarot Card -->
          <div class="card-back" v-if="isFlipped">
            <div class="overlay">
              <h1 class="prediction-title">Your 2024 Prediction</h1>
              <p class="prediction-text" v-text="prediction"></p>
            </div>
            <div class="share-buttons">
              <button
                @click.stop="shareOnInstagram"
                aria-label="Share on Instagram"
              >
                <v-icon>mdi-instagram</v-icon>
              </button>
              <button
                @click.stop="shareOnTwitter"
                aria-label="Share on Twitter"
              >
                <v-icon>mdi-twitter</v-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <div v-if="isFlipped" class="feedback-container">
      <p>
        Thank you for participating in the journey! Your predictions and tarot
        image were uniquely created using DALL·E and GPT-3.5-turbo models, based
        on your answers.
      </p>
      <FeedbackForm />
    </div>
  </div>
</template>

<script setup>
import { useQuestionnaireStore } from "@/store/questionnaire";
import { onMounted, ref } from "vue";
import FeedbackForm from "@/components/FeedbackForm.vue";

const store = useQuestionnaireStore();
const imageUrl = ref("");
const prediction = ref("");
const isFlipped = ref(false);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  imageUrl.value = await store.createImageWithDallE();
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
   prediction.value = store.questions;
});

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

const shareOnTwitter = () => {
  // Twitter sharing logic here
};

const shareOnInstagram = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "My 2024 Prediction",
        text: "Check out my 2024 prediction!",
        url: imageUrl.value,
      })
      .catch(console.error);
  } else {
    // Fallback for browsers that do not support the Web Share API
    alert(
      "Your device does not support sharing. Please download the image and share on Instagram."
    );
  }
};
</script>

<style scoped>
.result-page {
  background-image: url("../assets/background-image.png");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.tarot-card {
  perspective: 1000px;
  /* Needed for the 3D effect */
  display: inline-block;
  cursor: pointer;
  width: 70vh;
}

.tarot-card .card-front,
.tarot-card .card-back {
  width: 100%;
  height: auto;
  backface-visibility: hidden;
  /* Hide the back of the card when flipped */
  position: absolute;
  transition: transform 0.6s;
  /* Smooth flip transition */
}

.tarot-card.flipped .card-front {
  transform: rotateY(180deg);
  /* Flip the front when the card is flipped */
}

.tarot-card.flipped .card-back {
  transform: rotateY(360deg);
  /* Rotate the back to be visible when flipped */
}

.prediction-text {
  padding: 30px;
  margin: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 70vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border-radius: 8px;
}

.share-button {
  margin-top: 20px;
  /* Adjust as needed */
}

.tarot-image {
  width: 50vh;
  height: auto;
}

.share-button {
  margin-right: 8px;
  color: #fff;
  /* Adjust color to match the theme or make it dynamic based on the platform */
}

.v-icon {
  /* Example: */
  font-size: 24px;
  /* Adjust icon size as needed */
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.tarot-card-container {
  position: relative;
  width: 100%;
  text-align: center;
  height: 70vh;
}

.tarot-card {
  perspective: 1000px;
  display: inline-block;
  cursor: pointer;
  width: 70vh;
  height: 70vh;
}

.tarot-card .card-front,
.tarot-card .card-back {
  width: 100%;
  height: auto;
  backface-visibility: hidden;
  position: absolute;
  transition: transform 0.6s;
}

.feedback-container {
  width: 50vh;
  margin: auto;
  padding-bottom: 50px; /* Increase space below the feedback form */
}

.prediction-title {
  color: #ffffff;
  text-align: center;
  font-size: 2em;
  margin-bottom: 16px;
}

.overlay {
  position: relative;
  padding: 20px;
  text-align: center;
}

.share-buttons button {
  background: none;
  border: none;
  cursor: pointer;
}

.content-container {
  min-height: 100vh;
}

@media (max-width: 768px) {
  .tarot-card {
    width: 90%;
    height: auto;
  }
  .content-container {
    min-height: 125vh;
  }
}

.loading-text {
  text-align: center;
  margin-bottom: 15px;
}
</style>
