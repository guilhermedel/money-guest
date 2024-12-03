<template>
  <button class="exit" @click="handleClick">
    <IconExit />
  </button>
</template>

<script lang="ts">
export default {
  name: "TheExit",

  methods: {
    handleClick() {
      this.$emit('exit:click')
    }
  }
}
</script>

<style lang="scss" scoped>
.exit {
  background: $black;
  border: none;
  border-radius: rem(4);
  width: rem(40);
  height: rem(40);
  cursor: pointer;
  @include useAlignCenter;
}
</style>