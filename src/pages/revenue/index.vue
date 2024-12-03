<template>
  <div class="page-revenue">
    <TheTitlePage title-message="Entradas" />
    <div class="revenue-actions">
      <TheButtonLink
        class="button-link"
        button-message="Adicionar entrada"
        button-action="add-entry"
        @button:add-entry="handleOpenModalCreateRevenue"
      >
        <IconAdd />
      </TheButtonLink>
    </div>
    <main class="category-main">
      <TheBigCard
        class="card-main"
        title-card="Resumo de receitas"
        paragraph-card="Monitore suas fontes de renda e acompanhe seu crescimento."
      >
        <TheLoading v-if="storeRevenue.loadingRevenue" />
        <TheListTransaction
          v-else
          :transaction-list="storeRevenue.transactionRevenue"
          @transaction:edit="handleOpenModalEditRevenue"
          @transaction:delete="handleOpenModalDeleteRevenue"
        />
      </TheBigCard>
    </main>
    <TheModalCreateRevenue
      :is-opened="createRevenueModalOpened"
      :loading-request="loadingRequest"
      :accounties="selectOptionsAccount"
      @modal-revenue:close="handleCloseModalCreateRevenue"
      @modal-revenue:submit="handleCreateRevenue"
    />
    <TheModalEditRevenue
      :is-opened="editRevenueModalOpened"
      :loading-request="loadingRequest"
      :accounties="selectOptionsAccount"
      :modal-value="revenueSelect"
      @modal-revenue:close="handleCloseModalEditRevenue"
      @modal-revenue:submit="handleEditRevenue"
    />
    <TheModalConfirmation
      title-confirmation="Tem certeza que deseja excluir?"
      :paragraph-confirmation="$options.paragraphDeleteRevenue"
      :is-opened="deleteRvenueModalOpened"
      :is-disabled="loadingRequest"
      @modal-confirmation:close="handleCloseModalDeleteRevenue"
      @modal-confirmation:submit="handleDeleteRevenue"
    />
  </div>
</template>

<script lang="ts">
import type { IItemListTransactionProp, IEditRevenue } from "~/interface/organisms/TheItemListTransaction"
import type { IModalCreateOrEditRevenueData } from "~/interface/organisms/TheModalCreateOrEditRevenue"
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IItemListAccountProp } from "~/interface/organisms/TheItemListAccount"
import { useStoreAccount } from "~/store/useAccount"
import { useStoreRevenue } from '~/store/useTransactionRevenue'
import { addFeedback } from "~/utils/addFeedback"

export default {
  name: "PageRevenue",

  data() {
    return {
      loadingRequest: false as boolean,
      createRevenueModalOpened: false as boolean,
      editRevenueModalOpened: false as boolean,
      deleteRvenueModalOpened: false as boolean,
      revenueId: '' as string,
    }
  },

  setup() {
    const storeRevenue = useStoreRevenue()
    const storeAccount = useStoreAccount()

    return {
      storeRevenue,
      storeAccount
    }
  },

  computed: {
    selectOptionsAccount(): ISelectOptionsProp[] {
      const accountOptions = this.storeAccount?.allAccount?.map((account: IItemListAccountProp) => {
        return {
          value: account.accountBankingName,
          label: account.accountBankingName
        }
      })

      accountOptions.unshift({
        value: "",
        label: "Selecione uma opção"
      })

      return accountOptions
    },
    revenueSelect(): IEditRevenue {
      const revenue = this.storeRevenue.transactionRevenue
      ?.map((revenue: IItemListTransactionProp) => {
        return {
          _id: revenue._id || '',
          revenueName: revenue.nameAccount || '',
          revenueValue: revenue.revenueValue || '',
        }
      })
      ?.find((revenue: IEditRevenue) => revenue._id === this.revenueId)

      return revenue as IEditRevenue
    }
  },

  methods: {
    handleOpenModalCreateRevenue(): void {
      this.createRevenueModalOpened = true
    },
    handleCloseModalCreateRevenue(): void {
      this.createRevenueModalOpened = false
    },
    handleOpenModalEditRevenue(revenueId: string): void {
      this.editRevenueModalOpened = true
      this.revenueId = revenueId
    },
    handleCloseModalEditRevenue(): void {
      this.editRevenueModalOpened = false
    },
    handleOpenModalDeleteRevenue(revenueId: string): void {
      this.deleteRvenueModalOpened = true
      this.revenueId = revenueId
    },
    handleCloseModalDeleteRevenue(): void {
      this.deleteRvenueModalOpened = false
    },
    async hadnleGetAllRevenue() {
      await this.storeRevenue.getTransactionRevenue()
    },
    async handleCreateRevenue(expensePayload: IModalCreateOrEditRevenueData): Promise<void> {
      this.loadingRequest = true
      this.storeRevenue.postTransactionRevenue({
        ...expensePayload,
        expenseType: 'entrada',
      })
      
      this.loadingRequest = false
      this.handleCloseModalCreateRevenue()
    },
    async handleEditRevenue(revenuePayload: IModalCreateOrEditRevenueData): Promise<void> {
      this.loadingRequest = true
      this.storeRevenue.putTransactionRevenue(revenuePayload, this.revenueId)
      
      this.loadingRequest = false
      this.handleCloseModalEditRevenue()
    },
    async handleDeleteRevenue(): Promise<void> {
      this.loadingRequest = true
      this.storeRevenue.deleteTransactionRevenue(this.revenueId)
      
      this.loadingRequest = false
      this.handleCloseModalDeleteRevenue()
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
      await Promise.all([this.hadnleGetAllRevenue(), this.storeAccount.getAllAccount()])
    })
  },

  paragraphDeleteRevenue:
    "Se você optar por excluir, será necessário adicionar novamente caso queira restaurar essa informação no futuro."
}
</script>

<style lang="scss" scoped>
.page-revenue {
  .revenue-actions {
    @include useDatePicker;
    
    .button-link {
      margin-top: rem(20);
    }
  }

  .card-main {
    margin-top: rem(16);
  }
}
</style>
