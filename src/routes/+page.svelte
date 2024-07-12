<script lang="ts">
	import { pusherClient } from '$lib/pusher/client';

	const channel = pusherClient.subscribe('channel');
	channel.bind('event', function (data: any) {
		console.log(data);
	});
</script>

<div></div>

<style lang="scss">
</style>
