const { secp256k1 } = require("ethereum-cryptography/secp256k1");

function verify(signature, msg) {
    //Reconstruct Signature
    const reconstructedSignature = new secp256k1.Signature(
        BigInt(signature.r),
        BigInt(signature.s),
        signature.recoveryBit
    );

    //Retrieves Public Key
    const publicKey = reconstructedSignature.recoverPublicKey(msg).toHex();
    
    //Return verification
    return secp256k1.verify(reconstructedSignature, msg, publicKey);
}

module.exports = { verify };
