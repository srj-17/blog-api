const prisma = require("../models/model");

function getComments (req, res) {
    res.json({ msg: "Giving out comments" });
}

function postComments(req, res) {
    // dummy data
    const title = "Some title";
}

module.exports = {
    getComments,
    postComments
}
