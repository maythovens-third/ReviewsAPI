const path = require('path');

module.exports = {
  sendToken: (req, res) => {
    res.sendFile(path.join(__dirname, '../loaderio-965daee38be22f32824976e869fc84e1.txt');
    res.end();
  }
}