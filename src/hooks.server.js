import { JWT_SECRET_KEY } from "$env/static/private";
import jwt from "jsonwebtoken";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookie = event.cookies.get("user");

  if (!cookie) {
    return await resolve(event);
  }

  // unsign the JWT cookie payload to user object
  const payload = jwt.verify(cookie, JWT_SECRET_KEY);

  try {
    event.locals.user = JSON.parse(String(payload));
  } catch (/** @type {*} */ _e) {
    console.log("could not parse JWT payload");
    console.log(_e.message);
  }

  return await resolve(event);
}
