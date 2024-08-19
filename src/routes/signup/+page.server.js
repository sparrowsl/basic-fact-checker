import db from "$lib/prisma.js";
import { redirect } from "@sveltejs/kit";
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
			return { error: "Username already exists!!" };
		}

		const user = await db.user.create({ data: form }).catch((error) => {
			console.log(error.message);
			return { error: error.message };
		});

		cookies.set("user", JSON.stringify(user), { path: "/" });
		toast.success("User created successfully");
		redirect(307, "/");
	},
};
