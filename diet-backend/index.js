import express from "express";
import cors from "cors";
import morgan from "morgan";
import profileRouter from "./routes/profile.js";
import journalRouter from "./routes/journal.js";
import plansRouter from "./routes/plans.js";
import analyticsRouter from "./routes/analytics.js";
import { initDb } from "./lib/db.js";

const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: ALLOWED_ORIGIN }));

// init then start
initDb().then(() => {
  app.use("/api/profile", profileRouter);
  app.use("/api/journal", journalRouter);
  app.use("/api/plans", plansRouter);
  app.use("/api/analytics", analyticsRouter);

  app.get("/", (req, res) => {
    res.json({ ok: true, msg: "Diet-tracking backend alive" });
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to init DB:", err);
  process.exit(1);
});
