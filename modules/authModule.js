const fs = require("fs-extra");
const execSync = require("child_process").execSync;
const promptModule = require("./promptModule");
const randomstring = require("randomstring");

//!3 - Système authentification (ajout pages signup/login/signout/profil) 

const authModule = {
    createAuthChoice(createAuthAnswer, projectDirectory, port) {
        if (createAuthAnswer === "o" || createAuthAnswer === "O" ) {
            authModule.createAuth(projectDirectory, port);
        } else if (createAuthAnswer === "n" || createAuthAnswer === "N") {
            console.log("\x1b[31m Authentification non créé \x1b[0m");
        } else { 
            console.log("\x1b[31m Saisie incorrecte \x1b[0m");
            const createAuthAnswer = promptModule.createAuthAnswer();
            authModule.createAuthChoice(createAuthAnswer, projectDirectory);
        };
    },
    createAuth(projectDirectory, port) {
        fs.copySync("data/auth/", `${projectDirectory}`, {overwrite: true}, (err)=>{
            if(err) return err;
        });
        const randomSecret = randomstring.generate(8);
        fs.outputFileSync(`${projectDirectory}/.env`, `PORT=${port} \nSECRET=${randomSecret}`, (err) => {
            if(err) return err;
        });
        fs.outputFileSync(`${projectDirectory}/.env.example`, "PORT=<port> \nSECRET=<secretSession>", (err) => {
            if(err) return err;
        });
        fs.removeSync(`${projectDirectory}/app/router.js`);
        console.log("\x1b[32m Dossiers/fichiers mis à jour > authentification prête \x1b[0m");
        execSync("npm i express-session email-validator bcrypt csurf", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
        console.log("\x1b[32m Packages npm installés : express-session, email-validator, bcrypt & csurf \x1b[0m");
    }
}

module.exports = authModule;

