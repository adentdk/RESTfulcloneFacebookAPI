const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const app = express();

const model = require('../models/index');

app.use(bodyParser.json())

router.post("/signin", (req,res) => {
    let {email, password} = req.body;
  
        model.users.findOne({
            where : {
                email : email
            }
        }).then(result => {
            bcrypt.compare(password, result.password).then((valid) => {
                if(!valid){
                    res.send(400,{
                        "status" : "ERROR",
                        "messages" : "password is incorrect",
                        "data" : {}
                    });
                }else{
                    res.send({
                        "status" : "OK",
                        "messages" : "all done",
                        "data" : result
                    })
                }
                console.log(err)
            });
        }).catch(err => {
          res.send(400,{
              "status" : "ERROR",
              "messages" : "account not found",
              "data" : {}
          })
        });
       
})

router.post('/create/authorization',(req, res) => {
    let {user_id, name, email} = req.body;
    
    jwt.sign({
        user_id : user_id,
        name : name,
        email : email
    },"iWantTellYouAGreatStory",(err, token) => {
        if(err){
            res.send(400, {
                "status" : "ERROR",
                "data" : {token : null}
            });
            console.log(err);
        }else{
            res.send({
                "status" : "OK",
                "message" : "token successfully created",
                "data" : {token : token}
            })
        }
    })


});

module.exports = router;