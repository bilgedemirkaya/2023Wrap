<template>
    <h4 class="text-h4 center loading-text">Please wait. It may take up to a minute...</h4>
    <v-container class="loading-container">
      <v-skeleton-loader
        boilerplate
        class="mx-auto"
        elevation="12"
        width="45vh"
        height="50vh"
        type="card"
        loading
      ></v-skeleton-loader>
      <v-skeleton-loader
        boilerplate
        class="mx-auto"
        elevation="12"
        width="45vh"
        height="50vh"
        type="card"
        loading
      ></v-skeleton-loader>
      <v-skeleton-loader
        boilerplate
        class="mx-auto"
        elevation="12"
        width="45vh"
        height="50vh"
        type="card"
        cols="12"
        loading
      ></v-skeleton-loader>
      <v-skeleton-loader
        boilerplate
        class="mx-auto"
        elevation="12"
        width="45vh"
        height="50vh"
        type="card"
        cols="12"
        loading
      ></v-skeleton-loader>
    </v-container>
</template>

<style scoped>
.loading-text {
  text-align: center;
  margin-bottom: 15px;
}

.loading-container {
  display: flex;
  gap: 15px;
}
</style>