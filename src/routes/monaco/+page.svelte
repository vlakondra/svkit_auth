<script lang="ts">
	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import { enhance } from '$app/forms';

	import { Button } from "$lib/components/ui/button";

	let divEl: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divEl, {
			automaticLayout: true,
			theme: 'vs-dark',
			lineNumbers: 'on',
			language: 'javascript',
			value: "console.log('HI!')",
			contextmenu: true,
			cursorStyle: 'line-thin',
			cursorBlinking: 'blink',
			cursorWidth: 2,
			fontSize: 20,
			fontFamily: 'Fira Code'
		});

		editor.onDidChangeModelContent((e) => console.log(editor.getValue()));

		return () => {
			editor.dispose();
		};
	});

	let form: HTMLFormElement;
</script>

<form bind:this={form} method="POST" action="?/create" use:enhance={(enh) => {
    editor.setValue('')
}}>
	<div bind:this={divEl} class="h-80 w-96"></div>
    <input value="qwerty"/>
	<div>
		<button>Submit</button>
	</div>
	<div>
		<Button size='lg' class='bg-amber-600 hover:bg-blue-700' on:click={()=>form.requestSubmit()} variant="destructive">???</Button>
	</div>
</form>
