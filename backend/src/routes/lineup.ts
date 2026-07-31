import { Router } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import { prisma } from "../prisma";

export const lineupRouter = Router();

lineupRouter.get(
  "/artists",
  asyncHandler(async (_req, res) => {
    const artists = await prisma.artist.findMany({ orderBy: { name: "asc" } });
    res.json(artists);
  }),
);

lineupRouter.get(
  "/stages",
  asyncHandler(async (_req, res) => {
    const stages = await prisma.stage.findMany({ orderBy: { name: "asc" } });
    res.json(stages);
  }),
);

lineupRouter.get(
  "/performances",
  asyncHandler(async (_req, res) => {
    const performances = await prisma.performance.findMany({
      include: { artist: true, stage: true },
      orderBy: { startTime: "asc" },
    });
    res.json(performances);
  }),
);

lineupRouter.get(
  "/performances/:id",
  asyncHandler(async (req, res) => {
    const performance = await prisma.performance.findUnique({
      where: { id: req.params.id },
      include: { artist: true, stage: true },
    });
    if (!performance) {
      res.status(404).json({ error: "Performance not found" });
      return;
    }
    res.json(performance);
  }),
);
