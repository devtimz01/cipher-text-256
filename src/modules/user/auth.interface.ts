import { Optional } from "sequelize";

export interface Auth{
    id: string;
    username: string;
    email: string;
    isEmailVerified:boolean,
    identityPreKey: string,
    signedPreKey: string,
    oneTimePreKeys: string[],
    signedPreKeySignature: string,
    password: string;
    createdAt: Date;
    updatedAt: Date
};

export interface Authcreationbody extends Optional<Auth,'id'|'createdAt'|'updatedAt'>{}