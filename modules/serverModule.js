const fs = require("fs-extra");
const execSync = require("child_process").execSync;
const promptModule = require("./promptModule");

//! 2- Créer un serveur express (+ installation modules node-dev / dotenv)

const serverModule = {
    createServerChoice(projectDirectory) {
        console.log("\n \x1b[94m\x1b[4m\x1b[1mCréation du serveur :\x1b[0m \n");
        port = promptModule.getPort();
        serverModule.createServer(projectDirectory, port);
    },
    createServer(projectDirectory, port) {
        fs.outputFileSync(`${projectDirectory}/.env`, `PORT=${port}`, (err) => {
            if(err) return err;
        });
        fs.outputFileSync(`${projectDirectory}/.env.example`, "PORT=<port>", (err) => {
            if(err) return err;
        });
        fs.copySync("data/server", `${projectDirectory}`);

        execSync("npm init -y", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
        console.log("\x1b[32m NPM initialisé \x1b[0m");

        execSync("npm i express dotenv ejs", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
        console.log("\x1b[32m Packages npm installés : express & dotenv \x1b[0m");
    },
    npmToolChoice(npmChoiceAnswer, projectDirectory) {
        if (npmChoiceAnswer == 1) {
            execSync("npm i node-dev --save-dev", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
            console.log("\x1b[32m Node-dev installé (dev dependencies)\x1b[0m");
        } else if (npmChoiceAnswer == 2) {
            execSync("npm i nodemon --save-dev", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
            console.log("\x1b[32m Nodemon installé (dev dependencies)\x1b[0m");
        } else if (npmChoiceAnswer === "n" || npmChoiceAnswer === "N") {
            console.log("\x1b[31m Package non installé \x1b[0m");
        } else {
            console.log("\x1b[31m Saisie incorrecte \x1b[0m");
            npmChoiceAnswer = promptModule.npmChoiceAnswer();
            serverModule.npmToolChoice(npmChoiceAnswer, projectDirectory);
        };
    },
}

module.exports = serverModule;