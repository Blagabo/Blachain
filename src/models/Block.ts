import crypto from "crypto";

export class Block {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  hash: string;
  validator: string | null;

  constructor(
    index: number,
    previousHash: string,
    data: string,
    validator: string | null
  ) {
    this.index = index;
    this.timestamp = Date.now();
    this.data = data;
    this.previousHash = previousHash;
    this.validator = validator;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    const blockString = `${this.index}${this.timestamp}${this.data}${this.previousHash}${this.validator}`;
    return crypto.createHash("sha256").update(blockString).digest("hex");
  }
}
