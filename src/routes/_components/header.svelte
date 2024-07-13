<script lang="ts">
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
		{#if data.userId}
			<div class="balance">
				<p>{$user?.balance}</p>
				<img src="/icons/coin.png" alt="coin" />
			</div>
			<button class="logout">
				<img src="/icons/logout.png" alt="key" />
				<p>Logout</p>
			</button>
		{:else}
			<button class="login"><img src="/icons/login.png" alt="login" />Login</button>
			<button class="register"><img src="/icons/key.png" alt="key" />Register</button>
		{/if}
	</div>
</header>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

	header {
		background-color: #17153b;
		font-family: 'Roboto', sans-serif;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.logo {
			color: #c8acd6;
			font-size: 25px;
		}
		.userinfo {
			display: flex;
			align-items: center;
			margin: 0px 4px;
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
					color: #fff;
				}
			}
			.login {
				background-color: #c8acd6;
			}
			.register {
				background-color: #433d8b;
			}
			.logout {
				background-color: #433d8b;
			}
			.balance {
				display: flex;
				align-items: center;
				font-size: 24px;
				img {
					width: 35px;
				}
				p {
					margin: 0px 8px;
					color: #c8acd6;
				}
			}
		}
	}
</style>
