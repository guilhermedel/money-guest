<template>
  <header class="header">
    <div class="header-background">
      <div class="header-wrapper container">
        <div class="header-navigation">
          <IconLogo />
          <TheHeaderNavigation :routes="routes" />
        </div>
        <div class="header-user">
          <TheUserProfile
            :user-name="userData.name"
            :user-email="userData.email"
            @user-profile:click="handleClickProfile"
          />
          <TheExit @exit:click="handleClickExit"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import type { IHeaderNavigationProp } from "../../interface/molecules/TheHeaderNavigation"
import type { IUserData } from "~/interface/pages/user"
import { useStoreProfile } from "~/store/useProfile"

export default {
  name: "TheHeader",

  props: {
    userData: {
      type: Object as () => IUserData,
      default: () => ({} as IUserData)
    }
  },

  data() {
    return {
      routes: [
        {
          id: 1,
          name: "Início",
          path: "/home"
        },
        {
          id: 2,
          name: "Entrada",
          path: "/revenue"
        },
        {
          id: 3,
          name: "Saída",
          path: "/expenses"
        },
        {
          id: 4,
          name: "Categorias",
          path: "/category"
        },
        {
          id: 5,
          name: "Contas",
          path: "/account"
        },
        {
          id: 6,
          name: "Cartões",
          path: "/card"
        }
      ] as IHeaderNavigationProp[]
    }
  },

  setup() {
    const userStore =  useStoreProfile()

    return {
      userStore
    }
  },

  methods: {
    handleClickProfile() {
      this.$router.push('/setting')
    },

    handleClickExit() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userId')

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: rem(16) 0 rem(32);
  padding: 0 rem(16);

  .header-background {
    border-radius: rem(8);
    background: $white;
    padding: rem(16) 0;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

    .header-wrapper {
      @include useAlignCenterBetween;

      .header-navigation {
        @include useAlignCenterBetween;
        gap: rem(24);
      }

      .header-user {
        @include useAlignCenterBetween;
        gap: rem(10);
      }
    }
  }
}
</style>
