import { api } from "~/axios"
import type { IApiResponse } from "~/interface/service/ResponseRequest"
import type { IModalCreateOrEditCategoryData } from '~/interface/organisms/TheModalCreateOrEditCategory'
import type { IItemListCategoryProp } from "~/interface/organisms/TheItemListCategory"
import type { postCategoryResponse } from "~/interface/pages/category"


const getAllCategory = async (): Promise<IApiResponse<IItemListCategoryProp>> => {
  try {
    const allCategory = await api.get<IItemListCategoryProp[]>('categorias')
    return { error: null, data: allCategory }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const getCategory = async (categoryId: string): Promise<IApiResponse<IItemListCategoryProp>> => {
  try {
    const category = await api.get<IItemListCategoryProp>(`categorias/${categoryId}`)
    return { error: null, data: category }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const postCategory = async (
  category:  IModalCreateOrEditCategoryData
): Promise<IApiResponse<null>> => {
  try {
    const response = await api.post<IModalCreateOrEditCategoryData, postCategoryResponse>('categorias', category)

    console.log(response)

    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const putCategory = async (
  category:  IModalCreateOrEditCategoryData,
  categoryId: number
): Promise<IApiResponse<null>> => {
  try {
    await api.put<IModalCreateOrEditCategoryData, IItemListCategoryProp>(
      `categorias/${categoryId}`,
      category
    )
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const deleteCategory = async (categoryId: number): Promise<IApiResponse<null>> => {
  try {
    await api.delete(`categorias/${categoryId}`)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

export default {
  getAllCategory,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
}
