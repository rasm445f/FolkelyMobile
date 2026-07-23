import cors from "cors";
import express from "express";
import { lineupRouter } from "./routes/lineup";
import { mapRouter } from "./routes/map";
import { newsRouter } from "./routes/news";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", lineupRouter);
app.use("/api/map", mapRouter);
app.use("/api/news", newsRouter);
