<!--src/routes/admin/upload/+page.svelte-->

<script>
    import {items} from '$lib/store.js'
    export let form

    $items.pageTitle = "ទំព័រ Upload"
    $items.count = 0
    $items.items = []
    $items.type = false
    $items.pageNumber = 0

</script>

<section>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="file" placeholder="avatar" required />
        <button type="submit">Upload</button>
        <br/><br/>
        {#if form?.missing}
        <p class="error">The file field is required</p>
        {/if}
        {#if form?.fileName}
        <input class="link" type="text" value="{form.fileName}" />
        {/if}
    </form>
</section>

<style>
    section{
        background: lavender;
        padding: 20px;
        color: black;
        height: 100%;
    }

    form input{
        background: white;
        width: 50%;
    }

    form .link{
        padding: 5px 10px;
    }

    form button{
        padding: 2px 10px;
    }
</style>