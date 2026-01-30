import { Optional } from "sequelize";

export interface Auth{
    id: string;
    username: string;
    email: string;
    isEmailVerified:boolean
    password: string;
    gender: 'male'|'female',
    age: number,
    weight: number;
    height_cm:number;
    createdAt: Date;
    updatedAt: Date
};

export interface Authcreationbody extends Optional<Auth,'id'|'createdAt'|'updatedAt'>{}