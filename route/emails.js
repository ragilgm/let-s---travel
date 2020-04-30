let Email = require('../models/emails').Email;
let uniqid = require('uniqid');
let express = require('express');
let authMiddleware = require('../middleware/auth');
let route = express.Router();

route.get('/emails', authMiddleware, async (req, res)=>{
    res.send(await Email.find())
})
route.post('/emails', authMiddleware, async (req, res)=>{
    let newEmail = new Email({
        id: uniqid(),
        email: req.body.email,
        name: req.body.name,
        text: req.body.text,
        date: new Date()
    });
    await newEmail.save();
    res.send('Accepted');
})
route.delete('/emails/:id', authMiddleware, async (req, res)=>{
    let id = req.params.id;
    await Email.deleteOne({id: id });
    res.send('Deleted');
})

module.exports = route;