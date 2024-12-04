import { defineStore } from 'pinia'
import serviceTransactionExpense from '~/services/transactionExpense'
import type { IItemListTransactionProp } from '~/interface/organisms/TheItemListTransaction';
import type { IModalCreateOrEditExpenseData } from '~/interface/organisms/TheModalCreateOrEditExpense'
import { addFeedback } from '~/utils/addFeedback'
import { formatDateToCustomFormat } from '~/utils/dateFormat'
import { currencyBRL } from "~/utils/numberTocurrency"

export const useStoreExpense = defineStore('expense', {
  state: () => ({
    expense: [] as IItemListTransactionProp[],
    expenseLoading: false as boolean
  }),

  getters: {
    totalExpense(state: any) {
      const expenseTotal =  state.expense?.reduce((acc: number, expense: any): number => {
        return acc + expense.expenseValue
      }, 0)

      return expenseTotal / 100
    },
    transactionExpense(state: any) {
      const expense = state.expense?.map((expense: any) => {
        const {
          expenseValue,
          expenseName,
          expenseEstablishment,
          date,
          categoryId,
          accountId
        } = expense

        return {
          _id: expense._id,
          nameAccount: expenseName,
          nameCategory: categoryId?.categoryName,
          nameAccountBanking: accountId?.accountBankingName,
          colorCategory: categoryId?.categoryColor,
          dateTime: formatDateToCustomFormat(date),
          recipeName: expenseEstablishment,
          revenueValue: currencyBRL(expenseValue / 100)
        }
      })

      return expense
    },
    loadingExpense(state: any) {
      return state.expenseLoading
    }
  },

  actions: {
    async getTransactionExpense(): Promise<void> {
      this.expenseLoading = true

      const { error, data } = await serviceTransactionExpense.getTransactionExpense()

      if(!error && Array.isArray(data)) this.expense = [...data]

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.expenseLoading = false
    },

    async postTransactionExpense(transactionExpense: IModalCreateOrEditExpenseData): Promise<void> {
      this.expenseLoading = true

      const { error } = await serviceTransactionExpense.postTransactionExpense({
        ...transactionExpense,
        expenseValue: +String(transactionExpense.expenseValue)
        .replace('R$', '').replaceAll('.','').replace(',','')
      })

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Saída cadastrada com sucesso.'
        })
        
        await this.getTransactionExpense()
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.expenseLoading = false
    },

    async putTransactionExpense(transaction: IModalCreateOrEditExpenseData, transactionId: string): Promise<void> {
      this.expenseLoading = true

      const { error } = await serviceTransactionExpense.putTransactionExpense({
          ...transaction,
          expenseValue: +String(transaction.expenseValue)
          .replace('R$', '').replaceAll('.','').replace(',','')
        }, transactionId)

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Saída atualizada com sucesso.'
        })

        await this.getTransactionExpense()
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.expenseLoading = false
    },

    async deleteTransactionExpense(transactionId: string): Promise<void> {
      this.expenseLoading = true

      const { error } = await serviceTransactionExpense.deleteTransactionExpense(transactionId)

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Saída deletada com sucesso.'
        })

        await this.getTransactionExpense()
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.expenseLoading = false
    }
  }
})
