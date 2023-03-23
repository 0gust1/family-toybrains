import { SECRET_PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { save_session } from '$lib/services/session';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const password_correct = password === SECRET_PASSWORD;

		if (password_correct) {
			const session_id = await save_session();
			if (session_id) {
				const one_week = 60 * 60 * 24 * 7;
				cookies.set('session_id', session_id, {
					path: '/',
					maxAge: one_week
				});
				throw redirect(307, '/oracle');
			}
		}

		return fail(401, { password_correct });
	}
};
