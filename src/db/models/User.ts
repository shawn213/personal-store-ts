import {Table, Model, Column, DataType, AllowNull} from 'sequelize-typescript';

@Table({tableName: 'user'})
export class User extends Model<User> {
  @AllowNull
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @AllowNull
  @Column
  username!: string;

  @AllowNull
  @Column
  password!: string;

  @Column({
    unique: true
  })
  email!: string;
}
