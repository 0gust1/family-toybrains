<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<h1>Login</h1>

<form method="POST" use:enhance>
	<label>Password<input name="password" type="password" /></label>
	<button>Login</button>
</form>

{#if form && !form.password_correct}
	<p>The password is not correct.</p>
{/if}
