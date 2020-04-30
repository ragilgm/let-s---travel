let uniqid = require('uniqid');
let Post = require('../models/posts').Post;
let authMiddleware = require('../middleware/auth');
let express = require('express');
let route = express.Router()


route.get('/posts', authMiddleware, async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
})
route.get('/posts/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    res.send(post);
})
route.post('/posts', authMiddleware, async (req, res) => {
    let reqBody = req.body;
    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageUrl: req.file.path.substring(7, req.file.path.length)
    })
    await newPost.save();
    res.send('created');
})

route.delete('/posts/:id', authMiddleware, async (req,res)=>{
    let id = req.params.id;
    await Post.deleteOne({id: id});
    res.send('deleted');
})

route.put('/posts/:id', authMiddleware, async (req, res)=>{
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    res.send('Updated');
})

module.exports = route;