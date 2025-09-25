import { Request, Response } from "express";
interface RegisterBody {
    username: string;
    email: string;
    password: string;
}
interface LoginBody {
    username: string;
    password: string;
}
export declare const registerUser: (req: Request<{}, {}, RegisterBody>, res: Response) => Promise<void>;
export declare const loginUser: (req: Request<{}, {}, LoginBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logoutUser: (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=authController.d.ts.map