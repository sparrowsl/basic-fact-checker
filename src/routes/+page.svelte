<script>
  import Fact from "./Fact.svelte";

  export let data;
</script>

<div class="min-h-[70vh] mx-auto max-w-2xl mt-10">
  <h2 class="font-semibold mb-4">
    Total Facts Shared: {data.facts.length || 0}
  </h2>

  <section class="grid gap-5">
    {#each data.facts as fact (fact.id)}
      <Fact {fact} />
    {:else}
      <p class="text-gray-400 italic mt-5">No facts has been shared yet!!</p>
    {/each}
  </section>
</div>
