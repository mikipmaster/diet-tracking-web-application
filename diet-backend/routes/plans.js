import express from "express";
import { getDb, saveDb } from "../lib/db.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.get("/", (req, res) => {
  const db = getDb();
  res.json(db.plans || []);
});

router.post("/", (req, res) => {
  const db = getDb();
  const plan = { id: "p_" + nanoid(8), ...req.body };
  db.plans = db.plans || [];
  db.plans.push(plan);
  saveDb(db);
  res.status(201).json(plan);
});

router.put("/:id", (req, res) => {
  const db = getDb();
  db.plans = db.plans || [];
  const idx = db.plans.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  db.plans[idx] = { ...db.plans[idx], ...req.body };
  saveDb(db);
  res.json(db.plans[idx]);
});

router.delete("/:id", (req, res) => {
  const db = getDb();
  db.plans = (db.plans || []).filter((p) => p.id !== req.params.id);
  saveDb(db);
  res.json({ ok: true });
});

export default router;
