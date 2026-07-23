import { Router } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import { prisma } from "../prisma";

export const newsRouter = Router();

newsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const announcements = await prisma.announcement.findMany({
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });
    res.json(announcements);
  }),
);
