import { Blockchain } from "@core/Blockchain.js";
import { Wallet } from "@models/Wallet.js";

const myBlockchain = new Blockchain();

const alice = new Wallet();
const bob = new Wallet();
const charlie = new Wallet();

alice.stakeTokens(50);
bob.stakeTokens(30);
charlie.stakeTokens(20);

myBlockchain.addValidator(alice);
myBlockchain.addValidator(bob);
myBlockchain.addValidator(charlie);

const tx1 = alice.createTransaction(bob.address, 10);
if (tx1) myBlockchain.addTransaction(tx1);

const tx2 = bob.createTransaction(charlie.address, 5);
if (tx2) myBlockchain.addTransaction(tx2);

myBlockchain.processBlock();
myBlockchain.printBlockchain();
