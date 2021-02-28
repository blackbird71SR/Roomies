const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
	check,
	validationResult
} = require('express-validator');

const { models } = require('../../sequalize');

router.get('/', function(req, res){
	models.userModel.findAll().then((data) => {
		if (data) res.send(data);
		else throw Error("Data not received");
	}).catch(() => res.sendStatus(500));
})


router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const {firstName,lastName,email,password} = req.body;

		try {
			let allUsers = await models.userModel.findOne({ where: { email: email } })
			if(allUsers !== null){
				return res.status(400).json({
					errors: [{
						msg: 'User already exists'
					}]
				});
		}

			const salt = await bcrypt.genSalt(10);
			const encryptedPassword = await bcrypt.hash(password, salt);
			let payload = {}

			let userData;

			await models.userModel
			.create({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: encryptedPassword
			})
			.then(({ dataValues }) => {
				userData = dataValues
				payload = {
					user: {
						id: dataValues.id
					}
				};
			})

			await models.profileModel
			.create({
				id: userData.id,
				name: firstName + ' ' + lastName,
				email: email,
				avatar:'',
				gender: '',
				age: '',
				city: '',
				country: '',
				univ: '',
				sem: '',
				course:'',
				food:'',
				smoke:'',
				drink:'',
				cook:'',
				notes:'',
				linkedin:'',
				roomieGender:'',
				roomieAge:'',
				roomieCountry:'',
				roomieUniv:'',
				roomieSem:'',
				roomieCourse:'',
				roomieFood:'',
				roomieSmoke:'',
				roomieDrink:'',
				roomieCook:''
			})

			jwt.sign(
				payload,
				process.env.jwtSecret, {
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.status(201).json({
						token,
						success: true,
						message: "User created!",
						errors: []
					});
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;