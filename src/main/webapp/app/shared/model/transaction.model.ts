import { IBankAccount } from 'app/shared/model/bank-account.model';

export interface ITransaction {
  id?: number;
  transactionValue?: number | null;
  source?: IBankAccount | null;
  destination?: IBankAccount | null;
}

export const defaultValue: Readonly<ITransaction> = {};
