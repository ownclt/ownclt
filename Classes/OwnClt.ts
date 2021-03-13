/**
 * OwnClt Class.
 *
 * Holds all the components ownclt needs to run any command.
 */
import { OwnCltConfig } from "../Types/Custom";
import Path = require("path");
import { installedOrInstall, processCliQuery } from "../Functions/Tasks";
import OwnCltDatabase from "./OwnCltDatabase";

class OwnClt {
    // Config Data
    config: OwnCltConfig;
    // Cache Holder
    #cache: Record<string, any> = {};

    // Db Data Accessor
    db: OwnCltDatabase;
    // Db Data Holder
    readonly #db: Record<string, any> = {};

    constructor(config: OwnCltConfig) {
        // Trim command
        config.command = config.command.trim();

        // Set Config
        this.config = config;

        // Open Db Collection
        this.db = new OwnCltDatabase(this.#db);
    }

    /**
     * The Start function is first called before any other function.
     * It starts processing all the data stored in the OwnClt instance it belongs to
     */
    async start() {
        /**
         * Check if ownclt has been installed, if Yes, skip installation process.
         */
        installedOrInstall(this);

        /**
         * Process command
         */
        processCliQuery(this);
    }

    /**
     * Get OwnClt Base Folder.
     */
    ownCltPath(path?: string) {
        const key = "ownCltPath";
        // Set to cache
        if (!this.hasCache(key)) this.setCache(key, Path.dirname(this.config.caller));
        // get from cache
        return path
            ? Path.resolve(this.getCache<string>(key) + "/" + path)
            : this.getCache<string>(key);
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

export = OwnClt;
