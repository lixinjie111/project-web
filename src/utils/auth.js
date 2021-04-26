const TokenKey = 'x-access-token'

let Cookie = {
  /**
   * 获取Cookie内容
   * @name Core.Cookie.get
   * @function
   * @grammar Core.Cookie.get(name)
   * @param {String} name Cookie键名
   *
   * @return {String} Cookie值
   */
  get: function get(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },
  /**
   * 设置Cookie内容
   * @name Core.Cookie.set
   * @function
   * @grammar Core.Cookie.set(name , value[ , days , path , domain , secure])
   * @param {String} name Cookie键名
   * @param {String} value Cookie键值
   * @param {Int} days Cookie有效期天数
   * @param {String} path Cookie有效路径
   * @param {String} domain Cookie有效域
   * @param {Boolean} secure 是否安全Cookie
   */
  set: function set(name, value, days, path, domain, secure) {
    var expires = void 0;
    if (typeof days === 'number') {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = date.toGMTString();
    } else if (typeof days === 'string') {
      expires = days;
    } else {
      expires = false;
    }
    document.cookie = name + '=' + encodeURIComponent(value) + (expires ? ';expires=' + expires : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  },
  /**
   * 删除Cookie内容
   * @name Core.Cookie.del
   * @function
   * @grammar Core.Cookie.del(name[ , path , domain , secure])
   * @param {String} name 要删除的Cookie键名
   * @param {String} path Cookie有效路径
   * @param {String} domain Cookie有效域
   * @param {Boolean} secure 是否安全Cookie
   */
  del: function del(name, path, domain, secure) {
    this.set(name, '', -1, path, domain, secure);
  }
};

export function getToken () {
  return Cookie.get(TokenKey) === null ? '' : Cookie.get(TokenKey)
}

export function setToken (token) {
  Cookie.set(TokenKey, token, 7, '/')
}

export function removeToken () {
  Cookie.del(TokenKey, '/')
}

//设置Cookie
export function setCookie(key,value){
  Cookie.set(key, value, 7, '/')
}

//获取Cookie
export function getCookie(key) {
  return Cookie.get(key) 
}

//删除Cookie
export function removeCookie(key){
  Cookie.del(key, '/')
}
