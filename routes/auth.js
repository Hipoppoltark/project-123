const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');


router.post('/register', (req, res) => {
	const inputEmail = req.body.inputEmail;
	const inputPassword = req.body.inputPassword;
	const inputPasswordConfirm = req.body.inputPasswordConfirm;

	if (inputPassword !== inputPasswordConfirm) {
		res.json ({
			ok: false,
			error: "Пароли не совпадают",
			fields: ["inputPassword", "inputPasswordConfirm"]
		});
	} else {
		bcrypt.hash(inputPassword, null, null, (err,hash) =>  {
			models.User.create ({
				inputEmail,
				inputPassword: hash
			}).then(user => {
				console.log(user);
				res.json({
					ok: true
				});
			}).catch(err => {
				console.log(err);
				res.json({
					ok: false,
					error: 'Ошибка, попробуйте снова!'
				});
			});
		});
	}

});

module.exports = router;
