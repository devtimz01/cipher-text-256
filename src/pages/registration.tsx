import { useState } from "react"
import axios from 'axios'
import sodium from 'libsodium-wrappers'

export function Registration(){
const [username,setUsername]= useState('')
const [password,setPassword]= useState('')
const [email,setEmail] = useState('')

const register=async(e: React.FormEvent)=>{
    e.preventDefault()
   try{const identityKeyPair = sodium.crypto_sign_keypair();
    const signedPreKeyPair = sodium.crypto_kx_keypair();
    const signature = sodium.crypto_sign_detached(
      signedPreKeyPair.publicKey,
      identityKeyPair.privateKey
    );
    
    const oneTimeKeys = Array.from({ length: 100 }, () => 
      sodium.crypto_kx_keypair()
    );
    const payload = {
      username,
      email,
      password,
      identityPreKey: sodium.to_base64(identityKeyPair.publicKey),
      signedPreKey: sodium.to_base64(signedPreKeyPair.publicKey),
      signedPreKeySignature: sodium.to_base64(signature),
      oneTimePreKeys: oneTimeKeys.map(k => sodium.to_base64(k.publicKey))
    };
    
    console.log('Sending payload:', payload); // Add this!
    
    const res = await axios.post('http://localhost:3000/auth/signup', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //so i stored private keys in localstorage
    localStorage.setItem('identityPrivateKey', sodium.to_base64(identityKeyPair.privateKey));
    localStorage.setItem('signedPreKeyPrivate', sodium.to_base64(signedPreKeyPair.privateKey));
    localStorage.setItem('oneTimePrivateKeys', JSON.stringify(
      oneTimeKeys.map(k => sodium.to_base64(k.privateKey))
    ));
    console.log('new user created',username, res.status)
}
    catch(err){
        console.log('registration failed', err)
    }
};

return<>
    <form   onSubmit={register}>
        <input type="text" placeholder="username" required value={username} onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder="password"  required value={password} onChange={e=>setPassword(e.target.value)}/>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <button type="submit" >signup</button>
    </form>
</>
};
