/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const userCookie = event.cookies.get("user");

	if (!userCookie) {
		return await resolve(event);
	}

	const user = JSON.parse(userCookie);
	event.locals.user = user;

	return await resolve(event);
}
