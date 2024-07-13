<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { docStore } from 'sveltefire';

	export let data;

	interface User {
		username?: string;
		password?: string;
		server?: string;
		balance?: number;
	}

	const user = docStore<User>(firestore, `users/${data.userId}`);
</script>

<div>{$user?.balance}</div>

<style lang="scss">
</style>
