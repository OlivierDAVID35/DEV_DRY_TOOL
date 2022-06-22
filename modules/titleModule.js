const gradient = require ("gradient-string");
const figlet = require ("figlet");

//! Titres principaux

const titleModule = {
    welcome() {
        const msg = "<<   Dev  Dry  Tool   >>";
        console.log(gradient.pastel.multiline(figlet.textSync(msg)));
    },
    welcomeUnderline() {
        const msg = "                        ";
        console.log(gradient.pastel.multiline(figlet.textSync(msg)));
    },
    end() {
        const msg = "<<   Enjoy  !   >> ";
        console.log(gradient.pastel.multiline(figlet.textSync(msg)));        
    },
    serveur() {
        console.log(gradient.passion("ETAPE 1 > CREATION D'UN SERVEUR EXPRESS (one page)"));
    },
    authentification() {
        console.log(gradient.passion("ETAPE 2 > AJOUT DE PAGES D'AUTHENTIFICATION (signup/login/signout/profil)"));
    },
    database() {
        console.log(gradient.passion("ETAPE 3 > CREATION D'UNE DATABASE ET IMPORTATION DES DONNEES (.sql)"));
    },
    sequelize() {
        console.log(gradient.passion("ETAPE 4 > GENERATION DE MODELES SEQUELIZE"));
    },
}

module.exports = titleModule;