class UnauthenticatedError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(message || "You're not authenticated");
        this.statusCode = 401;
        this.name = "Unauthorized";
    }
}

export default UnauthenticatedError;
