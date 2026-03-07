import serverless from "serverless-http";
import express from "express";

const app = express();
app.get("/api/test", (_req, res) => {
  res.json({ ok: true, express: true });
});

export default serverless(app);
