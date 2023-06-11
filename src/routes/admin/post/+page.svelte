<!--src/routes/admin/post/+page.svelte-->

<script>
    import { onMount } from 'svelte'

    let ClassicEditor

    onMount(async ()=> {
        const module = await import('ckeditor5-custom-build/build/ckeditor')
        ClassicEditor = module.default
        ClassicEditor.create( document.querySelector('#editor'), {
          
          toolbar: ['fontfamily', 'fontsize', 'fontcolor', 'bold', 'italic', 
          'bulletedList', 'indent', 'outdent', 'numberedList', 'link', 'blockQuote', 
          'code', 'table', 'codeblock', 'imageinsert', 'mediaembed', 'undo', 'redo' ],
          fontFamily: {
            options: [
              'ឧត្តមាន​ជ័យ, OdorMeanChey', 'អក្សរដៃ, HandWriting',
              'គូលេន, Koulen', 'ក្រូច​ឆ្នារ, Limonf3',
              'បាយ័ន, Bayon', 'ក្រសាំង, Rooster',
              'មូល, Moul',
    				  'Arial, Helvetica, sans-serif',
 				      'Courier New, Courier, monospace',
 				      'Georgia, serif',
 				      'Lucida Sans Unicode, Lucida Grande, sans-serif',
 				      'Tahoma, Geneva, sans-serif',
 				      'Times New Roman, Times, serif',
 				      'Trebuchet MS, Helvetica, sans-serif',
				      'Verdana, Geneva, sans-serif',
            ],
            supportAllValues: true
          },
          
          fontSize: {
            options: [
                9,
                11,
                13,
                'default',
                17,
                19,
                21
            ],
            supportAllValues: true
          },
        })
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
        width: 100%;
        color: black;
    }
</style>