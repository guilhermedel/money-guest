import { defineStore } from 'pinia'
import serviceTransactionRevenue from '~/services/transactionRevenue'
import type { IItemListTransactionProp } from '~/interface/organisms/TheItemListTransaction';
import type { IModalCreateOrEditRevenueData } from '~/interface/organisms/TheModalCreateOrEditRevenue'
import { addFeedback } from '~/utils/addFeedback'
import { formatDateToCustomFormat } from '~/utils/dateFormat'
import { currencyBRL } from "~/utils/numberTocurrency"

export const useStoreRevenue = defineStore('revenue', {
  state: () => ({
    revenue: [] as IItemListTransactionProp[],
    revenueLoading: false as boolean
  }),

  getters: {
    totalRevenue(state: any) {
      const revenueTotal =  state.revenue?.reduce((acc: number, revenue: any): number => {
        return acc + revenue.expenseValue
      }, 0)

      return revenueTotal / 100
    },

    transactionRevenue(state: any) {
      return state.revenue?.map((revenue: any) => {
        return {
          nameAccount: revenue.expenseName,
          accountBankingName: revenue.accountId.accountBankingName,
          nameCategory: revenue.accountId.accountBankingName,
          colorCategory: 'blue',
          dateTime: formatDateToCustomFormat(revenue.date),
          recipeName: 'carteira',
          revenueValue: currencyBRL(revenue.expenseValue / 100),
          _id: revenue._id
        }
      })
    },

    loadingRevenue(state: any) {
      return state.revenueLoading
    }
  },

  actions: {
    async getTransactionRevenue(): Promise<void> {
      this.revenueLoading = true

      const { error, data } = await serviceTransactionRevenue.getTransactionRevenue()

      if(!error && Array.isArray(data)) this.revenue = [...data]

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.revenueLoading = false
    },

    async postTransactionRevenue(transaction: IModalCreateOrEditRevenueData): Promise<void> {
      this.revenueLoading = true

      const { error } = await serviceTransactionRevenue.postTransactionRevenue({
        ...transaction,
        expenseValue: +String(transaction.expenseValue)
        .replace('R$', '').replaceAll('.','').replace(',', '')
      })

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Entrada cadastrada com sucesso.'
        })

        await this.getTransactionRevenue()
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.revenueLoading = false
    },

    async putTransactionRevenue(transaction: IModalCreateOrEditRevenueData, transactionId: string): Promise<void> {
      this.revenueLoading = true

      const { error } =await serviceTransactionRevenue.putTransactionRevenue({
        ...transaction,
        expenseValue: +String(transaction.expenseValue)
        .replace('R$', '').replaceAll('.','').replace(',', '')
      }, transactionId)

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Entrada atualizada com sucesso.'
        })

        await this.getTransactionRevenue()
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.revenueLoading = false
    },

    async deleteTransactionRevenue(transactionId: string): Promise<void> {
      this.revenueLoading = true

      const { error } =await serviceTransactionRevenue.deleteTransactionRevenue(transactionId)

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Entrada deletada com sucesso.'
        })

        await this.getTransactionRevenue()
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.revenueLoading = false
    }
  }
})
