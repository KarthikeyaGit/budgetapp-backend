module.exports = app => {

    const loginuser = require('../controllers/login.controller')
    
    app.get('/api/login', loginuser.login)

    }