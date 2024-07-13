<script lang="ts">
	import type { PageData } from './$types';
	import Header from './_components/header.svelte';

	export let data: PageData;
</script>

<Header {data} />

<style lang="scss">
</style>
