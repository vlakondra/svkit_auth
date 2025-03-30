<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	let { data, children }: LayoutProps = $props();

	import SignoutForm from '$lib/components/signoutForm.svelte';
</script>

<div class="bg-blue-100 px-3 py-3">
	{@render children()}
</div>

{#if data.session}
	<div><SignoutForm /></div>
{/if}

<h1>{data.user?.username}</h1>
<h1>{data.user?.id}</h1>
<h1>{data.session?.expiresAt}</h1>
