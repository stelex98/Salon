const express = require('express');
const router = express.Router();
const queries = require('../db/queries/beauty_salon');

//const PATH = `/media/olga/Work/BSUIR/Salon/public/html`;
const PATH = '/Users/artur/desktop/Salon/Express/public/html';

router.get('/registration', (req, res) => {
  //console.log('hgrte');
	res.sendFile(PATH + '/registration.html');
});

router.get('/services', (req, res) => {
	res.sendFile(PATH + '/services.html');
});

router.get('/prices', (req, res) => {
	res.sendFile(PATH + '/prices.html');
});

router.get('/reviews', (req, res) => {
	res.sendFile(PATH + '/reviews.html');
});

router.get('/contacts', (req, res) => {
	res.sendFile(PATH + '/contacts.html');
});

router.get('/recording', (req, res) => {
	res.sendFile(PATH + '/records.html');
});

router.get('/recording_check', (req, res) => {
	if(req.session.login !== undefined){
		res.send({text: true});
	}
	else{
		res.send({text:'Нельзя записаться на услугу неавторизованным пользователям!'});
	}
});

router.get('/setting', (req, res) => {
	res.sendFile(PATH + '/adminPage.html');
});

router.get('/my_records', (req, res) => {
	res.sendFile(PATH + '/adminPage.html');
});

//проверка на добавление отзыва
router.get('/addReview_check', (req, res) => {
	if(req.session.login !== undefined){
		let key = req.session.key;
		res.send({'key': key});
	}
	else{
		res.send({'key': 0});
	}
});

//проверка на клиента или админа
router.get('/check', (req, res) => {
	if(req.session.role !== undefined){
		if(req.session.role)
			res.send({'check': 'admin'});
		else{
			res.send({'check': 'user', 'login': req.session.login});
		}
	}
	else{
		res.send({'check': 'guest'});
	}
});

router.get('/personal-account', (req, res) => {
	res.sendFile(PATH + '/account.html');
});


module.exports = router;
