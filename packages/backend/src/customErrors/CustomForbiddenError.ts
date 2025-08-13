class ForbiddenError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(message || "You're not authorized to access the resource!");
        this.statusCode = 403;
        this.name = "ForbiddenError";
    }
}

export default ForbiddenError;
