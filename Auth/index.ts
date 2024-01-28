import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export default class JWTAuth {
  static isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");

      const { role }: any = jwt.verify(`${token}`, `${process.env.JWT_SECRET}`);

      if (role == "ADMIN") {
        return next();
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "TOKEN EXPIRED" });
    }
  }
  static isAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");
      const data = JWTAuth.getTokenData({ token: `${token}`, options: {} });
      //@ts-ignore
      req.userId = data.userId;
      //@ts-ignore
      req.permissions = data.permissions;
      //@ts-ignore
      req.userType = data.type;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "TOKEN EXPIRED" });
    }
  }
  static async gernerateToken({
    data,
    options,
  }: {
    data: { userId: string; permissions: string[]; type: "ADMIN" | "USER" };
    options?: SignOptions;
  }) {
    const token = jwt.sign(data, `${process.env.JWT_SECRET}`, options); // Substitua com sua chave secreta real.
    return token;
  }
  static getTokenData({
    token,
    options,
  }: {
    token: string;
    options?: VerifyOptions;
  }) {
    const data = jwt.decode(token, options);
    return data as {
      userId: string;
      permissions: string[];
      type: "ADMIN" | "USER";
    };
  }
}
