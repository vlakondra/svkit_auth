<script lang="ts">
	import '../app.css';

	import type { PageServerData } from './$types';

	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	//let { children } = $props();
</script>

{@render children()}
<h1>{data.user?.username}</h1>
<h1>{data.user?.id}</h1>