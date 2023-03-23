import { createConversation } from '$lib/services/conversations';

export const load = async () => {
	return {};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const conv_name = data.get('conv_name') as string;
		await createConversation(conv_name);
		return {};
	}
};
