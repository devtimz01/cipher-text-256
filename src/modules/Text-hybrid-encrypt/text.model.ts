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
       type:DataType.DATE
    })
   declare createdAt: Date;
    @Column({
       type: DataType.DATE,
       defaultValue: DataType.NOW,
       allowNull: false,
     })
declare updatedAt: Date;
};


@Table({
    tableName:'Textchat',
    timestamps:true
})
export class TextchatModel extends Model{
    @Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
        primaryKey: true
    })
   declare id:string
    @Column({
       allowNull: false,
       type:DataType.TEXT('long')
    })
   declare secretText:string
    @Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
        allowNull:false,
        unique: true
    })
   declare sender:string
    @Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
        allowNull:false,
        unique: true
    })
   declare reciever:string
   @Column({
       allowNull: false,
       defaultValue: DataType.NOW,
       type:DataType.DATE
    })
   declare createdAt: Date;
    @Column({
       type: DataType.DATE,
       defaultValue: DataType.NOW,
       allowNull: false,
     })
declare updatedAt: Date;
};