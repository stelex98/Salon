const express = require('express');
const router = express.Router();
const queries = require('../db/queries/beauty_salon');
const path = require('path');
const fs = require('fs');
const CryptoJS = require("crypto-js");

const global_salt='8hbg5gbdr#$%^ghvfd5';
const path_dir = `/media/olga/Work/BSUIR/public/picture/photo_profile/`;
//const path_dir = `/Users/artur/Desktop/Express/public/picture/photo_profile/`;


//авторизация
router.post('/login', (req, res) => {
	queries.checkLogin(req.body.log)
	.then(data => {
		if(data[0] !== undefined){
			if(checkPassword(data[0].password, data[0].salt, req.body.pass, req.body.salt)){
				req.session.login = data[0].login;
				req.session.key = data[0].id;
				req.session.role = data[0].role;
				res.send({'role': data[0].role, 'login': data[0].login});
			}
		}
		else{
			res.send('Неверный логин или пароль!')
		}
	})
	.catch(error => console.log(`Error: ${error}`));
});

function checkPassword(crypt_pass, user_salt, pass, salt){
	let bytes  = CryptoJS.AES.decrypt(crypt_pass, user_salt+global_salt);
	let password = bytes.toString(CryptoJS.enc.Utf8);
	let hash = CryptoJS.PBKDF2(password, salt, { keySize: 128/32 });
	if(hash.toString() === pass)
		return true;
	else
		return false;
}

router.get('/logout', (req, res) => {
	req.session.destroy();
});

//определение данных о клиенте(для отзыва)
router.post('/user_client', (req, res) => {
	queries.getIdClient(req.body.id_user)
	.then(data => {
		res.send(data[0]);
	})
	.catch(error => console.log(`Error: ${error}`));
});

//проверка на возможность регистрации (поиск логина в БД)
router.post('/signup_check', (req, res) => {
	queries.checkLogin(req.body.login)
	.then(data => {
		console.log(data);
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

//регистрация
router.post('/signup', (req, res) => {
	console.log('tyt');
	let crypt = cryptPass(req.body.password);
	let id_user, id_profile;
	let user = {
	    'login': req.body.login,
		'password': crypt.pass,
		'role': req.body.role,
		'salt': crypt.salt
    };
    let p = writeImageInFile(req.body.photo, req.body.login);
    let profile = {
		'name': req.body.name,
		'surname': req.body.surname,
		'date_birth': req.body.date_birth,
		'mail': req.body.mail,
		'phone': req.body.phone,
		'photo': p
	};
	queries.addUser(user)
	.then(data => {
		id_user = data[0];
		queries.addProfile(profile)
		.then(data => {
			id_profile = data[0];
			let client = {
				'id_profile': id_profile,
				'id_user': id_user
			}
			queries.addClient(client)
			.then(data => {
				res.send(data);
			})
		})
	})
	.catch(error => console.log(`Error: ${error}`));
});

function cryptPass(password){
	let charset = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&+";
	let salt = '';
  	for (var i = 0; i < 10; i++)
    	salt += charset.charAt(Math.floor(Math.random() * 10));
	var crypt = CryptoJS.AES.encrypt(password, salt+global_salt).toString();
	return {'pass': crypt, 'salt': salt};
}

let writeImageInFile = function (imageBase64_withMetaData, nameFile) {
  let acceptType = [ 'png', 'jpg', 'jpeg' ];
  let typeFile = imageBase64_withMetaData.match(/^data:(.*?)\/([a-z]+);base64,(.+)$/)[2];
  if(!typeFile || acceptType.indexOf(typeFile) === -1) throw Error();
  let imageBase64_withoutMetaData = imageBase64_withMetaData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
  let bitmap = new Buffer(imageBase64_withoutMetaData , 'base64');
  let pathImage = path.join(path_dir, `${nameFile}.${typeFile}`);
  fs.writeFile(pathImage, bitmap, 'base64', function(err) {
    if (err) {
      console.log('Fail', err);
    } else {
      console.log("Success");
    }
  });
  return "picture/photo_profile/" + `${nameFile}.${typeFile}`;
};

module.exports = router;