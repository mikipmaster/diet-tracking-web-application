import express from "express";
import { nanoid } from "nanoid";
import { getPlans, addPlan, updatePlan, deletePlan } from "../lib/db-sqlite.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getPlans());
});

router.post("/", (req, res) => {
  const id = req.body.id || ("p_" + nanoid(8));
  const plan = addPlan({ id, ...req.body });
  res.status(201).json(plan);
});

router.put("/:id", (req, res) => {
  const updated = updatePlan(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  deletePlan(req.params.id);
  res.json({ ok: true });
});

export default router;
