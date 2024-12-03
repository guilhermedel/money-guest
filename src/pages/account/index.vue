<template>
  <div class="page-account">
    <TheTitlePage title-message="Contas Bancárias" />
    <TheButtonLink
      class="button-link"
      button-message="Adicionar conta"
      button-action="add-account"
      @button:add-account="handleOpenModalCreateAccount"
    >
      <IconAdd />
    </TheButtonLink>
    <main class="account-main">
      <TheBigCard
        class="card-main"
        title-card="Lista de contas "
        paragraph-card="Veja suas contas bancárias, e monitore com facilidade."
      >
        <TheLoading v-if="storeAccount.loadingAccount" />
        <TheListAccount
          v-else
          is-popover
          :account-list="storeAccount.allAccount"
          @account:edit="handleOpenModalEditAccount"
          @account:delete="handleOpenModalDeleteAccount"
        />
      </TheBigCard>
    </main>
    <TheModalCreateAccount
      :is-opened="createAccountModalOpened"
      :loading-request="loadingRequest"
      @modal-card:close="handleCloseModalCreateAccount"
      @modal-card:submit="handleCreateAccount"
    />
    <TheModalEditAccount
      :is-opened="editAccountModalOpened"
      :loading-request="loadingRequest"
      :modal-value="accountSelect"
      @modal-card:close="handleCloseModalEditAccount"
      @modal-card:submit="handleEditAccount"
    />
    <TheModalConfirmation
      title-confirmation="Tem certeza que deseja excluir?"
      :paragraph-confirmation="$options.paragraphDeleteAccount"
      :is-opened="deleteAccountModalOpened"
      :is-disabled="loadingRequest"
      @modal-confirmation:close="handleCloseModalDeleteAccount"
      @modal-confirmation:submit="handleDeleteAccount"
    />
  </div>
</template>

<script lang="ts">
import type { IModalCreateOrEditAccountData } from "~/interface/organisms/TheModalCreateOrEditAccountData"
import type { IItemListAccountProp } from "~/interface/organisms/TheItemListAccount"
import { useStoreAccount } from "~/store/useAccount"
import { addFeedback } from "~/utils/addFeedback"

export default {
  name: "PageAccount",

  data() {
    return {
      loadingRequest: false as boolean,
      createAccountModalOpened: false as boolean,
      editAccountModalOpened: false as boolean,
      deleteAccountModalOpened: false as boolean,
      accountId: '' as string,
      userInject: this.user
    }
  },

  setup() {
    const storeAccount= useStoreAccount()

    return {
      storeAccount
    }
  },

  computed: {
    accountSelect(): IItemListAccountProp {
      return this.storeAccount.allAccount
      ?.map((account: IItemListAccountProp) => {
        return {
          ...account,
          accountBalance: account.accountBalance * 100
        }
      })
      ?.find((account: IItemListAccountProp) => account._id === this.accountId)
      ?? {} as IItemListAccountProp
    }
  },

  methods: {
    handleOpenModalCreateAccount() {
      this.createAccountModalOpened = true
    },

    handleCloseModalCreateAccount() {
      this.createAccountModalOpened = false
    },
    handleOpenModalEditAccount(accountId: string) {
      this.editAccountModalOpened = true
      this.accountId = accountId
    },
    handleCloseModalEditAccount() {
      this.editAccountModalOpened = false
    },
    handleOpenModalDeleteAccount(accountId: string) {
      this.accountId = accountId
      this.deleteAccountModalOpened = true
    },
    handleCloseModalDeleteAccount() {
      this.deleteAccountModalOpened = false
    },
    async handleGetAllAccount() {
      await this.storeAccount.getAllAccount()
    },
    async handleCreateAccount(accountPayload: IModalCreateOrEditAccountData) {
      this.loadingRequest = true
      await this.storeAccount.postAccount(accountPayload)

      this.loadingRequest = false
      this.handleCloseModalCreateAccount()
    },
    async handleEditAccount(accountPayload: IModalCreateOrEditAccountData) {
      this.loadingRequest = true
      await this.storeAccount.putAccount(accountPayload, this.accountId)

      this.loadingRequest = false,
      this.handleCloseModalEditAccount()
    },
    async handleDeleteAccount() {
      this.loadingRequest = true
      this.storeAccount.deleteAccount(this.accountId)

      this.loadingRequest = false
      this.handleCloseModalDeleteAccount()
    },
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

  mounted() {
    this.$nextTick(async () => {
      await this.handleGetAllAccount()
    })
  },

  paragraphDeleteAccount:
    "Se você optar por excluir, será necessário adicionar novamente caso queira restaurar essa informação no futuro."
}
</script>

<style lang="scss" scoped>
.page-account {
  .button-link {
    margin-top: rem(20);
  }

  .card-main {
    margin-top: rem(16);
  }
}
</style>
