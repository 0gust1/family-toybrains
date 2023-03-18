# Family Oracles

This app is a proof of concept for a family oracle. It uses the OpenAI API to generate responses to questions. The app is built with SvelteKit and TailwindCSS.

It's a work in progress, but you can see it in action here: <TODO>

The app is simply protected by a password. This is not a very secure way to protect the app, but it's good enough for a proof of concept. The password is stored in the `SECRET_PASSWORD` environnment variable.

You will also need an account on OpenAI (https://platform.openai.com/account/).

Refs:

- https://github.com/ScriptRaccoon/sveltekit-password
- https://platform.openai.com/docs/api-reference
- https://platform.openai.com/docs/guides/chat/introduction

## Environment variables

You'll need:

- `SECRET_PASSWORD`, as stated above
- `OPENAI_ORGANIZATION`
- `OPENAI_KEY`

---

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
