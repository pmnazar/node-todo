import { Request, Response } from "express";
interface CreateTodoBody {
    taskText: string;
}
export declare const createTodoFromText: (req: Request<{}, {}, CreateTodoBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=llmController.d.ts.map