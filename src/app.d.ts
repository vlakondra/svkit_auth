declare global {
	namespace App {
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
			// user: import('$lib/server/auth').SessionValidationResult['user'];
			// session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	}
}

//?
//declare module 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
//declare module 'monaco-editor/esm/vs/basic-languages/sql/sql';
export {};
