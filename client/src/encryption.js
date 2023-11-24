import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

async function signMessage(sendAmount, recipient, privateKey) {
    const message = "Send " + sendAmount + " to " + recipient;

    //Hash Message
    const hashedMessage = keccak256(utf8ToBytes(message));

    //Sign Message
    const signature = secp256k1.sign(hashedMessage, privateKey);    
    
    const r = signature.r.toString();
    const s = signature.s.toString();
    const recoveryBit = signature.recovery;

    return {signature: {r, s, recoveryBit}, msg: hashedMessage};
}

export default signMessage;
