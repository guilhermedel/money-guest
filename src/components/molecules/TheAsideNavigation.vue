<template>
  <ul class="list-navigation">
    <li
      class="item-navigation"
      v-for="(navigation, navigationIndex) in navigationList"
      :key="navigationIndex"
    >
      <button class="button-navigation" @click="handleClick(navigation.buttonAction)">
        {{ navigation.buttonMessage }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import type { IAsideNavigationProp } from "~/interface/molecules/TheAsideNavigation"

export default {
  name: "TheAsideNavigation",

  props: {
    navigationList: {
      type: Array as () => IAsideNavigationProp[],
      default: () =>
        [
          {
            buttonMessage: "Perfil",
            buttonAction: "profile"
          },
          {
            buttonMessage: "Alterar senha",
            buttonAction: "password-change"
          }
        ] as IAsideNavigationProp[]
    }
  },

  methods: {
    handleClick(buttonAction: string): void {
      this.$emit(`aside:${buttonAction}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-navigation {
  @include useAlignStartCenter;
  flex-direction: column;
  gap: rem(8);
  width: rem(264);
  margin-top: rem(24);

  .item-navigation {
    width: 100%;

    .button-navigation {
      width: 100%;
      border: none;
      border-radius: rem(6);
      background: $white;
      color: $blackLight;
      padding: rem(8) rem(16);
      cursor: pointer;
      text-align: start;
      font-size: rem(14);
      font-weight: 500;
      transition: all 0.3s;

      &:hover,
      &:focus {
        background: $grayLight;
      }
    }
  }
}
</style>
