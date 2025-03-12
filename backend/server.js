import express from "express";
import path from "path";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import authRoutes from "./routes/auth.route.js";
import bodyParser from "body-parser";
import { attachUser } from "./middleware/mongoUser.js";

const app = express();
const PORT = ENV_VARS.PORT;

const __dirname = path.resolve();

app.use(clerkMiddleware());

app.use(cookieParser());

app.use(
  "/api/v1/auth",
  bodyParser.raw({ type: "application/json" }),
  authRoutes
);
app.use(express.json()); // allow us to parse req.body
app.use("/api/v1/movie", requireAuth(), movieRoutes);
app.use("/api/v1/tv", requireAuth(), tvRoutes);
app.use("/api/v1/search", requireAuth(), attachUser, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
