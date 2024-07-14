<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<form method="POST" action="?/register" use:enhance>
	<label>
		<p>Username</p>
		<input name="username" type="string" />
	</label>
	<label>
		<p>Password</p>
		<input name="password" type="password" />
	</label>
	<label>
		<p>Server</p>
		<select name="server">
			<option value="Europe">Europe</option>
			<option value="America">America</option>
			<option value="Asia">Asia</option>
		</select>
	</label>
	{#if form?.missing}<p class="error">Fill required forms</p>{/if}
	{#if form?.exists}<p class="error">User with this nickname already exsists</p>{/if}
	<button type="submit">Register</button>
</form>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Inter:700|Inter:400');

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: 'Inter';
		font-weight: 400;
		font-size: 100%;
		background-color: #0e1215;
		height: 100vh;
		border-radius: 10px;
		text-align: center;
		.error {
			color: red;
		}
		label {
			margin: 5px;
			p {
				color: #eaf1f5;
				margin: 10px 0px;
			}
			input {
				background-color: #533674;
				width: 90%;
				height: 30px;
				border: none;
				border-radius: 10px;
				color: #eaf1f5;
				text-align: center;
				&:focus-visible {
					outline: none;
				}
			}
			select {
				margin: 10px 0px;
				-webkit-appearance: none;
				-moz-appearance: none;
				-ms-appearance: none;
				appearance: none;
				outline: 0;
				box-shadow: none;
				border: 0 !important;
				background: #533674;
				background-image: none;
				flex: 1;
				padding: 0 0.5em;
				color: #fff;
				cursor: pointer;
				font-size: 0.9em;
				position: relative;
				display: flex;
				width: 7em;
				height: 30px;
				overflow: hidden;
				border-radius: 10px;
				text-align: center;
				justify-content: center;
			}
		}
		button {
			margin: 50px 0px;
			background-color: #a2c2d4;
			color: #0e1215;
			width: 13em;
			height: 35px;
			border-radius: 12px;
			border: none;
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
