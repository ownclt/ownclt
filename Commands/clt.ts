import { OwnCltCommandFnContext, OwnCltCommandsObject, OwnCltMapFile } from "../Types/Custom";
import fs = require("fs");
import path = require("path");

export = <OwnCltCommandsObject>{
    /**
     * Link Command
     * This commands links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    link: ({ args: [folder], log, command, ownclt }: OwnCltCommandFnContext<string[]>) => {
        // Exit if no folder
        if (!folder) return log.errorAndExit(`${command}: Folder is required!`);

        // Resolve folder
        folder = path.resolve(folder);

        // Check if folder exits
        if (!fs.existsSync(folder))
            return log.errorAndExit(`${command}: Folder ${folder} does not exists`);

        // find ownclt.map.json
        const owncltMap = path.resolve(folder, "ownclt.map.json");
        if (!fs.existsSync(owncltMap))
            return log.errorAndExit(`${command}: OwnCltMap '${owncltMap}" does not exists`);

        let map: OwnCltMapFile;

        try {
            map = require(owncltMap);
        } catch (e) {
            return log.errorAndExit(`${command}: Error while parsing map file: ${owncltMap}`, e);
        }

        // Check if command file exists
        map.file = path.resolve(folder, map.file);
        if (!fs.existsSync(map.file))
            return log.errorAndExit(
                `${command}: OwnClt Command file: '${map.file}" does not exists.`
            );

        // get ownCliPath
        const db = ownclt.db;

        // check if namespace exists
        if (db.has(`commands.${map.namespace}`)) {
            return log.errorAndExit(`${command}: Namespace "${map.namespace}" already exists.`);
        }

        // set hello command
        db.set(`commands.${map.namespace}`, map.file);

        // Save db
        db.save();

        console.log(db);
    },

    /**
     * UnLink Command
     * This commands links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    unlink: ({ log, command }) => {
        log.info(`${command} was called!`);
    }
};
