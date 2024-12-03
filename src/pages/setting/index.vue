<template>
  <div class="page-profile">
    <TheTitlePage title-message="Configurações" />
    <main class="profile-main">
      <TheBigCard :is-header="false">
        <div class="profile-info">
          <TheAsideNavigation
            @aside:profile="handleProfile"
            @aside:password-change="handlePasswordChange"
          />
          <component
            v-if="isUserData"
            :is="asyncComponent"
            :user-data="useStore.user"
            @form-profile:submit="handleOpenModalEditUser"
          />
          <TheLoading v-else />
        </div>
      </TheBigCard>
    </main>
    <TheModalConfirmation
      title-confirmation="Tem certeza que deseja atualizar o perfil?"
      :paragraph-confirmation="$options.paragraphEditUser"
      :is-opened="editUserModalOpened"
      :is-disabled="loadingRequest"
      @modal-confirmation:close="handleCloseModalEditUser"
      @modal-confirmation:submit="handleEditUser"
    />
  </div>
</template>

<script lang="ts">
import type { DefineComponent } from "vue"
import type { IUserData } from "~/interface/pages/user"
import { defineAsyncComponent } from "vue"
import { addFeedback } from "~/utils/addFeedback"
import { useStoreProfile } from "~/store/useProfile"

export default {
  name: "PageSettings",

  data() {
    return {
      currentComponent: "TheFormProfile",
      loadingRequest: false as boolean,
      editUserModalOpened: false as boolean,
      user: {} as IUserData
    }
  },

  setup() {
    const useStore = useStoreProfile()

    return {
      useStore
    }
  },


  computed: {
    asyncComponent(): DefineComponent {
      const dynamicComponents: Record<string, DefineComponent> = {
        TheFormProfile: this.dynamicComponent(this.currentComponent),
        TheFormPasswordChange: this.dynamicComponent(this.currentComponent)
      }

      return dynamicComponents[this.currentComponent]
    },
    isUserData() {
      return Object.entries(this.useStore.user).length > 0
    }
  },

  methods: {
    handleProfile() {
      this.currentComponent = "TheFormProfile"
    },
    handlePasswordChange() {
      this.currentComponent = "TheFormPasswordChange"
    },
    dynamicComponent(component: string): DefineComponent {
      return defineAsyncComponent(
        () => import(`../../components/organisms/${component}.vue`)
      )
    },
    handleOpenModalEditUser(userPayload: IUserData) {
      this.user = { ...userPayload }
      this.editUserModalOpened = true
    },
    handleCloseModalEditUser() {
      this.editUserModalOpened = false
    },
    async handleEditUser(): Promise<void> {
      this.loadingRequest = true
      await this.useStore.putUser(this.user)

      this.loadingRequest = false
      this.handleCloseModalEditUser()
    }
  },

  beforeMount() {
    const isAuthorization = auth()

    if(!isAuthorization) {
      addFeedback({
        isFeedbackActive: true,
        isError: true,
        feedbackMessage: "Usuário não tem permissão."
      })
      
      this.$router.push('/login')
    }
  },

  paragraphEditUser:
  "Se você optar por atualizar o seu perfil, suas informações de usuário serão sobreescrita."
}
</script>

<style lang="scss" scoped>
.page-profile {
  .profile-main {
    margin-top: rem(16);

    .profile-info {
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: rem(32);
    }
  }
}
</style>
