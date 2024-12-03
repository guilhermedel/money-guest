import { useStoreFeedback } from "~/store/useFeedback"
import type { IFeedbackSet } from '~/interface/molecules/TheFeedback'

export const addFeedback = (feedback: IFeedbackSet): void => {
  const feedbackStore = useStoreFeedback()
  
  feedbackStore.setFeedback({
    isFeedbackActive: feedback.isFeedbackActive,
    isError: feedback.isError,
    feedbackMessage: feedback.feedbackMessage
  })
}