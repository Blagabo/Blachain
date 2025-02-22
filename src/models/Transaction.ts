export class Transaction {
  sender: string;
  recipient: string;
  amount: number;
  signature: string;

  constructor(
    sender: string,
    recipient: string,
    amount: number,
    signature: string
  ) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.signature = signature;
  }
}
