import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName:'Text',
    timestamps:true
})
export class TextModel extends Model{
    @Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
        primaryKey: true
    })
   declare id:string
    @Column({
       allowNull: false,
       type:DataType.STRING
    })
   declare secretText:string
   @Column({
       allowNull: false,
       defaultValue: DataType.NOW,
       type:DataType.STRING
    })
   declare createdAt: Date;
    @Column({
       type: DataType.DATE,
       defaultValue: DataType.NOW,
       allowNull: false,
     })
declare updatedAt: Date;
};