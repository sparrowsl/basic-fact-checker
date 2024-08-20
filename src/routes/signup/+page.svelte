<script>
	import { applyAction, enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
	import { toast } from "svelte-sonner";
</script>

<section class="min-h-[50vh] grid place-content-center">
	<form
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				console.log(result);
				if (result.type === "failure") {
					toast.error(String(result.data?.message));
				} else if (result.type === "redirect") {
					goto(result.location);
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<fieldset class="grid gap-4">
			<div>
				<label class="block" for="name">Name</label>
				<input type="text" class="block" name="name" id="name" />
			</div>

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
					minlength="4"
				/>
			</div>

			<Button>Signup</Button>
		</fieldset>
	</form>
</section>
