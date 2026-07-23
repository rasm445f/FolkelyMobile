import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The festival runs in late July, within Denmark's CEST (UTC+2) daylight-saving window, so
// `hour`/`minute` below are Copenhagen local time; we convert to the matching UTC instant
// before storing, since that's what the DB and API deal in.
const COPENHAGEN_UTC_OFFSET_HOURS = 2;

function dayAt(dayOffset: number, hour: number, minute = 0) {
  const date = new Date(Date.UTC(2026, 6, 24 + dayOffset, hour - COPENHAGEN_UTC_OFFSET_HOURS, minute));
  return date;
}

async function main() {
  await prisma.performance.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.pointOfInterest.deleteMany();
  await prisma.announcement.deleteMany();

  const mainStage = await prisma.stage.create({ data: { name: "Main Stage" } });
  const beachStage = await prisma.stage.create({ data: { name: "Beach Stage" } });

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

  // x/y are percentages (0-100) of the map image's width/height, not geographic coordinates.
  await prisma.pointOfInterest.createMany({
    data: [
      { name: "Main Stage", type: "STAGE", x: 50, y: 30 },
      { name: "Beach Stage", type: "STAGE", x: 75, y: 68 },
      { name: "Main Entrance", type: "ENTRANCE", x: 50, y: 95 },
      { name: "First Aid", type: "MEDICAL", x: 40, y: 50 },
      { name: "Food Trucks", type: "FOOD", x: 60, y: 45 },
      { name: "Bar", type: "BAR", x: 65, y: 55 },
      { name: "Toilets", type: "TOILET", x: 30, y: 60 },
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
