import PusherClient from 'pusher-js';
import { env } from '$env/dynamic/public';

export const pusherClient = new PusherClient(env.PUBLIC_PUSHER_KEY as string, {
	cluster: env.PUBLIC_PUSHER_CLUSTER as string,
	forceTLS: true
});
