<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/navbar.svelte';
	import type { LayoutData } from './$types';

	let { children, data } = $props<{ children: any; data: LayoutData }>();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SchoolBox</title>
</svelte:head>

<div class="min-h-screen bg-base-200">
	<Navbar me={data.me} />
	{@render children()}
</div>
