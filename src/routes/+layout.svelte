<script>
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	import Header from "./Header.svelte";
</script>

<Toaster richColors closeButton position="top-right" />
<Header />
<main class="container mx-auto">
	<slot></slot>
</main>
