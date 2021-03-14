import { greenBright, blueBright, red, yellow } from "chalk";

export function log(...args: any[]) {
    console.log(...args);
}

export function logAndExit(...args: any[]) {
    log(...args);
    process.exit();
}

export function logSuccess(message: any, error?: Error) {
    log(greenBright("✔✔️"), greenBright(message));
    if (error) console.log(error.stack);
}

export function logSuccessAndExit(message: any, error?: any) {
    logSuccess(message, error);
    process.exit();
}

export function logInfo(message: any, error?: Error) {
    log(blueBright("🗣"), blueBright(message));
    if (error) console.log(error.stack);
}

export function logInfoAndExit(message: any, error?: any) {
    logInfo(message, error);
    process.exit();
}

export function logError(message: any, error?: Error) {
    log(red("🚫"), red(message));
    if (error) console.log(error.stack);
}

export function logErrorAndExit(message: any, error?: any) {
    logError(message, error);
    process.exit();
}

export function logWarning(message: any, error?: Error) {
    log(yellow("!!"), yellow(message));
    if (error) console.log(error.stack);
}

export function logWarningAndExit(message: any, error?: any) {
    logWarning(message, error);
    process.exit();
}
