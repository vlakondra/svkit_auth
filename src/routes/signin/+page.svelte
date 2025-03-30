<script lang="ts">
	import { enhance } from '$app/forms';
	//import type { PageData } from './$types';
	import type { ActionData } from './$types';

	//let { data }: { data: PageData } = $props();
	let { form }: { form: ActionData } = $props();
</script>

<h1>Login</h1>
<form method="POST" action="?/signin" use:enhance>
	<label>
		Пользователь
		<input name="username" />
	</label>
	<label>
		Пароль
		<input type="password" name="password" />
	</label>
	<p class="cursor-pointer text-2xl">
		<button class="cursor-pointer" formaction="?/signin">Логин</button>
	</p>
</form>
<p style="color: red">{form?.message ?? ''}</p>
