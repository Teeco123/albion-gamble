import PusherServer from 'pusher';
import { env } from '$env/dynamic/private';

//@ts-ignore
export const pusherServer = new PusherServer({
	appId: env.SOKETI_DEFAULT_APP_ID as string,
	key: env.SOKETI_DEFAULT_APP_KEY as string,
	secret: env.SOKETI_DEFAULT_APP_SECRET as string,
	host: '127.0.0.1',
	port: 3002,
	useTLS: true
});
