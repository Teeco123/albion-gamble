<script lang="ts">
	import type { PageData } from './$types';
	import Header from './_components/header.svelte';
	import Chat from './_components/chat.svelte';

	export let data: PageData;
</script>

<Header {data} />
<Chat />

<style lang="scss">
</style>
