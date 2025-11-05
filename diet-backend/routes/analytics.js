import express from "express";
import { getWeightAnalytics, getMacroAnalytics } from "../lib/db-sqlite.js";

const router = express.Router();

router.get("/weight", (req, res) => {
  res.json(getWeightAnalytics());
});

router.get("/macros", (req, res) => {
  res.json(getMacroAnalytics());
});

export default router;
