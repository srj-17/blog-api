const CustomNotFoundError = require("../customErrors/CustomNotFoundError");

function errorHandler404(req, res) {
    throw new CustomNotFoundError();
}

module.exports = {
    errorHandler404,
};
