const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const app = express();

const model = require('../models/index');

app.use(bodyParser.json())

