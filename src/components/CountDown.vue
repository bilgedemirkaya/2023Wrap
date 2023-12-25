<template>
  <v-container class="countdown-container">
    <div class="countdown-box" v-for="(value, unit) in countdownValues" :key="unit">
      <div class="countdown-value">{{ value }}</div>
      <div class="countdown-label">{{ unit }}</div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const countdownValues = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
});

const targetTime = new Date(`Jan 1, ${new Date().getFullYear() + 1} 00:00:00`).getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetTime - now;

  countdownValues.value.days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  countdownValues.value.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  countdownValues.value.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  countdownValues.value.seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
};

const interval = setInterval(updateCountdown, 1000);
onMounted(updateCountdown);
onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
.countdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-box {
  background-color: #1e1e1e;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.countdown-value {
  font-size: 2em;
  font-weight: bold;
}

.countdown-label {
  font-size: 0.8em;
  text-transform: uppercase;
}

/* Responsive Design */
@media (max-width: 600px) {
  .countdown-box {
    padding: 5px 10px;
    margin: 3px;
  }

  .countdown-value {
    font-size: 1.5em;
  }

  .countdown-label {
    font-size: 0.7em;
  }
}
</style>
