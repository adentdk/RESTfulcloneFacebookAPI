const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const router = express.Router();
const app = express();

const model = require('../models/index');
	
const Op = Sequelize.Op

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
