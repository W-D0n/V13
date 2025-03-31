<!-- Page d'accueil -->
<script lang="ts">
	import Navigation from '../components/Navigation.svelte';
</script>

<main>
	<Navigation />
	<h1>Bienvenue sur mon Stream</h1>
	<div class="content">
		<p>Découvrez mes contenus et rejoignez la communauté !</p>
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
