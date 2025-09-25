import jwt from "jsonwebtoken";
import { IUser } from "../models/User.js";
export declare function generateAccessToken(user: Partial<IUser>): string;
export declare function generateRefreshToken(user: IUser): Promise<string>;
export declare function verifyRefreshToken(token: string): Promise<string | jwt.JwtPayload | null>;
export declare function revokeRefreshToken(token: string): Promise<void>;
//# sourceMappingURL=tokenServices.d.ts.map