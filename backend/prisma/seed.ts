import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The festival runs in late July, within Denmark's CEST (UTC+2) daylight-saving window, so
// `hour`/`minute` below are Copenhagen local time; we convert to the matching UTC instant
// before storing, since that's what the DB and API deal in.
const COPENHAGEN_UTC_OFFSET_HOURS = 2;

function dayAt(dayOffset: number, hour: number, minute = 0) {
  const date = new Date(
    Date.UTC(
      2026,
      6,
      24 + dayOffset,
      hour - COPENHAGEN_UTC_OFFSET_HOURS,
      minute,
    ),
  );
  return date;
}

async function main() {
  await prisma.performance.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.pointOfInterest.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.story.deleteMany();

  const mainStage = await prisma.stage.create({ data: { name: "Hovedscene" } });
  const beachStage = await prisma.stage.create({
    data: { name: "Strandscene" },
  });

  const artists = await Promise.all(
    [
      {
        name: "Artigeardit",
        genre: "Hiphop og rap",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_35f01241f8294213a97d7c58f8d9f997~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Artigeardit_Annoncering_1080x1350px.jpg",
        description:
          "Artigeardit er en af sin generations vigtigste danske kunstnere, kendt for sit personlige storytelling og ikoniske lydunivers. Han har spillet på Roskilde Festivals Orange Scene og vandt Årets Danske Livenavn samt Årets Danske Album ved Danish Music Awards for albummet \"Længe leve\".",
      },
      {
        name: "Thor Farlov",
        genre: "Elektronisk pop, R&B og moderne disco",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_eaf1819caed446b497c1233cbbe0fc81~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Thor%20Farlov_Annoncering_1080x1350px.jpg",
        description:
          "Thor Farlov har fundet sin egen stemme i dansk pop og skaber popmusik med både personlighed og produktion på internationalt niveau. Hans lyd balancerer mellem elektronisk pop, R&B og moderne disco.",
      },
      {
        name: "Blæst",
        genre: "Dansk pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_f5df6e8c5eee4da99e4c4cce78853636~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bl%C3%A6st_Hjemmeside_1080x1350px.jpg",
        description:
          "Blæst går hele vejen – og sikrer sig stærk fremdrift i kraftig modvind. Bandet har for nylig budt Sarah Sophie Malmros velkommen som ny vokalist og fortsætter med at levere deres genkendelige, energiske pop-lyd.",
      },
      {
        name: "Peter Sommer",
        genre: "Dansk rock/chanson",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_580c4d428c354a79b39e90c578f39037~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Peter%20Sommer_Annoncering_1080x1350px.jpg",
        description:
          "Peter Sommer er en dansk singer-songwriter med en 20-årig solokarriere, der synger på dansk med inspiration fra europæiske ikoner som Serge Gainsbourg og Jacques Brel. På albummet \"Verdens Volume\" leverer han skarpt politisk og personligt skrevne sange med sit fulde rockband.",
      },
      {
        name: "When Saints Go Machine",
        genre: "Elektronisk musik",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_a6e07446d76a4e3888e45d60d19241a6~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/When%20Saints%20Go%20Machine_Annoncering_1080x1350px.jpg",
        description:
          "When Saints Go Machine er kendt for kompromisløs, kontrastfyldt og evigt nysgerrig elektronisk musik. Efter 15 år i karrieren bevæger trioen sig væk fra det digitale mod et mere organisk og håndlavet soundscape på deres syvende album.",
      },
      {
        name: "Blaue Blume",
        genre: "Indie/alternativ rock (dansksproget)",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_593b833c16a9446b8e6b442e1e6b589c~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Blaue%20Blume_Annoncering_1080x1350px.jpg",
        description:
          "Blaue Blume er et af Danmarks stærkeste livebands, kendt for balancen mellem storladne lydlandskaber og melodisk nærvær. Det aktuelle album \"Regnvåde Sale\" med dansksprogede sange har fået kritikerroste anmeldelser og massiv radioplay.",
      },
      {
        name: "Wads",
        genre: "Elektronisk R&B, pop og alternativt",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_ac3ada8eabe34cd18c4f29de6b1a4a30~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Wads_Annoncering_1080x1350px.jpg",
        description:
          "Wads blander elektronisk R&B med pop og alternative produktioner og en distinkt, ofte pitchet vokal. Siden 2016 har han også været frontmand i duoen Phlake, og soloprojektet udforsker identitet og selvaccept.",
      },
      {
        name: "Berg",
        genre: "Indie/alternativ pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_2e1bf74c17df421b91358fbd0d1af736~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Berg_Annoncering_1080x1350px.jpg",
        description:
          "Berg er en dansk kunstner, der bevæger sig frit mellem følsomme og eksplosive lydlandskaber med ærlig intensitet. Efter gennembruddet med \"Koldblodet Killer\" har hun etableret sig som en markant stemme i dansk musik.",
      },
      {
        name: "Anne Linnet",
        genre: "Rock og pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_341a62b4875a44448979fe929ac73a1a~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Anne%20Linnet_Annoncering_1080x1350px.jpg",
        description:
          "Anne Linnet er en af landets mest betydningsfulde artister og har været aktiv siden 1970'erne. Hun er kendt for hits som \"Smuk og Dejlig\", \"Barndommens Gade\" og \"Forårsdag\" samt for ærlige tekster, der ofte kredser om personlige og samfundsrelevante emner.",
      },
      {
        name: "Klumben & Raske Penge",
        genre: "Reggaeton/dancehall",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_28524a02ecde44d18a2e899b324a073b~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Klumben%20%26%20Raske%20Penge_Annoncering_1080x1350px.jpg",
        description:
          "Klumben & Raske Penge er to centrale skikkelser i dansk reggaeton og dancehall, kendt for hits som \"Faxe Kondi\" og albummet \"Livet\" fra 2019. De er kendt for energiske liveoptrædener med tæt kontakt til publikum.",
      },
      {
        name: "Back to Back",
        genre: "Dansk pop/rock (1980'er)",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_4f82f8283991433396177efcd40a4a34~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Back%20to%20Back_Annoncering_1080x1350px.jpg",
        description:
          "Back to Back er dannet af Morten Remar og Nis Bøgvad og står bag nogle af de største danske 80'er-hits. Bandet fejrer 40 års jubilæum og præsenterer deres klassikere med fornyet energi.",
      },
      {
        name: "Rosa",
        genre: "Hiphop/soul/pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_175fedbb11e54f8d9f0e8323d4c5229b~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rosa_Annoncering_1080x1350px.jpg",
        description:
          "Rosa er en 24-årig kunstner, der beskriver sit univers som farverigt med hiphoppens energi, soulens varme og popsangens umiddelbarhed. Hendes tekster udforsker følelser og observationer fra sin egen verden.",
      },
      {
        name: "Michael Williams",
        genre: "Hiphop/trap",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_945706e739904491bc901bf9c15613b3~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Michael%20Williams_Annoncering_1080x1350px.jpg",
        description:
          "Michael Williams har etableret sig som en af Danmarks mest toneangivende nye stemmer inden for hip-hop. Debutalbummet \"WILLO\" balancerer mellem international trap-æstetik og en dybt personlig stemme.",
      },
      {
        name: "Ericka Jane",
        genre: "Pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_30d9eb5ed7a248b1a309cd12bfebf7ff~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ericka%20Jane_Annoncering_1080x1350px.jpg",
        description:
          "Ericka Jane er en dansk popkunstner med internationalt udtryk, kendt for numre som \"I Say Stupid Things\" og \"To the Beat of Your Heart\". Hun kombinerer sikre pophooks med nerve og personlighed.",
      },
      {
        name: "Jonah Blacksmith",
        genre: "Folk/pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_857ae55d5afa4acd88f1a21f26f5cd59~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jonah%20Blacksmith_Annoncering_1080x1350px.jpg",
        description:
          "Jonah Blacksmith er et nordvestjysk syvmandsband ledet af brødrene Thomas og Simon Alstrup, kendt for stor spilleglæde og smittende energi. Musikken blender folkemusikkens DNA med popmusikkens tilgængelighed.",
      },
      {
        name: "Svea S",
        genre: "Pop/indiepop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_06c5f3558a37415a9802f32491dc73bd~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Svea%20S_Annoncering_1080x1350px.jpg",
        description:
          "Den 23-årige Svea S er en af dansk musiks mest lovende kunstnere med imponerende vokalpræstationer og emotionel dybde. Hun har skabt sig en unik identitet gennem hitsingler og virale TikTok-optrædener.",
      },
      {
        name: "Ella Augusta",
        genre: "Indie pop/singer-songwriter",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_5792784392ce45d7b77f8ef9da68f97b~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ella%20Augusta_Annoncering_1080x1350px.jpg",
        description:
          "Ella Augusta er en dansk sanger-sangskriver, der siden debut-EP'en \"Sytten\" i 2024 har opnået streaming-succes og kritisk anerkendelse. Hun har spillet på store danske festivaler som Roskilde og Smukfest.",
      },
      {
        name: "Von Quar",
        genre: "Dansksproget hooligan-rock",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_721edf66eac249c48d41d1ff6a003491~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Von%20Quar_Annoncering_1080x1350px.jpg",
        description:
          "Von Quar er et dansk liveorkester, der blander rock, punk og ravekultur med hypnotiserende synths, hårdtslående trommer og en hel blæsersektion. Bandet er allerede kendt for udsolgte koncerter og ekstraordinær liveenergi.",
      },
      {
        name: "Specktors",
        genre: "Rap/elektronisk",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_e4ec01f2305d491bb3a345c62819eeb1~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Specktors_Annoncering_1080x1350px.jpg",
        description:
          "Specktors debuterede i 2008 med et fremsynet og småprovokerende mix af rap og hårdtpumpet elektronisk musik. Med hits som \"Unz Unz\" og \"Lågsus\" er de landets ultimative fest-ikoner.",
      },
      {
        name: "Kedde",
        genre: "Akustisk pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_ac43213029aa4b4f8b415def3e4d726c~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kedde_Annoncering_1080x1350px.jpg",
        description:
          "KEDDE er et dansk poptalent, der debuterede i 2023 og udtrykker sig personligt gennem guitar og åben, autentisk storytelling. Med hits som \"Sådan må det være\" og \"If u knou kno\" har han cementeret sin position i dansk musik.",
      },
      {
        name: "Tabloid",
        genre: "Funk- og fusionsjazz med pop",
        imageUrl:
          "https://static.wixstatic.com/media/b8bc8e_ef2945986aaf4e5981cfbfc305aa889d~mv2.jpg/v1/fill/w_349,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tabloid_Annoncering_1080x1350px.jpg",
        description:
          "Tabloid består af fem topmusikere fra pop- og jazzscenen, der skaber musik inspireret af 1980'ernes funk- og fusionsjazz. Bandet udgav deres tredje album \"Hot Gossip\" med en kollaborativ skriveproces og livetakes.",
      },
    ].map((a) => prisma.artist.create({ data: a })),
  );

  // Index into `artists` matches the declaration order above.
  const [
    artigeardit,
    thorFarlov,
    blaest,
    peterSommer,
    whenSaintsGoMachine,
    blaueBlume,
    wads,
    berg,
    anneLinnet,
    klumbenOgRaskePenge,
    backToBack,
    rosa,
    michaelWilliams,
    erickaJane,
    jonahBlacksmith,
    sveaS,
    ellaAugusta,
    vonQuar,
    specktors,
    kedde,
    tabloid,
  ] = artists;

  await prisma.performance.createMany({
    data: [
      // Fredag – Main Stage
      { artistId: artigeardit.id, stageId: mainStage.id, startTime: dayAt(0, 18), endTime: dayAt(0, 19) },
      { artistId: thorFarlov.id, stageId: mainStage.id, startTime: dayAt(0, 19, 30), endTime: dayAt(0, 20, 30) },
      { artistId: peterSommer.id, stageId: mainStage.id, startTime: dayAt(0, 21), endTime: dayAt(0, 22, 30) },
      // Fredag – Beach Stage
      { artistId: blaest.id, stageId: beachStage.id, startTime: dayAt(0, 19), endTime: dayAt(0, 20) },
      { artistId: whenSaintsGoMachine.id, stageId: beachStage.id, startTime: dayAt(0, 20, 30), endTime: dayAt(0, 21, 30) },
      { artistId: wads.id, stageId: beachStage.id, startTime: dayAt(0, 22), endTime: dayAt(0, 23) },
      // Lørdag – Main Stage
      { artistId: anneLinnet.id, stageId: mainStage.id, startTime: dayAt(1, 17), endTime: dayAt(1, 18) },
      { artistId: blaueBlume.id, stageId: mainStage.id, startTime: dayAt(1, 18, 30), endTime: dayAt(1, 19, 30) },
      { artistId: klumbenOgRaskePenge.id, stageId: mainStage.id, startTime: dayAt(1, 20), endTime: dayAt(1, 21) },
      { artistId: backToBack.id, stageId: mainStage.id, startTime: dayAt(1, 21, 30), endTime: dayAt(1, 23) },
      // Lørdag – Beach Stage
      { artistId: berg.id, stageId: beachStage.id, startTime: dayAt(1, 17, 30), endTime: dayAt(1, 18, 30) },
      { artistId: rosa.id, stageId: beachStage.id, startTime: dayAt(1, 19), endTime: dayAt(1, 20) },
      { artistId: michaelWilliams.id, stageId: beachStage.id, startTime: dayAt(1, 20, 30), endTime: dayAt(1, 21, 30) },
      { artistId: erickaJane.id, stageId: beachStage.id, startTime: dayAt(1, 22), endTime: dayAt(1, 23) },
      // Søndag – Main Stage
      { artistId: jonahBlacksmith.id, stageId: mainStage.id, startTime: dayAt(2, 17), endTime: dayAt(2, 18) },
      { artistId: vonQuar.id, stageId: mainStage.id, startTime: dayAt(2, 18, 30), endTime: dayAt(2, 19, 30) },
      { artistId: specktors.id, stageId: mainStage.id, startTime: dayAt(2, 20), endTime: dayAt(2, 21) },
      { artistId: tabloid.id, stageId: mainStage.id, startTime: dayAt(2, 21, 30), endTime: dayAt(2, 23) },
      // Søndag – Beach Stage
      { artistId: sveaS.id, stageId: beachStage.id, startTime: dayAt(2, 17, 30), endTime: dayAt(2, 18, 30) },
      { artistId: ellaAugusta.id, stageId: beachStage.id, startTime: dayAt(2, 19), endTime: dayAt(2, 20) },
      { artistId: kedde.id, stageId: beachStage.id, startTime: dayAt(2, 20, 30), endTime: dayAt(2, 21, 30) },
    ],
  });

  // x/y are percentages (0-100) of the map image's width/height, not geographic coordinates.
  await prisma.pointOfInterest.createMany({
    data: [
      { name: "Hovedscene", type: "STAGE", x: 50, y: 30 },
      { name: "Strandscene", type: "STAGE", x: 75, y: 68 },
      { name: "Hovedindgang", type: "ENTRANCE", x: 50, y: 95 },
      { name: "Førstehjælp", type: "MEDICAL", x: 40, y: 50 },
      { name: "Madboder", type: "FOOD", x: 60, y: 45 },
      { name: "Bar", type: "BAR", x: 65, y: 55 },
      { name: "Toiletter", type: "TOILET", x: 30, y: 60 },
    ],
  });

  await prisma.announcement.create({
    data: {
      title: "Velkommen til Folkely!",
      body: "Portene åbner kl. 16:00 hver dag. God fornøjelse til festivalen!",
      priority: 1,
    },
  });

  await prisma.story.createMany({
    data: [
      {
        title: "Velkommen til Folkely",
        body: "Tre dage, to scener, én uforglemmelig weekend.",
        priority: 1,
      },
      {
        title: "Mød Artigeardit",
        body: "Åbner Hovedscenen fredag kl. 18:00.",
      },
    ],
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
