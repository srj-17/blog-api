class CustomServerError extends Error {
    statusCode: number;
    name: string;

    constructor(message?: string) {
        super(message);
        this.statusCode = 500;
        this.name = "Internal Server Error";
        this.message =
            "Request could not be processed because of error in the server.";
    }
}

export default CustomServerError;
