<!--src/routes/admin/+layout.svelte-->

<script>
    import { items } from '$lib/store.js'
    export let data

    $: $items = data
</script>

<header class='Header'>
    <div class='region wrapper'>
        <div class='logo'>{ $items?.logo }</div>
        <div class='search'>
            <select>
                <option>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ការផ្សាយ</option>
            </select>
            <input type='text' name='search' placeholder="ស្វែង​រក..." required />
            <input type='submit' value='បញ្ជូន' />
        </div>
        <div class='logout'>
            <span>{ $items?.userName }</span> |
            <a href='/'>ទំព័រ​មុខ</a> |
            <a href='/admin/logout'>ចេញ​ក្រៅ</a>
        </div>
    </div>
</header>

<main class='region'>
    <aside>
        <div class="wrapper">
            <a href='/admin/post'><img src='/images/movie.png' /></a>
            <a href='/admin/post'>ការផ្សាយ</a>

            <a href='/admin/category'><img src='/images/category.png' /></a>
            <a href='/admin/category'>ជំពូក</a>
            
            <a href='/admin/upload'><img src='/images/upload.png' /></a>
            <a href='/admin/upload'>Upload</a>
            
            <a href='/admin/user'><img src='/images/users.png' /></a>
            <a href='/admin/user'>អ្នក​ប្រើប្រាស់</a>
            
            <a href='/admin/setting'><img src='/images/setting.png' /></a>
            <a href='/admin/setting'>Setting</a>
        </div>
    </aside>
    <div class='editor'><slot /></div>
</main>

<div class='info region'>សរុប​ទាំងអស់​មាន​ចំនួនៈ { $items?.count }</div>

<footer class='region'>
    <ul></ul>
    <div class='load-more'>
        <a href='/admin/paging'><img src='/images/load-more.png' /></a>
    </div>
</footer>

<style>
    .Header {
        background-color: var(--background-dark);
        padding: 10px 0;
    }

    .wrapper {
        display: grid;
        grid-template-columns: 25% auto 25%;
    }

    .search {
        display: grid;
        grid-template-columns: 20%  auto 15%;
    }

    .search input, .search select {
        font: 14px/1.5 Vidaloka, OdorMeanChey;
        padding: 0 5px;
    }

    .logout {
        text-align: right;
    }

    .logout a{
        color: var(--color);
    }

    main {
        display: grid;
        grid-template-columns: 25% auto;
        margin-top: 20px;
    }

    aside {
        background-color: var(--background);
        padding: 20px;
    }

    aside .wrapper {
        display: grid;
        grid-template-columns: 25% auto;
        grid-gap: 15px 10px;
        align-items: center;
    }

    aside .wrapper img {
        width: 100%;
        float: left;
    }

    aside .wrapper a {
        font: 16px/1.5 Koulen, Oswald;
        color: var(--color);
    }

    .info {
        background-color: var(--background);
        margin-top: 10px;
        text-align: center;
        padding: 5px 0;
    }

    .load-more {
        text-align: center;
        background-color: var(--background);
        margin: 10px 0;
        padding: 10px 0 5px;
    }
</style>