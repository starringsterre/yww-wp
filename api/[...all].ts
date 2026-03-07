let app: any;
try {
  const { createServer } = require("../server");
  app = createServer();
} catch (err: any) {
  // If server import fails, return the error for debugging
  app = (_req: any, res: any) => {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "Server initialization failed",
      message: err?.message,
      stack: err?.stack?.split("\n").slice(0, 5),
    }));
  };
}

export default app;
