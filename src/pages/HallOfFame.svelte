<script lang="ts">
	import Navigation from '../components/Navigation.svelte';
</script>

<main>
	<Navigation />
	<h1>Hall of Fame</h1>
	<div class="content">
		<p>Scores et trophées des viewers.</p>
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
