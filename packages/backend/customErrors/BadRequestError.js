class BadRequestError extends Error {
    constructor(message) {
        super(message || "Invalid Request");
        this.statusCode = 404;
        this.name = "Bad Request";
    }
}

module.exports = BadRequestError;
