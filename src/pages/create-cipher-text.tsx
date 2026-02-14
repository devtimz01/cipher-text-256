import axios from "axios"
import { useState } from "react"
import { useAuthStore } from "../services/authstore"
import { useNavigate } from 'react-router-dom';
import { getLocalKeyBundle } from "../services/hybrid-encrypt/keybundle";
import sodium from "libsodium-wrappers";
import { jwtDecode } from "jwt-decode";

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
    interface DecodedToken {
    username: string;
    id: string;
    iat: number;
    exp: number;}

    const decodedUseraname = jwtDecode<DecodedToken>(token).username
    console.log(decodedUseraname)
    const self_public_key = await axios.get('http://localhost:3000/auth/getkeypairs', {
       params: {username: decodedUseraname},
       headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}});
      if(!self_public_key){
         throw new Error('cannot get public key')
      };

const {Identity_Key,Signed_PreKey,OneTime_PreKeys} = self_public_key.data;

const keyBundles = getLocalKeyBundle();

const ek_self = sodium.crypto_box_keypair();

const dh1 = sodium.crypto_scalarmult(
  keyBundles.identityPrivate,
  sodium.from_base64(Identity_Key) 
);

const dh2 = sodium.crypto_scalarmult(
  ek_self.privateKey,
  sodium.from_base64(Identity_Key) 
);

const dh3 = sodium.crypto_scalarmult(
  ek_self.privateKey,
  sodium.from_base64(Signed_PreKey) 
);

keyBundles.oneTimePrivateKeys.pop();
const opk_public = OneTime_PreKeys[0]; 
const dh4 = sodium.crypto_scalarmult(
  ek_self.privateKey,
  sodium.from_base64(opk_public) 
);
const x3dh_compute = new Uint8Array([...dh1, ...dh2, ...dh3, ...dh4]);
const SK = sodium.crypto_hash_sha512(x3dh_compute); 
const rootKey = SK.slice(0, 32);
const chainKey = SK.slice(32);

let currentRootKey = rootKey;  
let currentChainKey = chainKey;  

const dhOutput = sodium.crypto_scalarmult(
  ek_self.privateKey,                    
  sodium.from_base64(Signed_PreKey)      
);

const dhConcat = new Uint8Array([...currentRootKey, ...dhOutput]);
const h = sodium.crypto_hash_sha512(dhConcat);

currentRootKey = h.slice(0, 32);  
currentChainKey = h.slice(32);     


const msgH = sodium.crypto_hash_sha256(
  new Uint8Array([...currentChainKey, 0x01])
);

const messageKey = msgH.slice(0, 32);
currentChainKey = msgH.slice(32);  

const iv = sodium.randombytes_buf(12); 

const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
  secretText,
  null,
  null,
  iv,
  messageKey
);

const payload={secretText: sodium.to_base64(ciphertext)}
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