import db from "$lib/prisma.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const facts = await db.fact.findMany({
		orderBy: {
			id: "desc",
		},
		include: {
			user: {
				omit: {
					password: true,
				},
			},
		},
	});

	// converts all the voters id to array of strings
	// since sqlite doesnt support arrays
	// biome-ignore lint/complexity/noForEach: <explanation>
	facts.forEach((fact) => fact.votersId?.split(","));

	return { user: locals.user, facts };
}
