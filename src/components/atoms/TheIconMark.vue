<template>
  <span class="icon-mark" :class="color">&nbsp;</span>
</template>

<script lang="ts">
export default {
  name: "TheIconMark",

  props: {
    color: {
      type: String,
      required: true,
      validation: (color: string) => {
        return [
          "green",
          "blue",
          "yellow",
          "red",
          "purple",
          "black",
          "gray",
          "lineAndStroke"
        ].includes(color)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-mark {
  width: rem(16);
  height: rem(16);
  border-radius: rem(4);
  @include useBackgroundColors;
}
</style>
