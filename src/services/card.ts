import { api } from "~/axios"
import type { IApiResponse } from "~/interface/service/ResponseRequest";
import type { ICreateOrEditCardData } from "~/interface/organisms/TheModalCreateOrEditCard";
import type { IItemListCardProp, IGetListCard } from "~/interface/organisms/TheItemListCard";

const getAllCard = async (): Promise<IApiResponse<IGetListCard>> => {
  try {
    const allCard = await api.get<IGetListCard[]>('cartoes');
    return { error: null, data: allCard }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const postCard = async (
  card:  ICreateOrEditCardData
): Promise<IApiResponse<null>> => {
  try {
    await api.post<ICreateOrEditCardData, IItemListCardProp>('cartoes', card)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const putCard = async (
  card:  ICreateOrEditCardData,
  cardId: string
): Promise<IApiResponse<null>> => {
  try {
    await api.put<ICreateOrEditCardData, IItemListCardProp>(
      `cartoes/${cardId}`,
      card
    )
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const deleteCard = async (cardId: string): Promise<IApiResponse<null>> => {
  try {
    await api.delete(`cartoes/${cardId}`)
    return { error: null, data: null }
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

export default {
  getAllCard,
  postCard,
  putCard,
  deleteCard
};
