import { defineStore } from "pinia";
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const useQuestionnaireStore = defineStore("questionnaire", {
  state: () => ({
    currentIndex: 0,
    responses: {},
    username: "",
    userEmail: "",
  }),

  actions: {
    async saveStateToFirestore(questions) {
      if (this.userEmail) {
        try {
          await setDoc(doc(db, 'questionnaires', this.userEmail), {username: this.username, email: this.userEmail, questions });
        } catch (error) {
          console.error("Error saving state to Firestore:", error);
        }
      }
    },

    async loadStateFromFirestore() {
      if (this.userEmail) {
        try {
          const doc = await db.collection('questionnaires').doc(this.userEmail).get();
          if (doc.exists) {
            const state = doc.data();
            this.currentIndex = state.currentIndex;
            this.responses = state.responses;
          }
        } catch (error) {
          console.error("Error loading state from Firestore:", error);
        }
      }
    },

    saveStateToLocalStorage() {
      localStorage.setItem('questionnaireState', JSON.stringify({
        currentIndex: this.currentIndex,
        username: this.username,
        responses: this.responses,
      }))
    },

    loadStateFromLocalStorage() {
      const savedState = localStorage.getItem('questionnaireState');

      if (savedState) {
        const state = JSON.parse(savedState);
        this.currentIndex = state.currentIndex;
        this.responses = state.responses;
        this.username = state.username;
      }
    },

    nextQuestion() {
      this.currentIndex += 1;
    },

    previousQuestion() {
      this.currentIndex -= 1;
    },

    updateResponse(questionId, response) {
      this.responses[questionId] = response;
    },

    updateUserEmail(email) {
      this.userEmail = email;
    },

    updateUsername(name) {
      this.username = name;
    },

    clearState() {
      this.currentIndex = 0;
      this.responses = {};
      this.username = "";
      this.userEmail = "";
      localStorage.removeItem('questionnaireState');
    }
  },
});
