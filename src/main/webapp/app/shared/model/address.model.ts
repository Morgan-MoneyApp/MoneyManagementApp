export interface IAddress {
  id?: number;
  houseNumber?: number;
  street?: string;
  apartmentNumber?: number | null;
  city?: string;
  state?: string;
  zip?: string;
}

export const defaultValue: Readonly<IAddress> = {};
