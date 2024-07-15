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
		wheel.debug = true;
		wheel.items = [{ label: 'huj', weight: 2 }];
	});
</script>

<div bind:this={wheelElement} class="wheel"></div>

{#each $gambles as gamble}
	<p>Total Silver:{gamble.totalSilver}</p>
	<p>Total Players:{gamble.totalPlayers}</p>
	{#if gamble.users}
		{#each gamble.users as user}
			<p>Player:{user.userNickname} Silver:{user.balanceDrop}</p>
		{/each}
	{/if}
{/each}

<form method="POST" action="?/inputSilver" use:enhance>
	<input type="number" name="silver" placeholder="Silver" />
	<button type="submit">GO IN</button>
</form>

<style lang="scss">
	p {
		color: white;
	}
</style>
