<!--src/routes/admin/post/+page.svelte-->

<script>
    import { onMount } from 'svelte'

    let ClassicEditor

    onMount(async ()=> {
        const module = await import('ckeditor5-custom-build/build/ckeditor')
        ClassicEditor = module.default
        ClassicEditor.create( document.querySelector('#editor'))
        .then( editor => {
            console.log(editor)
        } )
        .catch( error => {
            console.error( error );
        } );
    })
</script>

<form method='post'>
    <textarea id='editor'>Editor</textarea>
</form>

<style>
    #editor {
        width: 100%;
    }

    :global(.ck-editor__editable) {
        min-height: 300px;
        color: black;
    }
</style>