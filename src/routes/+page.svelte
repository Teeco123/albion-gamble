<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { pusherClient } from '$lib/pusher/client';
	import { docStore } from 'sveltefire';
	import type { PageData } from './$types';

	export let data: PageData;

	interface User {
		username?: string;
		password?: string;
		server?: string;
		balance?: number;
	}
	const user = docStore<User>(firestore, `users/${data.userId}`);

	const channel = pusherClient.subscribe('channel');
	channel.bind('event', function (data: any) {
		console.log(data);
	});
</script>

<div>{$user?.balance}</div>

<style lang="scss">
</style>
