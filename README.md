![This is an image](https://nsm09.casimages.com/img/2022/06/18//22061806594424883917926273.png)
# Générateur de serveur Express avec prise en charge de la data
## (projet Monolithique / architecture MVC)

---
## Mise en route

Agrandir un peu le terminal ;)
```
npm i
```
```
node app
```
## Déroulement

- Il suffit juste de vous laisser guider à chaque étape en répondant aux questions dans le terminal ;)  
  - *Vous pourrez vous arrêter à chaque étape...*  
  - *... mais pour le moment, les étapes de création ne sont pas indépendantes*
- Pour finir, votre projet sera automatiquement ouvert dans une nouvelle session Visual Studio Code
---
## ETAPE 1 > Création d'un serveur Express  

1. Choix nom projet et chemin d'installation  
2. Choix d'installation ou non de node-dev ou nodemon  

**- Arborescence du projet généré :**
``` 
  📦Projet  
  ┣ 📂app  
  ┃ ┣ 📂controllers  
  ┃ ┃ ┗ 📜mainController.js  
  ┃ ┣ 📂views  
  ┃ ┃ ┣ 📜404.ejs  
  ┃ ┃ ┗ 📜index.ejs  
  ┃ ┗ 📜router.js  
  ┣ 📂integration  
  ┃ ┗ 📜index.html  
  ┣ 📂public  
  ┃ ┣ 📂css  
  ┃ ┃ ┣ 📜reset.css  
  ┃ ┃ ┗ 📜style.css  
  ┃ ┗ 📂images  
  ┣ 📜.gitignore  
  ┣ 📜.env  
  ┣ 📜.env.example  
  ┗ 📜index.js 
  ```

- **Création :**  
  - .env & .env.example auto-paramétrés :
    - PORT = suivant entrée utilisateur
  - ajout .gitignore (node_module, .env)  
  
- **Package NPM installés (commande npm init -y exécutée dans dossier projet):**  
  - express
  - dotenv
  - ejs
  - "option" : node-dev ou nodemon  

---
## ETAPE 2 > Ajout de pages d'authentification</u> (signup/login/signout/profil) :

1. Choix de l'ajout de pages supplémentaires
2. TODO > controller (authController) à modifier suivant la BDD utilisée  

**- Arborescence des dossiers & fichiers créés / modifiés du projet :**
```  
  📦Projet  
  ┣ 📂app  
  ┃ ┣ 📂controllers  
  ┃ ┃ ┗ 📜authController.js  
  ┃ ┣ 📂middelwares  
  ┃ ┃ ┗ 📜loginCheck.js  
  ┃ ┣ 📂routers  
  ┃ ┃ ┣ 📜logged.js  
  ┃ ┃ ┗ 📜public.js  
  ┃ ┗ 📂views  
  ┃ ┃ ┣ 📂partials  
  ┃ ┃ ┃ ┣ 📜footer.ejs  
  ┃ ┃ ┃ ┗ 📜header.ejs  
  ┃ ┃ ┣ 📜404.ejs  
  ┃ ┃ ┣ 📜index.ejs  
  ┃ ┃ ┣ 📜login.ejs  
  ┃ ┃ ┣ 📜profil.ejs  
  ┃ ┗ ┗ 📜signup.ejs  
  ┣ 📜.env  
  ┣ 📜.env.example  
  ┗ 📜index.js 
``` 

- **Créations :**
  - authController.js dans dossier controllers (dossier app)
  - dossier middlewares > loginCheck.js (dossier app)
  - dossier routers > 2 routeurs : looged.js & public.js (dans app)
  - dossier partials > header.ejs & footer.ejs (dans app/views)
  - login.ejs, profil.ejs & signup.ejs (dans app/views)  

- **Modifications :**
  - index.js : secret généré aléatoirement (app.use(session...))
  - index.ejs & 404.ejs (dans app/views)
  - .env auto-paramétré (idem pour .env.example) :
    - ajout SECRET = suivant valeur générée aléatoirement dans index.js

- **Package NPM installés :**
  - express-session
  - fs
  - email-validator
  - bcrypt
  - csurf
---
## ETAPE 3 > Création d'une database et importation des données (.sql) :

1. Choix création d'un User et/ou une Database
2. Choix importation de fichier(s) data dans le dossier projet :
   - *Possibilité d'importer plusieurs fichiers (<u>dans l'ordre</u> : table(s) puis data)*
3. Importation des tables / data dans la database  

**- Arborescence des dossiers & fichiers créés / modifiés du projet :**
```  
  📦Projet  
  ┣ 📂app  
  ┃ ┣ 📂data  
  ┃ ┃ ┗ 📜userDatabse.sql  
  ┣ 📜.env  
  ┗  📜.env.example 
``` 

- **Créations :**
  - dossier data (dans dossier projet) et importation de la database  

- **Modifications :**
  - .env auto-paramétré (idem pour .env.example) :
    - ajout PG_URL = suivant entrées utilisateur  

- **Package NPM installé :**
  - pg
---
## ETAPE 4 > Génération de modèles sequelize :

1. Choix d'installation de sequelize et génération auto des modèles suivant les tables de la database  

**- Arborescence des dossiers & fichiers créés / modifiés du projet :**
``` 
  📦Projet  
  ┣ 📂app  
  ┃ ┣ 📂models  
  ┃ ┃ ┗ 📜init-models.js  
  ┃ ┃ ┗ 📜tableName-1.js  
  ┃ ┃ ┗ 📜userTable-....js  
```
- **Création d'un dossier models (dans dossier app) :**
  - fichier init-models.js (index)
  - fichiers tableName.js (autant de fichiers que de tables dans la database)
