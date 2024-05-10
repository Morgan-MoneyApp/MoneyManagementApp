import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IAddress } from 'app/shared/model/address.model';

export interface IUserProfile {
  id?: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: dayjs.Dayjs;
  user?: IUser | null;
  address?: IAddress | null;
}

export const defaultValue: Readonly<IUserProfile> = {};
