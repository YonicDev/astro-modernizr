<script lang="ts">
import { onMount } from "svelte";

const {label} = $props()

// biome-ignore lint/style/useConst: False error; being mutated below.
let count = $state(0);
let className = $state("disabled");

onMount(() => {
	className = "enabled";
});
</script>

<button class={className} onclick={() => count+=1}>{label}: {count}</button>