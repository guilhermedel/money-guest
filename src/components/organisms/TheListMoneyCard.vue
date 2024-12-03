<template>
  <ul class="list-card">
    <li v-for="(card, cardIndex) in cards" :key="cardIndex" class="item-card">
      <TheMoneyCard
        :title-card="card.title"
        :money-value="card.moneyValue"
        :money-color="card.moneyColor"
      >
        <component :is="asynComponent(card.icon)" :icon-color="card.moneyColor" />
      </TheMoneyCard>
    </li>
  </ul>
</template>

<script lang="ts">
import type { IMoneyCard } from "../../interface/organisms/TheMoneyCard"
import type { DefineComponent } from "vue"
import { defineAsyncComponent } from "vue"

export default {
  name: "TheMoneyCardList",

  props: {
    cards: {
      type: Array as () => IMoneyCard[],
      default: () => [] as IMoneyCard[]
    }
  },

  methods: {
    asynComponent(icon: string): DefineComponent {
      return defineAsyncComponent(() => import(`../../assets/image/svg/${icon}.vue`))
    }
  }
}
</script>

<style lang="scss" scoped>
.list-card {
  @include useAlignCenterStart;
  gap: rem(8);
  width: 100%;

  .item-card {
    flex-grow: 1;
    flex-basis: 0;
  }
}
</style>
