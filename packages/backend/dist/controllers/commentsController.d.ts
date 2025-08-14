import { type Request, type Response } from "express";
declare function getComments(req: Request & {
    params: {
        postId: string | undefined;
    };
}, res: Response): Promise<void>;
declare function postComments(req: Request & {
    token: {
        user: {
            id: number;
        };
    };
}, res: Response): Promise<void>;
declare function getComment(req: Request, res: Response): Promise<void>;
declare function putComment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function deleteComment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export { getComments, postComments, getComment, putComment, deleteComment };
//# sourceMappingURL=commentsController.d.ts.map