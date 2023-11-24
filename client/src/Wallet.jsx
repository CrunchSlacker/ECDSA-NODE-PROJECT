import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    privateKey,
    setPrivateKey,
}) {
    async function onChange(evt) {
        setAddress("");
        const privateKey = evt.target.value;
        setPrivateKey(privateKey);

        //Checks for valid private key
        if (secp256k1.utils.isValidPrivateKey(privateKey)) {
            let address;
            try {
                address =
                    "0x" +
                    toHex(
                        keccak256(
                            secp256k1.getPublicKey(privateKey).slice(1)
                        ).slice(-20)
                    );
                setAddress(address);
            } catch (error) {
                console.log(error);
            }

            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setAddress("Invalid Key");
            setBalance(0);
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>
            <label>
                Private Key
                <input
                    placeholder="Type your private key here"
                    value={privateKey}
                    onChange={onChange}
                ></input>
            </label>
            <h3>Address: {address}</h3>
            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
