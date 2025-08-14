class BadRequestError extends Error {
    statusCode;
    name;
    constructor(message) {
        super(message || "Invalid Request");
        this.statusCode = 400;
        this.name = "Bad Request";
    }
}
export default BadRequestError;
//# sourceMappingURL=BadRequestError.js.map