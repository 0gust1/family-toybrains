import { redirect, error } from '@sveltejs/kit';
import { has_session } from '$lib/services/session';
import { getAllConversations } from '$lib/services/conversations';

export const load = async ({ cookies }) => {
	const session_id = cookies.get('session_id');
	if (!session_id) throw redirect(307, '/login');

	const logged_in = await has_session(session_id);
	if (!logged_in) throw redirect(307, '/login');

	const conversationsOrError = await getAllConversations();

	if (conversationsOrError instanceof Error) {
		throw error(500, conversationsOrError.message);
	} else {
		return {
			conversations: conversationsOrError,
			logged_in: logged_in
		};
	}
};
