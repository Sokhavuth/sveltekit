<!--src/routes/admin/category/+page.svelte-->

<script>
    import {items} from '$lib/store.js'
    export let data

    $items.pageTitle = data.settings.pageTitle
    $items.count = data.count
    $items.items = data.items
    $items.type = data.settings.type
    $items.pageNumber = data.settings.pageNumber
</script>

<section>
    <form method="post">
        <span>ឈ្មោះជំពូកៈ</span><input type="text" name="title" required />
        <span>រូប​សញ្ញាៈ</span><input type="text" name="thumb" required />
        <span>ពេល​បង្កើតៈ</span><input type="datetime-local" name="datetime" step="1" required />
        <span></span><input type="submit" value="បញ្ជូន" />
    </form>
</section>

<style>
    section{
        background: lavender;
        padding: 20px;
        color: black;
        height: 100%;
    }

    form{
        display: grid;
        grid-template-columns: 10% 50%;
        grid-gap: 5px;
        align-items: center;
    }

    form span{
        text-align: right;
    }

    form input{
        font: var(--body-font);
        padding: 2px 5px;
    }
</style>