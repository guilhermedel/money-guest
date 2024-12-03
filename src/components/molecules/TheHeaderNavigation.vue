<template>
  <ul class="header-navigation">
    <li
      class="item-navigation"
      v-for="(route, routeIndex) in routes"
      :key="route.id"
      :class="{ active: isActive(route) }"
    >
      <NuxtLink class="route" :to="route.path">{{ route.name }}</NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
import type { IHeaderNavigationProp } from "../../interface/molecules/TheHeaderNavigation"
import { useRoute } from "vue-router"

export default {
  name: "TheHeaderNavigation",

  props: {
    routes: {
      type: Array as () => IHeaderNavigationProp[],
      required: true
    }
  },

  setup() {
    const route = useRoute()

    const isActive = (routeProp: IHeaderNavigationProp): boolean => {
      return route.path.includes(routeProp.path)
    }

    return {
      isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.header-navigation {
  @include useAlignCenter;
  gap: rem(16);

  .item-navigation {
    color: $gray;
    font-size: rem(16);
    padding: rem(8) rem(8);
    border-radius: rem(6);
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      display: inline-block;
      background: $purple;
      color: $white;
    }

    .route {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>
