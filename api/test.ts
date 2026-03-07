import express from "express";

const app = express();
app.get("/api/test", (_req, res) => {
  res.json({ ok: true, express: true, noServerlessHttp: true });
});

export default app;
