import type { IItemListAccountProp } from "~/interface/organisms/TheItemListAccount"

export interface stateAccount {
  accounts: IItemListAccountProp[];
  accountLoading: boolean;
}