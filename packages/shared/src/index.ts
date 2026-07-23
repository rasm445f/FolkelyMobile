export type PoiType =
  | "STAGE"
  | "FOOD"
  | "BAR"
  | "TOILET"
  | "ENTRANCE"
  | "EXIT"
  | "MEDICAL"
  | "INFO"
  | "CAMPING"
  | "OTHER";

export interface Stage {
  id: string;
  name: string;
  lat: number | null;
  lng: number | null;
}

export interface Artist {
  id: string;
  name: string;
  genre: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface Performance {
  id: string;
  artistId: string;
  stageId: string;
  startTime: string;
  endTime: string;
  artist: Artist;
  stage: Stage;
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: PoiType;
  lat: number;
  lng: number;
  description: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  priority: number;
}
