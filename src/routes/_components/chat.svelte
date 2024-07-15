<script lang="ts">
	import { collection, query, orderBy, limit } from 'firebase/firestore';
	import { enhance } from '$app/forms';
	import { firestore } from '$lib/firebase';
	import { collectionStore } from 'sveltefire';

	export let data;

	interface Message {
		userId?: string;
		userNickname?: string;
		message?: string;
	}

	const messageQuery = query(
		collection(firestore, 'messages'),
		orderBy('timeSent', 'desc'),
		limit(15)
	);
	const messages = collectionStore<Message>(firestore, messageQuery);
</script>

<div class="chat">
	<div class="chat-label">
		<img src="/icons/chat.png" alt="chat" />
		<p>Chat</p>
	</div>
	<div class="chat-box">
		{#each $messages as message}
			<div class="message-box">
				<img class="user-icon" src="/icons/person.png" alt="person" />
				<div class="user-nickname">{message.userNickname}</div>
				<div class="message">{message.message}</div>
			</div>
		{/each}
	</div>
	{#if data.userId}
		<form method="POST" action="?/sendMessage" use:enhance>
			<input type="text" name="message" placeholder="Send message..." />
			<button type="submit"><img src="/icons/send.png" alt="send" /></button>
		</form>
	{/if}
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Inter:700|Inter:400');

	.chat {
		font-family: 'Inter';
		font-weight: 400;
		font-size: 100%;
		margin: 8px;
		max-width: 20%;
		max-height: 80%;
		overflow-y: hidden;
		.chat-label {
			background-color: #0e1215;
			padding: 16px;
			display: flex;
			align-items: center;
			border-radius: 10px;
			img {
				width: 28px;
				margin: 0px 8px;
			}
			p {
				color: #eaf1f5;
				margin: 0px;
				font-size: 24px;
			}
		}
		.chat-box {
			background-color: #0e1215;
			margin: 8px 0px 0px 0px;
			border-radius: 10px 10px 10px 10px;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			max-height: calc(100% - 52px - 62px - 8px);
			&::-webkit-scrollbar {
				width: 6px;
			}
			&::-webkit-scrollbar-track {
				border-radius: 7px;
				background-color: #0e1215;
			}

			&::-webkit-scrollbar-track:hover {
				background-color: #0e1215;
			}

			&::-webkit-scrollbar-track:active {
				background-color: #0e1215;
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background-color: #533674;
			}

			&::-webkit-scrollbar-thumb:hover {
				background-color: #4f336e;
			}

			&::-webkit-scrollbar-thumb:active {
				background-color: #4f336e;
			}
			.message-box {
				display: grid;
				grid-template-columns: 15% 85%;
				margin: 8px;
				word-wrap: normal;
				.user-icon {
					width: 100%;
				}
				.user-nickname {
					display: flex;
					align-items: center;
					color: #a767b9;
					margin: 0px 8px;
				}
				.message {
					color: #eaf1f5;
					grid-column: span 2;
					margin: 8px;
					width: auto;
					word-wrap: break-word;
				}
			}
		}
		form {
			display: flex;
			background-color: #0e1215;
			border-radius: 0px 0px 10px 10px;
			margin: 8px 0px 8px 0px;
			height: 44px;
			input {
				background-color: #533674;
				width: 85%;
				border: none;
				border-radius: 10px 0px 0px 10px;
				color: #eaf1f5;
				&:focus-visible {
					outline: none;
				}
			}
			button {
				background-color: #533674;
				border: none;
				width: 15%;
				border-radius: 0px 10px 10px 0px;
				&:hover {
					cursor: pointer;
				}
				img {
					width: 100%;
				}
			}
		}
	}
</style>
