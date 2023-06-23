import './App.css';
import Web3 from "web3";
import { useCallback, useState, useEffect } from 'react';
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
//antd
import { message, Table } from 'antd';
import axios from 'axios';

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

      // debugger

      if (provider) {
        const contract = await loadContract("Faucet", provider)
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
    if (account) {
      const { contract, web3 } = web3Api
      try {
        await contract.addFunds({
          from: account,
          value: web3.utils.toWei("0.001", "ether")
        })
        info('Donate thành công!')
      } catch (error) {
        // console.log(error)
        info('Giao dịch đã huỷ bỏ!')
      }
      reloadEffect()
    } else {
      info('Vui lòng kết nối ví MetaMask - Mạng Sepolia test!')
    }
  }, [web3Api, account])

  //rút eth
  const withdraw = async () => {
    if (account) {
      const { contract, web3 } = web3Api
      try {
        const withdrawAmount = web3.utils.toWei("0.0005", "ether")
        const song = await contract.withdraw(withdrawAmount, {
          from: account
        })
        info('Rút thành công!')
      } catch (error) {
        info('Giao dịch đã huỷ bỏ!')
      }
      reloadEffect()
    } else {
      info('Vui lòng kết nối ví MetaMask - Mạng Sepolia test!')
    }
  }

  //Liên kết ví MetaMask
  const connectWallets = async () => {
    try {
      await web3Api.provider.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
  }

  //Lấy lịch sử giao dịch contract
  const [dataHistory, setDataHistory] = useState([]);
  useEffect(() => {
    const CONTRACT_ADDRESS = '0x525E99c025EF36c438D1Dd17a7AB200CD4382838'
    const API_KEY_ETH = 'AIZUGF6YV1J2WJCKPXVBYV8D9QFR59Y6W8'
    axios.get(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${CONTRACT_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=3&sort=asc&apikey=${API_KEY_ETH}`)
      .then(res => {
        const dataOk = res.data;
        if (dataOk?.status === '1') {
          setDataHistory(dataOk?.result)
        }
      })
      .catch(error => console.log(error));

  }, [web3Api, shouldReload]);

  const columns = [
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 50
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 50
    }
  ];

  ///antd
  const [messageApi, contextHolder] = message.useMessage();
  const info = (message) => {
    messageApi.info(message);
  };

  return (
    <div className="faucet-wrapper">
      {contextHolder}
      <div className="faucet">
        <div className="is-size-5">DApp: The Joker</div>
        {/* <div className='is-size-5'>“Joker luôn muốn gợi lên phần đen tối trong mỗi con người!”</div> */}
        <div className="balance-view is-size-2">
          Current Balance: <strong>{balance ? balance : 0}</strong> ETH
        </div>
        <button className="button is-primary mr-5"
          onClick={addFunds}
        >Donate</button>
        <button className="button is-danger mr-5"
          onClick={withdraw}
        >Withdraw</button>
        {!account &&
          <button className="button is-link"
            onClick={() => connectWallets()}
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

        <hr />
        <a className="button is-link mr-5" href="https://sepolia.etherscan.io/address/0x525E99c025EF36c438D1Dd17a7AB200CD4382838" target="_blank">Transaction History</a>
        <Table columns={columns} dataSource={dataHistory} pagination={false} />
      </div>
    </div>
  );
}

export default App;