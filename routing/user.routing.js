module.exports = app => {

    const user = require('../controllers/user.controller')
    
    app.get('/users', user.findAll)
    app.post('/getUserByEmail', user.findByEmail)
    app.put('/updateByEmail', user.updateByEmail)
    
    }