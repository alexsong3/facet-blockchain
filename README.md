https://github.com/eamondang/faucet-source/tree/master/src

https://web3js.readthedocs.io/en/v1.10.0/web3-eth.html#sendtransaction

https://trufflesuite.com/docs/truffle/reference/configuration/

fix err: https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5

https://docs.bscscan.com/getting-started/creating-an-account

https://docs.bnbchain.org/docs/truffle-new

truffle migrate
truffle migrate --reset

evm: https://etherscan.io/login
     https://bscscan.com/myapikey

api-key 'infura': https://app.infura.io/dashboard/ethereum/ea6174d876fb442db9e72b32e488e70e/settings/endpoints
      docs triển khai: https://docs.infura.io/tutorials/ethereum/deploy-a-contract-using-truffle

Kiếm eth testnet: https://sepoliafaucet.com/
Đọc thêm về testnet: https://www.alchemy.com/overviews/what-are-testnets

Thằng để triển khai smart contract: https://dashboard.alchemy.com/
                    docs: https://docs.alchemy.com/reference/ethereum-api-quickstart


ví main: broken chat foam pyramid credit target excuse trumpet purpose law index put

Triển khai mạng 'Sepolia': truffle migrate --reset --network sepolia
               xong paste 'contract address' vào tìm https://etherscan.io/ để tra thông tin contract

Triển khai mạng 'mainnet': truffle migrate --network mainnet
 
Trường hợp lỗi FE gọi: has not been deployed to detected network (network/artifact mismatch) => chạy lại smart contract 
tuỳ theo môi trường phát triển
      Nếu môi trường localhost thì sẽ tương thích với môi trường evm testnet hoặc mainnet
      Nhưng migrate môi trường test hoặc mainnet thì thích hợp dc cả môi trường localhost khi chuyển ví MetaMask

Test lịch sử (lấy data lưu database): https://etherscan.io/myapikey
      docs: https://docs.etherscan.io/v/sepolia-etherscan/       tuỳ chọn theo mạng evm 
      vd: https://api-sepolia.etherscan.io/api?module=account&action=balance
   &address=0x525E99c025EF36c438D1Dd17a7AB200CD4382838      //địa chỉ contract address ( key bên dưới )
   &tag=latest
   &apikey=AIZUGF6YV1J2WJCKPXVBYV8D9QFR59Y6W8   //api-key trong etherscan

1_faucet_contracts.js
=====================

   Replacing 'Faucet'
   ------------------
   > transaction hash:    0xc6287a7ecc13046d0584d2bc3c1cab3198c5a76e0a00cc67e2c11cca90e28afb
   > Blocks: 1            Seconds: 9
   > contract address:    0x525E99c025EF36c438D1Dd17a7AB200CD4382838
   > block number:        3736641
   > block timestamp:     1687337532
   > account:             0x37A884b405578a902Ba6544E0e4F2eC2E5A5e96f
   > balance:             0.488836294616475484
   > gas used:            544291 (0x84e23)
   > gas price:           2.562521337 gwei
   > value sent:          0 ETH
   > total cost:          0.001394757301037067 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 3736642)
   > confirmation number: 2 (block: 3736643)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.001394757301037067 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.001394757301037067 ETH