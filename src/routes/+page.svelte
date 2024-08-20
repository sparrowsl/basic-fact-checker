<script>
	import Fact from "$lib/components/Fact.svelte";

	export let data;
</script>

<section class="min-h-screen mx-auto max-w-2xl mt-10 flex flex-col gap-5">
	{#each data.facts as fact (fact.id)}
		<Fact {fact} />
	{/each}
</section>
