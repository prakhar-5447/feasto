import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { apiLimiter, authLimiter } from "./middlewares/rateLimit.middleware";
import { securityMiddleware } from "./middlewares/security.middleware";

import logRoutes from "./routes/log.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import searchRoutes from "./routes/search.routes";
import foodRoutes from "./routes/food.routes";
import cartRoutes from "./routes/cart.routes";
import couponRoutes from "./routes/coupon.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";
// import reviewRoutes from "./routes/review.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

securityMiddleware.forEach((middleware) => {
  app.use(middleware);
});

// Rate limiting
app.use("/v1", apiLimiter);
app.use("/v1/auth", authLimiter);

// Routes
app.use("/v1/logs", logRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/restaurants", restaurantRoutes);
app.use("/v1/foods", foodRoutes);
app.use("/v1/search", searchRoutes);
app.use("/v1/cart", cartRoutes);
app.use("/v1/coupons", couponRoutes);
app.use("/v1/orders", orderRoutes);
app.use("/v1/payments", paymentRoutes);
// app.use("/v1/reviews", reviewRoutes);

export default app;