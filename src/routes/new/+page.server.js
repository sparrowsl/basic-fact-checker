import db from "$lib/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
import * as v from "valibot";

const factSchema = v.object({
  link: v.pipe(v.string(), v.trim(), v.url("link is invalid")),
  title: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "title must be 1 or more letters"),
  ),
  summary: v.optional(v.pipe(v.string(), v.trim())),
  userId: v.pipe(
    v.string("userId is required"),
    v.minLength(1, "userId is too short"),
  ),
});

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (!locals.user) {
    redirect(307, "/");
  }

  return { user: locals.user };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const form = Object.fromEntries(await request.formData());

    const { output, issues, success } = v.safeParse(
      factSchema,
      { ...form, userId: locals.user.id },
      { abortEarly: true },
    );

    if (!success) {
      const errors = issues.map((issue) => issue.message);
      return fail(400, { message: errors[0] });
    }

    try {
      await db.fact.create({
        data: {
          link: output.link,
          title: output.title,
          summary: output.summary,
          userId: output.userId,
        },
      });
    } catch (/** @type {*} */ error) {
      console.log("ERROR:", error.message);
      return fail(400, { message: error.message });
    }

    redirect(307, "/");
  },
};
