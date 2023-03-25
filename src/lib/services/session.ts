import { supabase } from './supabaseClient';

export async function getUser(username: string) {
	const { data, error } = await supabase.from('users').select().eq('name', username).single();

	if (error) {
		console.error(error);
		return null;
	}

	return data;
}

export async function save_session() {
	const session_id = crypto.randomUUID();
	const { data, error } = await supabase
		.from('sessions')
		.insert({ session_id: session_id })
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return session_id;
}

export async function has_session(session_id: string) {
	const { data, error } = await supabase
		.from('sessions')
		.select('session_id')
		.eq('session_id', session_id)
		.single();

	if (error) {
		console.error(error);
		return false;
	}

	return !!data;
}
