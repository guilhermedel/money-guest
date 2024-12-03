import type { IItemListCategoryProp } from "../organisms/TheItemListCategory"
import type { IItemListTransactionProp } from "../organisms/TheItemListTransaction"

export interface stateCategory {
  category: IItemListTransactionProp[];
  allCategory: IItemListCategoryProp[];
}

export interface postCategoryResponse {
  message: string;
  response: IItemListCategoryProp
}