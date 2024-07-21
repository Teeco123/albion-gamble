<script lang="ts">
	import { enhance } from '$app/forms';
	//@ts-ignore
	import { Wheel } from 'spin-wheel';
	import { firestore } from '$lib/firebase/client';
	import {
		collection,
		limit,
		orderBy,
		query,
		Timestamp,
		where,
		getDocs,
		documentId
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { collectionStore } from 'sveltefire';
	import toast from 'svelte-french-toast';
	import { pusherClient } from '$lib/pusher/client';

	export let data: any;

	interface Gamble {
		date?: Timestamp;
		totalPlayers?: Number;
		totalSilver?: Number;
		users: [{ balanceDrop?: Number; userId?: string; userNickname?: string }];
	}

	//Toast notif
	let silver: number;
	async function submitInputSilver() {
		if (silver > 0 && !null) {
			if (data.userId) {
				let userData: any;
				const userDataQuery = query(
					collection(firestore, 'users'),
					where(documentId(), '==', data.userId)
				);

				const userSnapshot = await getDocs(userDataQuery);
				userSnapshot.forEach((doc) => {
					userData = doc.data();
				});
				if (silver <= userData.balance) {
					toast.success('Successfully placed a bet');
				} else {
					toast.error('Not enough balance');
				}
			}
		} else {
			toast.error("Can't place a bet for 0 silver");
		}
	}

	let wheelElement: HTMLElement;
	let wheel: any;
	let isSpinning: boolean;

	onMount(() => {
		wheel = new Wheel(wheelElement);
		wheel.isInteractive = false;
		wheel.radius = 1;
		wheel.items = [{}];

		const channel = pusherClient.subscribe('wheelOfFortune');

		channel.bind('CreateGamble', function () {
			isSpinning = false;
		});

		channel.bind('SpinWheel', function () {
			isSpinning = true;
			wheel.spin(100000);
		});
	});

	const gambleQuery = query(collection(firestore, 'gambles'), orderBy('date', 'desc'), limit(1));
	//@ts-ignore
	const gambles = collectionStore<Gamble>(firestore, gambleQuery);
	let gambleUserData: any;
	let items: { label: string | undefined; weight: Number | undefined }[] = [];
	let gambleData;

	$: $gambles.forEach((gamble) => {
		gambleData = gamble;
		if (gamble.users != undefined) {
			gambleUserData = gamble.users.map((user) => ({
				label: user.userNickname,
				weight: user.balanceDrop
			}));
			items.push(...gambleUserData);
			wheel.items = gambleUserData;
		}
	});
</script>

<div class="wheel-of-fortune">
	<div class="betting">
		<div bind:this={wheelElement} class="wheel"></div>
		{#if !isSpinning}
			<form method="POST" action="?/inputSilver" use:enhance>
				<input type="number" name="silver" placeholder="Silver" bind:value={silver} />
				<button type="submit" on:click={submitInputSilver}>
					<img src="/icons/place item.png" alt="send" />
				</button>
			</form>
		{/if}
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
				&:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>
