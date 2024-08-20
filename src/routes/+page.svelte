<script>
	import Fact from "$lib/components/Fact.svelte";

	export let data;
</script>

<div class="min-h-96 mx-auto max-w-2xl mt-10">
	<p>Facts: {data.facts.length || 0}</p>

	<section class="grid gap-5">
		{#each data.facts as fact (fact.id)}
			<Fact {fact} />
		{:else}
			<p class="text-gray-400 italic mt-5">No facts has been shared yet!!</p>
		{/each}
	</section>
</div>
