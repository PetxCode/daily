import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import user from "./router/userRouter";
import post from "./router/postRouter";
import comment from "./router/commentRouter";
import reply from "./router/replyRouter";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    }),
  );

  app.get("/", (req: Request, res: Response) => {
    res.status(HTTP.OK).json({
      message: "Awesome Code~~",
    });
  });

  app.use("/api/v1", user);
  app.use("/api/v1", post);
  app.use("/api/v1", comment);
  app.use("/api/v1", reply);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Router Error",
        message: `This Error is coming up because the ${req.originalUrl} URL, isn't correct!!!`,
        status: HTTP.BAD_REQUEST,
        success: false,
      }),
    );
  });

  app.use(errorHandler);
};
