export function log(...args: any[]) {
    console.log(...args);
}

export function logAndExit(...args: any[]) {
    log(...args);
    process.exit();
}
