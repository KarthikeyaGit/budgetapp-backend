const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log("dbConfig.url", dbConfig.url);
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Database Connection Successfully!");
    })
    .catch(err => {
        console.error("Could not connect to the database:", err);
        process.exit(1); 
    });

module.exports = mongoose; 
