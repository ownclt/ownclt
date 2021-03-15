import { greenBright, blueBright, red, yellow } from "chalk";

export function log(...args: any[]) {
    console.log(...args);
}

export function andExit(...args: any[]) {
    log(...args);
    process.exit();
}

export function success(message: any, error?: Error) {
    log(greenBright("✔✔️"), greenBright(message));
    if (error) console.log(error.stack);
}

export function successAndExit(message: any, error?: any) {
    success(message, error);
    process.exit();
}

export function info(message: any, error?: Error) {
    log(blueBright("🗣"), blueBright(message));
    if (error) console.log(error.stack);
}

export function infoAndExit(message: any, error?: any) {
    info(message, error);
    process.exit();
}

export function error(message: any, error?: Error) {
    log(red("🚫"), red(message));
    if (error) console.log(error.stack);
}

export function errorAndExit(message: any, error?: any) {
    error(message, error);
    process.exit();
}

export function warning(message: any, error?: Error) {
    log(yellow("!!"), yellow(message));
    if (error) console.log(error.stack);
}

export function warningAndExit(message: any, error?: any) {
    warning(message, error);
    process.exit();
}
