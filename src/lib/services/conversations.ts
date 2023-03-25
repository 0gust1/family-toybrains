import { supabase } from '$lib/services/supabaseClient';

export async function getAllConversations() {
	const { data: conversations, error } = await supabase
		.from('conversations')
		.select('name, id, created_at, is_chat, users(name, id))')
		.order('created_at', { ascending: false });

	if (error) {
		return new Error(error.message);
	}
	console.log(conversations);
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

export async function createConversation(
	conversation_name: string,
	user_id: string,
	is_chat: boolean
) {
	const { data: conversation, error } = await supabase
		.from('conversations')
		.upsert([{ name: conversation_name, user: user_id, is_chat: is_chat }])
		.select()
		.single();

	if (error) {
		return new Error(error.message);
	}

	return conversation;
}
