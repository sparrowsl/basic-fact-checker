<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	$: user = $page.data.user;
</script>

<header class="container mx-auto sticky top-0 bg-white">
	<nav class="py-5 flex items-center justify-between">
		{#if user}
			<h3 class="capitalize">Welcome back {user.name || user.username}</h3>
		{/if}

		<ul class="flex items-center justify-center gap-5 ml-auto">
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
