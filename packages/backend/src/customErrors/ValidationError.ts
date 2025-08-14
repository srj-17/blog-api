class ValidationError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(message || "Please enter correct details!");
        this.statusCode = 400;
        this.name = "ValidationError";
    }
}

export default ValidationError;
