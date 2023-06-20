<!--src/routes/admin/+layout.svelte-->

<script>
    import { items } from '$lib/store.js'
    export let data
</script>

<header class='Header'>
    <div class='region wrapper'>
        <div class='page-title'>{ $items.pageTitle }</div>
        <div class='search'>
            <select>
                <option>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ការផ្សាយ</option>
            </select>
            <input type='text' name='search' placeholder="ស្វែង​រក..." required />
            <input type='submit' value='បញ្ជូន' />
        </div>
        <div class='logout'>
            <span>{ data.userName }</span> |
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
    <ul>
        {#each $items?.items as item (item.id)}
            <li>
                <a class="thumb" href="/{$items.type}/{item.id}">
                    <img src='{item.thumb}' />
                    {#if (item.videos !== "" && item.videos !== "[]")}
                    <img class="play-icon" src='/images/play.png' />
                    {/if}
                </a>
                <span>
                    <a href="/{$items.type}/{item.id}">{item.title}</a>
                    <div>{new Date(item.datetime).toLocaleDateString("it-IT")}</div>
                </span>
                <div class="edit">
                    <a href='/admin/{$items.type}/edit/{item.id}'>
                        <img src="/images/edit.png" />
                    </a>
                    <a href='/admin/{$items.type}/delete/{item.id}'>
                        <img src="/images/delete.png" />
                    </a>
                </div>
                
            </li>
        {/each}
    </ul>
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

    .page-title{
        font: 20px/1.5 StardosStencil, Limonf3;
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

    footer ul{
        list-style-type: none;
        display: grid;
        grid-template-columns: calc(50% - 5px) calc(50% - 5px);
        grid-gap: 10px;
        padding: 10px 0;
    }

    footer ul li{
        background: var(--background);
        display: grid;
        grid-template-columns: 22% auto 15%;
        grid-gap: 10px;
        align-items: center;
    }

    footer ul li .thumb{
        position: relative;
        padding-top: 56.25%;
        width: 100%;
    }

    footer ul li .thumb img{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    footer ul li .thumb .play-icon{
        position: absolute;
        width: 25%;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    footer ul li span{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    footer ul li span a{
        font: 15px/1.5 Oswald, Bayon;
        color: white;
    }

    footer ul li .edit a img{
        width: 35px;
        visibility: hidden;
    }

    footer ul li:hover .edit a img{
        visibility: visible;
    }



    .load-more {
        text-align: center;
        background-color: var(--background);
        padding: 10px 0 5px;
    }
</style>