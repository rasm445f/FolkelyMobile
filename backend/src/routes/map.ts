import { Router } from "express";
import { prisma } from "../prisma";

export const mapRouter = Router();

mapRouter.get("/pois", async (_req, res) => {
  const pois = await prisma.pointOfInterest.findMany({ orderBy: { name: "asc" } });
  res.json(pois);
});
