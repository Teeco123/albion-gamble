<script lang="ts">
	import type { PageData } from './$types';
	import Header from './_components/header.svelte';
	import Chat from './_components/chat.svelte';
	import WheelOfFortune from './_components/wheelOfFortune.svelte';
	import Footer from './_components/footer.svelte';

	export let data: PageData;
</script>

<Header {data} />
<main>
	<WheelOfFortune />
	<Chat {data} />
</main>
<Footer />

<style lang="scss">
	main {
		display: flex;
		justify-content: space-between;
		margin: 40px 8%;
		height: 100vh;
	}
</style>
