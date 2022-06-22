const fs = require('fs-extra');
const execSync = require("child_process").execSync;
const promptModule = require('./promptModule');
const processModule = require("./processModule");
const titleModule = require("./titleModule");

//! 5 - Installation sequelize et généreration des models

const sequelizeModule = {
    createModules(createModulesAnswer, projectDirectory, userName, dbName, password) {
        if (createModulesAnswer === "o" || createModulesAnswer === "O" ) {
            execSync("npm i pg-hstore sequelize sequelize-auto sequelize-cli", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});    
            console.log("\x1b[32m Package Sequelize installé \x1b[0m");
            fs.copySync("data/sequelize/", `${projectDirectory}`, {overwrite: true}, (err)=>{
                if(err) return err;
            });
            fs.outputFileSync(`${projectDirectory}/config.js`, 
            `const path = require('path');\nconst output = path.join(__dirname, 'app/models');\nconst options = { directory: output, caseFile: 'o', caseModel: 'o', caseProp: 'o', lang: 'es6', useDefine: false, singularize: true, spaces: true, indentation: 2 };\nconst postgres = {\ndbname: '${dbName}',\nuser: '${userName}'\n,pass: '${password}',\noptions: { dialect: 'postgres' },\nautoOptions: { dialect: 'postgres', ...options }\n};\nmodule.exports = postgres;`, (err) => {
                if(err) return err;
            });
            execSync("node export.js", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});    
            console.log("\x1b[32m models générés dans le dossier app/models \x1b[0m");
            console.log("\x1b[31m Nettoyage... \x1b[0m");
            execSync("npm uninstall pg-hstore sequelize-auto sequelize-cli", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});    
            fs.removeSync(`${projectDirectory}/config.js`);
            fs.removeSync(`${projectDirectory}/export.js`);
        } else if (createModulesAnswer === "n" || createModulesAnswer === "N") {
            console.log("\x1b[31m Installation annulée \x1b[0m");
            titleModule.end();
            processModule.launchProject(projectDirectory);
        } else {
            console.log("\x1b[31m Saisie incorrecte \x1b[0m");
            const createModulesAnswer = promptModule.createModulesAnswer();
            sequelizeModule.createModules(projectDirectory, userName, dbName, password);
        };
    }
}

module.exports = sequelizeModule;