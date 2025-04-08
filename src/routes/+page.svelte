<script lang='ts'>
 	let { data } = $props();
	 import type { HTMLButtonAttributes } from 'svelte/elements';
	 import type { Snippet } from 'svelte';
//корневая страница может получить данные от +layout.server.js
</script>

<h1>Welcome to SvelteKit</h1>
<p>{data.user?.username}</p>
<h1>{data.user?.id}</h1>
<h1>{data.session?.expiresAt}</h1>

<a style='color:blue' href='/signup'>Register</a>
<p>
<a style='color:blue' href='/signin'>Login</a>
</p>