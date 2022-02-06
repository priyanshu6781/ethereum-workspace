const assert = require('assert');
const ganache = require('ganache-cli');   // ganache is a local testing network
const Web3 = require('web3');  //Web3 is constructor, so 'W' is capital
                               // web3 is a lib that is portal to etherum world
const web3 = new Web3(ganache.provider());  // here Web3() is contructor function
const { interface, bytecode } = require('../compile');   //bytecode is our compilled contract

let accounts;
let inbox; 

beforeEach(async () => {
    // get alist of all accounts
    accounts = await web3.eth.getAccounts();

    // use one accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!'] })
      .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!')
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});


// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }

// let car;  // assigning here beacuse all the function below could access it

// beforeEach(() => {
//     car = new Car();   // now we can comment out the same line which is written below
// });

// describe('Car', () => {
//     it('can park', () => {
//         // const car = new Car(); 
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         // const car = new Car();
//         assert.equal(car.drive(), 'vroom');
//     });
// });