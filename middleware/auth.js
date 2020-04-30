let auth = require('../controllers/auth');

function checkAuth(req, res, next){
    let token = req.cookies['AUTH_TOKEN'];
    if(token && auth.checkToken(token)){
        next();
    }else{
        res.status(400);
        res.send('Not Authorized..!!');
    }
}

 module.exports = checkAuth;