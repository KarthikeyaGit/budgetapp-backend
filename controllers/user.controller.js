const { User } = require("../models/user.model");

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

exports.updateCurrencyById = async (req, res) => {
  console.log("req.params", req.query);
  console.log("req.body", req.body);

  if (!req.query.id || !req.body.currency) {
    return res.status(400).send({ message: "ID and currency are required." });
  }

  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.currency = req.body.currency;

    await user.save();
    
    return res.status(200).send({ message: "Currency updated successfully." });
  } catch (error) {
    console.error("Error updating currency:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};
