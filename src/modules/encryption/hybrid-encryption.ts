
class HybridEncryption{
    constructor(){}
    async X3DH(){
        //storedbase 64string-uint8Array(32 bytes) in memory
        //curve 25519.
        //IK-X25519 keypairs,sPK + signature,OPK
        //ephemeral Key-
        //X3DH computation-
        //Sk=KDF(DH1||DH2||DH3||DH4)
        //first DH-ratchet to generate chainKey from RK(sk from x3dh )
        //messageKey=HKDF(chainKey, 'messageKey')
        //chain_key=HKDF(chainKey,'chainKey')--forward secrecy
        // aes256gcm.encrypt(message_key.aeskey, message_key.nonce/iv for gcm)
    }
};