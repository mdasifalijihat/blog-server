import express from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { commentRouter } from "./modules/comment/commentRouter";
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

const app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", //client side url need
    credentials: true,
  }),
);
app.use(express.json());

// auth routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// api routes
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// health check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog Server API is running 🚀",
  });
});

// error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
