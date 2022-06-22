const fs = require('fs');

module.exports = {
  deleteFile: (fileName) => {
    const path = './public';
    if (fs.existsSync(`${path}/${fileName}`)) {
      fs.unlinkSync(`${path}/${fileName}`);
    } else {
      return false;
    }
  }
};
