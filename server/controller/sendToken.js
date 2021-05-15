const path = require('path');

module.exports = {
  sendToken: (req, res) => {
    res.sendFile(__dirname +  '../../loader_verification.txt');
  }
}
