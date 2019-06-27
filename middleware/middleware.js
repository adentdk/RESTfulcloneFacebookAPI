const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

express().use(bodyParser.json());

const auth =  (req, res, next) => {
    const token = (req.headers.authorization != undefined ) ? req.headers.authorization.split(' ')[1] : false
    if(token) {
            jwt.verify(token,"iWantTellYouAGreatStory", (err,decoded) => {
                if(err){
                    res.send(400,{
                        "status" : "ERROR",
                        "message" : "error",
                        "data" : {token : req.headers.authorization}
                    })
                    console.log('token error')
                }else{
                    req.userData = decoded;
                    console.log("token valid")
                    next();
                }
            })  
    }else{
        res.send(200,{
            "status" : "ERROR",
            "message" : "Token is undefined",
            "data" : {token : req.headers.authorization}
        })

        console.log("token tidak ada")
    }
}


module.exports = {auth};