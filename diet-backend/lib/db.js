import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

function readDbSync() {
  if (!fs.existsSync(DB_PATH)) return null;
  const t = fs.readFileSync(DB_PATH, "utf-8");
  try {
    return JSON.parse(t);
  } catch (e) {
    console.error("Invalid JSON in db.json:", e);
    return null;
  }
}

function writeDbSync(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    const seed = getSeed();
    writeDbSync(seed);
    console.log("db.json created with seed data");
  } else {
    const cur = readDbSync();
    if (!cur || typeof cur !== "object") {
      const seed = getSeed();
      writeDbSync(seed);
      console.log("db.json was invalid and re-seeded");
    }
  }
}

export function getDb() {
  return readDbSync();
}

export function saveDb(obj) {
  writeDbSync(obj);
}

function getSeed() {
  return {
    profile: {
      id: "user_1",
      name: "Jan Kowalski",
      email: "jan@example.com",
      height_cm: 180,
      sex: "male",
      birthdate: "1990-01-01",
      target_weight_kg: 80,
      activity_level: "moderate"
    },
    journal: [
      {
        id: "j_1",
        date: "2024-09-29",
        time: "08:15",
        title: "Owsianka z owocami",
        nutrients: { kcal: 450, protein: 18, carbs: 70, fat: 10, fiber: 8 },
        tags: ["śniadanie", "owies"]
      },
      {
        id: "j_2",
        date: "2024-09-29",
        time: "13:00",
        title: "Sałatka z kurczakiem",
        nutrients: { kcal: 520, protein: 45, carbs: 20, fat: 25, fiber: 6 },
        tags: ["obiad", "fit"]
      }
    ],
    plans: [
      {
        id: "p_1",
        title: "Redukcja 2200 kcal",
        description: "Plan obniżonej kaloryczności",
        kcal_target: 2200,
        macros_target: { protein: 150, carbs: 230, fat: 70 }
      }
    ],
    analytics: {
      weight: [
        { date: "2024-08-01", weight: 86.5 },
        { date: "2024-08-15", weight: 85.4 },
        { date: "2024-09-01", weight: 84.9 },
        { date: "2024-09-15", weight: 84.2 },
        { date: "2024-09-22", weight: 83.8 },
        { date: "2024-09-29", weight: 83.1 }
      ],
      macros_week: [
        { day: "Pon", protein: 140, carbs: 230, fat: 65, kcal: 2150 },
        { day: "Wt", protein: 155, carbs: 260, fat: 75, kcal: 2300 },
        { day: "Śr", protein: 135, carbs: 240, fat: 60, kcal: 2050 },
        { day: "Czw", protein: 160, carbs: 250, fat: 70, kcal: 2250 },
        { day: "Pt", protein: 145, carbs: 270, fat: 80, kcal: 2350 },
        { day: "Sob", protein: 150, carbs: 220, fat: 68, kcal: 2100 },
        { day: "Ndz", protein: 148, carbs: 245, fat: 72, kcal: 2200 }
      ]
    }
  };
}
