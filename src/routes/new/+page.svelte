<script>
	import { applyAction, enhance } from "$app/forms";
	import Icon from "@iconify/svelte";
	import { toast } from "svelte-sonner";
</script>

<section class="min-h-[50vh] mt-10 max-w-xl mx-auto">
	<form
		method="post"
		class="shadow-xl p-14 rounded"
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
			<div class="form-control w-full">
				<span class="label label-text">News Title</span>
				<label class="input input-bordered flex items-center gap-2">
					<Icon icon="mdi:lead-pencil" />
					<input
						type="text"
						class="grow input border-0"
						placeholder="Christex foundation just dropped a bounty"
						name="title"
						required
					/>
				</label>
			</div>

			<div class="form-control w-full">
				<span class="label label-text">Source Link</span>
				<label class="input input-bordered flex items-center gap-2">
					<Icon icon="mdi:link" />
					<input
						type="url"
						class="grow input border-0"
						name="link"
						required
						placeholder="https://earn.christex.foundation"
					/>
				</label>
			</div>

			<div class="form-control w-full">
				<label class="label label-text !justify-start" for="summary">
					<Icon icon="mdi:text" class="mr-2" /> Summary
					<span class="italic text-xs ml-1">(optional)</span>
				</label>
				<textarea
					id="summary"
					class="textarea textarea-bordered w-full min-h-28 resize-none"
					placeholder="learn, earn and enjoy your craft..."
					name="summary"
				></textarea>
			</div>

			<button type="submit" class="btn btn-success text-white">
				Share fact
			</button>
		</fieldset>
	</form>
</section>
