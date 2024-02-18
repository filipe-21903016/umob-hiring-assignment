import { Router } from "express";
import { createGame, getGamesByUser } from "./game-service";

const gameRouter = Router();

gameRouter.post("/create", async (req, res) => {
  const { username, score } = req.body;
  const savedGame = await createGame(username, score);
  return res.send(savedGame);
});

gameRouter.get("/history", async (req, res) => {
  const username = req.query?.username;

  if (!username) {
    return res.sendStatus(400);
  }

  const games = await getGamesByUser(username as string);
  return res.send(games ?? []);
});

export default gameRouter;
