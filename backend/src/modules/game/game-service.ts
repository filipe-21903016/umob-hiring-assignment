import { eq } from "drizzle-orm";
import { dbContext } from "../../database";
import { games } from "../../database/schemas/game";

export async function createGame(username: string, score: number) {
  const result = await dbContext
    .insert(games)
    .values({ score: `${score}`, username })
    .returning();

  return result[0];
}

export async function getGamesByUser(username: string) {
  return await dbContext
    .select()
    .from(games)
    .where(eq(games.username, username));
}
