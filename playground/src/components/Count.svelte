<script lang="ts">
import { onMount } from "svelte";
export let label: string;

// biome-ignore lint/style/useConst: False error; being mutated below.
let count = 0;
let className = "disabled";

onMount(() => {
	className = "enabled";
});
</script>

<button class={className} on:click={() => count+=1}>{label}: {count}</button>