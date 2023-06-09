import express from "express";
import userRoutes from "./user.route";
const routes = express.Router();

routes.use("/users", userRoutes);

export default routes;
