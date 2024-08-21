<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";

	export let fact;

	$: user = $page.data.user;
</script>

<!-- <div class="shadow-md rounded p-5"> -->
<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">
			{fact?.title}
		</h2>
		<p class="flex items-center gap-2">
			<Icon icon="mdi:link" class="text-xl" />Source:
			<a href={fact?.link} class="btn-link">{fact?.link}</a>
		</p>
		<p>{fact?.summary}</p>
		<p class="text-sm italic -mt-2">Shared by: {fact?.user?.name}</p>

		<div class="card-actions justify-end mt-3">
			<span class="flex items-center gap-1 mr-auto">
				{fact.votes}
				<Icon icon="mdi:heart" class="text-2xl text-accent" />
			</span>

			<form method="post" class="text-sm flex gap-5" use:enhance>
				<!-- Button to vote true -->
				<button
					type="submit"
					name="factId"
					formmethod="post"
					formaction="/?/voteTrue"
					value={fact?.id}
					class="bg-success/90 rounded p-2 text-white flex items-center gap-1 font-bold"
				>
					<!-- formaction="" -->
					True <Icon icon="mdi:vote" class="text-lg" />
				</button>

				<!-- Button to vote false -->
				<button
					type="submit"
					name="factId"
					formmethod="post"
					value={fact?.id}
					class="bg-error/90 rounded p-2 text-white flex items-center gap-1 font-semibold"
				>
					False <Icon icon="mdi:vote" class="text-lg" />
				</button>
			</form>
		</div>
	</div>
</div>

<p class="text-gray-800 whitespace-pre-wrap">{fact.title}</p>

<div class="flex items-center justify-between mt-5">
	{#if user}
		<!-- buttons to like/upvote or downvote -->
		<p class="flex items-center gap-1">
			<span>{fact.votes}</span>
			<Icon icon="mdi:heart" class="text-2xl text-blue-500" />
		</p>
	{/if}

	<h3 class="text-sm mt-2 ml-auto italic text-gray-600">
		Shared by <span class="font-bold">{fact.user?.name}</span>
		@{fact.user?.username}
	</h3>
</div>
<!-- </div> -->
