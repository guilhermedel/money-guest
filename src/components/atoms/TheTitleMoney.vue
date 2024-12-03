<template>
<h2 class="title-money" :class="titleColor">{{ titleMessage }}</h2>
</template>

<script lang="ts">
export default {
  name: "TheTitleMoney",

  props: {
    titleMessage: {
      type: String,
      required: true
    },
    titleColor: {
      type: String,
      required: true,
      validator(value: string) {
        return ['green', 'blue', 'red', 'yellow'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-money {
  font-size: rem(24);
  font-weight: bold;

  &.green {
    color: $green;
  }
  
  &.blue {
    color: $blue;
  }

  &.red {
    color: $red;
  }

  &.yellow {
    color: $yellow
  }
}
</style>