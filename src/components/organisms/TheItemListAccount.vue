<template>
  <li class="item-list-account">
    <div class="info-bank">
      <TheParagraph :paragraph-message="itemAccount.accountBankingName" bold />
      <div class="wrapper-banking">
        <TheIconMark color="lineAndStroke" />
      <TheParagraph paragraph-message="Banco" />
      </div>
    </div>
    <div class="wrapper-balance">
      <div class="info-balance">
        <TheParagraph paragraph-message="Saldo de:" />
        <TheParagraph :paragraph-message="accountBalance" bold />
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
import type { IItemListAccountProp } from "~/interface/organisms/TheItemListAccount"
import { useCurrencyFormat } from "~/composables/useCurrencyFormat"

export default {
  name: "TheItemListAccount",

  props: {
    itemAccount: {
      type: Object as () => IItemListAccountProp,
      default: () => ({} as IItemListAccountProp)
    },
    isPopover: {
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

  setup() {
    const currencyFormat = useCurrencyFormat()

    return {
      currencyFormat
    }
  },

  computed: {
    accountBalance() {
      return Number(this.itemAccount.accountBalance).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })
    }
  },

  methods: {
    handlePopoverEdit() {
      this.$emit("popover:edit", this.itemAccount._id)
    },
    handlePopoverDelete() {
      this.$emit("popover:delete", this.itemAccount._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list-account {
  @include useAlignCenterBetween;
  width: 100%;
  gap: rem(8);

  + .item-list-account {
    margin-top: rem(28);
  }

  .info-bank {
      @include useAlignStartBetween;
      flex-direction: column;
      gap: rem(14);

      .wrapper-banking {
        display: flex;
        align-items: center;
        gap: rem(8);

        .icon-mark {
          width: rem(16);
          height: rem(16);
          border-radius: rem(4);
          @include useBackgroundColors;
        }
      }
    }

  .info-account {
    @include useAlignCenter;
    gap: rem(24);

    .logo-flag {
      width: rem(50);
      height: rem(50);
      border-radius: rem(6);
      background: $grayLight;
      @include useAlignCenter;
    }
  }

  .wrapper-balance {
    @include useAlignCenter;
    gap: rem(40);

    .info-balance {
      @include useAlignEndBetween;
      flex-direction: column;
      gap: rem(14);
    }
  }
}
</style>
