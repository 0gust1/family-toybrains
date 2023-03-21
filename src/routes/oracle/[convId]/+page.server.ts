import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { Configuration, OpenAIApi, type ChatCompletionResponseMessage } from 'openai';
import { supabase } from '$lib/services/supabaseClient';

const configuration = new Configuration({
	organization: env.OPENAI_ORGANIZATION,
	apiKey: env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);
const resp = await openai.listModels();
const models = resp.data.data.map((model) => model.id);

export const load = async ({ params }) => {
	const convId = params.convId;
	const { data } = await supabase
		.from('messages')
		.select('*')
		.eq('conversation_id', convId)
		.order('created_at');

	//console.log(data);
	return {
		messages: data ?? [],
		models: models,
		model: 'gpt-3.5-turbo',
		user: 'achas'
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const convId = params.convId;
		const data = await request.formData();
		const usrMsg = data.get('message') as string;
		const model = data.get('model') as string;

		let messages = [];

		try {
			const response = await openai.createChatCompletion({
				model: model,
				messages: [{ role: 'user', content: usrMsg }],
				max_tokens: 2048,
				temperature: 0.3
			});
			//{ message: { role: 'user', content: usrMsg }, conversation_id: conversationId },
			await supabase
				.from('messages')
				.insert([{ message: { role: 'user', content: usrMsg }, conversation_id: convId }]);

			messages = await (
				await supabase
					.from('messages')
					.insert([{ message: response.data.choices[0].message, conversation_id: convId }])
					.select('*')
					.order('created_at')
			).data;
		} catch (err /*: AxiosError<OpenAIError> */) {
			//console.log(err);
			//const origerr = err.toJSON();
			return fail(err.response.status, {
				message: 'Le robot a eu un problème !',
				error: err.response.data ?? err.response.statusText
			});
		}

		//console.log(messages);

		messages = [
			...(messages ?? [])
			/* ...(response.data.choices.map(
				(choice) =>
					choice.message ?? {
						role: 'assistant',
						content: "\n\nI don't know\n\n"
					}
			) as Array<ChatCompletionResponseMessage>) */
		];
		//const completion = response.data.choices[0].text;
		//initialMessages.push({ role: 'assistant', message: completion ?? "I don't know" });
		return {
			messages: messages
			//lastUsage: response.data.usage
		};
	}
};
