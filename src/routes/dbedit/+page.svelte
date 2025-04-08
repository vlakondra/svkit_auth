<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types'; //from sv docs
	let { data, form }: PageProps = $props();
</script>


<form
	method="POST"
	action="?/create"
	use:enhance={(enh) => {
		console.log(enh.formData.get('album'))
		
		return async ({result, update }) => {
			console.log(result)
			update();
		};
	}}
>
	<div>
		<label>
			Исполнитель:
			<input name="artist" value={form?.artist ?? ''} autocomplete="on" required />
		</label>
	</div>
	<div>
		<label>
			Альбом:
			<input name="album" value={form?.album ?? ''} autocomplete="on" required />
		</label>
	</div>
	<button style="cursor: pointer;">Добавить</button>
	<p>
		{JSON.stringify(data)}
		{JSON.stringify(form)}
	</p>
</form>
