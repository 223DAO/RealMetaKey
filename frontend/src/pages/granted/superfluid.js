import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./createFlow.css";
import { ethers } from "ethers";
// import { contract } from "../../utils/Contract";
import { metamask } from "../../utils/MetaMask";

//where the Superfluid logic takes place
async function createFlow(recipient, flowRate) {

  // recipient = '0x3A331FdE6FB5cA4BEbBC3e8208239dfe1a2fdd81' // NFTHack Admin
  // flowRate = 166666666666666 // 0.01 / minute

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const sf = await Framework.create({
    networkName: "mumbai",
    provider: provider
  });

  // const signer = sf.createSigner({
  //   privateKey:
  //     // private key of test account
  //     // 0x9903eF9695ED625ce773843942F10afE1d1D2BBD
  //     "",
  //   provider: new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  // });

  const token = "0x96b82b65acf7072efeb00502f45757f254c2a0d4"; // MATICx

  const account = metamask.account
  const signer = provider.getSigner()

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      sender: account,
      receiver: recipient,
      flowRate: flowRate,
      superToken: token,
      // userData?: string
      overrides: {
        gasLimit: 1000000,
        gasPrice: 3e9
      }
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Kovan
    Super Token: DAIx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export const CreateFlow = () => {
  const [recipient, setRecipient] = useState("0x3A331FdE6FB5cA4BEbBC3e8208239dfe1a2fdd81");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState("166666666666666");
  const [flowRateDisplay, setFlowRateDisplay] = useState("");

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    // if (typeof Number(flowRate) === "number") {
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay.toString());
    // setFlowRateDisplay(() => calculateFlowRate(e.target.value));
    // }
  };

  return (
    <div>
      <h2>Create a Grant</h2>
      <Form>
        <FormGroup className="mb-3">
          <FormControl
            name="recipient"
            disabled={true}
            value={recipient}
            onChange={handleRecipientChange}
            placeholder="Enter your Ethereum address"
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl
            name="flowRate"
            value={flowRate}
            onChange={handleFlowRateChange}
            placeholder="Enter a flowRate in wei/second"
          ></FormControl>
        </FormGroup>
        <CreateButton
          onClick={() => {
            setIsButtonLoading(true);
            createFlow(recipient, flowRate);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Grant!
        </CreateButton>
      </Form>

      <div className="description">
        <p>
          You can see the flow in <a href="https://app.superfluid.finance/dashboard" target="_blank">superfluid dashboard</a>
        </p>
        <div className="calculation">
          <p>Your flow will be equal to:</p>
          <p>
            <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> MATICx/month
          </p>
        </div>
      </div>
    </div>
  );
};
