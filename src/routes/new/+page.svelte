<script>
	import { applyAction, enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import { toast } from "svelte-sonner";
</script>

<section class="min-h-[50vh] mt-10 max-w-xl mx-auto">
	<form
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === "failure") {
					toast.info(String(result.data?.message));
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<fieldset class="grid gap-5">
			<div>
				<label for="title" class="block">Info</label>
				<input
					name="title"
					id="title"
					class="block rounded text-sm w-full"
					required
					placeholder="Christex foundation just dropped a bounty"
				/>
			</div>

			<div>
				<label for="link" class="block">link</label>
				<input
					type="url"
					name="link"
					id="link"
					placeholder="https://earn.christex.foundation"
					class="rounded w-full"
					required
				/>
			</div>

			<div>
				<label for="summary" class="block">
					summary <span class="text-xs">(optional)</span>
				</label>
				<textarea
					name="summary"
					id="summary"
					class="rounded resize-none min-h-28 w-full placeholder:text-gray-400 placeholder:italic"
					placeholder="learn, earn and enjoy your craft..."
				></textarea>
			</div>

			<Button class="text-white !bg-black">Share fact</Button>
		</fieldset>
	</form>
</section>
