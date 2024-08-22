<script>
  import Fact from "./Fact.svelte";
  import TopFacts from "./TopFacts.svelte";

  export let data;
</script>

<section class="grid grid-cols-[1fr_250px]">
  <div class="min-h-[70vh] mx-auto max-w-2xl mt-10 w-full">
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

  {#await data.topFacts}
    <p class="px-3 text-gray-700 italic mt-20">loading top facts...</p>
  {:then facts}
    <TopFacts {facts} />
  {/await}
</section>
