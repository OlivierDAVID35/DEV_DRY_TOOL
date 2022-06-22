const express = require('express');
const router = express.Router();

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true }) 

const authController = require('../controllers/authController');

router.get('/profil', csrfProtection, authController.profil);

router.get('/logout', csrfProtection, authController.logout);

router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;