<script lang="ts">
	import Navigation from '../components/Navigation.svelte';
</script>

<main>
	<Navigation />
	<h1>Bibliothèque de Jeux</h1>
	<div class="content">
		<p>Catalogue des jeux Steam, GOG et Epic Games Store.</p>
	</div>
</main>

<style>
	main {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.content {
		margin-top: 2rem;
	}
</style>
