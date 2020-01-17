import * as NodeCache from "node-cache";

export class CacheClient {
  private cache: NodeCache;

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    } else {
      return Promise.resolve(null);
    }
  }

  set (key , valuesToStore) {
    this.cache.set(key, valuesToStore);
  }

  flush() {
    this.cache.flushAll();
  }

}
