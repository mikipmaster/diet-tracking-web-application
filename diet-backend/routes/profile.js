import express from "express";
import { getDb, saveDb } from "../lib/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const db = getDb();
  res.json(db.profile || null);
});

router.put("/", (req, res) => {
  const db = getDb();
  db.profile = { ...db.profile, ...req.body };
  saveDb(db);
  res.json({ ok: true, profile: db.profile });
});

export default router;
