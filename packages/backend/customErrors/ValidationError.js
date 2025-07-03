class ValidationError extends Error {
    constructor(message) {
        super(message || "Please enter correct details!");
        this.statusCode = 400;
        this.name = "ValidationError";
    }
}

module.exports = ValidationError;
