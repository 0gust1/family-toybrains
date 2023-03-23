import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('session_id');

	throw redirect(307, '/');
};
