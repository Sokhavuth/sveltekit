<svelte:head>
	<title>Khmerweb SvelteKit</title>
    <link href="/fonts/setup.css" rel="stylesheet" />
    <link href="/styles/base.css" rel="stylesheet">
</svelte:head>

<slot />

<footer>Powered by SvelteKit &copy;2023 Khmer Web</footer>

<style>
    footer {
        text-align: center;
        padding: 10px 0;
    }
</style>