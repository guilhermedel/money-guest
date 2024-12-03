<template>
  <h2 class="title-section">{{ titleMessage }}</h2>
</template>

<script lang="ts">
export default {
  name: "TheTitleSection",

  props: {
    titleMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title-section {
  font-size: rem(16);
  color: $blackAlt;
  font-weight: 400;
}
</style>
