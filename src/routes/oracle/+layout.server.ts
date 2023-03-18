import { redirect } from '@sveltejs/kit';
import { has_session } from '../../lib/services/session';

export const load = async ({ cookies }) => {
	const session_id = cookies.get('session_id');
	if (!session_id) throw redirect(307, '/login');
	const logged_in = has_session(session_id);
	if (!logged_in) throw redirect(307, '/login');
};