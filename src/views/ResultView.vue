<template>
  <div class="result-page">
    <Loading v-if="store.isLoading"/>
    <v-container
      v-else-if="store.prediction.predictionText"
      class="tarot-reading"
    >
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" color="#d2cbb2bb">
            <v-card-text> <p v-text="store.prediction.introduction" class="font-weight-bold" />
              </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(card, index) in store.prediction.cards"
          :key="card.name"
          cols="12"
          md="6"
          lg="3"
        >
          <v-card
            class="tarot-card mx-auto"
            outlined
            @click="flipCard(index)"
            color="#ffffff"
          >
            <v-card-text v-if="!isCardFlipped(index)">
              <v-img
                :src="getCardImage(index)"
                :width="300"
                :height="450"
                aspect-ratio="0.66"
                class="mx-auto"
              />
              <v-card-title class="text-h5">{{ card.name }}</v-card-title>
            </v-card-text>
            <v-card-text v-else>
              <p class="details-text">{{ card.details }}</p>
              <div class="share-buttons">
                <button
                  @click.stop="shareOnInstagram(card)"
                  aria-label="Share on Instagram"
                >
                  <v-icon>mdi-instagram</v-icon>
                </button>
                <button
                  @click.stop="shareOnTwitter(card)"
                  aria-label="Share on Twitter"
                >
                  <v-icon>mdi-twitter</v-icon>
                </button>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" color="#d2cbb2bb">
            <v-card-text> <p v-text="store.prediction.predictionText" class="font-weight-bold" /></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="feedback-container" v-if="!store.isLoading">
      <p>
        Thank you for participating in the journey! Your predictions and tarot
        image were uniquely created using DALL·E and GPT-3.5-turbo models, based
        on your answers. Any feedback is highly appreciated.
      </p>
      <FeedbackForm />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from "vue";
import FeedbackForm from "@/components/FeedbackForm.vue";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";
import tarotImage1 from "@/assets/tarotImages/tarot-1.png";
import tarotImage2 from "@/assets/tarotImages/tarot-2.png";
import tarotImage3 from "@/assets/tarotImages/tarot-3.png";
import tarotImage4 from "@/assets/tarotImages/tarot-4.png";

const store = useQuestionnaireStore();
const router = useRouter();
const isCard1Flipped = ref(false);
const isCard2Flipped = ref(false);
const isCard3Flipped = ref(false);
const isCard4Flipped = ref(false);
function isCardFlipped(index) {
  if (index === 0) {
    return isCard1Flipped.value;
  }
  if (index === 1) {
    return isCard2Flipped.value;
  }
  if (index === 2) {
    return isCard3Flipped.value;
  }
  if (index === 3) {
    return isCard4Flipped.value;
  }

  return false;
}

onBeforeMount(() => {
  if (!store.isLoading && !store.prediction.predictionText) {
    router.push('/');
      /* predictionRef.value = {
        // Mocker
      prediction: {
        introduction:
          "Based on your reflections from 2023, it seems like you had a mixed bag of emotions and experiences. Your year was rated at a 5.00 out of 10, indicating that there were challenges and ups and downs. You mentioned feeling anxious and confused, which suggests that you may have encountered moments of uncertainty and self-doubt. You also had significant health and financial changes, which likely added to your stress levels. When faced with new changes, you mentioned feeling overwhelmed. To manage stress, you found solace in splurging on things you didn't really need. On the introvert-extrovert scale, you identified yourself as a 5.40, implying that you enjoy both independence and relationships. Overall, you've been working on balancing your emotions and appreciate making your own decisions.",
        cards: [
          {
            name: "Eight of Swords",
            details:
              "The Eight of Swords represents feeling trapped by self-imposed limitations and negative thought patterns. It suggests that in 2023, you may have felt overwhelmed and anxious, perceiving obstacles and restrictions where there might not have been any. It's important to recognize that these limitations are mostly in your mind and that you have the power to break free.",
            image: "eight_of_swords.jpg",
          },
          {
            name: "Two of Pentacles",
            details:
              "The Two of Pentacles signifies juggling multiple priorities and attempting to find balance amidst chaos. In 2023, with the significant health and financial changes you experienced, it's understandable that you may have felt stretched thin. This card reminds you to maintain flexibility and adaptability while prioritizing and managing your responsibilities.",
            image: "two_of_pentacles.jpg",
          },
          {
            name: "The Emperor",
            details:
              "The Emperor represents stability, leadership, and taking control of your life. This card suggests that in 2023, you started to regain a sense of authority over your circumstances. It points towards a growing desire for structure and order, which can be a positive force in your life moving forward. Embrace your personal power and make decisions that align with your long-term goals.",
            image: "the_emperor.jpg",
          },
          {
            name: "Six of Wands",
            details:
              "The Six of Wands symbolizes victory, recognition, and overcoming challenges. This card indicates that in 2023, you'll start to reap the rewards of your efforts. Despite the hardships and confusion, you'll find moments of triumph and validation. It's essential to celebrate your accomplishments and use them as inspiration to keep moving forward.",
            image: "six_of_wands.jpg",
          },
        ],
        predictionText:
          "In 2024, based on the insights from the tarot cards, you can expect a year of transformation and growth. The Eight of Swords suggests that it's time to break free from self-imposed limitations and negative thinking. Embrace optimism and challenge any fears that may be holding you back. The Two of Pentacles advises finding balance among various priorities. As you navigate relationships, family, education, and skills, make sure to manage your time and energy effectively. The Emperor signals a period of stability and taking control of your life. This is an opportune time to assert your authority and make decisions that align with your long-term goals. Finally, the Six of Wands promises rewards and recognition. Your past challenges will pave the way for success and triumph. Embrace the victories and use them as motivation to continue striving for greatness. Remember, 2024 holds tremendous potential for personal growth and resilience. Stay focused, trust yourself, and make the most of the opportunities that come your way.",
      },
    }; */
  }

});

