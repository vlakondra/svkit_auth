<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import('../../monaco-edit')).default;

		// Your monaco instance is ready, let's display some code!
		const editor = monaco.editor.create(editorContainer,
		{automaticLayout:true,
			theme:'vs-dark',
			lineNumbers:'on',
			language:'javascript'
		});
		
		const model = monaco.editor.createModel(
			"console.log('Hello from Monaco! (the editor, not the city...)')",
			'javascript'
			
		);
		editor.setModel(model);
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div>
	<p class="container h-lvh" bind:this={editorContainer} ></p>
</div>

<style>

</style>


<!-- <script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import * as monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';

	import { code as jsCode } from '$lib/codes/js_code';

	let editorElement: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor | undefined;
	let model: monaco.editor.ITextModel;

	function loadCode(code: string, language: string) {
		model = monaco?.editor.createModel(code, language);
		editor?.setModel(model);
		
	}

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_: any, label: string) {
				if (label === 'javascript') {
					return new jsonWorker();
				}
				// if (label === 'css' || label === 'scss' || label === 'less') {
				// 	return new cssWorker();
				// }
				// if (label === 'html' || label === 'handlebars' || label === 'razor') {
				// 	return new htmlWorker();
				// }
				// if (label === 'typescript' || label === 'javascript') {
				// 	return new tsWorker();
				// }
				return new editorWorker();
			}
		};
	});

    loadCode(jsCode, 'javascript')


	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div>
	<div class="flex-grow" bind:this={editorElement}></div>
</div> -->
