import { supabase } from '$lib/services/supabaseClient';

export const load = async () => {
	return {};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const conv_name = data.get('conv_name');
		await supabase.from('conversations').insert([{ name: conv_name }]);
		return {};
	}
};
