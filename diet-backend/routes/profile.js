import express from "express";
import { getProfile, updateProfile } from "../lib/db-sqlite.js";

const router = express.Router();

router.get("/", (req, res) => {
  const p = getProfile();
  res.json(p);
});

router.put("/", (req, res) => {
  const updated = updateProfile(req.body);
  res.json({ ok: true, profile: updated });
});

export default router;
