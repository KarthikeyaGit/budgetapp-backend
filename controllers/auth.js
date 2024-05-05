const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.verifyToken = (req, res, next) => {
    const token = req.headers.token;
    console.log("token", token,  process.env.JWT_SECRET);
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("err", err);
            return res.status(401).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.userId;
        next();
    });
};




