const prompt = require("prompt-sync")({ sigint: true });

//! Questionnaire

const promptModule = {
//! NEW PROJECT    
    //? Recupere le nom du projet
    promptProjectName() {
        return projectName = prompt("\x1b[94m> Quel est le nom de ton projet ? (sans espaces): \x1b[0m");
    },
    //? Recupere le chemin du projet
    promptProjectPath() {
        return prompt(`\x1b[94m> Indique le chemin où ton dossier "${projectName}" sera créé : \x1b[0m`);
    },
    //? Construire le chemin du projet
    getProjectDirectory() {
        console.log("\n \x1b[94m\x1b[4m\x1b[1mDossier projet :\x1b[0m \n");
        let projectName = this.promptProjectName()
        let str = this.promptProjectPath()
        let projectPath = str.endsWith('/') ? str.slice(0, -1) : str;
        let projectDirectory = `${projectPath}/${projectName}`
        return projectDirectory
    },
//! SERVER 
    getPort() {
        return prompt("\x1b[94m> Quel port sera utilisé ? : \x1b[0m");
    },
    npmChoiceAnswer() {
        return prompt("\x1b[94m> Veux-tu installer Node-dev(1), Nodemon(2) ou rien(N) ? (1/2/N) : \x1b[0m");
    },
//! SIGNUP/LOGIN/LOGOUT/PROFIL
    createAuthAnswer() {
        return prompt("\x1b[94m> Veux-tu ajouter ces pages ? (O/N) :  \x1b[0m");
    },
//! DATABASE    
    importDbFileAnswer() {
        return prompt("\x1b[94m> Veux-tu importer un/des fichier(s) data (.sql) dans ton dossier projet ? (O/N) :  \x1b[0m");
    },
    getDbPath() {
        return prompt("\x1b[94m> Chemin complet du/des fichier(s) data (avec nom du fichier + extension) : \x1b[0m");
    },
    importDbAnswer() {
        return prompt("\x1b[94m> Veux-tu importer les tables / data ? (O/N) :  \x1b[0m");
    },
    numberNewDbFile() {
        return prompt("\x1b[94m> Combien de fichier(s) à importer ? :\x1b[0m");
    },
    createUserAndDbAnswer() {
        return prompt("\x1b[94m> Veux-tu créer un user(1), une database(2) ou les deux(3) ? (1/2/3) : \x1b[0m");
    },
    getUserName() {
        return prompt("\x1b[94m> Renseigner le nom du user à créer : \x1b[0m");
    },
    getUserNameDb() {
        return prompt("\x1b[94m> Renseigner le nom du user qui sera propriétaire de la database : \x1b[0m");
    },
    getPassword() {
        return prompt("\x1b[94m> Renseigner le mot de passe :  \x1b[0m");
    },
    getDbName() {
        return prompt("\x1b[94m> Renseigner le nom de la database à créer :  \x1b[0m");
    },
//! SEQUELIZE
    createModulesAnswer() {
        return prompt("\x1b[94m> Veux-tu installer Sequelize et générer les modules automatiquement ? (O/N) :  \x1b[0m");
    },
}

module.exports = promptModule;