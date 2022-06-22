const promptModule = require("./modules/promptModule");
const newProjectModule = require("./modules/newProjectModule");
const serverModule = require("./modules/serverModule");
const databaseModule = require("./modules/databaseModule");
const authModule = require("./modules/authModule");
const sequelizeModule = require("./modules/sequelizeModule");
const titleModule = require("./modules/titleModule");
const processModule = require("./modules/processModule");

//! Affichage titre start
titleModule.welcome();
titleModule.welcomeUnderline();

//! 1- Créer un nouveau projet
titleModule.serveur();
const projectDirectory = promptModule.getProjectDirectory();
newProjectModule.createNewProject(projectDirectory);

//! 2- Créer un serveur express (+ installation modules node-dev / dotenv)
serverModule.createServerChoice(projectDirectory);
    //? Installation node-dev ou nodemon
    const npmChoiceAnswer = promptModule.npmChoiceAnswer();
    serverModule.npmToolChoice(npmChoiceAnswer, projectDirectory);
console.log("\x1b[32m Serveur opérationnel \x1b[0m");

//!3 - Système authentification (ajout pages signup/login/signout/profil) 
titleModule.authentification();
const createAuthAnswer = promptModule.createAuthAnswer();
authModule.createAuthChoice(createAuthAnswer ,projectDirectory, port);
    
//! 4 - Database
titleModule.database();
    //? Importer un fichier data
    const importDbFileAnswer = promptModule.importDbFileAnswer();
    databaseModule.importDbFile(importDbFileAnswer, projectDirectory);
    //? Créer user et/ou database
    const createUserAndDbAnswer = promptModule.createUserAndDbAnswer();
    console.log("\x1b[35m Attention: PostgreSQL doit être installé pour poursuivre ! https://www.postgresql.org/download/ \x1b[0m");
    databaseModule.createUserAndDb(createUserAndDbAnswer, projectDirectory);
    //? Créer & importer database sql dans le serveur
    const importDbAnswer = promptModule.importDbAnswer();
    databaseModule.createDb(importDbAnswer, projectDirectory, port, dbFile, userName, dbName);

//! 5 - Installation sequelize et généreration des models
titleModule.sequelize();
const createModulesAnswer = promptModule.createModulesAnswer();
sequelizeModule.createModules(createModulesAnswer, projectDirectory, userName, dbName, password);

//! Affichage titre end & lancement nouveau projet
titleModule.end();
processModule.launchProject(projectDirectory);