<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	$: user = $page.data.user;
</script>

<header class="container mx-auto sticky top-0 bg-white">
	<nav class="py-5">
		<ul class="flex items-center justify-center gap-5">
			<li><a href="/">Home</a></li>
			{#if !user}
				<li><a href="/login">Login</a></li>
				<li><a href="/signup">Signup</a></li>
			{:else}
				<li><a href="/new">New Fact</a></li>
				<li>
					<form action="/logout" method="post" use:enhance>
						<button type="submit">logout</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
</header>
