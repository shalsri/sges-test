//function used to hash the password using bcrypt npm.

const bcrypt = require('bcrypt-nodejs');

class passwordmgr {
    generateHash(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    compareSync(password, storedpassword){
        return bcrypt.compareSync(password, storedpassword)
    }
}

module.exports = passwordmgr;