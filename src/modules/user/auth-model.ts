import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({
  tableName: 'Auth',
  timestamps: true,
})
export class AuthModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  })
  declare isEmailVerified: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  declare updatedAt: Date;
  @Column({
    allowNull: true,
    type:DataType.TEXT('long')

  })
  declare Identity_PreKey: string
  @Column({
    allowNull: false,
    type:DataType.TEXT('long')
  })
  declare Signed_PreKey: string
  @Column({
    type:DataType.JSON,
    allowNull: false,
  })
  declare Onetime_PreKeys: string[]
  @Column({
    type:DataType.TEXT('long'),
    allowNull: false
  })
  declare Signed_PreKey_Signature: string

};