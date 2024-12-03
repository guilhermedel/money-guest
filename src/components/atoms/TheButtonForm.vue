<template>
  <button class="button-form" :class="classButton" :disabled="isDisabled" @click.prevent="handleClick">
    {{ buttonMessage }}
  </button>
</template>

<script lang="ts">
export default {
  name: "TheButtonForm",

  props: {
    buttonMessage: {
      type: String,
      required: true
    },
    buttonCancel: {
      type: Boolean,
      default: false
    },
    isButtonSmall: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classButton() {
      return {
        cancel: this.buttonCancel,
        small: this.isButtonSmall,
        disabled: this.isDisabled
      }
    }
  },

  methods: {
    handleClick() {
      this.$emit("button:click")
    }
  }
}
</script>

<style lang="scss" scoped>
.button-form {
  width: 100%;
  padding: rem(8) rem(12);
  background: $black;
  color: $white;
  border: rem(2) solid $black;
  border-radius: rem(4);
  cursor: pointer;

  &.cancel {
    background: $white;
    color: $black;
    font-weight: 600;
  }

  &.small {
    width: rem(128);
  }

  &.disabled {
    opacity: .6;
    cursor: not-allowed;
  }
}
</style>
