class ForbiddenError extends Error {
    constructor(message) {
        super(message || "You're not authorized to access the resource!");
        this.statusCode = 403;
        this.name = "ForbiddenError";
    }
}

module.exports = ForbiddenError;
