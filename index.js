const helmet = require('helmet');
const express = require('express');
const xss = require('xss-clean');
const cors = require('cors');
const { PORT } = require('./env');

//routes
const authRoute = require('./src/route/auth.route');
const usersRoute = require('./src/route/users.route');
const destinationRoute = require('./src/route/destination.route');
const activityRoute = require('./src/route/activity.route');
const TransactionRoute = require('./src/route/transactions.route');

const app = express();

app.use(express.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
);

app.use(xss());
app.use(cors());
app.use('/public', express.static('public'));

//allow cors from all
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//file access in public folder

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

app.use(authRoute);
app.use(usersRoute);
app.use(destinationRoute);
app.use(activityRoute);
app.use(TransactionRoute);

app.listen(PORT, () => {
  console.log(`service running on PORT ${PORT}`);
});
