/**
 * OwnClt Class.
 *
 * Holds all the components ownclt needs to run any command.
 */
import { OwnCltConfig } from "../Types/Custom";
import Path = require("path");
import { installedOrInstall, loadCommandHandler, processCliQuery } from "../Functions/Tasks";
import OwnCltDatabase from "./OwnCltDatabase";
import { Obj } from "object-collection/exports";

class OwnClt {
    // Config Data
    config: OwnCltConfig;
    // Cache Holder as ObjectCollection
    #cache = Obj({});

    // Db Data Accessor
    db: OwnCltDatabase;
    // Db Data Holder
    readonly #db: Record<string, any> = {};

    // Query Holder
    query?: { command: string; args: string[]; subCommands: string[]; commandHandler: string };

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

        /**
         * Load Processed Command
         */
        loadCommandHandler(this);
    }

    /**
     * Get OwnClt Base Folder.
     */
    ownCltPath(path?: string) {
        const key = "ownCltPath";
        // Set to cache
        if (!this.#cache.has(key)) this.#cache.set(key, Path.dirname(this.config.caller));
        // get from cache
        return path ? Path.resolve(this.#cache.get(key) + "/" + path) : this.#cache.get(key);
    }
}

export = OwnClt;