function flipCard(index) {
  if (index === 0) {
    isCard1Flipped.value = !isCard1Flipped.value;
  }
  if (index === 1) {
    isCard2Flipped.value = !isCard2Flipped.value;
  }
  if (index === 2) {
    isCard3Flipped.value = !isCard3Flipped.value;
  }
  if (index === 3) {
    isCard4Flipped.value = !isCard4Flipped.value;
  }
}

function getCardImage(index) {
  if (index === 0) {
    return tarotImage1;
  }
  if (index === 1) {
    return tarotImage2;
  }
  if (index === 2) {
    return tarotImage3;
  }
  if (index === 3) {
    return tarotImage4;
  }
}

const shareOnTwitter = (card) => {
  var url = 'https://wth2023.com';  // The URL of your page
    var text = "🎉 Check out this new year card! 🎉\n\n" +
               "🔹 " + card.details + " 🔹\n\n" +
               "Try yours: " + url + " #NewYear2023" + " AIPrediction";

    var twitterUrl = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) +
                     "&text=" + encodeURIComponent(text);
    window.open(twitterUrl, '_blank', 'width=800,height=600');
};

const shareOnInstagram = (card) => {
  const shareData = {
      title: "My 2024 Prediction",
      text: "Check out my 2024 prediction! " + card.details, // Include card description
      url: card.imageUrl // URL of the image
    };

    // Attempt to share via the Web Share API
    navigator.share(shareData).catch((error) => {
      console.error('Error sharing:', error);
      alert("Error in sharing. Please try again.");
    });
  }
</script>

<style scoped>
.result-page {
  background-image: url("../assets/background-image.png");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 2rem;
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
  color: #ffffff;
  border-radius: 8px;
}

.share-button {
  margin-top: 20px;
  margin-right: 8px;
  color: #fff;
}
.v-icon {
  font-size: 24px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 35px;
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

@media (max-width: 768px) {
  .content-container {
    min-height: 125vh;
  }
}
.central-text {
  flex-basis: 100%;
  text-align: center;
  margin: 20px 0;
}

.tarot-card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.tarot-card:hover {
  transform: scale(1.05);
}

.tarot-card-front,
.tarot-card-back {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

.tarot-card-front {
  transform: rotateY(0deg);
}

.tarot-card-back {
  transform: rotateY(180deg);
}

.tarot-card {
  display: grid;
  justify-content: center;
  max-width: 300px;
  height: 80vh;
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
}

.tarot-card:hover {
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}

.prediction-text, .tarot-reading {
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 15px;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  color: #d2cbb2bb
}

.feedback-container {
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  color: #fffefe;
  margin: auto;
  padding: 2rem;
}

.text-h5 {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
}

@media (max-width: 768px) {
  .tarot-card {
    max-width: 90%;
    min-height: 80vh;
    margin: 1rem;
  }
}


.back-card {
  align-items: center;
  margin: auto;
}

.details-text {
  margin-top: 50%;
}
</style>
