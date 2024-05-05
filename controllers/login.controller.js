const { User } = require("../models/user.model");

exports.login = (req, res) => {
    console.log("req", req.body)
    User.findOne({ email: req.body.email, password: req.body.password })
        .select('-password') // Exclude the password field from the returned data
        .then((data) => {
            console.log("data", data);
            if (data === null) {
                res.status(200).send({
                    hasError: true,
                    message: "Invalid Email or Password"
                });
            } else {
                res.status(200).send({
                    hasError: false,
                    message: "Logged in successfully",
                    user: data // Send the user data without the password
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user data.",
            });
        });
};
