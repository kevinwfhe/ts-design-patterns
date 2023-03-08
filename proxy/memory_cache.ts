interface IMemoryCache {
  set: (key: string, value: any) => void;
  get: (key: string) => any;
  clear: () => void;
}

class MemoryCache implements IMemoryCache {
  cache = {};
  set(key: string, value: any) {
    this.cache[key] = value;
  }
  get(key: string) {
    return this.cache[key];
  }
  clear() {
    this.cache = {};
  }
}

export { IMemoryCache, MemoryCache };
