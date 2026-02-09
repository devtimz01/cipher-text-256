import axios from "axios"

const encrypt=async(text:string,userA:string, userB:string)=>{
    try{
    const userBKeyPairs = await axios.get('http://localhost:3000/auth/getkeypairs',{
        params:{}
    })

}
    catch(err){
        console.log(err)
    }
}