<template>
  <li class="item-list-card">
    <div class="info-card">
      <div class="logo-flag">
        <IconMastercard v-if="isMastercard" />
        <IconVisa v-else />
      </div>
      <div class="card-bank">
        <TheParagraph :paragraph-message="itemList.cardName" bold />
        <TheParagraph :paragraph-message="itemList.cardLastNumber" />
      </div>
    </div>
    <div class="info-invoice">
      <div class="invoice-range">
        <TheParagraph :paragraph-message="itemList.cardLimited" />
        <TheParagraph :paragraph-message="itemList.cardInvoice" bold />
      </div>
      <div v-if="isInvoiceOptions" class="invoice-options">
        <div class="invoice-limit-card">
          <ThePercentage
            :percentage="itemList.cardPercentageLimited"
            :status="itemList.cardStatus"
          />
        </div>
        <button v-if="isCardShow" class="invoice-card-show" @click="handleCardShow">
          <IconArrowRight />
        </button>
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
import type { IItemListCardProp } from "~/interface/organisms/TheItemListCard"

export default {
  name: "TheItemListCard",

  props: {
    itemList: {
      type: Object as () => IItemListCardProp,
      default: () => ({} as IItemListCardProp)
    },
    isInvoiceOptions: {
      type: Boolean,
      default: true
    },
    isCardShow: {
      type: Boolean,
      default: false
    },
    isPopover: {
      type: Boolean,
      default: true
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

  computed: {
    isMastercard(): boolean {
      return this.itemList.cardFlag === "mastercard"
    }
  },

  methods: {
    handleCardShow(): void {},
    handlePopoverEdit(): void {
      this.$emit("popover:edit", this.itemList._id)
    },
    handlePopoverDelete(): void {
      this.$emit("popover:delete", this.itemList._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list-card {
  @include useAlignCenterBetween;
  gap: rem(8);
  width: 100%;

  + .item-list-card {
    padding-top: rem(28);
  }

  .info-card {
    @include useAlignCenter;
    gap: rem(24);

    .logo-flag {
      width: rem(50);
      height: rem(50);
      border-radius: rem(6);
      background: $grayLight;
      @include useAlignCenter;
    }

    .card-bank {
      @include useAlignStartBetween;
      flex-direction: column;
      gap: rem(14);
    }
  }

  .info-invoice {
    @include useAlignCenter;
    gap: rem(40);

    .invoice-range {
      @include useAlignEndBetween;
      flex-direction: column;
      gap: rem(14);
    }

    .invoice-options {
      @include useAlignCenter;
      gap: rem(40);
    }

    .invoice-card-show {
      display: inline-block;
      width: rem(32);
      height: rem(32);
      border: none;
      border-radius: rem(6);
      background: $grayLight;
      cursor: pointer;
    }
  }
}
</style>
