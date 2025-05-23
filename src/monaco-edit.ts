import * as monaco from 'monaco-editor';
//import monaco from 'monaco-editor';



// Import the workers in a production-safe way.
// This is different than in Monaco's documentation for Vite,
// but avoids a weird error ("Unexpected usage") at runtime
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';

//import pyWorker from 'monaco-editor/esm/vs/basic-languages/python/ts.worker?worker';
//import pyW from 'monaco-editor/esm/vs/basic-languages/python/python.worker?worker';
//import { language as py } from 'monaco-editor/esm/vs/basic-languages/python/python';
//import {language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js';

self.MonacoEnvironment = {
	getWorker: function (_: string, label: string) {
		console.log('self...', label)
		switch (label) {
			case 'json':
				return new jsonWorker();
			case 'css':
			case 'scss':
			case 'less':
				return new cssWorker();
			case 'html':
			case 'handlebars':
			case 'razor':
				return new htmlWorker();
			case 'typescript':
			case 'javascript':
				const tsw = new tsWorker();
				console.log(tsw)
				return tsw
			case 'sql':
			// const sql_worker =  new Worker(new URL('./sql.worker.js', import.meta.url));
			// console.log('sql_worker',sql_worker)
			// return sql_worker;

			//new tsWorker();	
			//return new Worker(new URL('./sql.worker.js', import.meta.url));
			//return new tsWorker();	
			default:
				return new editorWorker();
		}
	}
};

export default monaco;