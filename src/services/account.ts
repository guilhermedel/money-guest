import { api } from "~/axios"
import type { IApiResponse } from "~/interface/service/ResponseRequest"
import type { IModalCreateOrEditAccountData } from "~/interface/organisms/TheModalCreateOrEditAccountData"
import type { IItemListAccountProp } from "~/interface/organisms/TheItemListAccount"

const getAllAccount = async (): Promise<IApiResponse<IItemListAccountProp>> => {
  try {
    const allAccount = await api.get<IItemListAccountProp[]>('contas');
    return { error: null, data: allAccount }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const postAccount = async (
  account:  IModalCreateOrEditAccountData
): Promise<IApiResponse<null>> => {
  try {
    await api.post<IModalCreateOrEditAccountData, IItemListAccountProp>('contas', account)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const putAccount = async (
  account:  IModalCreateOrEditAccountData,
  accountId: string
): Promise<IApiResponse<null>> => {
  try {
    await api.put<IModalCreateOrEditAccountData, IItemListAccountProp>(
      `contas/${accountId}`,
      account
    )
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const deleteAccount= async (accountId: string): Promise<IApiResponse<null>> => {
  try {
    await api.delete(`contas/${accountId}`)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

export default {
  getAllAccount,
  postAccount,
  putAccount,
  deleteAccount
};
