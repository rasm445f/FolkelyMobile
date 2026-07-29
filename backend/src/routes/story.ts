import { Router } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import { prisma } from "../prisma";

export const storyRouter = Router();

storyRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const stories = await prisma.story.findMany({
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });
    res.json(stories);
  }),
);

storyRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const story = await prisma.story.findUnique({ where: { id: req.params.id } });
    if (!story) {
      res.status(404).json({ error: "Story not found" });
      return;
    }
    res.json(story);
  }),
);
