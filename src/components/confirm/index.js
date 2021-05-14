import Vue from 'vue'
import Confirm from './Confirm'

/**
 * 简单弹出一个文本字弹框
 */
let confirmSimple = function (message, onOk, onCancel, okBtnText, cancelBtnText) {
  let propsData = {
    styleConfirm: {
      width: '400px'
    },
    title: '操作确认',
    dangerouslyUseHTMLString: false,
    message: message,
    onOk: onOk,
    onCancel: onCancel,
    okText: okBtnText,
    cancelText: cancelBtnText
  }

  let ConfirmComponent = Vue.extend(Confirm)
  return new ConfirmComponent({
    el: document.createElement('div'),
    propsData
  })
}

/**
 * 根据配置弹出弹框
 */
let confirmWithConfig = function (config) {
  let propsData = Object.assign(config)
  let ConfirmComponent = Vue.extend(Confirm)
  return new ConfirmComponent({
    el: document.createElement('div'),
    propsData
  })
}

let confirm = function (arg1, onOk, onCancel) {
  if (typeof arg1 === 'string') {
    return confirmSimple(arg1, onOk, onCancel)
  } else {
    return confirmWithConfig(arg1)
  }
}

export default confirm
