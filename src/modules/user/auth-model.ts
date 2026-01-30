import { Model, Table, Column, DataType } from "sequelize-typescript";

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
    type: DataType.ENUM('male', 'female'),
    allowNull: false,
  })
  declare gender: 'male' | 'female';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare age: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  declare weight: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
  })
  declare height_cm: number;

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
}