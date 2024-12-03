<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  name: "App"
}
</script>

<style lang="scss" scoped>
.page-enter-from {
  transform: translate3d(0, rem(20), 0);
  filter: blur(2px);
  opacity: 0;
}

.page-enter-to {
  transform: translate3d(0, 0, 0);
  filter: blur(0);
  opacity: 1;
}

.page-leave-from {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  filter: blur(0);
}

.page-leave-to {
  transform: translate3d(0, rem(-20), 0);
  opacity: 0;
  filter: blur(2px);
}

.page-enter-active,
.page-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}
</style>
