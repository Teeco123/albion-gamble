import PusherClient from 'pusher-js';

//@ts-ignore
export const pusherClient = new PusherClient('99c59095535b5193797a', {
	wsHost: '127.0.0.1',
	wssPort: 6001,
	forceTLS: true,
	disableStats: true,
	enabledTransports: ['wss']
});
