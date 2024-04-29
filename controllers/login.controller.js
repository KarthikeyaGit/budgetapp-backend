const { User } = require("../modals/all.modal");



exports.login = (req, res) => {
    console.log("req", req.body)
    User.findOne({email: req.body.email, password: req.body.password})
      .then((data) => {
        console.log("data", data);
      if(data === null) {
        res.send({
          hasError: true,
          message:"Invalid Email or Password"
        });
      } else {
        res.status(200).send(
          {
            hasError: false,
            message:"Logged in successfully"
          })
      }
    
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};