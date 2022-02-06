const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'small because critic fragile mad focus seven spring blush this exist budget',   // 12 word pnemonic
    'https://rinkeby.infura.io/v3/014ad5d1ded3455084e2d4ace5802b6b'   // link by infura node
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
       .deploy( {data: bytecode, arguments: ['Hi there!']})
       .send({gas: '1000000', from: accounts[0]});
       
    console.log('Contract deployed to', result.options.address);   
};
deploy();