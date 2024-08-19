<script>
	export let type = "submit";
</script>

<button
	{type}
	class="{$$props.class} block bg-gray-400 w-fit text-sm px-6 py-2 font-bold rounded"
>
	<slot>Submit</slot>
</button>
