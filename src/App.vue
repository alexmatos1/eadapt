<script setup>
</script>

<template>
  <div class="app-layout">
    <!-- Header fixo -->

    <!-- Conteúdo dinâmico -->
    <main class="flex-grow">
      <router-view :key="$route.fullPath" />
    </main>

    <!-- Footer fixo no final da página -->
    <!-- <Footer /> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
