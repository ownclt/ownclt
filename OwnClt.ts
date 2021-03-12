/**
 * OwnCtl Class.
 *
 * Holds all the components ownctl needs to run any command.
 */
import { OwnCtlConfig } from "./Types/Custom";
import path from "path";

class OwnCtl {
    config: OwnCtlConfig;
    #cache: Record<string, any> = {};

    constructor(config: OwnCtlConfig) {
        this.config = config;
    }

    /**
     * The Start function is first called before any other function.
     * It starts processing all the data stored in the OwnCtl instance it belongs to
     */
    async start() {
        console.log(this.ownCtlPath());
    }

    /**
     * Get OwnClt Base Folder.
     */
    ownCtlPath() {
        const key = "ownCtlPath";
        // Set to cache
        if (!this.hasCache(key)) this.setCache(key, path.dirname(this.config.caller));
        // get from cache
        return this.getCache<string>(key);
    }

    /**
     * Cache
     * Hold data in memory for reference later.
     * @param key
     * @param value
     */
    setCache<T>(key: string, value: T) {
        this.#cache[key] = value;
        return this;
    }

    /**
     * Check if key exists in cache
     * @param key
     */
    hasCache(key: string) {
        return this.#cache.hasOwnProperty(key);
    }

    /**
     * Get Data from cache
     * @param key
     * @param def
     */
    getCache<T>(key: string, def?: T): T {
        if (!this.hasCache(key)) return def as T;
        return this.#cache[key];
    }
}

export = OwnCtl;
