<template>
  <button class="close" @click="close">✖</button>
</template>

<script>
export default {
  mame: "TheButtonClose",

  methods: {
    close() {
      this.$emit("button:close")
    }
  }
}
</script>

<style lang="scss" scoped>
.close {
  background: transparent;
  cursor: pointer;
  border: rem(2) solid $black;
  border-radius: 50%;
  width: rem(30);
  height: rem(30);
}
</style>
