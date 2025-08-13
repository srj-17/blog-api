import { type Request, type Response } from "express";
declare function getUsers(req: Request, res: Response): Promise<void>;
declare function postUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function getUser(req: Request & {
    token: {
        user: any;
    };
}, res: Response): Promise<Response<any, Record<string, any>>>;
declare function putUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export { getUsers, postUsers, getUser, putUser, deleteUser };
//# sourceMappingURL=usersController.d.ts.map