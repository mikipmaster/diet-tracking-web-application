// diet-backend/lib/db-sqlite.js
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "data.sqlite");

function openDb() {
  const db = new Database(DB_FILE);
  db.pragma("journal_mode = WAL");
  return db;
}

// Run migrations and seed if needed
export function initSqlite() {
  const needCreate = !fs.existsSync(DB_FILE);
  const db = openDb();

  // Wrap in transaction
  const createSql = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    height_cm INTEGER,
    sex TEXT,
    birthdate TEXT,
    target_weight_kg REAL,
    activity_level TEXT
  );

  CREATE TABLE IF NOT EXISTS plans (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    kcal_target INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER
  );

  CREATE TABLE IF NOT EXISTS journal_entries (
    id TEXT PRIMARY KEY,
    date TEXT,
    time TEXT,
    title TEXT,
    kcal INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER,
    fiber INTEGER
  );

  CREATE TABLE IF NOT EXISTS journal_tags (
    entry_id TEXT,
    tag TEXT,
    PRIMARY KEY (entry_id, tag),
    FOREIGN KEY (entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS analytics_weight (
    date TEXT PRIMARY KEY,
    weight REAL
  );

  CREATE TABLE IF NOT EXISTS analytics_macros_week (
    day TEXT PRIMARY KEY,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER,
    kcal INTEGER
  );
  `;

  db.exec("BEGIN");
  try {
    db.exec(createSql);

    if (needCreate) {
      // seed default user
      db.prepare(`
        INSERT INTO users (id, name, email, height_cm, sex, birthdate, target_weight_kg, activity_level)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run("user_1", "Jan Kowalski", "jan@example.com", 180, "male", "1990-01-01", 80, "moderate");

      // seed journal entries
      db.prepare(`
        INSERT INTO journal_entries (id, date, time, title, kcal, protein, carbs, fat, fiber)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run("j_1", "2024-09-29", "08:15", "Owsianka z owocami", 450, 18, 70, 10, 8);

      db.prepare(`
        INSERT INTO journal_entries (id, date, time, title, kcal, protein, carbs, fat, fiber)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run("j_2", "2024-09-29", "13:00", "Sałatka z kurczakiem", 520, 45, 20, 25, 6);

      db.prepare(`
        INSERT INTO journal_tags (entry_id, tag) VALUES (?, ?)
      `).run("j_1", "śniadanie");
      db.prepare(`
        INSERT INTO journal_tags (entry_id, tag) VALUES (?, ?)
      `).run("j_1", "owies");
      db.prepare(`
        INSERT INTO journal_tags (entry_id, tag) VALUES (?, ?)
      `).run("j_2", "obiad");
      db.prepare(`
        INSERT INTO journal_tags (entry_id, tag) VALUES (?, ?)
      `).run("j_2", "fit");

      // seed plans
      db.prepare(`
        INSERT INTO plans (id, title, description, kcal_target, protein, carbs, fat)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run("p_1", "Redukcja 2200 kcal", "Plan obniżonej kaloryczności", 2200, 150, 230, 70);

      // seed weight analytics
      const weights = [
        ["2024-08-01", 86.5],
        ["2024-08-15", 85.4],
        ["2024-09-01", 84.9],
        ["2024-09-15", 84.2],
        ["2024-09-22", 83.8],
        ["2024-09-29", 83.1]
      ];
      const wstmt = db.prepare(`INSERT INTO analytics_weight (date, weight) VALUES (?, ?)`);
      for (const w of weights) wstmt.run(w[0], w[1]);

      // seed macros week
      const macros = [
        ["Pon", 140, 230, 65, 2150],
        ["Wt", 155, 260, 75, 2300],
        ["Śr", 135, 240, 60, 2050],
        ["Czw", 160, 250, 70, 2250],
        ["Pt", 145, 270, 80, 2350],
        ["Sob", 150, 220, 68, 2100],
        ["Ndz", 148, 245, 72, 2200]
      ];
      const mstmt = db.prepare(`INSERT INTO analytics_macros_week (day, protein, carbs, fat, kcal) VALUES (?, ?, ?, ?, ?)`);
      for (const m of macros) mstmt.run(m[0], m[1], m[2], m[3], m[4]);
    }

    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  return db;
}

/* --- Helper CRUD functions --- */
export function getProfile() {
  const db = openDb();
  const row = db.prepare("SELECT * FROM users LIMIT 1").get();
  db.close();
  return row || null;
}

export function updateProfile(obj) {
  const db = openDb();
  const existing = db.prepare("SELECT id FROM users LIMIT 1").get();
  if (existing) {
    db.prepare(`
      UPDATE users SET name = ?, email = ?, height_cm = ?, sex = ?, birthdate = ?, target_weight_kg = ?, activity_level = ? WHERE id = ?
    `).run(obj.name, obj.email, obj.height_cm, obj.sex, obj.birthdate, obj.target_weight_kg, obj.activity_level, existing.id);
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(existing.id);
    db.close();
    return row;
  } else {
    const id = obj.id || "user_1";
    db.prepare(`
      INSERT INTO users (id, name, email, height_cm, sex, birthdate, target_weight_kg, activity_level)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, obj.name, obj.email, obj.height_cm, obj.sex, obj.birthdate, obj.target_weight_kg, obj.activity_level);
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    db.close();
    return row;
  }
}

/* Journal */
export function getJournalEntries(date) {
  const db = openDb();
  if (date) {
    const rows = db.prepare("SELECT * FROM journal_entries WHERE date = ? ORDER BY time").all(date);
    // attach tags
    for (const r of rows) {
      r.tags = db.prepare("SELECT tag FROM journal_tags WHERE entry_id = ?").all(r.id).map(x => x.tag);
    }
    db.close();
    return rows;
  } else {
    const rows = db.prepare("SELECT * FROM journal_entries ORDER BY date DESC, time").all();
    for (const r of rows) {
      r.tags = db.prepare("SELECT tag FROM journal_tags WHERE entry_id = ?").all(r.id).map(x => x.tag);
    }
    db.close();
    return rows;
  }
}

export function addJournalEntry(entry) {
  const db = openDb();
  const stmt = db.prepare(`
    INSERT INTO journal_entries (id, date, time, title, kcal, protein, carbs, fat, fiber)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(entry.id, entry.date, entry.time, entry.title, entry.kcal || entry.nutrients?.kcal || null,
    entry.protein || entry.nutrients?.protein || null,
    entry.carbs || entry.nutrients?.carbs || null,
    entry.fat || entry.nutrients?.fat || null,
    entry.fiber || entry.nutrients?.fiber || null);
  // tags
  if (entry.tags && Array.isArray(entry.tags)) {
    const tagStmt = db.prepare("INSERT OR IGNORE INTO journal_tags (entry_id, tag) VALUES (?, ?)");
    for (const t of entry.tags) tagStmt.run(entry.id, t);
  }
  const row = db.prepare("SELECT * FROM journal_entries WHERE id = ?").get(entry.id);
  row.tags = db.prepare("SELECT tag FROM journal_tags WHERE entry_id = ?").all(entry.id).map(x => x.tag);
  db.close();
  return row;
}

export function updateJournalEntry(id, data) {
  const db = openDb();
  const cur = db.prepare("SELECT * FROM journal_entries WHERE id = ?").get(id);
  if (!cur) {
    db.close();
    return null;
  }
  db.prepare(`
    UPDATE journal_entries SET date = ?, time = ?, title = ?, kcal = ?, protein = ?, carbs = ?, fat = ?, fiber = ?
    WHERE id = ?
  `).run(
    data.date || cur.date,
    data.time || cur.time,
    data.title || cur.title,
    data.kcal ?? (data.nutrients?.kcal ?? cur.kcal),
    data.protein ?? (data.nutrients?.protein ?? cur.protein),
    data.carbs ?? (data.nutrients?.carbs ?? cur.carbs),
    data.fat ?? (data.nutrients?.fat ?? cur.fat),
    data.fiber ?? (data.nutrients?.fiber ?? cur.fiber),
    id
  );
  if (data.tags) {
    // delete existing and insert new
    db.prepare("DELETE FROM journal_tags WHERE entry_id = ?").run(id);
    const tagStmt = db.prepare("INSERT OR IGNORE INTO journal_tags (entry_id, tag) VALUES (?, ?)");
    for (const t of data.tags) tagStmt.run(id, t);
  }
  const row = db.prepare("SELECT * FROM journal_entries WHERE id = ?").get(id);
  row.tags = db.prepare("SELECT tag FROM journal_tags WHERE entry_id = ?").all(id).map(x => x.tag);
  db.close();
  return row;
}

export function deleteJournalEntry(id) {
  const db = openDb();
  db.prepare("DELETE FROM journal_tags WHERE entry_id = ?").run(id);
  db.prepare("DELETE FROM journal_entries WHERE id = ?").run(id);
  db.close();
  return { ok: true };
}

/* Plans */
export function getPlans() {
  const db = openDb();
  const rows = db.prepare("SELECT * FROM plans").all();
  db.close();
  return rows;
}

export function addPlan(plan) {
  const db = openDb();
  db.prepare(`
    INSERT INTO plans (id, title, description, kcal_target, protein, carbs, fat) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(plan.id, plan.title, plan.description, plan.kcal_target, plan.macros_target?.protein || plan.protein, plan.macros_target?.carbs || plan.carbs, plan.macros_target?.fat || plan.fat);
  const row = db.prepare("SELECT * FROM plans WHERE id = ?").get(plan.id);
  db.close();
  return row;
}

export function updatePlan(id, data) {
  const db = openDb();
  const cur = db.prepare("SELECT * FROM plans WHERE id = ?").get(id);
  if (!cur) { db.close(); return null; }
  db.prepare(`
    UPDATE plans SET title = ?, description = ?, kcal_target = ?, protein = ?, carbs = ?, fat = ? WHERE id = ?
  `).run(data.title || cur.title, data.description || cur.description, data.kcal_target ?? cur.kcal_target, data.macros_target?.protein ?? data.protein ?? cur.protein, data.macros_target?.carbs ?? data.carbs ?? cur.carbs, data.macros_target?.fat ?? data.fat ?? cur.fat, id);
  const row = db.prepare("SELECT * FROM plans WHERE id = ?").get(id);
  db.close();
  return row;
}

export function deletePlan(id) {
  const db = openDb();
  db.prepare("DELETE FROM plans WHERE id = ?").run(id);
  db.close();
  return { ok: true };
}

/* Analytics */
export function getWeightAnalytics() {
  const db = openDb();
  const rows = db.prepare("SELECT * FROM analytics_weight ORDER BY date").all();
  db.close();
  return rows;
}

export function getMacroAnalytics() {
  const db = openDb();
  const rows = db.prepare("SELECT * FROM analytics_macros_week").all();
  db.close();
  return rows;
}
