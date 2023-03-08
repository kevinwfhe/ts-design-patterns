import { IMemoryCache } from "./memory_cache";

class ProxyCache implements IMemoryCache {
  cache: IMemoryCache;
  constructor(cacheInstance: IMemoryCache) {
    this.cache = cacheInstance;
  }
  set(key: string, value: any) {
    console.log(`Set ${key} to ${value}`);
    this.cache.set(key, value);
  }
  get(key: string) {
    console.log(`Get value of ${key}`);
    return this.cache.get(key);
  }
  clear() {
    console.log(`Clearing cache`);
    this.cache.clear();
  }
}

export { ProxyCache };
