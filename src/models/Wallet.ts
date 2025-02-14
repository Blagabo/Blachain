import { Transaction } from "@models/Transaction.js";
import { CryptoUtils } from "@utils/Crypto.js";

export class Wallet {
  address: string;
  privateKey: string;
  balance: number;
  stake: number;

  constructor() {
    const { publicKey, privateKey } = CryptoUtils.generateKeyPair();
    this.address = publicKey;
    this.privateKey = privateKey;
    this.balance = 100; // Saldo inicial
    this.stake = 0;
  }

  stakeTokens(amount: number): boolean {
    if (amount > this.balance) {
      console.log(`${this.address} no tiene suficientes fondos para stakear.`);
      return false;
    }
    this.balance -= amount;
    this.stake += amount;
    return true;
  }

  createTransaction(recipient: string, amount: number): Transaction | null {
    if (amount > this.balance) {
      console.log("Fondos insuficientes para la transacción.");
      return null;
    }
    const data = `${this.address}-${recipient}-${amount}`;
    const signature = CryptoUtils.signTransaction(this.privateKey, data);
    return new Transaction(this.address, recipient, amount, signature);
  }
}
