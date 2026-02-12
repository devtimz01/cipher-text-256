import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../services/authstore"

export function Login(){
const [username,setUsername]= useState('')
const [password,setPassword]= useState('')
const setToken = useAuthStore((state) => state.setToken);
const navigate = useNavigate()

const signIn=async(e: React.FormEvent)=>{
    e.preventDefault()
    try{
        const payload={
            username,
            password 
        }
        console.log('Sending payload:', payload);
      const res = await axios.post('http://localhost:3000/auth/login', payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.data?.accessToken) {
      throw new Error('No accessToken in response');
    }
    const {accessToken,user}= res.data
    setToken(accessToken,user.id)
    console.log('accessToken:', accessToken,user.id)
    navigate('/ciphertext');
    }
    catch(err){
        console.log('login failed', err)
    }
}
return<>
    <form onSubmit={signIn}>
        <input type="text" placeholder="username" required value={username} onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder="password"  required value={password} onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">login</button>
    </form>
    </>
};