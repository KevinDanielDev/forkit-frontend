<template>
  <div class="fk-auth-page">
    <div class="fk-auth-page__container">
      <AuthCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthCard from 'components/auth/AuthCard.vue';
</script>

<style scoped lang="scss">
.fk-auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $dark-page;
}

.fk-auth-page__container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}
</style>
