export interface IModalCreateOrEditCardData {
  cardBankingName: string;
  cardName: string;
  cardLimited: string | number;
  cardNumber: string;
  cardInvoice: string;
  cardDateNumber: string;
  cardDateValidity: string;
  cardFlag: string;
}

export interface ICreateOrEditCardData {
  cardBankingName: string;
  cardName: string;
  cardLimited: string | number;
  cardNumber: string;
  cardInvoice: number;
  cardDateNumber: string;
  cardDateValidity: string;
  cardFlag: string;
}