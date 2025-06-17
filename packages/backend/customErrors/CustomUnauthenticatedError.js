class UnauthenticatedError extends Error {
    constructor(message) {
        super(message || "You're not authenticated");
        this.statusCode = 401;
        this.name = "Unauthorized";
    }
}

module.exports = UnauthenticatedError;
