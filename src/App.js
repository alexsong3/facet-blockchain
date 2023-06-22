import './App.css';
import Web3 from "web3";
import { useCallback, useState, useEffect } from 'react';
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  //reload lại trang
  const [shouldReload, reload] = useState(false);
  const reloadEffect = () => reload(!shouldReload)

  //Thay đổi tài khoản eth, reload lại thông tin
  const setAccountLister = (provider) => {
    provider.on("accountChanged", accounts => setAccount(accounts[0]))
  }

  //load metamask - lấy thông tin ví
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Faucet", provider)

      // debugger

      if (provider) {
        setAccountLister(provider)
        // provider.request({ method: "eth_requestAccounts" })
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        })
      } else {
        console.error("please, Install Metamask")
      }
    }
    loadProvider()
  }, []);

  //Lấy thông tin chi tiết trong ví
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
    web3Api.web3 && getAccount() && reloadEffect()
  }, [web3Api.web3]);

  //lấy số eth
  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, "ether"))

    }

    web3Api.contract && loadBalance()
  }, [web3Api, shouldReload]);

  //Thêm eth, donate
  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("0.001", "ether")
    })
    reloadEffect()
  }, [web3Api, account])

  //rút eth
  const withdraw = async () => {
    const { contract, web3 } = web3Api
    const withdrawAmount = web3.utils.toWei("0.0005", "ether")
    await contract.withdraw(withdrawAmount, {
      from: account
    })
    reloadEffect()
  }

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="is-size-5">DApp: The Joker</div>
        <div className='is-size-5'>“Joker luôn muốn gợi lên phần đen tối trong mỗi con người!”</div>
        <div className="balance-view is-size-2">
          Current Balance: <strong>{balance}</strong> ETH
        </div>
        <button className="button is-primary mr-5"
          onClick={addFunds}
        >Donate</button>
        <button className="button is-danger mr-5"
          onClick={withdraw}
        >Withdraw</button>
        {!account &&
          <button className="button is-link"
            onClick={() =>
              web3Api.provider.request({ method: "eth_requestAccounts" })
            }
          >
            Connect Wallets
          </button>
        }
        <hr />
        <span>
          <p>
            <strong>Accounts Address: </strong>
            {
              account ? account : "Accounts Denined"
            }
          </p>
        </span>
      </div>
    </div>
  );
}

export default App;