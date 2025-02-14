import crypto from "crypto";

export function sha256(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export class CryptoUtils {
  static generateKeyPair(): { publicKey: string; privateKey: string } {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    return { publicKey, privateKey };
  }

  static signTransaction(privateKey: string, data: string): string {
    const signer = crypto.createSign("SHA256");
    signer.update(data);
    signer.end();
    return signer.sign(privateKey, "hex");
  }

  static verifySignature(
    publicKey: string,
    data: string,
    signature: string
  ): boolean {
    const verifier = crypto.createVerify("SHA256");
    verifier.update(data);
    verifier.end();
    return verifier.verify(publicKey, signature, "hex");
  }
}
