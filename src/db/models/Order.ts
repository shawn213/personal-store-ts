import { Table, Column, DataType, AllowNull, Model } from 'sequelize-typescript';

@Table({ tableName: 'order' })
export class Order extends Model<Order> {
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  userId!: string;

  @AllowNull(false)
  @Column
  orderTime!: Date;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL
  })
  amount!: number;

  @Column({
    type: DataType.STRING(10)
  })
  status!: string;

  @Column({
    type: DataType.STRING(50)
  })
  shipmentOrderNo!: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSON
  })
  address!: any;

  @AllowNull(false)
  @Column({
    type: DataType.JSONB
  })
  products!: any;
}
