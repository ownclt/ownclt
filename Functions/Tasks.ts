import OwnClt from "../Classes/OwnClt";
import fs = require("fs");
import * as log from "./Loggers";

import FactoryDb from "../Factory/db";
import * as Path from "path";
import { OwnCltCommandsObject } from "../Types/Custom";

export function loadDbToCollection(self: OwnClt, path?: string) {
    const cltDatabase = path ? path : self.ownCltPath(".ownclt/db.json");
    // Load db.json
    self.db.replaceData(require(cltDatabase));
}

/**
 * This functions checks for .ownclt folder and database files.
 * if they don't exists, it tries creating them.
 * @param self
 */
export function installedOrInstall(self: OwnClt) {
    const cltFolder = self.ownCltPath(".ownclt");
    const cltDatabase = self.ownCltPath(".ownclt/db.json");

    // Checkers
    const hasCltDb = fs.existsSync(cltDatabase);
    const hasCltFolder = hasCltDb ? true : fs.existsSync(cltFolder);

    // If has both folder and Db return
    if (hasCltFolder && hasCltDb) {
        // Load db.json
        loadDbToCollection(self, cltDatabase);

        // Stop and return true.
        return true;
    }

    // If no Clt folder
    if (!hasCltFolder) {
        try {
            fs.mkdirSync(cltFolder);
        } catch (e) {
            return log.errorAndExit(`Failed to create {.ownclt} folder in ${cltFolder}`, e);
        }
    }

    // If no Clt folder
    if (!hasCltDb) {
        const factoryDb = FactoryDb();
        try {
            fs.writeFileSync(cltDatabase, JSON.stringify(factoryDb, null, 2));
        } catch (e) {
            return log.errorAndExit(`Failed to create {db.json} folder in ${cltFolder}`, e);
        }
    }

    // Load db.json
    loadDbToCollection(self, cltDatabase);

    // Stop and return true.
    return true;
}

/**
 * Process Cli Query
 * @param self
 */
export function processCliQuery(self: OwnClt) {
    const { command, args } = self.config;
    const commands = self.db.path("commands");

    // Get namespace from command
    // E.g `clt/link/this` where `clt` is namespace
    // while ['link', 'this'] are subCommands
    const [namespace, ...subCommands] = command.split("/");
    const commandHandler = commands.get(namespace);

    if (!commandHandler) {
        return log.warningAndExit(`Command "${command}" does not exists.`);
    }

    /**
     * Load Command Using data above.
     */
    loadCommandHandler(self, {
        args,
        command,
        subCommands,
        commandHandler
    });
}

/**
 * Loads the Handler file of a command
 * @param self
 * @param data
 */
export function loadCommandHandler(
    self: OwnClt,
    data: {
        args: string[];
        command: string;
        subCommands: string[];
        commandHandler: string;
    }
) {
    const { commandHandler, subCommands } = data;

    let handlerData: OwnCltCommandsObject = {};

    try {
        handlerData = require(Path.resolve(commandHandler));
    } catch (err) {
        return log.errorAndExit(err.message, err.stack);
    }

    if (typeof handlerData === "object") {
        /**
         * Check if subcommand function exists
         */
        if (subCommands.length === 1 && typeof handlerData[subCommands[0]] === "function") {
            // Run handlers function
            handlerData[subCommands[0]]({
                args: data.args,
                command: data.command,
                log
            });
        }
    }
}
