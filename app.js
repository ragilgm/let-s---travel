let express = require('express');
let app = express();
let port = 3000;
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let multer = require('multer');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

let postRouter = require('./route/post');
let callbackRequestRouter = require('./route/callback-request');
let emailRouter = require('./route/emails');
let usersRouter = require('./route/users');
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/travels', { useUnifiedTopology: true, useNewUrlParser: true });
app.use(express.json());
app.use(multer({ storage: imageStorage }).single('imageUrl'));
app.use(cookieParser());

app.use('/', postRouter);
app.use('/callback-request', callbackRequestRouter);
app.use('/', emailRouter);
app.use('/users', usersRouter);
app.use(express.static('public'));

app.get('/sight', async (req, res)=> {
    let id = req.query.id;
    let post = await Post.findOne({id:id});
    res.render('sight' ,{
        title: post.title,
        imageUrl: post.imageUrl,
        date: post.date,
        text: post.text
    })
})

let isLoggedIn = false;
app.get('/admin', (req,res)=>{
    let token = req.cookies['AUTH_TOKEN'];
    if(token && auth.checkToken(token)){
    res.render('admin');
    }else{
    res.redirect('/login');
    }
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.listen(port, () => console.log('listen port ' + port));
