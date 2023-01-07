import CryptoJS from "crypto-js";

const cryptKey = process.env.NEXT_PUBLIC_CRYPT_KEY;

export const decryptData = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, cryptKey ? cryptKey : "cryptKey");
  const data = bytes.toString(CryptoJS.enc.Utf8);
  return data;
};
