import express from "express";
import { nanoid } from "nanoid";
import { getJournalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } from "../lib/db-sqlite.js";

const router = express.Router();

// GET /api/journal?date=YYYY-MM-DD
router.get("/", (req, res) => {
  const { date } = req.query;
  const rows = getJournalEntries(date);
  res.json(rows);
});

// POST create
router.post("/", (req, res) => {
  const payload = req.body;
  const id = payload.id || ("j_" + nanoid(8));
  const row = addJournalEntry({ id, ...payload });
  res.status(201).json(row);
});

// PUT update
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updated = updateJournalEntry(id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const result = deleteJournalEntry(id);
  res.json(result);
});

export default router;
