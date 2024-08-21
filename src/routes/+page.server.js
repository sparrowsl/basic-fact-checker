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

/** @type {import('./$types').Actions} */
export const actions = {
	voteTrue: async ({ request, locals }) => {
		const { factId } = Object.fromEntries(await request.formData());

		console.log(locals.user);

		// get the fact first, to update the voters id
		const fact = await db.fact.findUnique({ where: { id: String(factId) } });
		if (!fact) {
			return;
		}

		/** @type {string[]} */
		const voters = [];

		// check if voters already available
		if (fact.votersId) {
			// split all the current id to array again.
			// NOTE: sqlite does not support arrays so I have to do this
			const tempIds = fact.votersId.split(",");
			voters.concat(tempIds);
		}

		// if voters array is empty then add the first voter id
		voters.push(locals.user?.id);

		// join all voters id back to single string and update the fact vote
		const updated = await db.fact.update({
			where: { id: String(factId) },
			data: {
				votersId: voters.join(","),
				// NOTE: race conditions can happen here, but not critical for low traffic app like this
				votes: fact.votes + 1,
			},
		});

		console.log(updated);
	},
};
