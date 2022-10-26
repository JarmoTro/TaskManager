<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/navigation.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <Navigation :key="$route.fullPath" />
  <RouterView :key="$route.fullPath" />
  <Footer />
</template>
