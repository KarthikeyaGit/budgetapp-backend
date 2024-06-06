const currencies = require('currencies.json');
const { User } = require('../models/user.model');

exports.getCurrencies = (req, res) => {
    console.log("currency", currencies);
    res.json(currencies);
};

exports.updateCurrencyByUid = (req, res) => {
    let uid = req.body.uid;
    let currency = req.body.currency;
    
    User.findOneAndUpdate(
        { _id: uid },
        { $set: { "currency": `${currency}` } }
    )
        .then((data) => {
            console.log("success", data);

        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred updating currency.",
        });
    });
}

