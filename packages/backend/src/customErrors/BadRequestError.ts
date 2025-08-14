class BadRequestError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(message || "Invalid Request");
        this.statusCode = 400;
        this.name = "Bad Request";
    }
}

export default BadRequestError;
