<script>
	import { applyAction, enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
	import { toast } from "svelte-sonner";
</script>

<section class="min-h-[50vh] max-w-xl mx-auto">
	<form
		action=""
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === "redirect") {
					toast.success("fact created successfully!!");
					goto(result.location);
				} else if (result.type === "failure") {
					toast.info(String(result.data?.message));
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<fieldset class="grid gap-5">
			<div>
				<label for="text" class="block">Info</label>
				<textarea
					name="text"
					id="text"
					class="block rounded resize-none text-sm w-full min-h-36"
					required
				></textarea>
			</div>

			<div>
				<label for="link" class="block">
					link <span class="text-xs">(optional)</span>
				</label>
				<input
					type="url"
					name="link"
					id="link"
					placeholder="https://google.com/news"
					class="rounded w-full"
				/>
			</div>

			<Button class="text-white !bg-black">Share fact</Button>
		</fieldset>
	</form>
</section>
