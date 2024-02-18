import * as argon2 from "argon2";
import { getUser } from "../user/user-service";

export async function verifyPassword(hash: string, password: string) {
  try {
    const isPasswordValid = await argon2.verify(hash, password);
    return isPasswordValid;
  } catch (e) {
    return false;
  }
}

export async function authenticate(username, password) {
  try {
    const user = await getUser(username);
    if (!user || !(await verifyPassword(user.password, password))) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
}
