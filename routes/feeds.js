const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const router = express.Router();
const app = express();

const model = require('../models/index');
	
const Op = Sequelize.Op

app.use(bodyParser.json())

router.get('/',  (req, res) => {
	model.sequelize
	.query("SELECT feeds.*, users.name, users.avatar FROM feeds INNER JOIN users ON users.id = feeds.user_id ORDER BY feeds.createdAt DESC")
	.then(result => {
		res.send(result[0])
	})
});

router.get('/:id',  (req, res) => {
	model.sequelize
	.query(`SELECT feeds.*, users.name, users.avatar FROM feeds INNER JOIN users ON users.id = feeds.user_id WHERE feeds.id = ${req.params.id} ORDER BY feeds.createdAt DESC LIMIT 1`)
	.then(result => {
		res.send(result[0][0])
	})
});

router.get('/details/:id', (req,res) => {

	model.feeds.belongsTo(model.users,{foreignKey : 'user_id'});
	model.users.hasMany(model.feeds,{foreignKey : 'user_id'});

	model.feed_responses.belongsTo(model.feeds,{foreignKey : 'feed_id'});
	model.feeds.hasMany(model.feed_responses,{foreignKey : 'feed_id'});

	model.feed_comments.belongsTo(model.feeds,{foreignKey : 'feed_id'});
	model.feeds.hasMany(model.feed_comments,{foreignKey : 'feed_id'});

	model.comment_responses.belongsTo(model.feed_comments,{foreignKey : 'comment_id'});
	model.feed_comments.hasMany(model.comment_responses,{foreignKey : 'comment_id'});

	model.comment_replies.belongsTo(model.feed_comments, {foreignKey : 'comment_id'})
	model.feed_comments.hasMany(model.comment_replies, {foreignKey : 'comment_id'})

	model.feed_responses.belongsTo(model.responses,{foreignKey : 'response_id'});
	model.responses.hasMany(model.feed_responses,{foreignKey : 'response_id'});

	model.comment_responses.belongsTo(model.responses,{foreignKey : 'response_id'});
	model.responses.hasMany(model.comment_responses,{foreignKey : 'response_id'});



	model.feeds.findOne({
		include : [
			{ 
				model : model.users,
				attributes : ['name','avatar'],
				where : {
					id : req.params.id
				}
			},
			{ 
				model : model.feed_comments,
				include : [
					{
						model : model.comment_responses,
						attributes : ['id'],
						include : [
							{
								model: model.responses,
								attributes : ['name']
							}
						]
					},
					{
						model : model.comment_replies
					}
				] 
			},
			{ 
				model : model.feed_responses,
				attributes : ['id'],
				include : [
					{
						model: model.responses,
						attributes : ['name']
					}
				],
			}
		]
	}).then(result => {
		res.send(result)
	}).catch(err => {
		res.send({"error" : true});
		console.log(err);
	})
})

router.patch('/:id', (req,res) => {
    const postId = req.params.id;
    const content = req.body.content;
    console.log(postId)
    model.feeds.update({
      content : content
    },
    {
      where : {
        id : postId
    }
    }).then(result =>{
    	if(result > 0){
    	 res.status(200).send({
	        "status" : "OK",
	        "messages" : "feed data updated successfully",
	        "data" : result
	      })
    	}else{
    	  res.status(400).send({
	        "status" : "ERROR",
	        "messages" : "feed no updated",
	        "data" : result
	      })
    	}
    });
});

router.post('/', (req, res) => {
	let myId = req.userData.user_id;
	let content = req.body.content;

	 model.feeds.create({
      user_id : myId,
      content : content
    })
	.then(result => {
	 	res.status(201).send({
	        "status" : "OK",
	        "messages" : "feed successfully added",
	        "data" : result
      	})
	}).catch(err =>{
		res.status(400).send({
	        "status" : "ERROR",
	        "messages" : "feed fail added",
	        "data" : {}
      	})
      	console.log(err)
	});
})

router.delete('/:post_id', (req,res) => {
	model.feeds.destroy({
		where : {
			id : req.params.post_id
		}
	}).then(result => {
		if(result > 0) {
			res.send(200,{
				"status" : "OK",
				"messages" : "feed data successfully deleted"
			});
		}else{
			res.send(400,{
				"status" : "ERROR",
				"messages" : "no feed deleted"
			});
		}
	});
})


module.exports = router;