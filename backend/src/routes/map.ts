import { Router } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import { prisma } from "../prisma";

export const mapRouter = Router();

mapRouter.get(
  "/pois",
  asyncHandler(async (_req, res) => {
    const pois = await prisma.pointOfInterest.findMany({ orderBy: { name: "asc" } });
    res.json(pois);
  }),
);
