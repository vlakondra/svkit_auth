<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import type { ActionData } from './$types';

    //let { data }: { data: PageData } = $props();
    let { form }: { form: ActionData } = $props();
</script>

<h1>Login/Register</h1>
<form method="post" action="?/register" use:enhance>
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button>Login</button>
	<button formaction="?/register">Register</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>