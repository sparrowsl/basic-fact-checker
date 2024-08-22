import db from "$lib/prisma.js";
import { redirect } from "@sveltejs/kit";

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

  async function topFacts() {
    return db.fact.findMany({
      where: {
        votes: {
          gt: 0,
        },
      },
      orderBy: {
        votes: "desc",
      },
      take: 5,
      select: {
        id: true,
        link: true,
        title: true,
        votes: true,
      },
    });
  }

  // converts all the voters id to array of strings
  // since sqlite doesnt support arrays
  const tempFacts = facts.map((fact) => ({
    ...fact,
    votersId: fact.votersId?.split(","),
  }));

  return {
    user: locals.user,
    facts: tempFacts,
    topFacts: topFacts(),
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: ({ cookies }) => {
    cookies.delete("user", { path: "/", maxAge: 0 });
    redirect(307, "/");
  },

  voteTrue: async ({ request, locals }) => {
    const { factId } = Object.fromEntries(await request.formData());

    // get the fact first, to update the voters id
    const fact = await db.fact.findUnique({ where: { id: String(factId) } });
    if (!fact) {
      return;
    }

    /** @type {string[]} */
    let voters = [];

    // check if voters already available
    if (fact.votersId) {
      // split all the current id to array again.
      // NOTE: sqlite does not support arrays so I have to do this
      const tempIds = fact.votersId.split(",");
      voters = voters.concat(tempIds);
    }

    // if voters array is empty then add the first voter id
    voters.push(locals.user?.id);

    try {
      const updated = await db.fact.update({
        where: { id: String(factId) },
        data: {
          // join all voters id back to single string and update the fact vote
          votersId: voters.join(","),
          // update the vote count by one.
          // NOTE: race conditions can happen here, but not critical for low traffic app like this
          votes: fact.votes + 1,
        },
      });
      console.log("True Vote:", updated);
    } catch (_e) {
      console.log(_e);
    }
  },

  voteFalse: async ({ request, locals }) => {
    const { factId } = Object.fromEntries(await request.formData());

    // get the fact first, to update the voters id
    const fact = await db.fact.findUnique({ where: { id: String(factId) } });
    if (!fact) {
      return;
    }

    /** @type {string[]} */
    let voters = [];

    // check if voters already available
    if (fact.votersId) {
      // split all the current id to array again.
      // NOTE: sqlite does not support arrays so I have to do this
      const tempIds = fact.votersId.split(",");
      voters = voters.concat(tempIds);
    }

    // if voters array is empty then add the first voter id
    voters.push(locals.user?.id);

    try {
      const updated = await db.fact.update({
        where: { id: String(factId) },
        data: {
          // join all voters id back to single string and update the fact vote
          votersId: voters.join(","),
          // reduce the vote count by one.
          // NOTE: race conditions can happen here, but not critical for low traffic app like this
          votes: fact.votes > 0 ? fact.votes - 1 : 0,
        },
      });

      console.log("False Vote:", updated);
    } catch (_e) {
      console.log(_e);
    }
  },
};
