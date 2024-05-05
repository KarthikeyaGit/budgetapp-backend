const currencies = require('currencies.json');

exports.getCurrencies = (req, res) => {
    
  

    res.json(currencies);
};
