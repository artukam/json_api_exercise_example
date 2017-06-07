require('dotenv').load();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth')

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/users', authMiddleware.loginRequired, userRoutes)
app.use('/api/auth', authRoutes)


app.listen(process.env.PORT || 3000);