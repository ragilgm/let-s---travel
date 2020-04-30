let User = require('../models/users').User;
let express = require('express');
let route = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

route.post('/login', async (req,res)=>{
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;
    let user = await User.find().where({email: reqEmail});
    if(user.length > 0){
        let comparisonPassword = await bcrypt.compare(reqPassword, user[0].password);
        if(comparisonPassword){
            let token = auth.generateToken(user);
            let cookie = res.cookie('AUTH_TOKEN', token);
            res.cookie('AUTH_TOKEN', token);
            res.send({
                redirectURL: '/admin'
            });
        }else{
            res.status(400);
            res.send('rejected');
        }
    }else{
        res.status(400);
        res.send('rejected');
    }
 
})
route.post('/register', async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    let encrypted = await bcrypt.hash(password, 12);
    if(user==""){
            let newUser = new User({
            email: email,
            password: encrypted
            });
            await newUser.save();
            res.send('done');
    }else{
        res.send('email yang anda masukan sudah terdaftar, silahkan login')
    }

})


module.exports = route;