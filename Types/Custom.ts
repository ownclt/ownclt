import * as loggers from "../Functions/Loggers";
import ObjectCollection from "object-collection";
import OwnCltState from "../Classes/OwnCltState";

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
    paths: { pwd: string };
    state: OwnCltState;
    self: (name: string, args?: any[]) => any;
    fromSelf: boolean;
};

export type OwnCltCommandFn<Args = any[]> = (ctx: OwnCltCommandFnContext<Args>) => any;
export type OwnCltCommandsObject<Args = any[]> = Record<string, OwnCltCommandFn<Args>>;
