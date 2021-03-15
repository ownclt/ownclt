import { OwnCltCommandsObject } from "../Types/Custom";

export = <OwnCltCommandsObject>{
    /**
     * Link Command
     * This commands links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    link: ({ log, command }) => {
        log.info(`${command} was called!`);
    },

    /**
     * UnLink Command
     * This commands links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    unlink: ({ log, command }) => {
        log.info(`${command} was called!`);
    }
};
