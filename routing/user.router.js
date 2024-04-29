module.exports = app => {

    const user = require('../controllers/user.controller')
    
    app.get('/api/userAllUsers', user.findAll)
    app.post('/api/getUserByEmail', user.findByEmail)
    app.put('/api/updateByEmail', user.updateByEmail)
    app.post('/api/create', user.create)
    
    }