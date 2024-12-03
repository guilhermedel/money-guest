<template>
  <div class="page-expenses">
    <TheTitlePage title-message="Saídas" />
    <div class="expenses-actions">
      <TheButtonLink
        class="button-link"
        button-message="Adicionar saída"
        button-action="add-expense"
        @button:add-expense="handleOpenModalCreateExpense"
      >
        <IconAdd />
      </TheButtonLink>
    </div>
    <main class="category-main">
      <TheBigCard
        class="card-main"
        title-card="Resumo de saídas"
        paragraph-card="Monitore suas despesas e mantenha seu orçamento em dia."
      >
        <TheLoading v-if="storeExpense.loadingExpense" />
        <TheListTransaction
          v-else
          :transaction-list="storeExpense.transactionExpense"
          @transaction:edit="handleOpenEditModalExpense"
          @transaction:delete="handleOpenModalDeleteExpense"
        />
      </TheBigCard>
    </main>
    <TheModalCreateExpense
      :is-opened="createExpenseModalOpened"
      :loading-request="loadingRequest"
      :categories="selectOptionsCategory"
      @modal-expense:close="handleCloseModalCreateExpense"
      @modal-expense:submit="handleCreateExpense"
    />
    <TheModalEditExpense
      :is-opened="editExpenseModalOpened"
      :loading-request="loadingRequest"
      :modal-value="expenseSelect"
      :categories="selectOptionsCategory"
      @modal-expense:close="handleCloseModalEditExpense"
      @modal-expense:submit="handleEditExpense"
    />
    <TheModalConfirmation
      title-confirmation="Tem certeza que deseja excluir?"
      :paragraph-confirmation="$options.paragraphDeleteExpense"
      :is-opened="deleteExpenseModalOpened"
      :is-disabled="loadingRequest"
      @modal-confirmation:close="handleCloseModalDeleteExpense"
      @modal-confirmation:submit="handleDeleteExpense"
    />
  </div>
</template>

<script lang="ts">
import type { IItemListTransactionProp, IEditExpense } from "~/interface/organisms/TheItemListTransaction"
import type { IModalCreateOrEditExpenseData } from "~/interface/organisms/TheModalCreateOrEditExpense"
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IItemListCategoryProp } from "~/interface/organisms/TheItemListCategory"
import { useStoreCategory } from "~/store/useCategory"
import { useStoreExpense } from "~/store/useTransactionExpense"
import { addFeedback } from "~/utils/addFeedback"

export default {
  name: "PageExpenses",

  data() {
    return {
      createExpenseModalOpened: false as boolean,
      editExpenseModalOpened: false as boolean,
      deleteExpenseModalOpened: false as boolean,
      loadingRequest: false as boolean,
      expenseId: '' as string,
    }
  },

  setup() {
    const storeExpense = useStoreExpense()
    const storeCategory = useStoreCategory()

    return {
      storeExpense,
      storeCategory
    }
  },

  computed: {
    selectOptionsCategory(): ISelectOptionsProp[] {
      const categoryOption = this.storeCategory?.categoryAll?.map((category: IItemListCategoryProp) => {
        return {
          value: category.categoryName,
          label: category.categoryName
        }
      })

      categoryOption.unshift({
        value: "",
        label: "Selecione uma opção"
      })

      return categoryOption
    },

    expenseSelect(): IEditExpense {
      const expense = this.storeExpense.transactionExpense
      ?.map((expense: IItemListTransactionProp) => {
        return {
          _id: expense._id,
          expenseName: expense.nameAccount,
          expenseValue: expense.revenueValue,
          expenseCategory: expense.nameCategory,
          expenseEstablishment: expense.recipeName
        }
      })
      ?.find((expense: IItemListTransactionProp) => expense._id === this.expenseId)

      return expense
    }
  },

  methods: {
    handleOpenModalCreateExpense(): void {
      this.createExpenseModalOpened = true
    },
    handleCloseModalCreateExpense():void {
      this.createExpenseModalOpened = false
    },
    handleOpenEditModalExpense(expenseId: string): void {
      this.expenseId = expenseId
      this.editExpenseModalOpened = true
    },
    handleCloseModalEditExpense(): void {
      this.editExpenseModalOpened = false
    },
    handleOpenModalDeleteExpense(expenseId: string): void {
      this.deleteExpenseModalOpened = true
      this.expenseId = expenseId
    },
    handleCloseModalDeleteExpense(): void {
      this.deleteExpenseModalOpened = false
    },
    async handleGetCategory(): Promise<void> {
      await this.storeCategory.getAllCategory()
    },
    async handleGetExpense(): Promise<void> {
      await this.storeExpense.getTransactionExpense()
    },
    async handleCreateExpense(expensePayload: IModalCreateOrEditExpenseData): Promise<void> {
      this.loadingRequest = true
      await this.storeExpense.postTransactionExpense({
        ...expensePayload,
        expenseType: 'saida'
      })

      this.loadingRequest = false
      this.handleCloseModalCreateExpense()
    },
    async handleEditExpense(expensePayload: IModalCreateOrEditExpenseData): Promise<void> {
      this.loadingRequest = true
      await this.storeExpense.putTransactionExpense({
        ...expensePayload,
        expenseType: 'saida'
      }, this.expenseId)

      this.loadingRequest = false
      this.handleCloseModalEditExpense()
    },
    async handleDeleteExpense(): Promise<void> {
      this.loadingRequest = true
      await this.storeExpense.deleteTransactionExpense(this.expenseId)

      this.loadingRequest = false
      this.handleCloseModalDeleteExpense()
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
      await Promise.all([this.handleGetExpense(), this.handleGetCategory()])
    })
  },

  paragraphDeleteExpense:
    "Se você optar por excluir, será necessário adicionar novamente caso queira restaurar essa informação no futuro."
}
</script>

<style lang="scss" scoped>
.page-expenses {
  .expenses-actions {
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
