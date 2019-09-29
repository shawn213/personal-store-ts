import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({tableName: 'product'})
export class Product extends Model<Product> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id?: string;

  @Column
  name!: string;

  @Column({
    type: DataType.DECIMAL
  })
  price!: number;

  @Column({
    type: DataType.JSON
  })
  types!: any;

  @Column
  startDate!: Date;

  @Column
  endDate!: Date;
  
  @Column
  link!: string;
  
  @Column
  deletehash!: string;

  @Column
  content!: String;

  @Column({
    type: DataType.JSON
  })
  images!: any;
}
