class CustomNotFoundError extends Error {
    statusCode;
    name;
    constructor(message) {
        super(message || "Resource not found");
        this.statusCode = 404;
        this.name = "Not Found";
    }
}
export default CustomNotFoundError;
//# sourceMappingURL=CustomNotFoundError.js.map