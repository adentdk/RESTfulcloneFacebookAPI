const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const router = express.Router();

const app = express();
const Op = Sequelize.Op

const model = require('../models/index');

router.get('/self', (req, res) => {
	let myId = req.userData.user_id

	model.sequelize
	.query(`select stories.*, users.avatar as user_avatar, users.name as user_name from stories inner join users on users.id = stories.user_id where stories.user_id = ${myId}`)
	.then(result =>{
		res.send(result[0][0])
	});
});

router.get('/friends', (req, res) => {
	let myId = req.userData.user_id

	model.sequelize
	.query(`select stories.*, users.avatar as user_avatar, users.name as user_name from stories inner join users on users.id = stories.user_id where stories.user_id != ${myId}`)
	.then(result =>{
		res.send(result[0])
	});
});


module.exports = router;