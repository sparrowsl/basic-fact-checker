import db from "$lib/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
import { toast } from "svelte-sonner";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		// Get the data from the form
		const form = /** @type {{username: string, password: string}} */ (
			Object.fromEntries(await request.formData())
		);

		// check if the user exists in the database
		const user = await db.user.findUnique({
			where: { username: form.username },
		});
		// TODO: hash password using bcrypt or argon
		if (!user || user.password !== form.password) {
			return fail(400, { message: "Invalid username or password!!" });
		}

		// TODO: remove the password from the token
		cookies.set("user", JSON.stringify(user), { path: "/" });
		toast.success("successfully logged in");
		redirect(307, "/");
	},
};
