const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const appRouter = require('./routes');
const usersRouter = require('./routes/users');
const pollsRouter = require('./routes/polls');
const fileUpload = require('express-fileupload');
const mongoose = require('./config/database');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'build')));


app.use('/api/users', usersRouter);
app.use('/api/polls', pollsRouter);
app.use('/', appRouter);
app.listen(process.env.PORT || process.env.SERVER_PORT || 3000, () => {
  console.log('Would you rather app is running...');
});
