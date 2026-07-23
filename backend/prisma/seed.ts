import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Rough coordinates around Hundested, Denmark, for demo purposes.
const ORIGIN = { lat: 55.9639, lng: 11.8594 };

function dayAt(dayOffset: number, hour: number, minute = 0) {
  const date = new Date(Date.UTC(2026, 6, 24 + dayOffset, hour, minute));
  return date;
}

async function main() {
  await prisma.performance.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.pointOfInterest.deleteMany();
  await prisma.announcement.deleteMany();

  const mainStage = await prisma.stage.create({
    data: { name: "Main Stage", lat: ORIGIN.lat, lng: ORIGIN.lng },
  });
  const beachStage = await prisma.stage.create({
    data: { name: "Beach Stage", lat: ORIGIN.lat + 0.002, lng: ORIGIN.lng + 0.001 },
  });

  const artists = await Promise.all(
    [
      { name: "Nordlys", genre: "Electronic" },
      { name: "Havblik", genre: "Indie" },
      { name: "Sildeflåden", genre: "Folk" },
      { name: "Kysten", genre: "Pop" },
    ].map((a) => prisma.artist.create({ data: a })),
  );

  await prisma.performance.createMany({
    data: [
      { artistId: artists[0].id, stageId: mainStage.id, startTime: dayAt(0, 18), endTime: dayAt(0, 19) },
      { artistId: artists[1].id, stageId: beachStage.id, startTime: dayAt(0, 19, 30), endTime: dayAt(0, 20, 30) },
      { artistId: artists[2].id, stageId: mainStage.id, startTime: dayAt(1, 17), endTime: dayAt(1, 18) },
      { artistId: artists[3].id, stageId: mainStage.id, startTime: dayAt(2, 20), endTime: dayAt(2, 21, 30) },
    ],
  });

  await prisma.pointOfInterest.createMany({
    data: [
      { name: "Main Entrance", type: "ENTRANCE", lat: ORIGIN.lat - 0.001, lng: ORIGIN.lng - 0.001 },
      { name: "First Aid", type: "MEDICAL", lat: ORIGIN.lat + 0.0005, lng: ORIGIN.lng },
      { name: "Food Trucks", type: "FOOD", lat: ORIGIN.lat + 0.0008, lng: ORIGIN.lng + 0.0005 },
      { name: "Bar", type: "BAR", lat: ORIGIN.lat + 0.0003, lng: ORIGIN.lng + 0.0008 },
      { name: "Toilets", type: "TOILET", lat: ORIGIN.lat - 0.0003, lng: ORIGIN.lng + 0.0004 },
    ],
  });

  await prisma.announcement.create({
    data: {
      title: "Welcome to Folkely!",
      body: "Gates open at 16:00 each day. Have a great festival!",
      priority: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
