<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import Barchart from '$lib/components/barchart.svelte';

	import XIcon from 'phosphor-svelte/lib/XIcon';
</script>

{#if data.session.success}
	<div class="flex items-center">
		<p class="flex-1">{data.session.data.question}</p>
		<form method="POST" action="?/sessionstop">
			<button class="btn btn-soft btn-error">
				<XIcon weight="bold" />
				Stop Session
			</button>
		</form>
	</div>
	<Barchart votes={data.session.data.votes} />
{:else}
	{data.session.message}
{/if}
