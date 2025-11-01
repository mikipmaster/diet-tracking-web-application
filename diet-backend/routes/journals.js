import express from "express";
import { getDb, saveDb } from "../lib/db.js";
import { nanoid } from "nanoid";

const router = express.Router();

// GET all / by date
router.get("/", (req, res) => {
  const { date } = req.query;
  const db = getDb();
  let items = db.journal || [];
  if (date) {
    items = items.filter((i) => i.date === date);
  }
  res.json(items);
});

// POST new
router.post("/", (req, res) => {
  const db = getDb();
  const payload = req.body;
  const id = "j_" + nanoid(8);
  const entry = { id, ...payload };
  db.journal = db.journal || [];
  db.journal.push(entry);
  saveDb(db);
  res.status(201).json(entry);
});

// PUT update
router.put("/:id", (req, res) => {
  const db = getDb();
  const id = req.params.id;
  let items = db.journal || [];
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  items[idx] = { ...items[idx], ...req.body };
  db.journal = items;
  saveDb(db);
  res.json(items[idx]);
});

// 111 DELETE
router.delete("/:id", (req, res) => {
  const db = getDb();
  const id = req.params.id;
  db.journal = (db.journal || []).filter((x) => x.id !== id);
  saveDb(db);
  res.json({ ok: true });
});

export default router;
