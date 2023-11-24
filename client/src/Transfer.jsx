import { useState } from "react";
import server from "./server";
import signMessage from "./encryption";

export let sendAmt, reci;

function Transfer({ address, setBalance, privateKey}) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();
        

        try {
          const signature = await signMessage(sendAmount, recipient, privateKey);
          console.log(signature);
          const {
            data: { balance },
          } = await server.post(`send`, {
            sender: address,
            amount: parseInt(sendAmount),
            recipient,
            signature: signature.signature,
            msg: signature.msg
          });
          setBalance(balance);
        } catch (ex) {
          //.response.data.message
          console.log(ex);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    );
}

export default Transfer;
