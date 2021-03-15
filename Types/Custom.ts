import * as loggers from "../Functions/Loggers";

export interface OwnCltConfig {
    command: string;
    args: string[];
    caller: string;
}

export type OwnCltLoggers = typeof loggers;

export type OwnCltCommandsObject = Record<
    string,
    (data: { args: string[]; command: string; log: OwnCltLoggers }) => void
>;
