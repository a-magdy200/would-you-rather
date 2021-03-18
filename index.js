const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const pollsRouter = require('./routes/polls');
const fileUpload = require('express-fileupload');

const index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(cors());
index.use(fileUpload());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'client', 'build')));


index.use('/api/users', usersRouter);
index.use('/api/polls', pollsRouter);
index.use('/', indexRouter);
index.listen(process.env.PORT || process.env.SERVER_PORT || 3000, () => {
  console.log('Would you rather app is running...');
});
