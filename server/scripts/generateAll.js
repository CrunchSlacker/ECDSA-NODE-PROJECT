const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

//Create Private and Public Keys
const uOnePrivateKey =
    "e87d189dc3cfb1c27f21f46618afcf597e08bb4725a0d6c7bda6c131eb5875f7";
const uOnePublicKey =
    "034cc42685b69eea13c8c2513a1db2c6d87a3dcb29c9372c12543ffd367e8336c1";

const uTwoPrivateKey =
    "89d0e676836f5161c5022a8f8d257df64b6e814447c7fc8444bec12248117a93";
const uTwoPublicKey =
    "025987d8bc63863480f402faa53b3b5532443ab138a6915c8ab793ea5cbed7c58e";
    

const uThreePrivateKey =
    "306054ea76ba1036cd8ca5db2cfbf463a865ce8169f56fe518cfe6500cc1ded4";
const uThreePublicKey =
    "02288bc6d44eb28b9e2bae580d2eec239e7946c14c59cc1ec853e770693ba1bc41";

//Get ETH addresses from public keys
const uOneAddress =
    "0x" +
    toHex(
        keccak256(secp256k1.getPublicKey(uOnePrivateKey).slice(1)).slice(-20)
    );
const uTwoAddress =
    "0x" +
    toHex(
        keccak256(secp256k1.getPublicKey(uTwoPrivateKey).slice(1)).slice(-20)
    );
const uThreeAddress =
    "0x" +
    toHex(
        keccak256(secp256k1.getPublicKey(uThreePrivateKey).slice(1)).slice(-20)
    );

const keys = {
    uOneKey: uOneAddress,
    uTwoKey: uTwoAddress,
    uThreeKey: uThreeAddress,
    [uOnePrivateKey]: uOnePublicKey,
    [uTwoPrivateKey]: uTwoPublicKey,
    [uThreePrivateKey]: uThreePublicKey,
};

// console.log(uOneAddress); //0x849667d3be2b9b79cc3d856a184a671b39fe8245
// console.log(uTwoAddress); //0x2d8fba411d06e0229dc2c0709d11785bbdbef6b0
// console.log(uThreeAddress); //0x94f8ebef374c3244140aae3a150bf7de55155703

console.log(toHex(secp256k1.utils.randomPrivateKey()));
// console.log(toHex(secp256k1.getPublicKey(uThreePrivateKey)));

module.exports = { keys: keys };
