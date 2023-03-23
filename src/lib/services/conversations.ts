import { supabase } from '$lib/services/supabaseClient';

export async function getAllConversations() {
	const { data: conversations, error } = await supabase
		.from('conversations')
		.select()
		.order('created_at', { ascending: false });

	if (error) {
		return new Error(error.message);
	}

	return conversations;
}

export async function getConversation(conversation_id: string) {
	const { data: conversation, error } = await supabase
		.from('conversations')
		.select()
		.eq('id', conversation_id)
		.single();

	if (error) {
		return new Error(error.message);
	}

	return conversation;
}

export async function createConversation(conversation_name: string) {
	const { data: conversation, error } = await supabase
		.from('conversations')
		.upsert([{ name: conversation_name }]);

	if (error) {
		return new Error(error.message);
	}

	return conversation;
}
