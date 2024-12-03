<template>
  <p class="the-paragraph" :class="{ bold }">{{ paragraphMessage }}</p>
</template>

<script lang="ts">
export default {
  name: "TheParagraph",

  props: {
    paragraphMessage: {
      type: String,
      required: true
    },
    bold: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.the-paragraph {
  color: $grayLightAlt;
  font-size: rem(14);
  line-height: rem(20);

  &.bold {
    color: $blackLight;
    font-weight: 600;
  }
}
</style>
