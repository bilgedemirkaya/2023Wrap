import { defineStore } from "pinia";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const useQuestionnaireStore = defineStore("questionnaire", {
  state: () => ({
    currentIndex: 0,
    questions: [
      {
        id: "RatingQuestion",
        text: "How would you rate your year overall?",
        response: 0,
        preText: "",
      },
      {
        id: "EmotionSelectQuestion",
        text: "Can you pick the emotions you felt deeply this year?",
        response: [],
        preText: "",
      },
      {
        id: "WordGameQuestion",
        text: "",
        response: "",
        preText: "",
      },
      {
        id: "LifeChangingEventQuestion",
        text: "Did you experience any life-changing events in 2023? Select all that apply, or add your own.",
        response: [],
        options: [
          "Divorce or Relationship Breakup",
          "Moving to a New Country/City",
          "Loss of a relative",
          "Change in Job or Career",
          "Starting a New Relationship or Marriage",
          "Significant Health Changes",
          "Achieving a Major Personal Goal",
          "Significant Financial Change",
          "Other",
        ],
        preText: "",
      },
      {
        id: "ReactToChangeQuestion",
        text: "How do you typically react to significant changes in your life?",
        response: "",
        preText: "",
      },
      {
        id: "StressManagementQuestion",
        text: "How do you usually manage stress or challenges?",
        response: [],
        options: [
          "Actually trying to tackle the root problem",
          "Exercising/Meditating",
          "Talk to friends/family",
          "Traveling",
          "Splurging on things I don't really need",
          "Distracting myself with hobbies or work",
          "Not managing it at all",
        ],
      },
      {
        id: "SocialPreferenceQuestion",
        text: "Would you describe yourself as more of an introvert or an extrovert?",
        response: "",
        preText: "",
      },
      {
        id: "PersonalTraitQuestion",
        text: "Which of the following statements do you feel resonates most with you?",
        response: [],
        options: [
          "I strive for perfection and sometimes put pressure on myself.",
          "I value trust but I find it hard to build. I expect important relationships of mine to end.",
          "I'm passionate in relationships and working on balancing my emotions.",
          "I enjoy my independence and making my own decisions.",
          "I'm a natural caregiver but often forget about myself.",
          "No matter how hard I try, I doubt my ability to make a change in my life.",
        ],
        preText: "",
      },

      {
        id: "GrowthFocusQuestion",
        text: "Which area of personal growth do you want to focus on most next year?",
        response: "",
        options: [
          "Career",
          "Health and Fitness",
          "Relationships/Family",
          "Education and Skills",
          "Hobbies and Interests",
          "Financial Wellness",
          "Mental Health",
          "Other",
        ],
        preText: "",
      },
      {
        id: "NewYearResolutionQuestion",
        text: "Let's mentally start preparing for the new year. What are three resolutions you'd like to set for yourself?",
        response: "",
        preText: "",
      },
      {
        id: "HopeQuestion",
        text: "It's only a milestone if you make it one.. How hopeful are you about the upcoming year?",
        response: "",
        preText: "",
      },
    ],
    username: "",
    userEmail: "",
    feedback: {
      rating: 0,
      feedbackText: "",
    },
  }),

  actions: {
    async initialize() {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        this.userEmail = storedEmail;
      }

      // Load state from Firestore if the userEmail is available
      if (this.userEmail) {
        await this.loadStateFromFirestore();
      }
    },
    async saveStateToFirestore(questions) {
      if (this.userEmail) {
        try {
          await setDoc(doc(db, "questionnaires", this.userEmail), {
            username: this.username,
            email: this.userEmail,
            currentIndex: this.currentIndex,
            questions,
          });
        } catch (error) {
          console.error("Error saving state to Firestore:", error);
        }
      }
    },
    async loadStateFromFirestore() {
      if (this.userEmail) {
        try {
          const docRef = doc(db, 'questionnaires', this.userEmail);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const state = docSnap.data();

            this.currentIndex = state.currentIndex;
            this.questions = state.questions;
            this.username = state.username
          }
        } catch (error) {
          console.error("Error loading state from Firestore:", error);
        }
      console.log('RETRIEVED DATA', this.questions, this.currentIndex)
      }
    },
    nextQuestion(response) {
      const questionId = this.questions[this.currentIndex].id;
      response && this.updateResponse(questionId, response);
      this.currentIndex += 1;
    },

    previousQuestion() {
      this.currentIndex -= 1;
    },

    async updateResponse(questionId, response) {
      const question = this.questions.find((q) => q.id === questionId);
      if (question) {
        question.response = response;
      }

    this.saveStateToFirestore(this.questions);
    },

    updatePreText(questionId, preText) {
      const question = this.questions.find((q) => q.id === questionId);
      if (question) {
        question.preText = preText;
      }

      this.saveStateToFirestore(this.questions);
    },

    updateUserEmail(email) {
      this.userEmail = email;
    },

    updateUsername(name) {
      this.username = name;
    },

    async createImageWithDallE() {
      const keywords = this.questions.find(q => q.id === "WordGameQuestion").response || "love";
      const prompt = `Create a tarot card image based on these keywords: ${keywords}`;
      try {
        const response = await fetch(`${apiEndpoint}/generate-image`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok", response);
        }
        const data = await response.json();
        console.log('await response.json()', data,);

        return data.imageUrl; // This is the URL of the generated image
      } catch (error) {
        console.error("Error generating image:", error);
        // Handle errors appropriately in your application
      }
    },

    async createPrediction() {
      // Collect or summarize the user responses to be sent to the backend
      const userData = this.questions.map(q => ({
        question: q.text,
        response: q.response
      }));

      try {
        const response = await fetch(`${apiEndpoint}/generate-prediction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok", response);
        }
        const data = await response.json();
        console.log('Prediction response:', data);

        return data.prediction.message; // This is the generated prediction text
      } catch (error) {
        console.error("Error generating prediction:", error);
        // Handle errors appropriately in your application
      }
    },

    updateUserEmail(email) {
      this.userEmail = email;
      localStorage.setItem("userEmail", email);
    },

    async submitFeedback(rating, feedbackText) {
      try {
        // Save feedback to database
        const feedbackRef = doc(db, 'questionnaires', this.userEmail);
        await updateDoc(feedbackRef, {
          feedback: {
            rating: rating.value,
            text: feedbackText.value
          }
        });

      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },

    clearState() {
      this.currentIndex = 0;
      this.responses = {};
      this.username = "";
      this.userEmail = "";
      localStorage.removeItem('userEmail');
    }
  },
});
