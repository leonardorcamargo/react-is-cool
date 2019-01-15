const crypto = require('crypto');

const uuid = () => {
    return crypto.randomBytes(16).toString("hex");
}

module.exports = uuid;