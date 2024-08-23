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
    <h2 class="card-title !text-lg">{fact?.title}</h2>
    <p class="flex items-center gap-2">
      <a href={fact?.link} class="btn-link">{fact?.link}</a>
      <Icon icon="mdi:link" class="text-xl" />
    </p>
    <p class="text-sm">{fact?.summary}</p>
    {#if fact?.user?.id === user?.id}
      <p class="text-sm italic -mt-1">Shared by: You</p>
    {:else}
      <p class="text-sm italic -mt-2">Shared by: {fact?.user?.name}</p>
    {/if}

    <div class="card-actions mt-3 items-center">
      <span class="flex items-center gap-1 mr-auto">
        {fact.votes}
        <Icon icon="mdi:heart" class="text-2xl text-accent" />
      </span>

      {#if user}
        {#if !fact.votersId?.includes(user?.id)}
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
              formaction="/?/voteFalse"
              value={fact?.id}
              class="bg-error/90 rounded p-2 text-white flex items-center gap-1 font-semibold"
            >
              False <Icon icon="mdi:vote" class="text-lg" />
            </button>
          </form>
        {:else}
          <div>
            <p class="badge badge-sm bg-accent text-white font-bold italic">
              already voted
            </p>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>
