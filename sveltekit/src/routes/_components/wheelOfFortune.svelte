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
		isSpinning: boolean;
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

	onMount(() => {
		wheel = new Wheel(wheelElement);
		wheel.isInteractive = false;
		wheel.radius = 1;
		wheel.items = [{}];

		const channel = pusherClient.subscribe('wheelOfFortune');

		channel.bind('CreateGamble', function () {});

		channel.bind('SpinWheel', function (data: any) {
			const winnerIndex = data.winnerIndex;

			wheel.spinToItem(winnerIndex, 10000, false, 10, 1, null);
		});
	});

	const gambleQuery = query(collection(firestore, 'gambles'), orderBy('date', 'desc'), limit(1));
	//@ts-ignore
	const gambles = collectionStore<Gamble>(firestore, gambleQuery);
	let gambleUserData: any;
	let items: { label: string | undefined; weight: Number | undefined }[] = [];
	let gambleData: any;
	let isSpinning: any;

	$: $gambles.forEach((gamble) => {
		gambleData = gamble;
		isSpinning;
		if (gamble.users != undefined) {
			gambleUserData = gamble.users.map((user) => ({
				label: user.userNickname,
				weight: user.balanceDrop
			}));
			items.push(...gambleUserData);
			wheel.items = gambleUserData;
		}

		if (gamble.isSpinning != undefined) {
			isSpinning = gamble.isSpinning;
		}
	});
</script>

<div class="wheel-of-fortune">
	<div class="betting">
		<div bind:this={wheelElement} class="wheel"></div>
		{#if data.userId}
			{#if !isSpinning}
				<form method="POST" action="?/inputSilver" use:enhance>
					<input type="number" name="silver" placeholder="Silver" bind:value={silver} />
					<button type="submit" on:click={submitInputSilver}>
						<img src="/icons/place item.png" alt="send" />
					</button>
				</form>
			{/if}
		{/if}
	</div>

	<div class="gamble-info">
		{#each $gambles as gamble}
			<div class="total-info">
				<p>Total Silver:{gamble.totalSilver}</p>
				<p>Total Players:{gamble.totalPlayers}</p>
			</div>
			{#if gamble.users}
				<div class="users-info">
					{#each gamble.users as user, i}
						{#if i > 0}
							<p>Player:{user.userNickname} Silver:{user.balanceDrop}</p>
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Inter:700|Inter:400');

	.wheel-of-fortune {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		font-family: 'Inter';
		font-weight: 400;
		font-size: 100%;
		background-color: #0e1215;
		margin: 8px;
		border-radius: 10px;
		max-height: 80%;
		flex-grow: 100;
		.betting {
			display: flex;
			flex-direction: column;
			align-items: center;
			max-width: 100%;
			height: calc(100% - 32px);
			margin: 16px;
			.wheel {
				height: 80%;
				width: 100%;
			}
			form {
				display: flex;
				height: 12%;
				margin-top: 4vh;
				input {
					height: 100%;
					border: none;
					background-color: #533674;
					border-radius: 10px;
					text-align: center;
					color: #eaf1f5;

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
					height: 100%;
					border: none;
					margin-left: 16px;
					border-radius: 10px;
					background-color: #533674;
					img {
						height: 100%;
					}
					&:hover {
						cursor: pointer;
					}
				}
			}
		}
		.gamble-info {
			color: #eaf1f5;
			display: flex;
			flex-direction: column;
			align-items: center;
			max-width: 50%;
			height: calc(100% - 32px);
			margin: 16px;
			flex-wrap: nowrap;
			.total-info {
				display: flex;
				p {
					margin: 8px;
				}
			}
			.users-info {
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow-y: auto;
				width: 100%;
				&::-webkit-scrollbar {
					width: 6px;
				}
				&::-webkit-scrollbar-track {
					border-radius: 7px;
					background-color: #0e1215;
				}

				&::-webkit-scrollbar-track:hover {
					background-color: #0e1215;
				}

				&::-webkit-scrollbar-track:active {
					background-color: #0e1215;
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 5px;
					background-color: #533674;
				}

				&::-webkit-scrollbar-thumb:hover {
					background-color: #4f336e;
				}

				&::-webkit-scrollbar-thumb:active {
					background-color: #4f336e;
				}
				&::-webkit-scrollbar {
					width: 6px;
				}
				&::-webkit-scrollbar-track {
					border-radius: 7px;
					background-color: #0e1215;
				}

				&::-webkit-scrollbar-track:hover {
					background-color: #0e1215;
				}

				&::-webkit-scrollbar-track:active {
					background-color: #0e1215;
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 5px;
					background-color: #533674;
				}

				&::-webkit-scrollbar-thumb:hover {
					background-color: #4f336e;
				}

				&::-webkit-scrollbar-thumb:active {
					background-color: #4f336e;
				}
			}
		}
	}
</style>
