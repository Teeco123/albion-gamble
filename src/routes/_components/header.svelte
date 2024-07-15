<script lang="ts">
	import { enhance } from '$app/forms';
	import { firestore } from '$lib/firebase';
	import { docStore } from 'sveltefire';

	export let data;

	interface User {
		username?: string;
		server?: string;
		balance?: number;
	}

	const user = docStore<User>(firestore, `users/${data.userId}`);
</script>

<header>
	<div class="logo">Albion Gamble</div>
	<div class="userinfo">
		<form method="POST" use:enhance>
			{#if data.userId}
				<div class="balance">
					<p>{$user?.balance}</p>
					<img src="/icons/coin.png" alt="coin" />
				</div>
				<button class="logout" type="submit" formaction="?/logout">
					<img src="/icons/logout.png" alt="key" />
					<p>Logout</p>
				</button>
			{:else}
				<button class="login" type="submit" formaction="?/loginRedirect">
					<img src="/icons/login.png" alt="login" />
					<p>Login</p>
				</button>
				<button class="register" type="submit" formaction="?/registerRedirect">
					<img src="/icons/key.png" alt="key" />
					<p>Register</p>
				</button>
			{/if}
		</form>
	</div>
</header>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Inter:700|Inter:400');

	header {
		background-color: #060a0d;
		font-family: 'Inter';
		font-weight: 400;
		font-size: 100%;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		border-bottom: #101416 solid 2px;
		position: sticky;
		.logo {
			color: #a767b9;
			font-size: 25px;
		}
		.userinfo {
			display: flex;
			align-items: center;
			margin: 0px 4px;
			form {
				display: flex;
				button {
					width: 120px;
					height: 40px;
					border: none;
					border-radius: 6px;
					font-size: 14px;
					margin: 8px;
					text-align: center;
					display: flex;
					align-items: center;
					img {
						width: 35px;
					}
					p {
						margin: 0px 8px;
						color: #eaf1f5;
					}
				}
				.login {
					background-color: #533674;
				}
				.register {
					background-color: #533674;
				}
				.logout {
					background-color: #533674;
				}
				.balance {
					display: flex;
					align-items: center;
					font-size: 24px;
					margin: 0px 32px;
					img {
						width: 35px;
					}
					p {
						margin: 0px 8px;
						color: #a767b9;
					}
				}
			}
		}
	}
</style>
