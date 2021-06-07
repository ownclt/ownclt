import * as loggers from "../Functions/Loggers";
import OwnCltState from "../Classes/OwnCltState";
import OwnClt from "../Classes/OwnClt";

export interface OwnCltConfig {
    command: string;
    args: string[];
    caller: string;
}

export type OwnCltLoggers = typeof loggers;
export type OwnCltCommandFnContext<Args = any[]> = {
    args: Args;
    command: string;
    log: OwnCltLoggers;
    paths: { cwd: string; cwdResolve: (path?: string) => string };
    state: OwnCltState;
    self: (name: string, args?: any[]) => any;
    fromSelf: boolean;
    ownclt: OwnClt;
};

export type OwnCltMapFile = {
    namespace: string;
    file: string;
    commands: Record<string, { desc: string }>;
};

export type OwnCltCommandFn<Args = any[]> = (ctx: OwnCltCommandFnContext<Args>) => any;
export type OwnCltCommandsObject<Args = any[]> = Record<string, OwnCltCommandFn<Args>>;
