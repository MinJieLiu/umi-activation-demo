/**
 * 开发代理前缀
 */
export const proxyApi = '/api';

/**
 * 全局 Store，**慎用**
 */
export function getGlobalStore() {
  // eslint-disable-next-line no-underscore-dangle
  return g_app._store;
}
