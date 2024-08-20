<script>
	import { page } from "$app/stores";

	$: user = $page.data.user;

	/** @type {{
    id?: string;
    text: string;
    link?: string;
    votes?: number;
    votersId: string[];
		}} */
	export let fact;
</script>

<div class="shadow-md rounded p-5">
	<p class="text-gray-800 whitespace-pre-wrap">{fact.text}</p>

	<div class="flex items-center justify-between">
		{#if user}
			<!-- buttons to like/upvote or downvote -->
			<form action="" method="post">
				<button type="button" formmethod="post" formaction="">like</button>
			</form>
		{/if}

		<h3 class="text-sm text-right mt-2 ml-auto italic text-gray-600">
			Posted by {"John Doe"} @{"john"}
		</h3>
	</div>
</div>
