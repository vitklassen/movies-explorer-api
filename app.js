require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./utils/limiterConfig');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(DB_URL).then(() => { console.log('MongoDB is connected'); });
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/error-handlers'));

app.listen(PORT, () => {
  console.log('Server is connected');
});
