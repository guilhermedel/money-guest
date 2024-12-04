<template>
  <li class="item-list-transaction">
    <div class="info-account">
      <div class="card-bank">
        <TheParagraph :paragraph-message="itemTransaction.nameAccount" bold />
      </div>
      <div class="info-category">
        <TheIconMark :color="itemTransaction.colorCategory" />
        <TheParagraph v-if="isCategory" :paragraph-message="itemTransaction.recipeName" />
        <TheParagraph v-else :paragraph-message="itemTransaction.nameCategory" />
      </div>
    </div>
    <div class="info-invoice">
      <div class="invoice-range">
        <TheParagraph :paragraph-message="itemTransaction.dateTime" />
        <TheParagraph :paragraph-message="itemTransaction.revenueValue" bold />
      </div>
      <ThePopover
        v-if="isPopover"
        :popover-options="popoverOptions"
        @popover:edit="handlePopoverEdit"
        @popover:delete="handlePopoverDelete"
      />
    </div>
  </li>
</template>

<script lang="ts">
import type { IPopoverOptionsProp } from "../../interface/atoms/ThePopoverInterface"
import type { IItemListTransactionProp } from "../../interface/organisms/TheItemListTransaction"

export default {
  name: "TheItemListTransaction",

  props: {
    itemTransaction: {
      type: Object as () => IItemListTransactionProp,
      default: () => ({} as IItemListTransactionProp)
    },
    isPopover: {
      type: Boolean,
      default: true
    },
    isCategory: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      popoverOptions: [
        {
          id: 1,
          label: "Editar",
          action: "edit"
        },
        {
          id: 2,
          label: "Excluir",
          action: "delete"
        }
      ] as IPopoverOptionsProp[]
    }
  },

  methods: {
    handlePopoverEdit() {
      this.$emit("popover:edit", this.itemTransaction._id)
    },
    handlePopoverDelete() {
      this.$emit("popover:delete", this.itemTransaction._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list-transaction {
  @include useAlignCenterBetween;
  gap: rem(8);
  width: 100%;

  + .item-list-transaction {
    margin-top: rem(28);
  }

  .info-account {
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(14);

    .card-bank {
      @include useAlignStartBetween;
      flex-direction: column;
      gap: rem(14);
    }

    .info-category {
      display: flex;
      align-items: baseline;
      gap: rem(8);

      .icon-mark {
        width: rem(16);
        height: rem(16);
        border-radius: rem(4);
        @include useBackgroundColors;
      }
    }
  }

  .info-invoice {
    @include useAlignCenter;
    gap: rem(16);

    .invoice-range {
      @include useAlignEndBetween;
      flex-direction: column;
      gap: rem(14);
    }
  }
}
</style>
