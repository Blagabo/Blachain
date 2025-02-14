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

// ✅ Transacciones válidas
const tx1 = alice.createTransaction(bob.address, 10);
if (tx1) myBlockchain.addTransaction(tx1);

const tx2 = bob.createTransaction(charlie.address, 5);
if (tx2) myBlockchain.addTransaction(tx2);

// ❌ Transacción inválida (firma incorrecta)
const fakeTx = new Wallet().createTransaction(alice.address, 15);
if (fakeTx) {
  fakeTx.signature = "firma_falsa"; // Modificamos la firma para que sea inválida
  myBlockchain.addTransaction(fakeTx);
}

myBlockchain.processBlock();
myBlockchain.printBlockchain();
