import { env } from '$env/dynamic/private';
import { fail, error } from '@sveltejs/kit';
import { Configuration, OpenAIApi, type ChatCompletionResponseMessage } from 'openai';
import { getConversationMessages, createConversationMessage } from '$lib/services/messages';
import { getConversation } from '$lib/services/conversations';

import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	runtime: 'edge',
	envVarsInUse: [
		'OPENAI_KEY',
		'OPENAI_ORGANIZATION',
		'SUPABASE_PROJECT_URL',
		'SUPABASE_PROJECT_KEY'
	]
};

const configuration = new Configuration({
	organization: env.OPENAI_ORGANIZATION,
	apiKey: env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

export const ssr = true;

export const load = async ({ params }) => {
	const resp = await openai.listModels(); // TODO: remove or cache this
	const models = resp.data.data;

	const convId = params.convId;

	const messagesOrError = await getConversationMessages(convId);

	const conversationOrError = getConversation(convId);

	if (messagesOrError instanceof Error) {
		throw error(500, messagesOrError.message);
	}

	if (conversationOrError instanceof Error) {
		throw error(500, conversationOrError.message);
	}

	//console.log(data);
	return {
		current_conversation: conversationOrError,
		messages: messagesOrError ?? [],
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
		const temperature = parseFloat(data.get('temperature') as number);
		const top_p = parseFloat(data.get('top_p') as number);

		let messages = [];

		try {
			const response = await openai.createChatCompletion({
				model: model,
				messages: [{ role: 'user', content: usrMsg }],
				max_tokens: 2048,
				temperature: temperature,
				top_p: top_p
			});

			const responseData = response.data;
			const { choices, ...metadata } = responseData;
			metadata.finish_reason = choices[0].finish_reason;
			metadata.index = choices[0].index;

			messages = await createConversationMessage(convId, { role: 'user', content: usrMsg });

			messages = await createConversationMessage(convId, choices[0].message, metadata);
		} catch (err /*: AxiosError<OpenAIError> */) {
			console.error(err);
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
