<script lang="ts">
	import { enhance } from '$app/forms';
	//@ts-ignore
	import { Wheel } from 'spin-wheel';
	import { firestore } from '$lib/firebase';
	import { collection, limit, orderBy, query, Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { collectionStore } from 'sveltefire';

	interface Gamble {
		date?: Timestamp;
		totalPlayers?: Number;
		totalSilver?: Number;
		users: [{ balanceDrop?: Number; userId?: string; userNickname?: string }];
	}

	const gambleQuery = query(collection(firestore, 'gambles'), orderBy('date', 'desc'), limit(1));
	//@ts-ignore
	const gambles = collectionStore<Gamble>(firestore, gambleQuery);

	let gambleData;

	$: $gambles.forEach((gamble) => {
		gambleData = gamble;
	});

	let wheelElement: HTMLElement;

	onMount(() => {
		let wheel = new Wheel(wheelElement);
		wheel.isInteractive = false;
		wheel.radius = 1;
		wheel.debug = true;
		wheel.items = [{ label: 'huj', weight: 2 }];
	});
</script>

<div class="wheel-of-fortune">
	<div class="betting">
		<div bind:this={wheelElement} class="wheel"></div>
		<form method="POST" action="?/inputSilver" use:enhance>
			<input type="number" name="silver" placeholder="Silver" />
			<button type="submit"><img src="/icons/place item.png" alt="send" /></button>
		</form>
	</div>
	<!--
	<div class="gamble-info">
		{#each $gambles as gamble}
			<p>Total Silver:{gamble.totalSilver}</p>
			<p>Total Players:{gamble.totalPlayers}</p>
			{#if gamble.users}
				{#each gamble.users as user}
					<p>Player:{user.userNickname} Silver:{user.balanceDrop}</p>
				{/each}
			{/if}
		{/each}
	</div>
	-->
</div>

<style lang="scss">
	.wheel-of-fortune {
		background-color: #0e1215;
		flex-grow: 100;
		margin: 8px;
		border-radius: 10px;
		max-height: 80%;
	}
	.betting {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 36px;
		max-height: 80%;
		.wheel {
			max-height: 40vh;
			width: 40vh;
		}
		form {
			display: flex;
			justify-content: center;
			margin-top: 10vh;

			input {
				height: 5vh;
				border: none;
				background-color: #533674;
				border-radius: 10px;
				text-align: center;
				color: #eaf1f5;
				font-size: 1rem;
				&::placeholder {
					color: #eaf1f5ad;
				}
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				&:focus-visible {
					outline: none;
				}
			}
			button {
				border: none;
				margin-left: 16px;
				border-radius: 10px;
				background-color: #533674;
				img {
					height: 4vh;
					width: 2.6vw;
				}
			}
		}
	}
</style>
