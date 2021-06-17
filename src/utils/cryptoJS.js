import CryptoJS from 'crypto-js';

/**
 * AES加密
 * @param {*} strEncrypt 需要加密数据
 * @param {*} aesSecretKey 密钥 偏移量
 * @returns 
 */
export function encryptByAES (strEncrypt, aesSecretKey, padding, mode = 'CBC', paddingType = 'ZeroPadding') {
  let key = CryptoJS.enc.Utf8.parse(aesSecretKey),
      iv = CryptoJS.enc.Utf8.parse(padding);
  let aesEncrypt = CryptoJS.AES.encrypt(strEncrypt, key, {
    iv,
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad[paddingType]
  });
  return aesEncrypt.toString();
}
/**
 * AES解密
 * @param {*} encrypted 需解密数据
 * @param {*} key 密钥
 * @returns 
 */
export function decryptByAES(encrypted, key, mode = 'CBC'){
  var key = CryptoJS.enc.Utf8.parse(key);
  decrypted = CryptoJS.AES.decrypt(encrypted,key,{
    iv,
    mode: CryptoJS.mode[mode],
    padding:CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
