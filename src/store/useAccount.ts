import { defineStore } from 'pinia'
import serviceAccount from '~/services/account'
import type { IItemListAccountProp } from '~/interface/organisms/TheItemListAccount'
import type { IModalCreateOrEditAccountData } from '~/interface/organisms/TheModalCreateOrEditAccountData'
import type { stateAccount } from '~/interface/pages/account'
import { addFeedback } from '~/utils/addFeedback'

export const useStoreAccount = defineStore('account', {
  state: (): stateAccount => ({
    accounts: [] as IItemListAccountProp[],
    accountLoading: false as boolean
  }),

  getters: {
    allAccount(state: any): IItemListAccountProp[] {
      return state.accounts
    },
    loadingAccount(state: any): boolean {
      return state.accountLoading
    }
  },

  actions: {
    async getAllAccount(): Promise<void> {
      this.accountLoading = true

      const { error, data } = await serviceAccount.getAllAccount()

      if(!error && Array.isArray(data)) {
        this.accounts = data?.map(account => {
          return {
            ...account,
            accountBalance: account.accountBalance / 100
          }
        })
      }

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.accountLoading = false
    },

    async postAccount(account: IModalCreateOrEditAccountData): Promise<void> {
      this.accountLoading = true

      const { error } = await serviceAccount.postAccount({
        ...account,
        accountBalance: +account.accountBalance.replace('R$', '').replaceAll('.','').replace(',','')
      })

      if(!error) {
        await this.getAllAccount()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Conta adicionada com sucesso."
        })
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.accountLoading = false
    },

    async putAccount(account: IModalCreateOrEditAccountData, accountId: string): Promise<void> {
      this.accountLoading = true

      const { error } = await serviceAccount.putAccount({
          ...account,
          accountBalance: +account.accountBalance.replace('R$', '').replaceAll('.','').replace(',','')
        },
        accountId
      )

      if(!error) {
        await this.getAllAccount()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Conta atualizada com sucesso."
        })
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.accountLoading = false
    },

    async deleteAccount(accountId: string): Promise<void> {
      this.accountLoading = true

      const { error } =  await serviceAccount.deleteAccount(accountId)

      if(!error) {
        await this.getAllAccount()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Conta deletada com sucesso."
        })
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.accountLoading = false
    },
  }
})
