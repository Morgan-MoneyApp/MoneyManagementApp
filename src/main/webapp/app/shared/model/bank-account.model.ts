import { IUserProfile } from 'app/shared/model/user-profile.model';
import { Type } from 'app/shared/model/enumerations/type.model';

export interface IBankAccount {
  id?: number;
  accountNumber?: number | null;
  routingNumber?: number | null;
  balance?: number | null;
  type?: keyof typeof Type;
  accountHolder?: IUserProfile | null;
}

export const defaultValue: Readonly<IBankAccount> = {};
