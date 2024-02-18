import * as argon2 from "argon2";
import { dbContext } from "../../database";
import { users } from "../../database/schemas/user";
import { eq } from "drizzle-orm";

export async function getUser(username: string) {
  const result = await dbContext
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  return result[0];
}

export async function createUser(username: string, password: string) {
  const hashedPassword = await argon2.hash(password);

  const result = await dbContext
    .insert(users)
    .values({ username, password: hashedPassword })
    .returning();

  return result[0];
}
