<script>
  /** @type {{id: string, link: string, title: string, votes: number}[]} */
  export let facts = [];
  console.log(facts);
</script>

<aside class="hidden lg:block shadow p-5 mt-10 max-w-64 -ml-20 h-fit">
  <h3 class="font-bold text-lg text-center">Top Facts</h3>

  <section>
    {#each facts as fact (fact.id)}
      <div class="mb-1 text-sm border-b border-gray-100 p-2">
        <h3>{fact?.title}</h3>

        <p class="flex justify-between items-center">
          <a href={fact?.link} class="btn-link">source &rArr;</a>
          <span>{fact.votes} votes</span>
        </p>
      </div>
    {/each}
  </section>
</aside>
