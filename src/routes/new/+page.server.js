import db from "$lib/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

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

		try {
			await db.fact.create({
				data: {
					link: String(form.link),
					title: String(form.title),
					summary: String(form.summary),
					userId: locals.user.id,
				},
			});
		} catch (/** @type {*} */ error) {
			console.log({ error });
			return fail(400, { message: error.message });
		}

		redirect(307, "/");
	},
};
