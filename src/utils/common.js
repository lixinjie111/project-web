import store from '@/store/index';

export function isInPermission(key) {
  return store.state?.system.permission.includes(key) || false;
}