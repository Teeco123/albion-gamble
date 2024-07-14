<script lang="ts">
	import type { PageData } from './$types';
	import Header from './_components/header.svelte';
	import Chat from './_components/chat.svelte';
	import WheelOfFortune from './_components/wheelOfFortune.svelte';

	export let data: PageData;
</script>

<Header {data} />
<main>
	<WheelOfFortune />
	<Chat {data} />
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: space-around;
		margin: 40px 15%;
		height: 100vh;
	}
</style>
