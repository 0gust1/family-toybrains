import { persisted } from 'svelte-local-storage-store';

// First param `messages` is the local storage key.
// Second param is the initial value.
export const messagesStore = persisted('messages', {
	messages: [{ role: 'assistant', content: 'Ask me a question' }]
});
