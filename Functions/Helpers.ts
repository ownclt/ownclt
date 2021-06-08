import { OwnCltCommandsObject } from "../Types/Custom";

export function defineCommands<Args = any[]>(commands: OwnCltCommandsObject<Args>) {
    return commands;
}
