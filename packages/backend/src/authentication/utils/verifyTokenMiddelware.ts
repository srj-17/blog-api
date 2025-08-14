import jwt, { type JwtPayload } from "jsonwebtoken";
import ForbiddenError from "../../customErrors/CustomForbiddenError.js";
import { type Request, type Response, type NextFunction } from "express";

export function verifyToken(
    req: Request & { token?: string | JwtPayload },
    res: Response,
    next: NextFunction,
) {
    const bearerHeader = req.header("authorization");
    if (typeof bearerHeader !== "undefined") {
        const [bearer, token] = bearerHeader.split(" ");

        jwt.verify(token as string, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                throw new ForbiddenError();
            }

            req.token = authData!;
        });

        next();
    } else {
        throw new ForbiddenError();
    }
}
