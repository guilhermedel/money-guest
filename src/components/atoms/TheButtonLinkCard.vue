<template>
  <button @click="handleClick" class="button-link">{{ buttonMessage }}</button>
</template>

<script lang="ts">
export default {
  name: "TheButtonLinkCard",

  props: {
    buttonMessage: {
      type: String,
      required: true
    }
  },

  methods: {
    handleClick(): void {
      this.$emit("button:click")
    }
  }
}
</script>

<style lang="scss" scoped>
.button-link {
  padding: rem(30) rem(30) 0 0;
  font-size: rem(16);
  color: $purple;
  cursor: pointer;
  background: none;
  border: none;
}
</style>
