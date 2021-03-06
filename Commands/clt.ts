import { OwnCltMapFile } from "../Types/Custom";
import fs = require("fs");
import path = require("path");
import { defineCommands } from "../Functions/Helpers";
import { errorAndExit, info, successAndExit, warningAndExit } from "../Functions/Loggers";
import { exec } from "child_process";

export = defineCommands({
    webstorm() {
        const command = ["open", "-na", '"WebStorm.app"', "--args", "./"].join(" ");

        info(command);

        exec(command);
    },

    /**
     * Link Command
     * This command links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    link({ command, ownclt, state, args: [folder, as] }) {
        // Exit if no folder
        if (!folder) return errorAndExit(`${command}: Folder is required!`);

        // Resolve folder
        folder = path.resolve(folder);

        // Check if folder exits
        if (!fs.existsSync(folder))
            return errorAndExit(`${command}: Folder ${folder} does not exists`);

        // find ownclt.map.json
        const owncltMap = path.resolve(folder, "ownclt.map.json");
        if (!fs.existsSync(owncltMap))
            return errorAndExit(`${command}: OwnCltMap '${owncltMap}" does not exists`);

        let map: OwnCltMapFile;

        try {
            map = require(owncltMap);
        } catch (e) {
            return errorAndExit(`${command}: Error while parsing map file: ${owncltMap}`, e);
        }

        // Check if command file exists
        map.file = path.resolve(folder, map.file);
        if (!fs.existsSync(map.file))
            return errorAndExit(`${command}: OwnClt Command file: '${map.file}" does not exists.`);

        // Return map file
        if (state.has("readMapFileOnly")) {
            state.set("mapFile", map);
            return;
        }

        // get ownCliPath
        const db = ownclt.db;
        const namespace = (as ? as : map.namespace).trim().toLowerCase();

        // check if namespace exists
        if (db.has(`commands.${namespace}`)) {
            return errorAndExit(`${command}: Namespace "${namespace}" already exists.`);
        }

        // set command
        db.set(`commands.${namespace}`, map.file);

        // Save db
        db.save();

        // Log
        return successAndExit(
            as
                ? `Command Linked: "${map.namespace}" as "${namespace}"`
                : `Command Linked: "${namespace}"`
        );
    },

    /**
     * UnLink Command
     * This commands un-links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    unlink: {
        unlink({ ownclt, command, args: [namespace] }) {
            // check if namespace exists
            if (!namespace) {
                return errorAndExit(`${command}: requires the "namespace" of the ownclt command.`);
            }

            namespace = namespace.toLowerCase();

            // Stop removal of self
            if (namespace === "clt")
                return warningAndExit(`Namespace: "${namespace}" cannot be unlinked.`);

            // check if namespace exists
            if (!ownclt.db.has(`commands.${namespace}`)) {
                return errorAndExit(`Namespace "${namespace}" is not linked.`);
            }
            // unset command
            ownclt.db.unset(`commands.${namespace}`);

            // Save db
            ownclt.db.save();

            return successAndExit(`Command Unlinked: "${namespace}"`);
        },

        folder({ ownclt, state, self, command, args: [folder] }) {
            // Exit if no folder
            if (!folder) return errorAndExit(`${command}: Folder is required!`);

            // Set State to readMapFileOnly
            state.set("readMapFileOnly", true);

            // call link
            self("link", folder);

            // Get mapFile
            const map: OwnCltMapFile = state.get("mapFile");

            const findKeyByFile = ownclt.db.path("commands").pickBy((d: any) => {
                return d === map.file;
            });

            console.log(findKeyByFile);
            errorAndExit("stop");

            if (!findKeyByFile) return errorAndExit(`Namespace "${map.namespace}" is not linked.`);

            self("unlink/unlink", map.namespace);
        }
    }
});
