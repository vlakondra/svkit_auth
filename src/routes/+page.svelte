<script lang='ts'>
    let a=$state()
	let { data } = $props();
//корневая страница может получить данные от +layout.server.js
</script>

<h1>Welcome to SvelteKit</h1>
<p>{data.user?.username}</p>
<a style='color:blue' href='/signup'>Register</a>
<p>
<a style='color:blue' href='/signin'>Login</a>
</p>