import { Injectable, NotFoundException } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@Injectable()
@WebSocketGateway({cors:true})
export class ChatGateway{
@WebSocketServer()
server:Server
constructor(){}
public socketUsers = new Map<String,String>()

async handleConnection(client:Socket){
const connectedusersId= client.handshake.auth.userId
if(connectedusersId){
    this.socketUsers.set(connectedusersId,client.id)}
}

handleDisconnect(client:Socket){
   const socketId= this.findUsersBysocketId(client.id)
   if(socketId){
   this.socketUsers.delete(socketId) }
};
findUsersBysocketId(id:string):string|undefined{
    for(const [auth,socketId] of this.socketUsers.entries()){
        if(id===socketId){
            return id
        }
    }
    return undefined;
}
getSocketId(id:string): string| undefined{
   const socketId=  this.socketUsers.get(id) as string
   if(!socketId){
    throw new NotFoundException('cannot get users socket.id')
   }
   return socketId
};
};