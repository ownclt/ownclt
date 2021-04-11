import { OwnCltCommandsObject } from "../Types/Custom";
import path from "path";
import * as fs from "fs";

export = <OwnCltCommandsObject>{
    /**
     * Link Command
     * This commands links the current working directory to ownclt commands.
     * @param args - Args received!
     * @param log - Log Functions
     */
    fixMongoEnv: ({ log, command, paths }) => {
        const currentEnv = path.resolve(`${paths.pwd}/.env`);

        if (!fs.existsSync(currentEnv)) {
            return log.errorAndExit(`No env found in working directory! ${paths.pwd}`);
        }

        const env = fs.readFileSync(currentEnv).toString();
        let dockerEnv = env.replace("mongodb://127.0.0.1:27017", "mongodb://mongodb:27017");
        dockerEnv = dockerEnv.replace("mongodb://localhost:27017", "mongodb://mongodb:27017");

        fs.unlinkSync(currentEnv);
        fs.writeFileSync(currentEnv, dockerEnv);

        log.successAndExit("Docker env generated!");
    }
};
