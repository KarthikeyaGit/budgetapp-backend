module.exports = app => {

    const loginuser = require('../controllers/login.controller')
    
    app.get('/login', loginuser.login)

    }