class CustomServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = "Internal Server Error";
        this.message =
            "Request could not be processed because of error in the server.";
    }
}

module.exports = CustomServerError;
