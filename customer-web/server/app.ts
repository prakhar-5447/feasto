import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import mongoSanitize from "express-mongo-sanitize";

import { apiLimiter, authLimiter } from "./middlewares/rateLimit.middleware";
import { securityMiddleware } from "./middlewares/security.middleware";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import foodRoutes from "./routes/food.routes";
// import cartRoutes from "./routes/cart.routes";
// import orderRoutes from "./routes/order.routes";
// import reviewRoutes from "./routes/review.routes";
// import searchRoutes from "./routes/search.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());

// Security middlewares
securityMiddleware.forEach((m) => app.use(m));

// Optional sanitize middleware
// app.use((req: Request, res: Response, next: Function) => {
//   if (req.originalUrl.startsWith('/api')) {
//     return mongoSanitize()(req, res, next);
//   }
//   next();
// });

app.post("/logs", (req: Request, res: Response) => {
  // logger middleware already handles logs
  res.sendStatus(200);
});

// Rate limiting
app.use("/v1/auth", authLimiter);
app.use("/v1", apiLimiter);

// Routes
app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/restaurants", restaurantRoutes);
app.use("/v1/foods", foodRoutes);

// app.use("/v1/cart", cartRoutes);
// app.use("/v1/orders", orderRoutes);
// app.use("/v1/reviews", reviewRoutes);
// app.use("/v1/search", searchRoutes);

export default app;