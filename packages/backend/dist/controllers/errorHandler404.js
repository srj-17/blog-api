import CustomNotFoundError from "../customErrors/CustomNotFoundError.js";
import {} from "express";
function errorHandler404(req, res) {
    throw new CustomNotFoundError();
}
export { errorHandler404 };
//# sourceMappingURL=errorHandler404.js.map