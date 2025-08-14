class ValidationError extends Error {
    statusCode;
    name;
    constructor(message) {
        super(message || "Please enter correct details!");
        this.statusCode = 400;
        this.name = "ValidationError";
    }
}
export default ValidationError;
//# sourceMappingURL=ValidationError.js.map