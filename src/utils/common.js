import store from '@/store/index';
import moment from "moment";

export function isInPermission(key) {
  return store.state?.system.permission.includes(key) || false;
}

export function formatDate(val, type) {
  if (type == 'end') {
    return val ? moment(val).endOf('day').format('YYYY-MM-DD HH:mm:ss') : '';
  }else {
    return val ? moment(val).startOf('day').format('YYYY-MM-DD HH:mm:ss') : '';
  }
}