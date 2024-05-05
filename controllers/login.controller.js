const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

exports.login = (req, res) => {
    console.log("req", req.body)
    User.findOne({ email: req.body.email, password: req.body.password })
        .select('-password') // Exclude the password field from the returned data
        .then((user) => {
            console.log("user", user);
            if (!user) {
                res.status(200).send({
                    hasError: true,
                    message: "Invalid Email or Password"
                });
            } else {
                // Generate JWT token with user ID in payload
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                // Create a new object with user data and add the token property
                const userWithToken = {
                    ...user.toObject(), // Convert Mongoose document to plain JavaScript object
                    token: token
                };

                res.status(200).send({
                    hasError: false,
                    message: "Logged in successfully",
                    user: userWithToken // Send the user object with the embedded token
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user data.",
            });
        });
};
