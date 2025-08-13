import CustomNotFoundError from "../customErrors/CustomNotFoundError.js";
import { type Request, type Response } from "express";

function errorHandler404(req: Request, res: Response) {
    throw new CustomNotFoundError();
}

export { errorHandler404 };
