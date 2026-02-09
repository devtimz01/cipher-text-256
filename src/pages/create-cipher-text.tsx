import axios from "axios"
import { useState } from "react"
import { useAuthStore } from "../services/authstore"

export function CipherText(){
const[secretText,setsecretText]= useState('')
const token = useAuthStore((state) => state.token)

const postSecretText=async()=>{
   try{
    if(!token){
        console.error('Token is null! Login first.');
        return;
    }
     const payload={secretText}
     console.log(payload)
     const response = await axios.post('http://localhost:3000/text/createText', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
      console.log('text created successfuly',payload, response.status)
   }
   catch(err){
    console.log('text creation failed', err)
   }
}
return<>
    <div>
        <h1>create secret text <span>Note:these texts are end-to-end-encrypted</span></h1>
        <input value={secretText} onChange={e=>setsecretText(e.target.value)} className="1px flex-col bg-grey-700 " type='text'/><br></br>
        <button onClick={postSecretText}>post</button>
    </div>
    </>
};