const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database/database'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routing/user.router")(app);
require("./routing/login.router")(app);



mongoose.connection.once('open', () => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});
