/**
 * Hello OwnClt
 * @type {OwnCltCommandsObject}
 */
module.exports = {
    /**
     * @param {OwnCltCommandFnContext} ci
     */
    world(ci) {
        return ci.log.success("Hello World");
    }
};
