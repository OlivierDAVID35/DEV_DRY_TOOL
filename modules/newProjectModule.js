const fs = require('fs-extra');

//! 1- Créer un nouveau projet

const newProjectModule = {
    createNewProject(projectDirectory) {
        //? Création du dossier du projet
        console.log(projectDirectory);
        process.exit();
        if(!fs.existsSync(projectDirectory)) {
            fs.mkdir(projectDirectory, { recursive: true }, (err) => {
                if(err) return err;
            })
        };
        console.log("\x1b[32m Dossier projet créé \x1b[0m");
    }
}

module.exports = newProjectModule;