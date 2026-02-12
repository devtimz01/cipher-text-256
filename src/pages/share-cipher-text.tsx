import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAuthStore } from "../services/authstore"

export function ShareCipherText(){
const[recieverUsername,setreceiverUsername]= useState('')
const token = useAuthStore((state) => state.token)
const [searchParams]= useSearchParams()
const textId = searchParams.get('id')

const shareSecretText=async(e: React.FormEvent)=>{
    e.preventDefault()
try{
    const payload={textId,recieverUsername}
    const res = await axios.post('http://localhost:3000/text/shareText', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('text shared successfuly',res.status)
}
catch(err){
    console.log(err)
}
}
return<>
        <div>
            <h2>share secret text</h2>
            <input value={recieverUsername} onChange={e=>setreceiverUsername(e.target.value)} placeholder="input reciever's username"/>
            <button onClick={shareSecretText}>share</button>
        </div>
    </>
}