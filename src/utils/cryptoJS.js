import CryptoJS from 'crypto-js';

/**
 * AES加密
 * @param {*} strEncrypt 需要加密数据
 * @param {*} aesSecretKey 密钥 偏移量
 * @returns 
 */
export function encryptByAES (strEncrypt, aesSecretKey) {
  let key = CryptoJS.enc.Utf8.parse(aesSecretKey),
      iv = key;
  let aesEncrypt = CryptoJS.AES.encrypt(strEncrypt, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return aesEncrypt.toString();
}
/**
 * AES解密
 * @param {*} encrypted 需解密数据
 * @param {*} key 密钥
 * @returns 
 */
export function decryptByAES(encrypted, key){
  var key = CryptoJS.enc.Utf8.parse(key);
  decrypted = CryptoJS.AES.decrypt(encrypted,key,{
    iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
