import { supabase } from '$lib/services/supabaseClient';

export async function getConversationMessages(conversation_id: string) {
	const { data: messages, error } = await supabase
		.from('messages')
		.select()
		.eq('conversation_id', conversation_id)
		.order('created_at');

	if (error) {
		return new Error(error.message);
	}

	return messages;
}

export async function createConversationMessage(
	conversation_id: string,
	message: { role: string; content: string },
	metadata?: { [key: string]: any }
) {
	const { data: messages, error } = await supabase
		.from('messages')
		.insert([{ message, conversation_id, metadata: metadata ?? null }])
		.select('*')
		.order('created_at');

	if (error) {
		return new Error(error.message);
	}

	return messages;
}
