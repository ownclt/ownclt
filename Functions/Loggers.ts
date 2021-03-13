export function log(...args: any[]) {
    console.log(...args);
}

export function logAndExit(...args: any[]) {
    log(...args);
    process.exit();
}

export function logError(message: any, error?: Error) {
    log("Error:", message);
    if (error) console.log(error.stack);
}

export function logErrorAndExit(message: any, error?: any) {
    logError(message, error);
    process.exit();
}

export function logWarning(message: any, error?: Error) {
    log("!!", message);
    if (error) console.log(error.stack);
}

export function logWarningAndExit(message: any, error?: any) {
    logWarning(message, error);
    process.exit();
}
