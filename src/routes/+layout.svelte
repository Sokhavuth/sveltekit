<svelte:head>
	<title>Khmerweb Sveltekit</title>
    <link href="/fonts/setup.css" rel="stylesheet" />
    <link href="/styles/base.css" rel="stylesheet">
    <script src="/scripts/jquery.js"></script>
</svelte:head>

<slot />

<footer>Powered by Sveltekit &copy;2023 Khmer Web</footer>

<style>
    footer {
        text-align: center;
        padding: 0 0 10px;
    }
</style>