<template>
  <button class="button-link" @click="handleClick">
    <slot></slot>
    {{ buttonMessage }}
  </button>
</template>

<script lang="ts">
export default {
  name: "theButtonLink",

  props: {
    buttonMessage: {
      type: String,
      required: true
    },
    buttonAction: {
      type: String,
      required: true
    }
  },

  methods: {
    handleClick() {
      this.$emit(`button:${this.buttonAction}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-link {
  padding: rem(12);
  background: $white;
  border: none;
  border-radius: rem(6);
  color: $black;
  @include useAlignCenter;
  gap: rem(8);
  cursor: pointer;
  font-size: rem(14);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
}
</style>
