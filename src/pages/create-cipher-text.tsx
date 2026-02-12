import axios from "axios"
import { useState } from "react"
import { useAuthStore } from "../services/authstore"
import { useNavigate } from 'react-router-dom';

export function CipherText(){
const[secretText,setsecretText]= useState('')
const [postedText,setPostedText] = useState('')
const [textId, setTextId] = useState('')
const token = useAuthStore((state) => state.token)
const navigate = useNavigate()

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
      setPostedText(secretText)
      setTextId(response.data.id)
      setsecretText('')
      console.log('text created successfuly',payload, response.status)
   }
   catch(err){
    console.log('text creation failed', err)
   }
}
const shareText=()=>{
       try{navigate(`/sharetext?id=${textId}`)}
       catch(err){console.log(err)}}
return<>
    <div>
       <div>
         <h1>create secret text <span>Note:these texts are end-to-end-encrypted</span></h1>
        <input value={secretText} onChange={e=>setsecretText(e.target.value)} className="1px flex-col bg-grey-700 " type='text'/><br></br>
        <button onClick={postSecretText}>post</button>
       </div>

       <div>
         <div>{postedText}</div> <div><button onClick={shareText} disabled={!textId}>sharetext</button></div>
          <div>
             <button onClick={() => navigate('/notification')}>
                 View Notifications
             </button>
          </div>
       </div>
    </div>
    </>
};