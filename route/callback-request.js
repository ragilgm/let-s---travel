let CallbackRequest = require('../models/callback-request').CallbackRequest;
let uniqid = require('uniqid');
let Post = require('../models/posts').Post;
let express = require('express');
let authMiddleware = require('../middleware/auth');
let route = express.Router();

route.get('/', authMiddleware, async (req, res)=>{
    res.send(await CallbackRequest.find())
})
route.post('/', authMiddleware, async (req, res)=>{
    let reqBody = req.body;
    let newRequst = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    });
    await newRequst.save();
    res.send('Accepted');
})
route.delete('/:id', authMiddleware, async (req, res)=>{
    let id = req.params.id;
    await CallbackRequest.deleteOne({id: id });
    res.send('Deleted');
})

module.exports = route;