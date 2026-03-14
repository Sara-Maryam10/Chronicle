import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/** Hash a plain-text password */
export async function hash(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/** Compare a plain-text password against a stored hash */
export async function compare(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}
