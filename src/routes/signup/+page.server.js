import db from "$lib/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
import { toast } from "svelte-sonner";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		// Get the data from the form
		const form =
			/** @type {{name: string, username: string, password: string}} */ (
				Object.fromEntries(await request.formData())
			);

		// check if the user exists in the database
		const usernameExists = await db.user.findUnique({
			where: { username: form.username },
		});
		if (usernameExists) {
			return fail(400, { message: "username already taken!!" });
		}

		try {
			const user = await db.user.create({ data: form });

			cookies.set("user", JSON.stringify(user), { path: "/" });
			toast.success("User created successfully");

			return redirect(307, "/");
		} catch (/** @type {*} */ error) {
			console.log(error.message);
			return fail(400, { message: error.message });
		}
	},
};
