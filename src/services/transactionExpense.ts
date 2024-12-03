import { api } from "~/axios"
import type { IApiResponse } from "~/interface/service/ResponseRequest";
import type { IModalCreateOrEditExpenseData } from "~/interface/organisms/TheModalCreateOrEditExpense"
import type { IItemListTransactionProp } from "~/interface/organisms/TheItemListTransaction"

const getTransactionExpense = async (): Promise<IApiResponse<IItemListTransactionProp>> => {
  try {
    const transactionExpense = await api.get<IItemListTransactionProp[]>('receitas/saida');
    return { error: null, data: transactionExpense }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const postTransactionExpense = async (
  transaction:  IModalCreateOrEditExpenseData
): Promise<IApiResponse<null>> => {
  try {
    await api.post<IModalCreateOrEditExpenseData, IItemListTransactionProp>('receitas', transaction)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const putTransactionExpense = async (
  transaction:  IModalCreateOrEditExpenseData,
  transactionId: string
): Promise<IApiResponse<null>> => {
  try {
    await api.put<IModalCreateOrEditExpenseData, IItemListTransactionProp>(
      `receitas/${transactionId}`,
      transaction
    )
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const deleteTransactionExpense = async (transactionId: string): Promise<IApiResponse<null>> => {
  try {
    await api.delete(`receitas/${transactionId}`)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

export default {
  getTransactionExpense,
  postTransactionExpense,
  putTransactionExpense,
  deleteTransactionExpense
};
