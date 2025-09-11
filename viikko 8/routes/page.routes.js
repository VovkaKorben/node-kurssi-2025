import express from 'express';
import { isLoggedIn } from '../controllers/auth.controller.js';
import newAdvert, { listAdverts } from '../controllers/advert.controller.js';


const routes = express.Router();


// routes.get('/', isLoggedIn, (req, res) => {    res.render('index', {        user: req.user    });});
routes.get('/', [isLoggedIn, listAdverts], (req, res) => {
    res.render('index', {
        user: req.user,
        list: req.list
    });
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get('/newAdvert', isLoggedIn, (req, res) => {
    res.render('new-advert', {
        user: req.user
    });
});

routes.get('/newAdvert', isLoggedIn, (req, res) => {
    res.render('new-advert', {
        user: req.user
    });
});

routes.post('/newAdvert', [isLoggedIn, newAdvert], (req, res) => {
    res.render('new-advert', {
        user: req.user
    });
});



export default routes;
