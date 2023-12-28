<template>
    <v-container fluid fill-height>
        <div class="privacy-policy" justify="center">
            <h1>Data Privacy Agreement</h1>
            <p class="text-h6"> Introduction Welcome to wth2023.web.app. We are committed to
                protecting your personal data and respecting your privacy. This Data Privacy
                Agreement outlines how we collect, use, store, and protect your personal
                data. Data Collection We collect the following data: Username/Email: Used as
                an identifier for storing and retrieving your questionnaire responses.
                Questionnaire Responses: Information you provide while using our service.
                Use of Data Your data is used for the following purposes: To store and
                retrieve your responses to our questionnaire. To improve our services and
                user experience. Data Storage and Security We store your data in firestore. We
                implement security measures to protect your data from unauthorized access,
                alteration, disclosure, or destruction. Data Sharing and Disclosure We do
                not share your personal data with third parties except as necessary to
                provide our services or as required by law. In the event of a legal
                requirement, we may disclose your data in accordance with the law. Your
                Rights You have the following rights concerning your data: The right to
                access your data. The right to correct any inaccuracies in your data. The
                right to request deletion of your data. The right to withdraw consent for
                data processing at any time. Consent By using wth2023.web.app/, you
                consent to the collection, use, and storage of your data as outlined in this
                agreement. Changes to This Agreement We may update this Data Privacy
                Agreement from time to time. We will notify you of any changes by posting
                the new agreement on this page. Contact Us If you have any questions or
                concerns about this Data Privacy Agreement, please contact us at bilgedemirkaya07@gmail.com.</p>


                <v-btn class="back-button" @click="goBack">Go Back </v-btn>


            </div>

    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();

function goBack() {
    router.push('/');
}
</script>

<style>
.privacy-policy {
    max-width: 70%;
    margin-left: 32px;
}

.back-button {
    margin-top: 3rem;
}
</style>
