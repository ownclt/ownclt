const { defineCommand, defineCommands } = require("../build/Functions/Helpers");

const world = defineCommand((ci) => {
    return ci.log.success("Hello World");
});

module.exports = defineCommands({ world });
