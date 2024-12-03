<template>
  <ul class="card-list">
    <TheItemListCard
      v-for="(card, cardIndex) in cardList"
      :key="cardIndex"
      :itemList="card"
      :is-card-show="isCardShow"
      :is-popover="isPopover"
      @popover:edit="handlePopoverEdit"
      @popover:delete="handlePopoverDelete"
    />
  </ul>
</template>

<script lang="ts">
import type { IItemListCardProp } from "~/interface/organisms/TheItemListCard"

export default {
  name: "TheListCard.vue",

  props: {
    cardList: {
      type: Array as () => IItemListCardProp[],
      default: () => [] as IItemListCardProp[]
    },
    isCardShow: {
      type: Boolean,
      default: false
    },
    isPopover: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handlePopoverEdit(cardId: string): void {
      this.$emit("card:edit", cardId)
    },
    handlePopoverDelete(cardId: string): void {
      this.$emit("card:delete", cardId)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list {
  width: 100%;
}
</style>
