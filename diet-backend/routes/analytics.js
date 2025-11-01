import express from "express";
import { getDb } from "../lib/db.js";

const router = express.Router();

router.get("/weight", (req, res) => {
  const db = getDb();
  res.json((db.analytics && db.analytics.weight) || []);
});

router.get("/macros", (req, res) => {
  const db = getDb();
  res.json((db.analytics && db.analytics.macros_week) || []);
});

export default router;
