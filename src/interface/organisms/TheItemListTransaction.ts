export interface IItemListTransactionProp {
  _id: string;
  nameAccount?: string;
  nameCategory: string;
  colorCategory: string;
  dateTime: string;
  recipeName: string;
  revenueValue: string;
}

export interface IEditExpense {
  expenseCategory: string;
  expenseEstablishment: string;
  expenseName: string;
  expenseValue: string;
  _id: string;
}
export interface IEditRevenue {
  revenueName: string;
  revenueValue: string;
  _id: string;
}