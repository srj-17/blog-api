class UnauthenticatedError extends Error {
    statusCode;
    name;
    constructor(message) {
        super(message || "You're not authenticated");
        this.statusCode = 401;
        this.name = "Unauthorized";
    }
}
export default UnauthenticatedError;
//# sourceMappingURL=CustomUnauthenticatedError.js.map