import { Router } from "express";
import { prisma } from "../prisma";

export const newsRouter = Router();

newsRouter.get("/", async (_req, res) => {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });
  res.json(announcements);
});
