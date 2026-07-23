import type { Announcement, Artist, Performance, PointOfInterest, Stage } from "@folkely/shared";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getArtists: () => get<Artist[]>("/api/artists"),
  getStages: () => get<Stage[]>("/api/stages"),
  getPerformances: () => get<Performance[]>("/api/performances"),
  getPois: () => get<PointOfInterest[]>("/api/map/pois"),
  getAnnouncements: () => get<Announcement[]>("/api/news"),
};
