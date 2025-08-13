class UnprocessableContentError extends Error {
    statusCode;
    name;
    constructor(message) {
        super(message || "The request has correct syntax, but isn't well formed!");
        this.statusCode = 422;
        this.name = "Misformed request";
    }
}
export default UnprocessableContentError;
//# sourceMappingURL=UnprocessableContentError.js.map