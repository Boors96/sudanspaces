const email_sender = require("./email_sender");
const db = require("./sqlize");

module.exports = {
    db: db,
    email_sender: email_sender
};