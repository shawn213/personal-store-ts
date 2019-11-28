import { Table, Model, Column, DataType, AllowNull, Length } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    unique: true
  })
  userId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  username!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(200)
  })
  password!: string;

  @AllowNull(false)
  @Column({
    unique: true,
    type: DataType.STRING(10)
  })
  cellPhone!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    unique: true
  })
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0
  })
  authority!: number;
}
