import { defineStore } from 'pinia'
import serviceCategory from "~/services/category"
import type { IItemListCategoryProp } from '~/interface/organisms/TheItemListCategory'
import type { IModalCreateOrEditCategoryData } from '~/interface/organisms/TheModalCreateOrEditCategory'
import { addFeedback } from '~/utils/addFeedback'
import { currencyBRL } from '~/utils/numberTocurrency'
import { formatDateToCustomFormat } from '~/utils/dateFormat'

export const useStoreCategory = defineStore('category', {
  state: () => ({
    category: {},
    categoryLoading: false as boolean,
    allCategory: [] as IItemListCategoryProp[]
  }),

  getters: {
    categoryAll(state: any): IItemListCategoryProp[] {
      return state.allCategory
    },

    categoryData(state: any) {
      const {
        categoryColor,
        categoryName,
        receitas,
        revenueValue,
        spendingLimit
      } = state.category

      const categoryTratament = receitas?.map((category: any) => {
        return {
          ...category,
          nameAccount: category.expenseName,
          nameCategory: categoryName,
          colorCategory: categoryColor,
          dateTime: formatDateToCustomFormat(category.date),
          recipeName: category.expenseEstablishment,
          revenueValue: currencyBRL(category.expenseValue / 100)
        }
      })

      return {
        categoryTratament,
        categoryName,
        revenueValue: revenueValue ? currencyBRL(revenueValue / 100) : currencyBRL(0),
        spendingLimit: spendingLimit ? currencyBRL(spendingLimit / 100) : currencyBRL(0),
        categoryBalance: revenueValue && spendingLimit 
        ? currencyBRL((spendingLimit / 100) - (revenueValue / 100)) : currencyBRL(0)
      }
    },

    loadingCategory(state: any) {
      return state.categoryLoading
    }
  },

  actions: {
    async getAllCategory(): Promise<void> {
      this.categoryLoading = true

      const { error, data } = await serviceCategory.getAllCategory()

      if(!error && Array.isArray(data)) {
        this.allCategory = data
      }

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.categoryLoading = false
    },

    async getCategory(categoryId: string): Promise<void | Error> {
      this.categoryLoading = true

      const { error, data } = await serviceCategory.getCategory(categoryId)

      if(!error && !Array.isArray(data) && data !== null) {

        this.category = data
      }

      if(error) {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })

        return error
      }

      this.categoryLoading = false
    },

    async postCategory(category: IModalCreateOrEditCategoryData): Promise<void> {
      this.categoryLoading = true

      const { error } = await serviceCategory.postCategory({
        ...category,
        spendingLimit: +String(category.spendingLimit)
        .replace('R$', '').replaceAll('.','').replace(',','')
      })

      if(!error) {
        await this.getAllCategory()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Categoria criada com sucesso."
        })
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.categoryLoading = false
    },

    async putCategory(category: IModalCreateOrEditCategoryData, categoryId: number): Promise<void> {
      this.categoryLoading = true

      const { error } = await serviceCategory.putCategory({
        ...category,
        spendingLimit: +String(category.spendingLimit)
        .replace('R$', '').replaceAll('.','').replace(',','')
      }, categoryId)

      if(!error) {
        await this.getAllCategory()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Categoria atualizada com sucesso."
        })
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.categoryLoading = false
    },

    async deleteCategory(categoryId: number): Promise<void> {
      this.categoryLoading = true

      const { error } = await serviceCategory.deleteCategory(categoryId)

      if(!error) {
        await this.getAllCategory()
        addFeedback({
          isFeedbackActive: true,
          isError: false,
          feedbackMessage: "Categoria deletada com sucesso."
        })
      } else {
        addFeedback({
          isFeedbackActive: true,
          isError: true,
          feedbackMessage: error?.message
        })
      }

      this.categoryLoading = false
    }
  }
})
