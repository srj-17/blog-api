import { type Request, type Response } from "express";
declare function getAllPosts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function getPosts(req: Request & {
    token: {
        user: {
            id: number;
        };
    };
}, res: Response): Promise<Response<any, Record<string, any>>>;
declare function postPosts(req: Request & {
    token: {
        user: {
            id: number;
        };
    };
}, res: Response): Promise<void>;
declare function getPost(req: Request, res: Response): Promise<void>;
declare function putPost(req: Request, res: Response): Promise<void>;
declare function deletePost(req: Request, res: Response): Promise<void>;
export { getPosts, postPosts, getPost, putPost, deletePost, getAllPosts };
//# sourceMappingURL=postsController.d.ts.map