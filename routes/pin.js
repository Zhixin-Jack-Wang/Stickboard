const express = require('express');
const router = express.Router();
const axios = require('axios');
const Post = require('../models/Post');



// get meetups
router.get('/', function(req, res) {
    Post.find({}, function(err, posts) {
    //   var userMap = {};
  
    //   users.forEach(function(user) {
    //     userMap[user._id] = user;
    //   });
  
      res.send(posts);  
    });
  });



// pin meetup
router.put('/',({body:{name,time,venue,how_to_find_us,description,photo_url,event_url,id}},res)=>{
    const newPost = new Post({
        name,
        time,
        venue,
        how_to_find_us,
        description,
        photo_url,
        event_url,
        id
    })
    newPost.save()
        .then(
            res.send("success")
        )
})

// Delete item
router.put('/unpin',(req,res)=>{
    Post.remove({ id: req.body.id }, function(err) {
        if (!err) {
                res.send("done");
        }
        else {
                res.send("wrong");
        }
    });
})

module.exports = router;
