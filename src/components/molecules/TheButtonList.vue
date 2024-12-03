<template>
  <ul class="button-list">
    <li class="button-item" v-for="(button, buttonIndex) in buttons" :key="buttonIndex">
      <TheButtonLink :button-message="button.label" :button-action="button.action">
        <component :is="asynComponent(button.icon)" />
      </TheButtonLink>
    </li>
  </ul>
</template>

<script lang="ts">
import type { IButtonLinkProp } from "../../interface/atoms/TheButtonLink"
import type { DefineComponent } from "vue"
import { defineAsyncComponent } from "vue"

export default {
  name: "TheButtonList",

  props: {
    buttons: {
      type: Array as () => IButtonLinkProp[],
      default: () => [] as IButtonLinkProp[]
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
.button-list {
  @include useAlignCenterStart;
  gap: rem(16);
}
</style>
