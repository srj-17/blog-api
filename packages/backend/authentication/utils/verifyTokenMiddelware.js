const jwt = require("jsonwebtoken");
const ForbiddenError = require("../../customErrors/CustomForbiddenError");

function verifyToken(req, res, next) {
    const bearerHeader = req.header("authorization");
    if (typeof bearerHeader !== "undefined") {
        const [bearer, token] = bearerHeader.split(" ");

        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                throw new ForbiddenError();
            }

            req.token = authData;
        });

        next();
    } else {
        throw new ForbiddenError();
    }
}

module.exports = {
    verifyToken,
};
