<template>
  <div class="popover-container">
    <button
      class="popover-button"
      :class="{'active': popoverActive}"
      @click="togglePopover"
    >
    &nbsp;
    </button>
    <ul v-if="popoverActive" class="popover-list">
      <li
        v-for="popover in popoverOptions"
        :key="popover.id"
        class="popover-item"
        @click="handlePopover(popover.action)"
      >
        {{ popover.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type {
  IPopoverOptionsProp,
  IPopoverData
} from "../../interface/atoms/ThePopoverInterface"

export default {
  name: "ThePopover",

  props: {
    popoverOptions: {
      type: Array as () => IPopoverOptionsProp[],
      default: () => [] as IPopoverOptionsProp[]
    }
  },

  data() {
    return {
      popoverActive: false
    } as IPopoverData
  },

  methods: {
    togglePopover(): void {
      this.popoverActive = !this.popoverActive
    },

    handlePopoverOutside(event: MouseEvent): void {
      const target = event.target as HTMLElement

      const isPopoverButton = target.classList.contains("popover-button")
      const isPopoverList = target.classList.contains("popover-list")
      const isPopoverItem = target.classList.contains("popover-item")

      const isPopover = isPopoverItem || isPopoverList || isPopoverButton

      if (!isPopover) this.popoverActive = false
    },

    handlePopover(action: string): void {
      this.$emit(`popover:${action}`)
      this.popoverActive = false
    }
  },

  mounted() {
    document.addEventListener("click", this.handlePopoverOutside)
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handlePopoverOutside)
  }
}
</script>

<style lang="scss" scoped>
.popover-container {
  width: max-content;
  position: relative;

  .popover-button {
    background: $white;
    width: rem(32);
    height: rem(32);
    border: none;
    border-radius: rem(6);
    cursor: pointer;
    position: relative;

    &::after {
      content: "...";
      display: inline-block;
      font-weight: bold;
      width: rem(16);
      height: rem(4);
      line-height: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }

    &.active {
      border: rem(1) solid $grayLightAlt;
    }
  }

  .popover-list {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;

    background: $white;
    width: rem(150);
    border-radius: rem(8);
    border: rem(1) solid $grayLight;
    margin-top: rem(4);

    .popover-item {
      padding: rem(12) rem(16);
      font-size: rem(14);
      color: $black;
      cursor: pointer;

      + .popover-item {
        border-top: rem(1) solid $grayLight;
      }

      &:first-child {
        border-top-left-radius: rem(8);
        border-top-right-radius: rem(8);
      }

      &:last-child {
        border-bottom-left-radius: rem(8);
        border-bottom-right-radius: rem(8);
      }

      &:hover {
        background: $grayLight;
      }
    }
  }
}
</style>
