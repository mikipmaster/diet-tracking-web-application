import express from "express";
import { getDb, saveDb } from "../lib/db.js";
import { nanoid } from "nanoid";

const router = express.Router();

// GET all (optionally filter by ?date=YYYY-MM-DD)
router.get("/", (req, res) => {
  const { date } = req.query;
  const db = getDb();
  let items = db.journal || [];
  if (date) items = items.filter((i) => i.date === date);
  res.json(items);
});

// POST create
router.post("/", (req, res) => {
  const db = getDb();
  const entry = { id: "j_" + nanoid(8), ...req.body };
  db.journal = db.journal || [];
  db.journal.push(entry);
  saveDb(db);
  res.status(201).json(entry);
});

// PUT update
router.put("/:id", (req, res) => {
  const db = getDb();
  db.journal = db.journal || [];
  const idx = db.journal.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  db.journal[idx] = { ...db.journal[idx], ...req.body };
  saveDb(db);
  res.json(db.journal[idx]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const db = getDb();
  db.journal = (db.journal || []).filter((x) => x.id !== req.params.id);
  saveDb(db);
  res.json({ ok: true });
});

export default router;
