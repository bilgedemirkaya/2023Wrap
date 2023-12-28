<template>
  <div class="result-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="tarot-card">
            <!-- Front of the Tarot Card -->
            <div class="card-front">
              <img alt="AI Generated Image">
            </div>

            <!-- Back of the Tarot Card -->
            <div class="card-back">
              <p>Your 2024 Prediction:</p>
              <p>{{ predictionText }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      predictionText: "This is your AI-generated prediction for the year 2024."
      // Replace with dynamic data as needed
    };
  }
};
</script>

<style scoped>

.result-page {
  background-image: url('../assets/background-image.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: white;
  opacity: 0.2;
}

.tarot-card {
  /* Add your tarot card styling here */
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
  border-radius: 10px;
  text-align: center;
}

.card-front, .card-back {
  /* Styles for the front and back of the card */
}

/* Add more styles as needed */
</style>
