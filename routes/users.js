const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const router = express.Router();
const app = express();

const model = require('../models/index');

app.use(bodyParser.json())
// GET all users
router.get('/',async (req, res, next) => {
  try {
    const users = await model.users.findAll({});
    if(users.length !== 0) {
      res.status(200).json({
        "status" : "OK",
        "messages" : "user data has been loaded",
        "data" : users
      })
    }else{
      res.status(400).json({
          "status" : "ERROR",
          "messages" : "EMPTY",
          "data" : {}
      })
    }
  } catch(err) {
    res.status(400).json({
      "status" : "ERROR",
      "messages" : err.messages,
      "data" : {}
    })
  }
});

// GET user by id
router.get('/:id', async (req,res,next) => {
  try {
    const users = await model.users.findAll({
      where: {
        id: req.params.id
      }
    });
    if(users.length !== 0) {
      res.status(200).json({
        "status" : "OK",
        "messages" : "user data has been loaded",
        "data" : users[0]
      })
    }else{
      res.status(400).json({
          "status" : "ERROR",
          "messages" : "EMPTY",
          "data" : {}
      })
    }
  } catch(err) {
    res.status(400).json({
      "status" : "ERROR",
      "messages" : err.messages,
      "data" : {}
    })
  }
});

// CREATE users
router.post('/',async (req,res,next) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber
    } = req.body;
    const create = await model.users.create({
      name,
      email,
      password : bcrypt.hashSync(password,bcrypt.genSaltSync(10)),
      phone_number : phoneNumber
    });

    if(create) {
      res.status(201).json({
        "status" : "OK",
        "messages" : "user data successfully added",
        "data" : create
      })
    }
  } catch(err) {
    res.status(400).json({
      "status" : "ERROR",
      "messages" : err.messages,
      "data" : {}
    })
  }
});

// UPDATE users
router.put('/:id', async (req,res,next) => {
  try{
    const userId = req.params.id;
    const {
      name,
      email,
      password,
      phoneNumber
    } = req.body;
    const update = await model.users.update({
      name,
      email,
      password,
      phone_number : phoneNumber
    },{
      where : {
        id : userId
      }
    });

    if(update) {
      res.status(200).json({
        "status" : "OK",
        "messages" : "user data updated successfully",
        "data" : update
      })
    }
  }catch(err){
    res.status(400).json({
      "status" : "ERROR",
      "messagges" : err.messages,
      "data" : {}
    })
  }
});

// DELETE users
router.delete('/:id', async(req,res,next) => {
  try{
    const userId = req.params.id;
    const destroy = await model.users.destroy({
      where: {
        id : userId
      }
    })
    if(destroy) {
      res.status(200).json({
        "status" : "OK",
        "messages" : "user data was successfully deleted",
        "data" : destroy
      })
    } 
  } catch (err) {
    res.status(400).json({
      "status" : "ERROR",
      "messages" : err.messages,
      "data" : {}
    })
  }
});

module.exports = router;
