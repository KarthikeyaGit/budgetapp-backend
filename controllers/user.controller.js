const { User } = require("../modals/all.modal");


exports.create = (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password
  });

  newUser.save()
    .then((data) => {
      res.send(data); 
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
};

exports.findAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

exports.findByEmail = (req, res) => {
  User.findOne({"email":req.body.email})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving messages.",
    });

  })
}

exports.updateByEmail = (req, res) => {
  User.findOneAndUpdate( {id:req.body.id},
    { $set: { "email": `${req.body.email}` } },
    {new:true, }
  )
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving messages.",
    });

  })
}