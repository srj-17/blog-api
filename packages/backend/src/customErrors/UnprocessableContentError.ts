class UnprocessableContentError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(
            message || "The request has correct syntax, but isn't well formed!",
        );
        this.statusCode = 422;
        this.name = "Misformed request";
    }
}

export default UnprocessableContentError;
