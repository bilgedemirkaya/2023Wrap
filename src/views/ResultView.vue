<template>
  <div class="result-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="tarot-card-container">
            <div class="tarot-card" :class="{ flipped: isFlipped }" @click="toggleFlip">
              <!-- Front of the Tarot Card -->
              <div class="card-front">
                <img :src="imageUrl" alt="AI Generated Image" class="tarot-image">
              </div>
              <!-- Back of the Tarot Card -->
              <div class="card-back" v-if="isFlipped">
                <div class="prediction-text">
                  <p>Your 2024 Prediction:</p>
                  <span v-text="prediction"></span>
                </div>
                <div class="share-buttons">
                    <v-icon @click.stop="shareOnInstagram">mdi-instagram</v-icon>
                    <v-icon @click.stop="shareOnTwitter">mdi-twitter</v-icon>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <FeedbackForm />
      </v-row>
    </v-container>
  </div>
</template>




<script setup>
import { useQuestionnaireStore } from '@/store/questionnaire';
import { onMounted, ref } from 'vue';
import FeedbackForm from '@/components/FeedbackForm.vue';

const store = useQuestionnaireStore();
const imageUrl = ref('');
const prediction = ref('imageUrl.value = await store.createImageWithDallE();imageUrl.value = await store.createImageWithDallE();imageUrl.value = await store.createImageWithDallE();imageUrl.value = await store.createImageWithDallE();imageUrl.value = await store.createImageWithDallE();imageUrl.value = await store.createImageWithDallE();');
const isFlipped = ref(false);
const rating = ref(0);
const feedbackText = ref('');
const feedbackSubmitted = ref(false);

onMounted(async () => {
  imageUrl.value = await store.createImageWithDallE();
  // prediction.value = await store.createPrediction();
});

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

const shareOnTwitter = () => {
  // Twitter sharing logic here
};


const shareOnInstagram = () => {
  if (navigator.share) {
    navigator.share({
      title: "My 2024 Prediction",
      text: "Check out my 2024 prediction!",
      url: imageUrl.value,
    }).catch(console.error);
  } else {
    // Fallback for browsers that do not support the Web Share API
    alert('Your device does not support sharing. Please download the image and share on Instagram.');
  }
};
</script>


<style scoped>
.result-page {
  background-image: url('../assets/background-image.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh
}

.tarot-card-container {
  position: relative;
  width: 100%;
  text-align: center;
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
  border: 1px solid rgba(0, 0, 0, 0.516);
}

.prediction-text {
  /* Styling for the prediction text container */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  color: #fff; /* Adjust color to match the theme or make it dynamic based on the platform */
}

/* Additional styles for icons, if needed */
.v-icon {
  /* Example: */
  font-size: 24px; /* Adjust icon size as needed */
}
.ig {
  background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
}
.share-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>