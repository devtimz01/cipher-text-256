import { useState,useEffect } from "react"
import { io } from "socket.io-client"
import { useAuthStore } from "../services/authstore"

export function Notification(){
const [notification,setNotification]= useState('')
const id= useAuthStore((state)=>state.id)
const token = useAuthStore((state)=>state.token)

console.log('Store id in Notification:', id)
useEffect(() => {
  if (!id||!token) {
    console.log('No userId available')
    return
  }
  
  const socket = io('http://localhost:3000', {
    auth: { userId: id } 
  })
  
  socket.on('connect', () => {
    console.log('Connected with userId:', id)
  })
  
  socket.on('connect_error', (err) => {
    console.log('Connection error:', err.message)
  })
  socket.on('text-notifs',(data)=>{
      console.log(data) 
      setNotification(data.message)   
  })
}, [id,token])
    
return<>
       <div>
          {notification}
       </div>
    </>
};