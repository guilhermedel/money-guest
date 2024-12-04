import { defineStore } from 'pinia'
import serviceCard from "~/services/card"
import type { IItemListCardProp, IGetListCard } from '~/interface/organisms/TheItemListCard'
import type { IModalCreateOrEditCardData } from '~/interface/organisms/TheModalCreateOrEditCard'
import { addFeedback } from '~/utils/addFeedback'
import { currencyBRL } from '~/utils/numberTocurrency'

export const useStoreCard = defineStore('card', {
  state: () => ({
    allCards: [] as IGetListCard[],
    cardLoading: false as boolean
  }),

  getters: {
    cards(state: any): IItemListCardProp {
      return state.allCards.map((card: IItemListCardProp) => {
        const cardPercentageLimited = (Number(card.cardInvoice) / Number(card.cardLimited) * 100).toFixed(0)

        return  {
          _id: card._id,
          cardName: card.cardName,
          cardFlag: card.cardFlag,
          cardLastNumber: "Final " + card.cardNumber.slice(-4),
          cardLimited: "Limite: " + currencyBRL(+card.cardLimited / 100),
          cardInvoice: "Fatura: " + currencyBRL(+card.cardInvoice / 100),
          cardPercentageLimited: cardPercentageLimited,
          cardStatus: "moderate",
        }
      })
    },
    loadingCards(state: any): boolean {
      return state.cardLoading
    }
  },

  actions: {
    async getAllCard(): Promise<void> {
      this.cardLoading = true

      const { error, data } = await serviceCard.getAllCard()

      if(!error && Array.isArray(data)) {
        this.allCards = data
      }

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.cardLoading = false
    },

    async postCard(card: IModalCreateOrEditCardData): Promise<void> {
      this.cardLoading = true
      const requestCard = {
        ...card,
        cardLimited: +String(card.cardLimited).replace('R$', '').replaceAll('.','').replace(',',''),
        cardInvoice: +String(card.cardInvoice).replace('R$', '').replaceAll('.','').replace(',','')
      }
      
      const { error } = await serviceCard.postCard(requestCard)

      if(!error) {
        await this.getAllCard()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Cartão adicionado com sucesso.'
        })
      }

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }
      this.cardLoading = false
    },

    async putCard(card: IModalCreateOrEditCardData, cardId: string): Promise<void> {
      this.cardLoading = true

      const requestCard = {
        ...card,
        cardLimited: +String(card.cardLimited).replace('R$', '').replaceAll('.','').replace(',',''),
        cardInvoice: +String(card.cardInvoice).replace('R$', '').replaceAll('.','').replace(',','')
      }

      const { error } = await serviceCard.putCard(requestCard, cardId)

      if(!error) {
        await this.getAllCard()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Cartão atualizado com sucesso.'
        })
      }

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.cardLoading = false
    },

    async deleteCard(cardId: string): Promise<void> {
      this.cardLoading = true

      const { error } = await serviceCard.deleteCard(cardId)

      if(!error) {
        await this.getAllCard()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: 'Cartão deletado com sucesso.'
        })
      }
      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.cardLoading = false
    },
  }
})
