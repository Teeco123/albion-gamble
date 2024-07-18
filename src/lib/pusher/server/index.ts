import PusherServer from 'pusher';
import { env } from '$env/dynamic/private';

export const pusherServer = new PusherServer({
	appId: env.PUSHER_APP_ID as string,
	key: '99c59095535b5193797a',
	secret: env.PUSHER_SECRET as string,
	cluster: 'eu',
	useTLS: true
});
