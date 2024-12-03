<template>
  <div class="title-wrapper">
    <h1 class="title">{{ titleMessage }}</h1>
    <span class="decoration-line">&nbsp;</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "TheTitlePage",

  props: {
    titleMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title-wrapper {
  @include useAlignCenterBetween;
  gap: rem(16);
  width: 100%;

  .title {
    color: $black;
    font-size: rem(24);
    font-weight: bold;
    text-wrap: nowrap;
  }

  .decoration-line {
    width: 100%;
    height: rem(1);
    background: $linesAndStroke;
  }
}
</style>
