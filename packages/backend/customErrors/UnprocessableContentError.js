class UnprocessableContentError extends Error {
    constructor(message) {
        super(
            message || "The request has correct syntax, but isn't well formed!",
        );
        this.statusCode = 422;
        this.name = "Misformed request";
    }
}

module.exports = UnprocessableContentError;
