import { RequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validateUser = (schema: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (validationResult.success) {
      next();
    } else {
      res
        .status(400)
        .json({ error: "Validation failed", details: validationResult.error });
    }
  };
};

// export const errorHandler: RequestHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Error handling logic here
//   console.error(err);
//   res.status(500).json({ error: "Internal Server Error" });
// };
