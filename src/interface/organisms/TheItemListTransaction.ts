export interface IItemListTransactionProp {
  _id: string;
  nameAccount?: string;
  nameCategory: string;
  colorCategory: string;
  dateTime: string;
  recipeName: string;
  revenueValue: string;
  accountBankingName: string;
  nameAccountBanking: string;
}

export interface IEditExpense {
  expenseBankingName: string;
  expenseCategory: string;
  expenseEstablishment: string;
  expenseName: string;
  expenseValue: string;
  _id: string;
}
export interface IEditRevenue {
  revenueBankingName: string;
  revenueName: string;
  revenueValue: string;
  _id: string;
}