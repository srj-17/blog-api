class CustomNotFoundError extends Error {
    constructor(message) {
        super(message || "Resource not found");
        this.statusCode = 404;
        this.name = "Not Found";
    }
}

module.exports = CustomNotFoundError;
