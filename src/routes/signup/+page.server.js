import db from "$lib/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
import * as v from "valibot";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";

const signupSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "name is invalid, must be 2 or more letters"),
  ),
  username: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "username must be 2 or more characters"),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(4, "password must be 4 or more characters"),
  ),
});

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    // Get the data from the form
    const form =
      /** @type {{name: string, username: string, password: string}} */ (
        Object.fromEntries(await request.formData())
      );

    // validate the input data
    const { output, issues, success } = v.safeParse(signupSchema, form, {
      abortEarly: true,
    });
    if (!success) {
      const errors = issues.map((issue) => issue.message);
      // return the first error message found if validation is wrong
      return fail(400, { message: errors[0] });
    }

    // check if the user exists in the database
    const usernameExists = await db.user.findUnique({
      where: { username: output.username },
    });
    if (usernameExists) {
      return fail(400, { message: "username already taken!!" });
    }

    try {
      // hash user password
      const hashedPassword = await bcrypt.hash(output.password, 12);

      const user = await db.user.create({
        data: {
          name: output.name,
          username: output.username,
          password: hashedPassword,
        },
        omit: {
          password: true,
        },
      });

      // JWT the user info
      const payload = jwt.sign(user, JWT_SECRET_KEY);

      cookies.set("user", payload, { path: "/", secure: true });
    } catch (/** @type {*} */ error) {
      console.log(error.message);
      return fail(400, { message: error.message });
    }

    redirect(307, "/");
  },
};
