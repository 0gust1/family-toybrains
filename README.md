# Family Oracles

## What is it?

I made a little private app to let my kids play with those trendy and bizarre AI tools.

Hopefully, it will help them understand how they work and what they can do.

It interfaces with OpenAI's API to generate text/chat, and stores the results in a database. Other APIs integrations (e.g. hugging face public models/endpoints) will surely happen.

The app is built using:

- SvelteKit (https://kit.svelte.dev/)
- OpenAI API (https://openai.com/)
- Supabase (https://supabase.io/)
- Vercel (https://vercel.com/)

It's a work in progress, but you can see it here:

https://family-toybrains.vercel.app/

...(Obviously, you won't see much, as it is protected)

**Please note**:  
All the artistic direction is done by my 2 daughters, who are 6 and 11 years old.  
All the graphics are made by Stable Diffusion v2.1.  
We have a lot of fun with this project :)

**Please note**:  
The app is simply protected by a password that lives in an ENV var. It stays on the server.

There is **only authorization**, no user management, no authentification.
Session token is stored in a http-only cookie (1 week validity).

This is not a very secure way to protect the app, but it's not bad for a proof of concept for now.

The password is stored in the `SECRET_PASSWORD` environnment variable.

## Run

- git clone the repo
- create an `.env` file : `cp .env.example .env` and fill it with your own values
- install dependencies `npm install`
- launch `npm run dev`

You'll need the following environment variables:

- `SECRET_PASSWORD`, as stated above

OpenAI API:

- `OPENAI_ORGANIZATION`
- `OPENAI_KEY`

Database:

- `SUPABASE_PROJECT_URL`
- `SUPABASE_API_KEY`

## Links

Refs:

- https://github.com/ScriptRaccoon/sveltekit-password
- https://platform.openai.com/docs/api-reference
- https://platform.openai.com/docs/guides/chat/introduction
