import { OrderByDirection } from 'src/common/enums/order-by.enum';

export type OrderByDto = {
  field: string;
  direction: OrderByDirection;
};
