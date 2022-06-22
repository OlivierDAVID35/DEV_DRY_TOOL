const fs = require('fs-extra');
const path = require("path");
const promptModule = require('./promptModule');
const processModule = require("./processModule")
const titleModule = require("./titleModule");
const execSync = require("child_process").execSync;
const spawnSync = require('child_process').spawnSync;
const randomstring = require("randomstring");

//! 4 - Database

const databaseModule = {
    importDbFile(importDbFileAnswer, projectDirectory) {
        if (importDbFileAnswer === "o" || importDbFileAnswer === "O") {
            const numberNewDbFile = promptModule.numberNewDbFile();
            console.log("\x1b[35m Attention à l'ordre : table(s) en 1er et data ensuite\x1b[0m");
            dbFile = [];
            for (let i = 0; i < numberNewDbFile; i++) {
                dbPath = promptModule.getDbPath();
                dbFile[i] = path.basename(`${dbPath}`);
                if(!fs.existsSync(`${projectDirectory}/data`)) {
                    fs.mkdir(`${projectDirectory}/data`, { recursive: true }, (err) => {
                        if(err) return err;
                    })
                };
            };
            dbFile.forEach(file => {
                fs.copySync(`${dbPath}`, `${projectDirectory}/data/${file}`);
            });      
            console.log("\x1b[32m Fichier(s) data copié(s) dans dossier DATA du projet : \x1b[0m"); 
            dbFile.forEach(file => {
            console.log(`\x1b[32m - ${file} \x1b[0m`);
            });
        } else if (importDbFileAnswer === "n" || importDbFileAnswer === "N") {
            console.log("\x1b[31m Fichier(s) data non copié(s) \x1b[0m");
            titleModule.end();
            processModule.launchProject(projectDirectory);
        } else {
            console.log("\x1b[31m Saisie incorrecte \x1b[0m");
            importDbFileAnswer = promptModule.importDbFileAnswer();
            databaseModule.importDbFile(importDbFileAnswer, projectDirectory);
        };
    },
    createUserAndDb(createUserAndDbAnswer, projectDirectory) {
        if (createUserAndDbAnswer == "1") {
            // create user
            userName = promptModule.getUserName();
            password = promptModule.getPassword();
            const com = `sudo -i -u postgres psql -c "CREATE ROLE ${userName} WITH LOGIN PASSWORD '${password}'";`;
            spawnSync(com, {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
            console.log(`\x1b[32m User ${userName} créé (mot de passe : ${password}) \x1b[0m`);
        } else if (createUserAndDbAnswer == "2") {
            // create database
            userName = promptModule.getUserNameDb();
            password = promptModule.getPassword();
            dbName = promptModule.getDbName();
            const com = `sudo -i -u postgres psql -c "CREATE DATABASE ${dbName} OWNER ${userName}";`;
            spawnSync(com, {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
            console.log(`\x1b[32m Database ${dbName} créée (propriétaire : ${userName}) \x1b[0m`);
        } else if (createUserAndDbAnswer == "3") {
            // create user + database
            userName = promptModule.getUserNameDb();
            password = promptModule.getPassword();
            dbName = promptModule.getDbName();
            const com1 = `sudo -i -u postgres psql -c "CREATE ROLE ${userName} WITH LOGIN PASSWORD '${password}'";`;
            spawnSync(com1, {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
            const com2 = `sudo -i -u postgres psql -c "CREATE DATABASE ${dbName} OWNER ${userName}";`;
            spawnSync(com2, {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
            console.log(`\x1b[32m User ${userName} créé (mot de passe : ${password}) \x1b[0m`);
            console.log(`\x1b[32m Database ${dbName} créée (propriétaire : ${userName}) \x1b[0m`);
        } else {
            console.log("\x1b[31m Saisie incorrecte \x1b[0m");
            createUserAndDbAnswer = promptModule.createUserAndDbAnswer();
            databaseModule.createUserAndDb(createUserAndDbAnswer, projectDirectory);
        };
    },
    createDb(importDbAnswer, projectDirectory, port, dbFile, userName, dbName) {
        if (importDbAnswer === "o" || importDbAnswer === "O") {
            //? Importation database
            dbFile.forEach(file => {
                execSync(`psql -U ${userName} -d ${dbName} -f ${projectDirectory}/data/${file}`, {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
                console.log(`\x1b[32m Fichier ${file} importé \x1b[0m`);
            });
            console.log("\x1b[32m Toutes les table(s) & data sont importées \x1b[0m");
            //? Installation package PG
            execSync("npm i pg", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});    
            console.log("\x1b[32m Package PG installé \x1b[0m");
            //? Mise à jour .env
            const randomSecret = randomstring.generate(8);
            fs.outputFileSync(`${projectDirectory}/.env`, `PORT=${port} \nPG_URL=postgresql://${userName}:${password}@localhost/${dbName} \nSECRET=${randomSecret}`, (err) => {
                if(err) return err;
            });
            fs.outputFileSync(`${projectDirectory}/.env.example`, "PORT=<port> \nPG_URL=postgresql://user:password@localhost/database \nSECRET=<secretSession>", (err) => {
                if(err) return err;
            });
            console.log("\x1b[32m Fichiers .env mis à jour (PG_URL) \x1b[0m");
        } else if (importDbAnswer === "n" || importDbAnswer === "N") {
            console.log("\x1b[31m Importation annulée \x1b[0m");
            titleModule.end();
            processModule.launchProject(projectDirectory);
        } else {
            console.log("\x1b[31m Saisie incorrecte \x1b[0m");
            importDbAnswer = promptModule.importDbAnswer();
            databaseModule.createDb(importDbAnswer, projectDirectory, port, dbFile);
        };
    }
}

module.exports = databaseModule;