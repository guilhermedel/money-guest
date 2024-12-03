import { defineStore } from 'pinia'
import type { IUserRegister, IUserLogin, IUserData } from "~/interface/pages/user"
import { addFeedback } from '~/utils/addFeedback'
import serviceProfile from "~/services/profile"

export const useStoreProfile = defineStore('profile', {
  state: () => ({
    userData: {} as IUserData
  }),

  getters: {
    user(state) {
      return state.userData
    }
  },

  actions: {
    async registerUser(user: IUserRegister): Promise<void> {
      const { error, data } = await serviceProfile.registerUser(user)

      if (!error && data !== null && !Array.isArray(data)){
        window.localStorage.setItem('token', data.response.token)
        window.localStorage.setItem('userId', data.response.id)
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: "Não foi possivel fazer o login!"
        })
      }
    },

    async userLogin(user: IUserLogin): Promise<void> {
      const { error, data } = await serviceProfile.userLogin(user)
      
      if (!error && data !== null && !Array.isArray(data)){
        window.localStorage.setItem('token', data.response.token)
        window.localStorage.setItem('userId', data.response.id)
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: "Não foi possivel fazer o login!"
        })
      }
    },

    async getUser(userId: string): Promise<void> {
      const { error, data } = await serviceProfile.getUser(userId)
      
      if(data !== null && !Array.isArray(data)) 
        this.userData = data.response

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }
    },

    async putUser(user: IUserData): Promise<void> {
      const userId: string = window.localStorage.getItem('userId') || ''
      const { error } = await serviceProfile.putUser(user, userId)

      if(!error) {
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Usuário atualizado com sucesso."
        })

        await this.getUser(userId)
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }
    }
  }
})
