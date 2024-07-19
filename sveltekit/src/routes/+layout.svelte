<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import { FirebaseApp } from 'sveltefire';
	import { firestore } from '$lib/firebase/client';
</script>

<Toaster />
<FirebaseApp {firestore}>
	<slot />
</FirebaseApp>
