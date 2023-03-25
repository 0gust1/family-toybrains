import { createConversation } from '$lib/services/conversations';
import { redirect, fail } from '@sveltejs/kit';

export const load = async () => {
	return {};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const conv_name = data.get('conv_name') as string;
		const conversation = await createConversation(conv_name);
		if (conversation instanceof Error) {
			return fail(500, conversation.message);
		} else {
			throw redirect(303, `/oracle/${conversation.id}`);
		}
	}
};
