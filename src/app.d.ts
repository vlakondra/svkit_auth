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

export {};
