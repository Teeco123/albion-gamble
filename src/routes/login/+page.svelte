<script>
	export let form;
</script>

<form method="POST" action="?/login">
	{#if form?.missing}<p class="error">Fill required forms</p>{/if}
	{#if form?.wrong}<p class="error">Wrong username or password</p>{/if}
	<label>
		Username
		<input name="username" type="string" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<label>
		Server
		<select name="server">
			<option value="Europe">Europe</option>
			<option value="America">America</option>
			<option value="Asia">Asia</option>
		</select>
	</label>
	<button type="submit">Register</button>
</form>

<style lang="scss">
</style>
