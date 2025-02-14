import { Block } from "@models/Block.js";
import { Transaction } from "@models/Transaction.js";
import { Wallet } from "@models/Wallet.js";
import { CryptoUtils } from "@utils/Crypto.js";

export class Blockchain {
  chain: Block[];
  validators: Wallet[];
  pendingTransactions: Transaction[];
  REWARD_AMOUNT = 5; // Tokens otorgados al validador por cada bloque validado
  SLASHING_AMOUNT = 10; // Penalización si un validador intenta validar una transacción inválida

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.validators = [];
    this.pendingTransactions = [];
  }

  private createGenesisBlock(): Block {
    return new Block(0, "0", "Genesis Block", null);
  }

  addValidator(wallet: Wallet) {
    this.validators.push(wallet);
  }

  selectValidator(): Wallet | null {
    if (this.validators.length === 0) return null;
    const totalStake = this.validators.reduce((sum, v) => sum + v.stake, 0);
    if (totalStake === 0) return null;

    let randomPoint = Math.random() * totalStake;
    for (const validator of this.validators) {
      if (randomPoint < validator.stake) return validator;
      randomPoint -= validator.stake;
    }

    return this.validators[0] ?? null;
  }

  addTransaction(transaction: Transaction) {
    if (
      !CryptoUtils.verifySignature(
        transaction.sender,
        `${transaction.sender}-${transaction.recipient}-${transaction.amount}`,
        transaction.signature
      )
    ) {
      console.log("⚠️ Transacción inválida: Firma no válida.");

      // **🚨 Penalizar al validador (slashing)**
      const validator = this.validators.find(
        (w) => w.address === transaction.sender
      );
      if (validator) {
        validator.stake = Math.max(0, validator.stake - this.SLASHING_AMOUNT); // Evita saldo negativo
        console.log(
          `❌ ${validator.address.substring(0, 10)}... fue penalizado con ${this.SLASHING_AMOUNT} tokens.`
        );
      }

      return false;
    }

    this.pendingTransactions.push(transaction);
    console.log("✅ Transacción añadida al pool.");
    return true;
  }

  printBlockchain() {
    console.log("\n📜 Blockchain:");
    this.chain.forEach((block) => {
      console.log(`Index: ${block.index}`);
      console.log(`Timestamp: ${block.timestamp}`);
      console.log(`Validator: ${block.validator}`);
      console.log(`Previous Hash: ${block.previousHash}`);
      console.log(`Hash: ${block.hash}`);

      // Solo intentamos parsear si `block.data` contiene transacciones válidas
      if (block.index !== 0) {
        // 🔹 Evita parsear el bloque génesis
        try {
          const transactions = JSON.parse(block.data);
          if (transactions.length > 0) {
            console.log("\n🔹 Transacciones en este bloque:");
            transactions.forEach(
              (tx: { sender: string; recipient: string; amount: number }) => {
                const senderWallet = this.validators.find(
                  (w) => w.address === tx.sender
                );
                const recipientWallet = this.validators.find(
                  (w) => w.address === tx.recipient
                );
                console.log(
                  `💰 ${tx.sender.substring(0, 10)}... ➝ ${tx.recipient.substring(0, 10)} : ${tx.amount} tokens`
                );
                if (senderWallet && recipientWallet) {
                  console.log(
                    `   - Balance inicial: ${senderWallet.balance + tx.amount} ➝ Final: ${senderWallet.balance}`
                  );
                  console.log(
                    `   - Balance inicial: ${recipientWallet.balance - tx.amount} ➝ Final: ${recipientWallet.balance}`
                  );
                }
              }
            );
          }
        } catch (error) {
          console.error("⚠️ Error al parsear transacciones:", error);
        }
      }

      console.log("-".repeat(50));
    });

    console.log("\n🏦 📊 Estado actual de balances:");
    this.validators.forEach((wallet) => {
      console.log(
        `🔹 ${wallet.address.substring(0, 10)}...: ${wallet.balance} tokens`
      );
    });
    console.log("-".repeat(50));
  }

  processBlock() {
    const validator = this.selectValidator();
    if (!validator) {
      console.log("No hay validadores con stake suficiente.");
      return;
    }

    if (this.pendingTransactions.length === 0) {
      console.log("No hay transacciones pendientes.");
      return;
    }

    // Crear el bloque con las transacciones actuales
    const previousBlock = this.chain[this.chain.length - 1]!;
    const newBlock = new Block(
      this.chain.length,
      previousBlock.hash,
      JSON.stringify(this.pendingTransactions),
      validator.address
    );

    // Actualizar los balances de los usuarios según las transacciones
    this.pendingTransactions.forEach((tx) => {
      const senderWallet = this.validators.find((w) => w.address === tx.sender);
      const recipientWallet = this.validators.find(
        (w) => w.address === tx.recipient
      );
      if (senderWallet && recipientWallet) {
        senderWallet.balance -= tx.amount;
        recipientWallet.balance += tx.amount;
      }
    });

    // **🏅 Asignar recompensa al validador**
    validator.balance += this.REWARD_AMOUNT;
    console.log(
      `💰 ${validator.address.substring(0, 10)}... recibió ${this.REWARD_AMOUNT} tokens por validar el bloque.`
    );

    // Agregar el bloque a la blockchain
    this.chain.push(newBlock);
    this.pendingTransactions = []; // Limpiar transacciones procesadas
    console.log(
      `🏅 ${validator.address.substring(0, 10)}... validó el bloque #${newBlock.index}`
    );
  }
}
