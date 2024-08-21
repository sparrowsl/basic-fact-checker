<script>
	import { applyAction, enhance } from "$app/forms";
	import Icon from "@iconify/svelte";
	import { toast } from "svelte-sonner";
</script>

<section class="min-h-[50vh] grid place-content-center">
	<form
		method="post"
		class="shadow-xl p-14 rounded"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === "failure") {
					toast.error(String(result.data?.message));
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<legend class="font-bold text-xl text-center mb-2">Login</legend>

		<fieldset class="grid gap-4">
			<label class="input input-bordered flex items-center gap-2">
				<Icon icon="mdi:person" />
				<input
					type="text"
					class="grow input border-0"
					placeholder="Username"
					name="username"
					required
				/>
			</label>

			<label class="input input-bordered flex items-center gap-2">
				<Icon icon="mdi:key" />
				<input
					type="password"
					class="grow input border-0"
					name="password"
					required
				/>
			</label>

			<button type="submit" class="btn btn-accent">Login</button>
		</fieldset>
	</form>
</section>
