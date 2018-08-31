var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//   var todo = new Todo({
//     text: req.body.text
//   });
  

//   todo.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

app.post('/user', (req, res) => {
  var user = new User({
    email : req.body.text
  })

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/user',(req,res) => {
  User.find().then((doc) => {
    res.send({doc})
  }, (e) => {
    res.status(400).send(e)
  });
});

app.get('/user/:id', (req,res) => {
  // res.send(req.params);
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  User.findById(id).then((user) => {
    if(!user){
      return res.status(404).send();
    }
    res.send({user})
  }, (e) => {
    res.status(400).send(e)
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
