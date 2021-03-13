export = {
    namespace: "clt",
    separator: "/",

    commands: {
        link: {
            desc: "Link working directory to OwnClt Commands.",
            run() {
                console.log(`clt clt/add was called!`);
            }
        },

        unlink: {
            desc: "Unlink working directory from OwnClt Commands.",
            run() {
                console.log(`clt clt/unlink was called!`);
            }
        }
    }
};
