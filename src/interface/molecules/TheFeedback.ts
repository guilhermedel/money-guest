export interface IFeedbackState {
  isFeedbackActive: boolean;
  errorRequest: boolean;
  feedbackMessage: string;
}

export interface IFeedbackSet {
  isFeedbackActive: boolean;
  isError: boolean;
  feedbackMessage: string;
}