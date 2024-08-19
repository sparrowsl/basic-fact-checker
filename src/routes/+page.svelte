<section class="min-h-screen mx-auto max-w-2xl mt-10 flex flex-col gap-5">
	{#each { length: 5 } as _}
		<div class="shadow-md rounded p-5">
			<p class="text-gray-800">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam modi
				provident corporis et nobis. A esse aperiam beatae qui cupiditate.
			</p>
			<h3 class="text-sm text-right mt-2 italic text-gray-600">
				Posted by {"John Doe"} @{"john"}
			</h3>
		</div>
	{/each}
</section>
