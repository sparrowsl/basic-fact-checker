import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	redirect(307, "/");
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: ({ cookies }) => {
		cookies.delete("user", { path: "/", maxAge: 0 });
		redirect(307, "/");
	},
};
