import type { Announcement, Artist, Performance, PointOfInterest, Stage } from "@folkely/shared";
import { Platform } from "react-native";

// The Android emulator's "localhost" refers to the emulator itself, not the host machine —
// 10.0.2.2 is the standard alias back to the host. iOS Simulator shares the host's network,
// so plain localhost works there. Physical devices need EXPO_PUBLIC_API_URL set explicitly
// to the host machine's LAN IP, since neither of these defaults can reach it.
const DEFAULT_API_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL;

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
