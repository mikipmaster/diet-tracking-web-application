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
  const id = "p_" + nanoid(8);
  const plan = { id, ...req.body };
  db.plans = db.plans || [];
  db.plans.push(plan);
  saveDb(db);
  res.status(201).json(plan);
});

router.put("/:id", (req, res) => {
  const db = getDb();
  const id = req.params.id;
  let plans = db.plans || [];
  const idx = plans.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  plans[idx] = { ...plans[idx], ...req.body };
  db.plans = plans;
  saveDb(db);
  res.json(plans[idx]);
});

router.delete("/:id", (req, res) => {
  const db = getDb();
  const id = req.params.id;
  db.plans = (db.plans || []).filter((p) => p.id !== id);
  saveDb(db);
  res.json({ ok: true });
});

export default router;
