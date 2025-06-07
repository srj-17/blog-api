class UnprocessableContentError extends Error {
    constructor(message) {
        super(
            message || "The request has correct syntax, but isn't well formed!",
        );
        this.statusCode = 404;
        this.name = "Misformed request";
    }
}

module.exports = UnprocessableContentError;
