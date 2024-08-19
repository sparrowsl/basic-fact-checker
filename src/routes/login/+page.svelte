<script>
	import { applyAction, enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import { toast } from "svelte-sonner";
</script>

<section class="min-h-[50vh] grid place-content-center">
	<form
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.data?.error) {
					toast.error(result.data?.error);
				}

				await applyAction(result);
			};
		}}
	>
		<fieldset class="grid gap-4">
			<div>
				<label class="block" for="username">Username</label>
				<input
					type="text"
					class="block"
					name="username"
					id="username"
					required
				/>
			</div>

			<div>
				<label class="block" for="password">Password</label>
				<input
					type="password"
					class="block"
					name="password"
					id="password"
					required
				/>
			</div>

			<Button>Login</Button>
		</fieldset>
	</form>
</section>
