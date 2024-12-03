<template>
  <p class="paragraph">{{ paragraphMessage }}</p>
</template>

<script lang="ts">
export default {
  name: "TheParagraph",

  props: {
    paragraphMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.paragraph {
  color: $grayLightAlt;
  font-size: rem(16);
  line-height: rem(20);
  font-weight: bold;
  color: $white;
}
</style>
