import CustomNotFoundError from "../customErrors/CustomNotFoundError.js";

function errorHandler404(req, res) {
    throw new CustomNotFoundError();
}

export { errorHandler404 };
