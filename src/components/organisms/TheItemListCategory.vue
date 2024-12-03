<template>
  <li
    class="item-list-category"
    :class="{'click': isClick}"
    @click="handleClick"
  >
    <div class="info-category-left">
      <TheIconMark :color="itemCategory.categoryColor" />
      <TheParagraph :paragraph-message="itemCategory.categoryName" bold />
    </div>
    <div class="info-category-right">
      <TheParagraph :paragraph-message="revenueCategory" bold />
      <ThePopover
        v-if="isPopover"
        :popover-options="popoverOptions"
        @popover:edit="handlePopoverEdit()"
        @popover:delete="handlePopoverDelete"
      />
    </div>
  </li>
</template>

<script lang="ts">
import type { IPopoverOptionsProp } from "~/interface/atoms/ThePopoverInterface"
import type { IItemListCategoryProp } from "~/interface/organisms/TheItemListCategory"

export default {
  name: "TheItemListCategory",

  props: {
    itemCategory: {
      type: Object as () => IItemListCategoryProp,
      default: () => ({} as IItemListCategoryProp)
    },
    isPopover: {
      type: Boolean,
      default: false
    },
    isClick: {
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

  computed: {
    revenueCategory(): string {
    const revenueValue: number = +this.itemCategory.revenueValue / 100

    if (typeof revenueValue === "number") {
      return revenueValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    return "R$ 0,00"
  }
  },

  methods: {
    handleClick(event: Event): void {
      if(event.target) {
        const target: EventTarget = event.target

        const isPopover = (target as HTMLElement)?.classList.contains('popover-button')
        const isPopoverItem = (target as HTMLElement)?.classList.contains('popover-item')

        if (!isPopover && !isPopoverItem) this.$emit("category:click", this.itemCategory._id)
      }
    },
    handlePopoverEdit(): void {
        this.$emit("popover:edit", this.itemCategory._id)
    },
    handlePopoverDelete(): void {
      this.$emit("popover:delete", this.itemCategory._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list-category {
  @include useAlignCenterBetween;
  width: 100%;
  background: $white;
  border-bottom: rem(2) solid $white;
  padding: rem(8) 0;
  transition: all .3s;
  
  &.click {
    cursor: pointer;

    &:hover {
      border-bottom: rem(2) solid $grayLight;
    }
  }

  .info-category-left {
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

  .info-category-right {
    @include useAlignEndCenter;
    gap: rem(16);
  }
}
</style>
