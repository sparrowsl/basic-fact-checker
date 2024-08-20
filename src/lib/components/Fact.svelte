<script>
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";

	$: user = $page.data.user;

	export let fact;

	$: console.log(user, fact);
</script>

<div class="shadow-md rounded p-5">
	<p class="text-gray-800 whitespace-pre-wrap">{fact.title}</p>

	<div class="flex items-center justify-between mt-5">
		{#if user}
			<!-- buttons to like/upvote or downvote -->
			<form action="" method="post" class="flex items-center gap-1">
				<p>{fact.votes}</p>
				<button type="button" formmethod="post" formaction="">
					<Icon icon="mdi:heart" class="text-2xl text-blue-500" />
				</button>
			</form>
		{/if}

		<h3 class="text-sm mt-2 ml-auto italic text-gray-600">
			Shared by <span class="font-bold">{fact.user?.name}</span>
			@{fact.user?.username}
		</h3>
	</div>
</div>
