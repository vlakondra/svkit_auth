<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import { line } from 'drizzle-orm/pg-core';
///////////
//import * as monaco from 'monaco-editor';

//import { languages } from 'monaco-editor/esm/vs/editor/editor.api';	
//import  {language}  from 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
	

	//language.register({ id: 'sql' })
	//languages.setMonarchTokensProvider('sql', sql.language);
	//languages.setLanguageConfiguration('sql', sql.conf)

	//import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
	//import * as monaco1 from 'monaco-editor/esm/vs/editor/editor.api';
	//monaco1.languages.register({id:'sql'})
	
// Опционально: настройка автодополнения
//monaco1.languages.registerCompletionItemProvider('sql', {})
  
// 	provideCompletionItems: (model, position) => {
//     // Ваша логика автодополнения для SQL
//     return {
//       suggestions: [
//         {
//           label: 'SELECT',
//           kind: monaco1.languages.CompletionItemKind.Keyword,
//           insertText: 'SELECT ',
//           documentation: 'SQL SELECT statement'
//         },
//         // Другие ключевые слова SQL...
//       ]
//     };
//   }
//});

	////////////////////////////////////////////

	//import * as monaco from 'monaco-editor';

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import('../../monaco-edit')).default;
        console.log('monaco',monaco)
		// Your monaco instance is ready, let's display some code!
		const editor = monaco.editor.create(editorContainer, {
			automaticLayout: true,
			theme: 'vs-dark',
			lineNumbers: 'on',
			language: 'sql', 
			value: 'select * from table',
			contextmenu:true,
			cursorStyle:'line-thin',
			cursorBlinking:'blink',
			cursorWidth: 2,
			fontSize:20,
			fontFamily:'Fira Code',
			});

		const model = monaco.editor.createModel(
			"console.log('test\nanother')",
			'javascript'
	
		);
		//editor.setModel(model);
		editor.onDidChangeModelContent((e)=>console.log(editor.getValue()))

	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div>
	<p class="container h-lvh" bind:this={editorContainer}></p>
</div>

