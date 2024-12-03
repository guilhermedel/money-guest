export interface IItemListCardProp {
  _id: string;
  cardName: string;
  cardFlag: string;
  cardLimited: string;
  cardInvoice: string;
  cardPercentageLimited: string;
  cardStatus: string;
  cardNumber: string;
  cardLastNumber: string;
}
export interface IGetListCard {
  _id: string;
  cardName: string;
  cardFlag: string;
  cardNumber: string;
  cardLimited: number;
  cardInvoice: number;
  cardDateValidity: string;
}