<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	$: user = $page.data.user;
</script>

<header class="sticky top-0 bg-white shadow py-3">
	<div class="navbar bg-base-100 container mx-auto">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl">BFC</a>
		</div>
		{#if user}
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<h3 class="capitalize">
						Welcome back, {user?.name || user?.username}
					</h3>
				</ul>
			</div>
		{/if}
		<div class="navbar-end gap-5">
			<a href="/">Home</a>

			{#if user}
				<a href="/new" class="btn btn-sm">New Fact</a>

				<form
					action="/logout"
					method="post"
					class="btn btn-sm btn-error"
					use:enhance
				>
					<button type="submit">logout</button>
				</form>
			{:else}
				<a href="/login" class="btn btn-accent btn-sm">Login</a>
				<a href="/signup" class="btn btn-sm">Signup</a>
			{/if}
		</div>
	</div>
</header>
