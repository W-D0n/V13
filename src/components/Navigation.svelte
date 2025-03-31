<!-- Barre de navigation -->
<script lang="ts">
	import { link } from 'svelte-routing';

	const navItems = [
		{ path: '/', label: 'Accueil' },
		{ path: '/app', label: 'Applications' },
		{ path: '/library', label: 'Bibliothèque' },
		{ path: '/hall-of-fame', label: 'Hall of Fame' },
		{ path: '/schedule', label: 'Planning' },
		{ path: '/resources', label: 'Ressources' },
		{ path: '/services', label: 'Services' }
	];
</script>

<nav>
	<ul>
		{#each navItems as item}
			<li>
				<a href={item.path} use:link>{item.label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		background: #2c3e50;
		padding: 1rem;
	}

	ul {
		list-style: none;
		display: flex;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}

	a {
		color: white;
		text-decoration: none;
		font-weight: 500;
	}

	a:hover {
		color: #3498db;
	}
</style>
