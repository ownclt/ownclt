import { log, logAndExit } from "./Functions/Loggers";
import OwnCtl from "./OwnClt";

async function Main() {
    // Log Start Messages
    log("OwnCtl: Starting..");

    // Process Args
    const [, , ...commands] = process.argv;

    // Check if commands has any command
    if (!commands || (commands && !commands.length)) {
        return logAndExit("No command provided!");
    }

    // Get Command and Args
    const [command, ...args] = commands;

    // Initialize new OwnCtl
    const ownCtl = new OwnCtl({
        command, // ownctl command
        args, // Args of ownctl command
        caller: __filename // Current file path
    });

    // Boot OwnCtl
    await ownCtl.start();
}

Main().catch(console.log);
