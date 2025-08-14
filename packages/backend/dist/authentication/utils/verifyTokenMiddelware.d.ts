import { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
export declare function verifyToken(req: Request & {
    token?: string | JwtPayload;
}, res: Response, next: NextFunction): void;
//# sourceMappingURL=verifyTokenMiddelware.d.ts.map