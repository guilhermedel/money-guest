import { api } from "~/axios"
import type { IApiResponse } from "~/interface/service/ResponseRequest";
import type { IModalCreateOrEditRevenueData } from "~/interface/organisms/TheModalCreateOrEditRevenue"
import type { IItemListTransactionProp } from "~/interface/organisms/TheItemListTransaction"

const getTransactionRevenue = async (): Promise<IApiResponse<IItemListTransactionProp>> => {
  try {
    const transactionRevenue = await api.get<IItemListTransactionProp[]>('receitas/entrada')
    return { error: null, data: transactionRevenue }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const postTransactionRevenue = async (
  transaction:  IModalCreateOrEditRevenueData
): Promise<IApiResponse<null>> => {
  try {
    await api.post<IModalCreateOrEditRevenueData, IItemListTransactionProp>('receitas', transaction)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const putTransactionRevenue = async (
  transaction:  IModalCreateOrEditRevenueData,
  transactionId: string
): Promise<IApiResponse<null>> => {
  try {
    await api.put<IModalCreateOrEditRevenueData, IItemListTransactionProp>(
      `receitas/${transactionId}`,
      transaction
    )
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const deleteTransactionRevenue = async (transactionId: string): Promise<IApiResponse<null>> => {
  try {
    await api.delete(`receitas/${transactionId}`)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

export default {
  getTransactionRevenue,
  postTransactionRevenue,
  putTransactionRevenue,
  deleteTransactionRevenue
}
