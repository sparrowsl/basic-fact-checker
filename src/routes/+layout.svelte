<script>
	import { Toaster } from "svelte-sonner";
	import "../app.css";
</script>

<header class="container mx-auto sticky top-0 bg-white">
	<nav class="py-5">
		<ul class="flex items-center justify-center gap-5">
			<li><a href="/">Home</a></li>
			<li><a href="/login">Login</a></li>
			<li><a href="/signup">Signup</a></li>

			<li><a href="/new">New Fact</a></li>
			<li><a href="/">logout</a></li>
		</ul>
	</nav>
</header>

<Toaster richColors position="top-right" />
<main class="container mx-auto">
	<slot></slot>
</main>
