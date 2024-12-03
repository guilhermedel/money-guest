import { defineStore } from 'pinia'
import type { IFeedbackState, IFeedbackSet } from '~/interface/molecules/TheFeedback'

export const useStoreFeedback = defineStore('feedback', {
  state: (): IFeedbackState => ({
    isFeedbackActive: false,
    errorRequest: false,
    feedbackMessage: '' 
  }),

  getters: {
    getFeedback(state): IFeedbackState {
      return { ...state }
    }
  },

  actions: {
    setFeedback({ isFeedbackActive, isError, feedbackMessage }: IFeedbackSet): void {
      this.isFeedbackActive = isFeedbackActive
      this.errorRequest = isError
      this.feedbackMessage = feedbackMessage
    },
  }
})
