const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database/database');
const app = express();
var cors = require('cors')
 
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const loginRouter = require('./routing/login.router');
const userRouter = require('./routing/user.router')
const transactionRouter = require('./routing/transaction.router')
const categoryRouter = require('./routing/category.router')
const transactionExtractor = require('./controllers/transactionExtractor')
const currencyRouter = require('./routing/currency.router')

app.use('/api', loginRouter);
app.use('/api', userRouter);
app.use('/api', transactionRouter);
app.use('/api', categoryRouter);
app.use('/api', currencyRouter);


app.post('/extractTransactionInfo', transactionExtractor.extractTransactionInfo)


mongoose.connection.once('open', () => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});
