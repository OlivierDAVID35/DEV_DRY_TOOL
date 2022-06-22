![This is an image](https://nsm09.casimages.com/img/2022/06/18//22061806594424883917926273.png)
<h1 style="color: green">Générateur de serveur Express avec prise en charge de la data </h1>   
<h2 style="color: green">(projet Monolithique / architecture MVC)</h2>

---
<h2 style="color: darkCyan">Mise en route</h2>
Agrandir un peu le terminal ;)  

```
npm i
```
```
node app
```
<h2 style="color: darkCyan">Déroulement</h2>

- Il suffit juste de vous laisser guider à chaque étape en répondant aux questions dans le terminal ;)  
  - *Vous pourrez vous arrêter à chaque étape...*  
  - *... mais pour le moment, les étapes de création ne sont pas indépendantes*
- Pour finir, votre projet sera automatiquement ouvert dans Visual Studio Code
---
<h2 style="color: royalBlue"><u>ETAPE 1 > Création d'un serveur Express</u></h2>  

1. Choix nom projet et chemin d'installation  
2. Choix d'installation ou non de node-dev ou nodemon
*  <u>Arborescence du projet généré :</u>
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

- <u>Création :</u>  

  - .env & .env.example auto-paramétrés :
    - PORT = suivant entrée utilisateur
  - ajout .gitignore (node_module, .env)  
  
- <u>Package NPM installés</u> (commande npm init -y exécutée dans dossier projet):  
  - express
  - dotenv
  - ejs
  - "option" : node-dev ou nodemon  

---
<h2 style="color: royalBlue"><u>ETAPE 2 > Ajout de pages d'authentification</u> (signup/login/signout/profil) :</h2>  

1. Choix de l'ajout de pages supplémentaires
2. TODO > controller (authController) à modifier suivant la BDD utilisée
- <u>Arborescence des dossiers & fichiers créés / modifiés du projet :</u>
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
- <u>Créations :</u>
  - authController.js dans dossier controllers (dossier app)
  - dossier middlewares > loginCheck.js (dossier app)
  - dossier routers > 2 routeurs : looged.js & public.js (dans app)
  - dossier partials > header.ejs & footer.ejs (dans app/views)
  - login.ejs, profil.ejs & signup.ejs (dans app/views)
- <u>Modifications :</u>
  - index.js : secret généré aléatoirement (app.use(session...))
  - index.ejs & 404.ejs (dans app/views)
  - .env auto-paramétré (idem pour .env.example) :
    - ajout SECRET = suivant valeur générée aléatoirement dans index.js

- <u>Package NPM installés :</u>
  - express-session
  - fs
  - email-validator
  - bcrypt
  - csurf
---
<h2 style="color: royalBlue"><u>ETAPE 3 > Création d'une database et importation des données (.sql) :</u></h2>

1. Choix création d'un User et/ou une Database
2. Choix importation de fichier(s) data dans le dossier projet :
   - *Possibilité d'importer plusieurs fichiers (<u>dans l'ordre</u> : table(s) puis data)*
3. Importation des tables / data dans la database

* <u>Arborescence des dossiers & fichiers créés / modifiés du projet :</u>
```  
  📦Projet  
  ┣ 📂app  
  ┃ ┣ 📂data  
  ┃ ┃ ┗ 📜userDatabse.sql  
  ┣ 📜.env  
  ┗  📜.env.example 
``` 

- <u>Créations :</u>
  - dossier data (dans dossier projet) et importation de la database
- <u>Modifications :</u>
  - .env auto-paramétré (idem pour .env.example) :
    - ajout PG_URL = suivant entrées utilisateur
- <u>Package NPM installé :</u>
  - pg
---
<h2 style="color: royalBlue"><u>ETAPE 4 > Génération de modèles sequelize :</u></h2>

1. Choix d'installation de sequelize et génération auto des modèles suivant les tables de la database
- <u>Arborescence des dossiers & fichiers créés / modifiés du projet :</u>
``` 
  📦Projet  
  ┣ 📂app  
  ┃ ┣ 📂models  
  ┃ ┃ ┗ 📜init-models.js  
  ┃ ┃ ┗ 📜tableName-1.js  
  ┃ ┃ ┗ 📜userTable-....js  
```
- <u>Création d'un dossier models (dans dossier app) :</u>
  - fichier init-models.js (index)
  - fichiers tableName.js (autant de fichiers que de tables dans la database)
