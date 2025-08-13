class CustomNotFoundError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(message || "Resource not found");
        this.statusCode = 404;
        this.name = "Not Found";
    }
}

export default CustomNotFoundError;
