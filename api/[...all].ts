export default async function handler(req: any, res: any) {
  try {
    const { createServer } = await import("../server/index");
    const app = createServer();
    return app(req, res);
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "Server initialization failed",
      message: err?.message,
      stack: err?.stack?.split("\n").slice(0, 5),
    }));
  }
}
