import { createConversation } from '$lib/services/conversations';
import { redirect, fail } from '@sveltejs/kit';

export const load = async () => {
	return {};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const conv_name = data.get('conv_name') as string;
		const user_id = cookies.get('user_id');
		const is_chat = data.get('is_chat') ?? false;
		const conversationOrError = await createConversation(conv_name, user_id, is_chat);
		if (conversationOrError instanceof Error) {
			return fail(500, conversationOrError.message);
		} else {
			throw redirect(303, `/oracle/${conversationOrError.id}`);
		}
	}
};
