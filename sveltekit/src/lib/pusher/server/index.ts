import PusherServer from 'pusher';
import { env } from '$env/dynamic/private';

export const pusherServer = new PusherServer({
	appId: env.PUSHER_APP_ID as string,
	key: env.PUSHER_KEY as string,
	secret: env.PUSHER_SECRET as string,
	cluster: env.PUSHER_CLUSTER as string,
	useTLS: true
});
