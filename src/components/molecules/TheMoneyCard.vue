<template>
  <div class="money-card">
    <div class="icon-wrapper" :class="moneyColor">
      <slot class=""></slot>
    </div>
    <div class="info-wrapper">
      <TheTitleMoney :title-message="moneyValue" :title-color="moneyColor" />
      <TheParagraph :paragraph-message="titleCard" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TheMoneyCard",

  props: {
    titleCard: {
      type: String,
      required: true
    },
    moneyValue: {
      type: String,
      required: true
    },
    moneyColor: {
      type: String,
      required: true,
      validator(value: string) {
        return ["green", "blue", "red", "yellow"].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.money-card {
  @include useAlignCenterBetween;
  width: 100%;
  background: $white;
  border-radius: rem(12);
  padding: rem(20) rem(32);

  .icon-wrapper {
    width: rem(50);
    height: rem(50);
    border-radius: 50%;
    @include useAlignCenter;
    @include useBackgroundLight;
  }

  .info-wrapper {
    @include useAlignEndCenter;
    flex-direction: column;
    gap: rem(16);
  }
}
</style>
