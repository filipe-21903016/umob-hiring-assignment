import cors from "cors";
import express, { Express } from "express";
import authenticationRouter from "./modules/authentication/authentication-controller";
import gameRouter from "./modules/game/game-controller";

async function buildServer() {
  const app: Express = express();

  // Register plugins
  app.use(cors());
  app.use(express.json());

  // Register routes
  app.use(authenticationRouter);
  app.use(gameRouter)

  return app;
}

async function main() {
  const app = await buildServer();
  app.listen(3000, () => {});
}

main();
