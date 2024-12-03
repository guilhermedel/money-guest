<template>
  <button class="notification">
    <IconNotification />
  </button>
</template>

<script lang="ts">
export default {
  name: "TheIconNotification",

  methods: {
    handleClick(): void {
      this.$emit("notification:click")
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  background: $black;
  border: none;
  border-radius: rem(4);
  width: rem(40);
  height: rem(40);
  @include useAlignCenter;
}
</style>
