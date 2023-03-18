import { env } from '$env/dynamic/private';
import { Configuration, OpenAIApi, type ChatCompletionResponseMessage } from 'openai';

let messages: Array<ChatCompletionResponseMessage> = [
	{ role: 'assistant', content: 'Ask me a question' }
];

const configuration = new Configuration({
	organization: env.OPENAI_ORGANIZATION,
	apiKey: env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);
const resp = await openai.listModels();
export const load = async () => {
	const models = resp.data.data.map((model) => model.id);
	return {
		messages: messages,
		models: models,
		model: 'gpt-3.5-turbo',
		user: 'achas'
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const message = data.get('message') as string;
		const model = data.get('model') as string;
		messages.push({ role: 'user', content: message });
		console.log(model);
		const response = await openai.createChatCompletion({
			model: model,
			messages: messages,
			max_tokens: 800,
			temperature: 0.3
		});

		messages = [
			...messages,
			...(response.data.choices.map(
				(choice) =>
					choice.message ?? {
						role: 'assistant',
						content: "\n\nI don't know\n\n"
					}
			) as Array<ChatCompletionResponseMessage>)
		];
		//const completion = response.data.choices[0].text;
		//initialMessages.push({ role: 'assistant', message: completion ?? "I don't know" });
		return { messages: messages, lastUsage: response.data.usage };
	}
};
