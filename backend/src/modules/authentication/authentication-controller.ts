import { Router } from "express";
import { createUser, getUser } from "../user/user-service";
import { authenticate } from "./authentication-service";

const authenticationRouter = Router();

authenticationRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  const result = await authenticate(username, password);
  if (!result) {
    return res.sendStatus(401);
  }

  return res.send({ username });
});

authenticationRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);
  if (user) {
    return res.sendStatus(409);
  }
  const result = await createUser(username, password);
  return res.send({ ...result, password: undefined });
});

authenticationRouter.get("/signout", async (req, res) => {
  if (req.cookies.user) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(403);
  }
});

export default authenticationRouter;
