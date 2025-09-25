import { Request, Response } from "express";
export declare const getTodo: (req: Request, res: Response) => Promise<void>;
export declare const createTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTodo: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=todosController.d.ts.map