<script lang="ts">
</script>

<aside>
	<div class="chat-label">
		<img src="/icons/chat.png" alt="chat" />
		<p>Chat</p>
	</div>
	<div class="chat-box">
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disa</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">Huj mu w dupe</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">
				Jebac DIsa kurwe zwisa orka skuryuwysna jebanego huja szmate pierdolona
			</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disaashdjhabsdnhakskdha</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disaashdjhabsdnhakskdha</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disaashdjhabsdnhakskdha</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disaashdjhabsdnhakskdha</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disaashdjhabsdnhakskdha</div>
		</div>
		<div class="message-box">
			<img class="user-icon" src="/icons/person.png" alt="person" />
			<div class="user-nickname">Teeco</div>
			<div class="message">JEBAC disaashdjhabsdnhakskdha</div>
		</div>
	</div>
	<form>
		<input type="text" placeholder="Send message..." />
		<button><img src="/icons/send.png" alt="send" /></button>
	</form>
</aside>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Inter:700|Inter:400');

	aside {
		grid-column: 8/10;
		margin-top: 40px;
		font-family: 'Inter';
		font-weight: 400;
		font-size: 100%;
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
			border-radius: 10px 10px 0px 0px;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			max-height: 60vh;
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
			input {
				background-color: #533674;
				width: 85%;
				height: 42px;
				border: none;
				border-radius: 0px 0px 0px 10px;
				color: #eaf1f5;
				&:focus-visible {
					outline: none;
				}
			}
			button {
				background-color: #533674;
				border: none;
				width: 15%;
				height: 44px;
				border-radius: 0px 0px 10px 0px;
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
