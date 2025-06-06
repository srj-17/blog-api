class CustomServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = "Internal Server Error";
    }
}

module.exports = CustomServerError;
