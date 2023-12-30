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
        response: 5,
        preText: "",
        type: "rate",
      },
      {
        id: "EmotionSelectQuestion",
        text: "Can you pick the emotions you felt deeply this year?",
        response: [],
        preText: "",
        type: "text",
      },
      {
        id: "WordGameQuestion",
        text: "",
        response: "",
        preText: "",
        type: "text",
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
          "No Life Changing Events",
          "Other",
        ],
        preText: "",
        type: "select",
      },
      {
        id: "ReactToChangeQuestion",
        text: "How do you typically react to significant changes in your life?",
        response: "",
        preText: "",
        type: "text",
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
        preText: "",
        type: "select",
      },
      {
        id: "SocialPreferenceQuestion",
        text: "Would you describe yourself as more of an introvert or an extrovert?",
        response: 5,
        preText: "",
        type: "rate",
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
          "No matter how hard I try, I doubt my ability to make a change in life.",
          "I often reflect on my experiences, seeking lessons in every challenge.",
        ],
        type: "select",
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
          "Nothing really",
          "Other",
        ],
        preText: "",
        type: "select",
      },
      {
        id: "NewYearResolutionQuestion",
        text: "Let's mentally start preparing for the new year. What are the resolutions you'd like to set for yourself?",
        response: "",
        preText: "",
        type: "text",
      },
      {
        id: "HopeQuestion",
        text: "It's only a milestone if you make it one.. How hopeful are you about the upcoming year?",
        response: 5,
        preText: "",
        type: "rate",
      },
    ],
    username: "",
    userEmail: "",
    feedback: {
      rating: 0,
      feedbackText: "",
    },
    prediction: {
      introduction: "",
      cards: [],
      predictionText: "",
    },
    isLoading: false,
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
            prediction: this.prediction,
          });
        } catch (error) {
          console.error("Error saving state to Firestore:", error);
        }
      }
    },
    async loadStateFromFirestore() {
      if (this.userEmail) {
        try {
          const docRef = doc(db, "questionnaires", this.userEmail);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const state = docSnap.data();

            this.currentIndex = state.currentIndex;
            this.questions = state.questions;
            this.username = state.username;
          }
        } catch (error) {
          console.error("Error loading state from Firestore:", error);
        }
      }
    },
    nextQuestion({ response, preText }) {
      if (response) {
        this.questions[this.currentIndex].response = response;
      }
      this.currentIndex += 1;

      const nextQuestion = this.questions[this.currentIndex];
      nextQuestion.preText = preText;

      this.saveStateToFirestore(this.questions);
    },

    previousQuestion() {
      this.currentIndex -= 1;
    },

    async finishTest(response) {
      this.questions[10].response = response ?? 5;
      await this.createPrediction();
      await this.saveStateToFirestore(this.questions);
      this.clearState();
    },

    updateLastQuestion(response) {
      this.questions[10].response = response;
    },

    updateUserEmail(email) {
      this.userEmail = email;
    },

    updateUsername(name) {
      this.username = name;
    },

    async createImageWithDallE() {
      const keywords =
        this.questions.find((q) => q.id === "WordGameQuestion").response ||
        "love";
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

        return data.imageUrl; // This is the URL of the generated image
      } catch (error) {
        console.error("Error generating image:", error);
        // Handle errors appropriately in your application
      }
    },

    async createPrediction() {
      this.isLoading = true;
      const predictionPrompt = this.createPrompt();
      try {
        const response = await fetch(`${apiEndpoint}/generate-prediction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ predictionPrompt }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok", response);
        }
        const data = await response.json();
        const result = JSON.parse(data.prediction.replace(/\\\"/g, "\""));
        this.prediction.introduction = result.introduction;
        this.prediction.cards = result.cards;
        this.prediction.predictionText = result.predictionText;
        this.isLoading = false;
      } catch (error) {
        console.error("Error generating prediction:", error);
        // Handle errors appropriately in your application
        this.isLoading = false;
      }
    },

    createPrompt() {
      const yearRate = this.questions[0].response.toFixed(2);
      const feelings = this.questions[1].response.join(",");
      const significantExperiences = this.questions[3].response.join(",");
      const reactionToChanges = `they ${this.questions[4].response}`;
      const manageStress = this.questions[5].response.includes(
        "Not managing it at all"
      )
        ? `struggle managing stress but they also ${this.questions[5].response
            .filter((option) => option !== "Not managing it at all")
            .join(", ")}`
        : "manage stress by " + this.questions[5].response.join(", ");
      const extrovertScale = this.questions[6].response.toFixed(2);
      const resonateStatements = this.questions[7].response.join(",");
      const personalGrowth = this.questions[8].response.join(",");
      const resolutions = this.questions[9].response.join(",");

      const promptDraft = `You are an expert tarot card reader. Provide a personalized 2024 prediction for a user based on their reflections from 2023. You can make some analysis for their year and unexpected predictions about their next year based on the answers.
      The user has rated their year overall as ${yearRate} out of 10, deeply experiencing emotions like ${feelings}. They encountered life-changing events such as ${significantExperiences} and
      typically react to new changes as ${reactionToChanges}.
      To manage stress or challenges, they often ${manageStress}.
      Identifying themselves as ${extrovertScale} out of 10 on the introvert-extrovert scale (0 being really introvert, 10 being really extrovert), they resonate with the statements: ${resonateStatements}.
      Their focus for the coming year is on ${personalGrowth}, with resolutions including ${resolutions}.
      Your tarot reading should weave these details into a narrative that offers insights and guidance for 2024.
      It should be uplifting and straightforward, emphasizing growth and resilience, while acknowledging the intricacies of their past year.`;

      return promptDraft;
    },

    updateUserEmail(email) {
      this.userEmail = email;
      localStorage.setItem("userEmail", email);
    },

    async submitFeedback(name, rating, feedbackText) {
      this.feedback.rating = rating;
      this.feedback.feedbackText = feedbackText;

      try {
        await setDoc(doc(db, "feedbacks", name), {
          name,
          username: this.username,
          feedback: this.feedback,
        });

      } catch (error) {
        console.error("Error saving feedback to Firestore:", error);
      }

      return;
    },

    clearState() {
      this.currentIndex = 0;
      this.username = "";
      this.userEmail = "";
      localStorage.removeItem("userEmail");
    },
  },
});
